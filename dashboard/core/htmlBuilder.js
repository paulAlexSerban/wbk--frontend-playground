// Core HTML builder for dashboard templating system
// Contains functions for assembling the HTML structure from data

const buildHtmlDocument = ({ head, sidebar, topNavbar, cards, modal, footer }) => `
<!DOCTYPE html>
<html lang="en">
    ${head}
    <body class="bg-light">
        ${topNavbar}

        <div class="container-fluid">
            <div class="row">
                ${sidebar}
                <main class="col-md-10 ms-sm-auto px-4 py-4">
                    <div class="row" id="cardContainer">
                        ${cards}
                    </div>
                </main>
            </div>
        </div>
        ${modal}
        ${footer}
    </body>
</html>
`;

module.exports = {
    buildHtmlDocument,
};
