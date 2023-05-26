const fs = require('fs');
const path = require('path');

exports.createPages = async ({ actions }) => {
    const { createPage } = actions;
    const createdPages = [];

    // Obtiene los datos necesarios para generar la página (por ejemplo, de una API o un archivo de datos)
    const petalosData = [
        {linkName: "petalo-1", title: "Página 1", image: 'boton1', subPetalos: [
                {linkName: "petalo-1/1", title: "Guia Espiritual 1"},
                {linkName: "petalo-1/2", title: "Guia Espiritual 2"}
            ]},
        {linkName: "petalo-2", title: "Página 2", image: 'boton2', subPetalos: [
                {linkName: "petalo-2/1", title: "Guia Espiritual 1", subPetalos:[
                        {linkName: "petalo-2/1/1", title: "Guia Espiritual 1"},
                        {linkName: "petalo-2/1/2", title: "Guia Espiritual 2"}
                    ]},
                {linkName: "petalo-1/2", title: "Guia Espiritual 2"}
            ]},
        {linkName: "petalo-3", title: "Página 3", image: 'boton3', subPetalos: [
                {linkName: "petalo-3/1", title: "Guia Espiritual 1", subPetalos:[
                        {linkName: "petalo-3/1/1", title: "Guia Espiritual 1"},
                        {linkName: "petalo-3/2/1", title: "Guia Espiritual 2"}
                    ]},
                {linkName: "petalo-3/2", title: "Guia Espiritual 2"}
            ]},
        {linkName: "petalo-4", title: "Página 4", subPetalos: [
                {linkName: "petalo-4/1", title: "Guia Espiritual 1",image: 'boton4', subPetalos:[
                        {linkName: "petalo-4/1/1", title: "Guia Espiritual 1"},
                        {linkName: "petalo-4/1/2", title: "Guia Espiritual 2"}
                    ]},
                {linkName: "petalo-4/2", title: "Guia Espiritual 2"}
            ]},
        {linkName: "petalo-5", title: "Página 5", image: 'boton5',subPetalos: [
                {linkName: "petalo-5/1", title: "Guia Espiritual 1",image: 'boton5', subPetalos:[
                        {linkName: "petalo-5/1/1", title: "Guia Espiritual 1"},
                        {linkName: "petalo-5/1/2", title: "Guia Espiritual 2"}
                    ]},
                {linkName: "petalo-5/2", title: "Guia Espiritual 2"}
            ]},
        {linkName: "petalo-6", title: "Página 6", image: 'boton6',subPetalos: [
                {linkName: "petalo-6/1", title: "Guia Espiritual 1",image: 'boton6', subPetalos:[
                        {linkName: "petalo-6/1/1", title: "Guia Espiritual 1"},
                        {linkName: "petalo-6/1/2", title: "Guia Espiritual 2"}
                    ]},
                {linkName: "petalo-6/2", title: "Guia Espiritual 2"}
            ]},
        {linkName: "petalo-7", title: "Página 7", image: 'boton7',subPetalos: [
                {linkName: "petalo-7/1", title: "Guia Espiritual 1",image: 'boton7', subPetalos:[
                        {linkName: "petalo-7/1/1", title: "Guia Espiritual 1"},
                        {linkName: "petalo-7/1/2", title: "Guia Espiritual 2"}
                    ]},
                {linkName: "petalo-7/2", title: "Guia Espiritual 2"}
            ]},
    ]

    // Genera una página para cada elemento en los datos dinámicos
    petalosData.forEach((data) => {
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
            createPage({
                path: subPagePath, // Define la ruta de la página
                component: require.resolve('./src/components/PetalosTemplate.js'), // Especifica la plantilla a utilizar
                context: {
                    linkName: subPetalo.linkName,
                    title: subPetalo.title,
                },
            });
            createdPages.push(subPagePath);
        });
    });

    const createdPagesPath = path.join(__dirname, '../createdPages.json');
    fs.writeFileSync(createdPagesPath, JSON.stringify(createdPages));
}

