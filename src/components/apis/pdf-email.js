import 'firebase/auth';
import {petalos} from "../../../static/data";
import {PDFDocument, rgb} from 'pdf-lib';

const createAndSendPDF = async () => {
    /*const templateParams = {
        'username': 'James',
        'message': getListOfPetalos(),
        'to_email': localStorage.getItem("email"),
    }
    emailjs.send('service_u9dlni4', 'template_q0rb42f', templateParams,"GDJnvGlc9y4o6oeeR").then(
        (response) => {
            console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
            console.log('FAILED...', error);
        },
    );*/

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
        if (y <= 10) {
            currentPage = pdfDoc.addPage([595, 842]);
            y = 780;
        }

        //RAMIFICAR
        if (petalo.title === "RAMIFICAR") {
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
                if (petalo.separation) {
                    currentPage.drawText("- " + petalo.text, {
                        x: 22,
                        y: y,
                        size: 12,
                        color: rgb(0, 0, 0),
                    });
                    y = y - 10;
                } else {
                    const text = petalo.title.toUpperCase() + ": " + petalo.text;
                    const wrappedText = wrapText(text, maxWidth, font, 12);
                    for (const line of wrappedText.split('\n')) {
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
                        const imageBody = await fetch(`/images/simbolos/${petalo.imageBody}`);
                        const imageBodyArrayBuffer = await imageBody.arrayBuffer();
                        const imageBodyImage = await pdfDoc.embedPng(imageBodyArrayBuffer);
                        currentPage.drawImage(imageBodyImage, {
                            x: 22,
                            y: y,
                            width: 100,
                            height: 100,
                        });
                        y = y - 120;
                    }
                }
            } else {
                if (petalo.title)
                    currentPage.drawText(petalo.text, {
                        x: 22,
                        y: y,
                        size: 12,
                        color: rgb(0, 0, 0),
                    });
            }
            y = y - 20;
        }
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));

    fetch('/.netlify/functions/sendWhatsapp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdf: pdfBase64 }),
    })
        .then(response => {
            response.json().then(errorData => {
                console.error('Error:', errorData.message, errorData.error);
            });        })
        .catch(error => console.error('Error:', error));

};


const wrapText = (text, width, font, fontSize) => {
    const words = text.split(' ');
    let line = '';
    let result = '';
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
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
        historyArray = historyArray.map(item => item.replace("/circulo-base/", ""));
        historyArray.forEach((link) => {
            let p;
            if (link === "ramificar") p = {title: "RAMIFICAR"};
            else if (link.includes("petalo-2/1")) {
                // EMOCION
                const splitted = link.split(", ");
                p = getPetaloWithLink(petalos, splitted[0]);
                if (splitted.length > 1)
                    p.text = splitted[1];

            }
            else p = getPetaloWithLink(petalos, link);

            if (p) petalosArray.push(p);
        });
    }
    return petalosArray;
}

export default createAndSendPDF;