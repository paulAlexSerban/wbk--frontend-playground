import paths from "@/core/commons/paths";
import transformArrayToObj from "@/core/utils/transformArray";
import fetchFile from "@/core/utils/fetchFile";
import Group from "@/core/components/Group";
import { base, library, libraryList } from "./index.module.scss";

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
    const genericComponentListJson = `${paths.internalComponentLibraryUrl}/componentList.json`;
    const genericComponentListArray = await fetchFile(genericComponentListJson);
    const genericComponentListObj = transformArrayToObj(genericComponentListArray);

    const frontendMentorChallengesJson = `${paths.internalFrontendMentorLibrary}/componentList.json`;
    const frontendMentorChallengesArray = await fetchFile(frontendMentorChallengesJson);
    const frontendMentorChallengesObj = transformArrayToObj(frontendMentorChallengesArray);

    return {
        props: {
            data: { genericComponentListObj, frontendMentorChallengesObj },
        },
    };
}
