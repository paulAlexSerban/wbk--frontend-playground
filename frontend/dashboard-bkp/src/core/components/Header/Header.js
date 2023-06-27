import { Roboto } from "next/font/google";
import styles from "@/styles/layouts/header.module.scss";

const roboto = Roboto({
    display: "swap",
    subsets: ["latin"],
    weight: ["400", "700", "900"],
    style: ["normal"],
    variable: "--text-font-family-regular",
});

export default function Header() {
    return (
        <header className={[styles.base, roboto.className].join(" ")}>
            <h1>Component Library</h1>
        </header>
    );
}
