import 'firebase/auth';
import {petalos} from "../../../static/data";
import {PDFDocument, rgb} from 'pdf-lib';
const emailjs = require('emailjs-com')

const createAndSendPDF = async () => {
    const existingPdfBytes = await loadPDF();

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const page = pdfDoc.getPage(0);

    const problems = localStorage.getItem("problems").split(",")

    const font = await pdfDoc.embedFont('Helvetica');
    const maxWidth = page.getSize().width - 30;

    page.drawText(localStorage.getItem("paciente"), {
        x: 120,
        y: 635,
        size: 15,
        color: rgb(0, 0, 0),
        font: font,
    });

    let yProblems = 580;

    for (const problem of problems) {
        page.drawText(problem, {
            x: 22,
            y: yProblems,
            size: 12,
            color: rgb(0, 0, 0),
        });
        yProblems = yProblems - 25;
    }

    let y = 480;
    let currentPage = page;

    for (const petalo of getListOfPetalos()) {
        console.log(petalo)
        if (y <= 10) {
            currentPage = pdfDoc.addPage([595, 842]);
            y = 780;
        }

        //RAMIFICAR
        if (petalo.title === "RAMIFICAR") {
            console.log("0")
            currentPage.drawLine({
                start: {x: 22, y: y},
                end: {x: 570, y: y},
                thickness: 1,
                color: rgb(0, 0, 0),
            });

            y = y - 100
        }
        //FUENTES
        else if (petalo.title.toLowerCase().includes("fuente")) {
            console.log("1")
            currentPage.drawText(petalo.title, {
                x: 22,
                y: y,
                size: 22,
                color: rgb(1, 0, 0),
            });
            y = y - 35;
        }
        //PETALO NO FINAL (PUEDE TENER RESOLUTION)
        else if (petalo.subPetalos) {

            if (petalo.title.length > 2) {
                console.log("2")
                currentPage.drawText(petalo.title, {
                    x: 22,
                    y: y,
                    size: 16,
                    color: rgb(0, 0, 0),
                });
                y = y - 20;
            }

            if (petalo.text) {
                const text = petalo.text;
                const wrappedText = wrapText(text, maxWidth, font, 12);
                console.log("3")

                for (const line of wrappedText.split('\n')) {
                    currentPage.drawText(line, {
                        x: 22,
                        y: y,
                        size: 12,
                        color: rgb(0, 0, 0),

                    })
                    y = y - 15;
                }
                y = y - 30;
            }
        } else {
            //PETALO FINAL
            if (petalo.text) {
                if (petalo.fieldText) {
                    console.log("4");
                    currentPage.drawText((petalo.useText ? petalo.title + ": " : "- ") + petalo.text, {
                        x: 22,
                        y: y,
                        size: 12,
                        color: rgb(0, 0, 0),
                    });
                    y = y - 10;
                } else {
                    const text = petalo.title.toUpperCase() + ": " + petalo.text;

                    const wrappedText = wrapText(text, maxWidth, font, 12);

                    const lines = wrappedText.split("\n");

                    for (const line of lines) {
                        if (y <= 10) {
                            currentPage = pdfDoc.addPage([595, 842]);
                            y = 780;
                        }
                        currentPage.drawText(line, {
                            x: 22,
                            y: y,
                            size: 12,
                            color: rgb(0, 0, 0),
                        })
                        y = y - 15;
                    }
                    y = y - 20;

                    if (petalo.imageBody) {
                        y = y - (lines.length * 14)
                        console.log(y)
                        const imageBody = await fetch(`/images/simbolos/${petalo.imageBody}`);
                        const imageBodyArrayBuffer = await imageBody.arrayBuffer();
                        const imageBodyImage = await pdfDoc.embedPng(imageBodyArrayBuffer);
                        currentPage.drawImage(imageBodyImage, {
                            x: 22,
                            y: y,
                            width: 100,
                            height: 100,
                        });
                        y = y - 100;
                    }
                }
            } else {
                console.log("7")
                if (petalo.title)
                    currentPage.drawText(petalo.title, {
                        x: 22,
                        y: y,
                        size: 12,
                        color: rgb(0, 0, 0),
                    });
                y = y - 20;
            }
            y = y - 20;
        }
    }

    const arrayBufferToBase64 = (buffer) => {
        const chunkSize = 0x8000; // 32768 bytes, un tamaño razonable para dividir en trozos
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.length; i += chunkSize) {
            const chunk = bytes.subarray(i, i + chunkSize);
            binary += String.fromCharCode.apply(null, chunk);
        }
        return btoa(binary);
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'documento.pdf';
    link.click();

    /*
    const pdfBase64 = arrayBufferToBase64(pdfBytes);


    fetch('/.netlify/functions/sendWhatsapp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdf: pdfBase64 }),
    })
        .then(response => {
            response.json().then(response => {
                const templateParams = {
                    'to_name': localStorage.getItem("paciente"),
                    'message': response.url,
                    'to_email': localStorage.getItem("email")
                }
                emailjs.send('service_u9dlni4', 'template_q0rb42f', templateParams, "GDJnvGlc9y4o6oeeR").then(
                    (response) => {
                        console.log('Enviado Correctamente!', response.status, response.text);
                    },
                    (error) => {
                        console.log('FAILED...', error);
                    },
                );
            });
        })
        .catch(error => console.error('Error:', error));
*/
};


const wrapText = (text, width, font, fontSize) => {
    const words = text.split(' ');
    let line = '';
    let result = '';

    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';

        // Validar que testLine no sea null ni undefined
        if (!testLine) {
            testLine = '';
        }

        let testWidth;
        try {
            // Validar que testLine sea un string y tenga contenido
            if (typeof testLine === 'string' && testLine.length > 0) {
                testWidth = font.widthOfTextAtSize(testLine, fontSize);
            } else {
                testWidth = 0;
            }
        } catch (error) {
            console.error(`Error calculating width of text: "${testLine}". Error:`, error);
            testWidth = width + 1; // Forzar un salto de línea en caso de error
        }

        if (testWidth > width) {
            result += line.trim() + '\n'; // Asegura que no haya espacios al final de la línea
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }

    result += line.trim(); // Asegura que no haya espacios al final de la última línea
    return result;
}

async function loadPDF() {
    const response = await fetch('/plantilla.pdf');
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
}

const getPetaloWithLink = (petalos, linkName) => {
    let petalo = null;
    petalos.forEach(p => {
        if (p.linkName === linkName) {
            petalo = p;
        } else if (p.subPetalos) {
            const subPetalo = getPetaloWithLink(p.subPetalos, linkName);
            if (subPetalo) {
                petalo = subPetalo;
            }
        }
    });
    return petalo;
};
const getListOfPetalos = () => {
    const petalosArray = [];
    const history = localStorage.getItem("history");
    if (history) {
        let historyArray = JSON.parse(history);
        historyArray = ordenarPetalo(historyArray.map(item => item.replace("/circulo-base/", "")));
        console.log(historyArray)
        historyArray.forEach((link) => {
            let p;
            if (link === "ramificar") p = {title: "RAMIFICAR"};
            else {
                p = getPetaloWithLink(petalos, link);

                if (!p) {
                    const splitted = link.split(", ");
                    p = getPetaloWithLink(petalos, splitted[0]);
                    if (splitted.length > 1)
                        p.text = splitted[1];

                }
            }

            if (p) petalosArray.push(p);
        });
    }
    return petalosArray;
}


const ordenarPetalo = (historyArray) => {

    const petalos = {
        1: ["petalo-1"],
        2: ["petalo-2"],
        3: ["petalo-3"],
        4: ["petalo-4"],
        5: ["petalo-5"],
        6: ["petalo-6"],
        7: ["petalo-7"]
    }


    let lastPetalo = 0;

    let ramificando = false;

    historyArray.forEach(link => {
        if ((link === "/petalo-1") || (link === "/petalo-2") || (link === "/petalo-3") || (link === "/petalo-4") || (link === "/petalo-5") || (link === "/petalo-6") || link === ("/petalo-7"))
            return;

        if (link === "ramificar") {
            petalos[lastPetalo].push("ramificar")
            ramificando = !ramificando
            return;
        }

        const match = link.match(/petalo-(\d+)/);

        const number = match ? parseInt(match[1], 10) : null;


        if (ramificando)
            petalos[lastPetalo].push(link)
        else {
            petalos[number].push(link)
            lastPetalo = number;
        }
    })

    const historyArrayOrden = []

    for (let i = 1; i < 8; i++) {
        if (petalos[i].length === 1)
            continue

        petalos[i].forEach(link => {
            historyArrayOrden.push(link)
        })
    }

    return historyArrayOrden;
}
export default createAndSendPDF;