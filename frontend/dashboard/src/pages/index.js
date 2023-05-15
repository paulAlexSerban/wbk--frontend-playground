import getComponentLibrary from "@/utils/getComponentLibrary";
import { useState } from "react";
import templateStyles from "../styles/_05_system/_01_templates/generic.module.scss";
import mainStyles from "../styles/_04_library/_04_layouts/main.module.scss";
import Header from "@/core/components/Header/Header";
import Footer from "@/core/components/Footer/Footer";
import { Roboto } from "next/font/google";
import ComponentList from "@/core/components/ComponentList/ComponentList";
import ComponentViewer from "@/core/components/ComponentView/ComponentView";
const roboto = Roboto({
    display: "swap",
    subsets: ["latin"],
    weight: ["400", "700", "900"],
    style: ["normal"],
    variable: "--text-regular",
});

export default function Index({ atoms, molecules, organisms, templates }) {
    const [component, setComponent] = useState(null);
    const componentClickHandler = (e) => {
        e.preventDefault();
        setComponent({ src: e.target.href,
        title: e.target.dataset.componentSlug });
    };
    return (
        <>
            <Header />
            <main className={[templateStyles.main, mainStyles.base, roboto.className].join(" ")}>
                <div className={mainStyles.sideBar}>
                    {atoms.length !== 0 && <ComponentList title="Atoms" list={atoms} onClick={componentClickHandler} />}
                    {molecules.length !== 0 && (
                        <ComponentList title="Molecules" list={molecules} onClick={componentClickHandler} />
                    )}
                    {organisms.length !== 0 && (
                        <ComponentList title="Organisms" list={organisms} onClick={componentClickHandler} />
                    )}
                    {templates.length !== 0 && (
                        <ComponentList title="Templates" list={templates} onClick={componentClickHandler} />
                    )}
                </div>

                {component && <ComponentViewer src={component.src} title={component.title} />}
            </main>
            <Footer />
        </>
    );
}

export async function getStaticProps({}) {
    const getAtoms = getComponentLibrary().atoms.map((item) => item);
    const getMolecules = getComponentLibrary().molecules.map((item) => item);
    const getOrganisms = getComponentLibrary().organisms.map((item) => item);
    const getTemplates = getComponentLibrary().templates.map((item) => item);
    return {
        props: {
            atoms: getAtoms,
            molecules: getMolecules,
            organisms: getOrganisms,
            templates: getTemplates,
        },
    };
}
