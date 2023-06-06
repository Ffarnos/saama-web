const fs = require('fs');
const path = require('path');
const {petalos} = require("./static/data");

exports.createPages = async ({ actions }) => {
    const { createPage } = actions;
    const createdPages = [];
    function subPetalos (petalos) {
        petalos.forEach((petalo) => {
            if (petalo.subPetalos) {
                const pagePath = `circulo-base/${petalo.linkName}`
                createPage({
                    path: pagePath, // Define la ruta de la página
                    component: require.resolve('./src/components/templates/PetalosTemplate.js'), // Especifica la plantilla a utilizar
                    context: {
                        linkName: petalo.linkName,
                        title: petalo.title,
                        image: petalo.image,
                    },
                });
                createdPages.push(pagePath);
                subPetalos(petalo.subPetalos);
            }
            else {
                const pagePath = `circulo-base/${petalo.linkName}`
                createPage({
                    path: pagePath, // Define la ruta de la página
                    component: require.resolve('./src/components/templates/TextTemplate.js'), // Especifica la plantilla a utilizar
                    context: {
                        titleText: petalo.title,
                        desc: petalo.text,
                        image: petalo.image,
                    },
                });
                createdPages.push(pagePath);
            }
        });
    }
    subPetalos(petalos);

    const createdPagesPath = path.join(__dirname, '../createdPages.json');
    fs.writeFileSync(createdPagesPath, JSON.stringify(createdPages));
}

