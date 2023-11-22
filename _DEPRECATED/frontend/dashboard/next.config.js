/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
};

if (process.env.ENV_NAME === 'production') {
    nextConfig.basePath = process.env.BASE_PATH;
}

module.exports = nextConfig;
