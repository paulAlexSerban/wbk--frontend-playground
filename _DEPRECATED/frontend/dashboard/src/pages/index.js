import bigFrontEndDevLibraryComponentList from '@prj--js-component-lib/big-frontend-dev-library/dist/componentList.json';
import devDaysMatrixComponentList from '@prj--js-component-lib/dev-days-matrix-library/dist/componentList.json';
import frontEndMentorComponentList from '@prj--js-component-lib/frontend-mentor-library/dist/componentList.json';
import genericComponentLibraryComponentList from '@prj--js-component-lib/generic-component-library/dist/componentList.json';
// import paths from '@/core/commons/paths';
import transformArrayToObj from '@/core/utils/transformArray';
// import fetchFile from '@/core/utils/fetchFile';
import Group from '@/core/components/Group';
import { base, library, libraryList } from './index.module.scss';

// import path from 'path';
// import fs from 'fs/promises';

export default function Index({ data }) {
    const libraries = [
        {
            obj: data.bigFrontendLibraryObj,
            title: 'Big Frontend Library',
            libName: 'big-frontend',
            class: library,
            listClass: libraryList,
        },
        {
            obj: data.devDaysMatrixObj,
            title: 'Dev Days Matrix Library',
            libName: 'dev-days-matrix',
            class: library,
            listClass: libraryList,
        },
        {
            obj: data.genericComponentListObj,
            title: 'Generic Component Library',
            libName: 'generic',
            class: library,
            listClass: libraryList,
        },
        {
            obj: data.frontendMentorChallengesObj,
            title: 'Frontend Mentor Challenges',
            libName: 'frontend-mentor',
            class: library,
            listClass: libraryList,
        },
    ];

    return (
        <main className={base}>
            {libraries.map(({ obj, title, libName, class: sectionClass, listClass }, index) => (
                <section key={index} className={sectionClass}>
                    <h2>{title}</h2>
                    <ul className={listClass}>
                        {Object.entries(obj).map(([groupName, groupContent], idx) => (
                            <Group key={idx} groupName={groupName} groupContent={groupContent} library={libName} />
                        ))}
                    </ul>
                </section>
            ))}
        </main>
    );
}

export async function getStaticProps({}) {
    // const fetchOrReadFile = async (url) => {
    //     let dataArray;
    //     if (url.includes('http://')) {
    //         dataArray = await fetchFile(url);
    //     } else {
    //         const jsonFilePath = path.join(process.cwd(), 'public', url);
    //         const jsonData = await fs.readFile(jsonFilePath, 'utf8');
    //         dataArray = JSON.parse(jsonData);
    //     }
    //     return transformArrayToObj(dataArray);
    // };

    const bigFrontendLibraryObj = transformArrayToObj(bigFrontEndDevLibraryComponentList);
    const devDaysMatrixObj = transformArrayToObj(devDaysMatrixComponentList);
    const genericComponentListObj = transformArrayToObj(genericComponentLibraryComponentList);
    const frontendMentorChallengesObj = transformArrayToObj(frontEndMentorComponentList);

    return {
        props: {
            data: { bigFrontendLibraryObj, devDaysMatrixObj, genericComponentListObj, frontendMentorChallengesObj },
        },
    };
}
