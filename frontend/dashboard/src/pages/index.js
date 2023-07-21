import paths from "@/core/commons/paths";
import transformArrayToObj from "@/core/utils/transformArray";
import fetchFile from "@/core/utils/fetchFile";
import Group from "@/core/components/Group";

export default function Index({ data }) {
    return (
        <main className="index">
            <ul>
                {Object.entries(data).map(([groupName, groupContent], index) => (
                    <Group key={index} groupName={groupName} groupContent={groupContent} />
                ))}
            </ul>
        </main>
    );
}

export async function getStaticProps({}) {
    const componentListJson = `${paths.internalComponentLibraryUrl}/componentList.json`;
    const componentListArray = await fetchFile(componentListJson);
    const componentListObj = transformArrayToObj(componentListArray);

    return {
        props: {
            data: componentListObj,
        },
    };
}
