import Script from "next/script";

export default function Footer() {
    return (
        <footer className="mod-footer__base row">
            <Script src="/javascript/page/index.page.layer.js" />
            <Script src="/javascript/template/generic.template.layer.js" />
        </footer>
    );
}
