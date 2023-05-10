export default function Header({ pageHeader, styles }) {
    return (
        <header className="mod-header__base row">
            <style jsx>{styles}</style>
            <div className="mod-header__content col-smartphone-12">
                <h1 className="cmp-heading__base cmp-heading__base--page-title cmp-heading__base--is-center-aligned">
                    <span className="cmp-heading__main">{pageHeader}</span>
                </h1>
            </div>
        </header>
    );
}
