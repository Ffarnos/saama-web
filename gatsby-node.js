const fs = require('fs');
const path = require('path');
const {petalos, texts} = require("./static/data");

exports.createPages = async ({ actions }) => {
    const { createPage } = actions;
    const createdPages = [];

    // Genera una página para cada elemento en los datos dinámicos
    petalos.forEach((data) => {
        const pagePath = `circulo-base/${data.linkName}`
        createPage({
            path: pagePath, // Define la ruta de la página
            component: require.resolve('./src/components/PetalosTemplate.js'), // Especifica la plantilla a utilizar
            context: {
                linkName: data.linkName,
                title: data.title,
                image: data.image,
            },
        });

        createdPages.push(pagePath);
        if (!data.subPetalos) return
        data.subPetalos.forEach((subPetalo) => {
            const subPagePath = `circulo-base/${subPetalo.linkName}`;
            let template = './src/components/PetalosTemplate.js'
            let context = {
                title: subPetalo.title,
                linkName: subPetalo.linkName,
            }

            if (subPetalo.type === 'text') {
                const text = texts[subPetalo.title.toUpperCase()][subPetalo.number];
                template = './src/components/TextTemplate.js'
                context = {
                    titlePage: subPetalo.title,
                    titleText: text.title,
                    desc: text.descripcion,
                }
            }
            createPage({
                path: subPagePath, // Define la ruta de la página
                component: require.resolve(template), // Especifica la plantilla a utilizar
                context: context,
            });
            createdPages.push(subPagePath);
        });
    });

    const createdPagesPath = path.join(__dirname, '../createdPages.json');
    fs.readFileSync(createdPagesPath).keys();
    fs.writeFileSync(createdPagesPath, JSON.stringify(createdPages));
}

