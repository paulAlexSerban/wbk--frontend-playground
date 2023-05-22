import { Roboto } from "next/font/google";
import styles from "@/styles/layouts/footer.module.scss";

const roboto = Roboto({
    display: "swap",
    subsets: ["latin"],
    weight: ["400", "700", "900"],
    style: ["normal"],
    variable: "--text-regular",
});

export default function Footer() {
    return (
        <footer className={[styles.base, roboto.className].join(" ")}>
        </footer>
    );
}
