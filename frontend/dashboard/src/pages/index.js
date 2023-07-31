import paths from "@/core/commons/paths";
import transformArrayToObj from "@/core/utils/transformArray";
import fetchFile from "@/core/utils/fetchFile";
import Group from "@/core/components/Group";
import { base, library, libraryList } from "./index.module.scss";

import path from 'path';
import fs from 'fs/promises';

export default function Index({ data }) {
    const { genericComponentListObj, frontendMentorChallengesObj } = data;
    return (
        <main className={base}>
            <section className={library}>
                <h2>Generic Component Library</h2>
                <ul className={libraryList}>
                    {Object.entries(genericComponentListObj).map(([groupName, groupContent], index) => (
                        <Group key={index} groupName={groupName} groupContent={groupContent} library="generic" />
                    ))}
                </ul>
            </section>
            <section>
                <h2>Frontend Mentor Challenges</h2>
                <ul>
                    {Object.entries(frontendMentorChallengesObj).map(([groupName, groupContent], index) => (
                        <Group
                            key={index}
                            groupName={groupName}
                            groupContent={groupContent}
                            library="frontend-mentor"
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export async function getStaticProps({}) {
    let genericComponentListArray;
    let frontendMentorChallengesArray;

    const genericComponentListJson = `${paths.internalComponentLibraryUrl}/componentList.json`;
    if (paths.internalComponentLibraryUrl.includes("http")) {
        genericComponentListArray = await fetchFile(genericComponentListJson);
    } else {
        const jsonFilePath = path.join(process.cwd(), 'public', genericComponentListJson);
        const jsonData = await fs.readFile(jsonFilePath, 'utf8');
        genericComponentListArray = JSON.parse(jsonData);
    }
    const genericComponentListObj = transformArrayToObj(genericComponentListArray);

    const frontendMentorChallengesJson = `${paths.internalFrontendMentorLibrary}/componentList.json`;
    if (paths.internalFrontendMentorLibrary.includes("http")) {
        frontendMentorChallengesArray = await fetchFile(frontendMentorChallengesJson);
    } else {
        const jsonFilePath = path.join(process.cwd(), 'public', frontendMentorChallengesJson);
        const jsonData = await fs.readFile(jsonFilePath, 'utf8');
        frontendMentorChallengesArray = JSON.parse(jsonData);
    }
    const frontendMentorChallengesObj = transformArrayToObj(frontendMentorChallengesArray);

    return {
        props: {
            data: { genericComponentListObj, frontendMentorChallengesObj },
        },
    };
}
