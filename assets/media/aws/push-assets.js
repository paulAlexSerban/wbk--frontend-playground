const { readdirSync, readFileSync, statSync, lstatSync } = require('fs');
const { resolve, join, relative } = require('path');
const { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config({ path: resolve(__dirname, '..', '..', '.env'), debug: true });
var mime = require('mime-types');

const REGION = process.env.S3_BUCKET_REGION;

// Create an S3 client
const s3 = new S3Client({ region: REGION });

const BUCKET_NAME = process.env.S3_ASSETS_BUCKET;
const ASSETS_PATH = resolve(__dirname, '..', 'dist');

function getLocalFilePaths(directory, _root = directory) {
    let filePaths = [];
    const entries = readdirSync(directory);

    for (const entry of entries) {
        const entryPath = join(directory, entry);
        if (lstatSync(entryPath).isFile()) {
            filePaths.push(relative(_root, entryPath));
        } else if (lstatSync(entryPath).isDirectory()) {
            filePaths = filePaths.concat(getLocalFilePaths(entryPath, _root));
        }
    }
    return filePaths;
}

async function uploadDirectory(directory, prefix, s3FilePaths) {
    const entries = readdirSync(directory);

    for (const entry of entries) {
        const entryPath = resolve(directory, entry);
        const s3Key = join(prefix, entry);

        if (s3FilePaths.includes(s3Key)) {
            console.log(`File "${s3Key}" already exists in S3 bucket "${BUCKET_NAME}". Skipping upload.`);
            continue;
        }

        if (statSync(entryPath).isFile()) {
            const fileContent = readFileSync(entryPath);

            const params = {
                Bucket: BUCKET_NAME,
                Key: s3Key,
                Body: fileContent,
                ContentType: mime.lookup(entry),
            };

            await s3.send(new PutObjectCommand(params));
            console.log(`Successfully uploaded file "${s3Key}" to S3 bucket "${BUCKET_NAME}"`);
        } else if (statSync(entryPath).isDirectory()) {
            await uploadDirectory(entryPath, s3Key, s3FilePaths);
        }
    }
}

async function deleteNonexistentS3Objects(localFilePaths) {
    const s3Objects = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET_NAME }));
    if (!s3Objects.Contents) {
        return [];
    }
    for (const s3Object of s3Objects.Contents) {
        if (!localFilePaths.includes(s3Object.Key)) {
            await s3.send(new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: s3Object.Key }));
            console.log(`Successfully deleted "${s3Object.Key}" from S3 bucket "${BUCKET_NAME}"`);
        }
    }
    return s3Objects.Contents.map((obj) => obj.Key);
}

async function main() {
    try {
        let localFilePaths = getLocalFilePaths(ASSETS_PATH);
        let s3FilePaths = await deleteNonexistentS3Objects(localFilePaths);

        await uploadDirectory(ASSETS_PATH, '', s3FilePaths);
        console.log(`Successfully uploaded all files in directory "${ASSETS_PATH}" to S3 bucket "${BUCKET_NAME}"`);
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}

main();
