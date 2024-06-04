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
        if (y <= 30) {
            currentPage = pdfDoc.addPage([595, 842]);
            y = 780;
        }

        //RAMIFICAR
        if (petalo.title === "RAMIFICAROPEN" || petalo.title === "RAMIFICARCLOSE") {
            currentPage.drawLine({
                start: {x: 22, y: y},
                end: {x: 570, y: y},
                thickness: 1,
                color: rgb(0, 0, 0),
            });

            y = y-20;

            if (y < 30) {
                currentPage = pdfDoc.addPage([595, 842]);
                y = 780;
            }

            let texto = petalo.title === "RAMIFICAROPEN" ? "Aqui se profundizo para sanar entre estas lineas el punto seleccionado" : "Hasta aqui se generaron los cambios necesarios del punto profundizado"

            currentPage.drawText(texto, {
                x: 22,
                y: y,
                size: 12,
                color: rgb(1, 0, 0),
            });
            y = y - 40
        }
        //FUENTES
        else if (petalo.title.toLowerCase().includes("fuente")) {
            console.log("1")
            currentPage.drawText(petalo.title, {
                x: 22,
                y: y,
                size: 22,
                color: getColorOfFont(petalo.linkName),
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
                    if (y <= 30) {
                        currentPage = pdfDoc.addPage([595, 842]);
                        y = 780;
                    }
                }
                y = y - 30;
            }
        } else {
            //PETALO FINAL
            if (petalo.text) {
                if (petalo.fieldText) {
                    console.log("4");

                    if (petalo.useDesc) {
                        const wrappedText = petalo.title + ": " + wrapText(petalo.text, maxWidth, font, 12);

                        for (const line of wrappedText.split('\n')) {
                            currentPage.drawText(line, {
                                x: 22,
                                y: y,
                                size: 12,
                                color: rgb(0, 0, 0),

                            })
                            y = y - 15;
                            if (y <= 30) {
                                currentPage = pdfDoc.addPage([595, 842]);
                                y = 780;
                            }
                        }

                        y = y - 10;

                        if (y <= 30) {
                            currentPage = pdfDoc.addPage([595, 842]);
                            y = 780;
                        }

                        if (petalo.textField !== undefined) {
                            const splitted = petalo.textField.split(", ");
                            for (const text of splitted) {
                                currentPage.drawText("- " + text, {
                                    x: 22,
                                    y: y,
                                    size: 12,
                                    color: rgb(0, 0, 0),
                                });
                                y = y - 15;
                                if (y <= 30) {
                                    currentPage = pdfDoc.addPage([595, 842]);
                                    y = 780;
                                }
                            }
                        }

                    }
                    else {
                        currentPage.drawText((petalo.useText ? petalo.title + ": " : "- ") + petalo.textField, {
                            x: 22,
                            y: y,
                            size: 12,
                            color: rgb(0, 0, 0),
                        });
                    }
                    y = y - 10;
                } else {
                    const text = (petalo.title.length > 4 ? petalo.title.toUpperCase() + ": " : "") + petalo.text;
                    const wrappedText = wrapText(text, maxWidth, font, 12);
                    const lines = wrappedText.split("\n");

                    for (const line of lines) {
                        currentPage.drawText(line, {
                            x: 22,
                            y: y,
                            size: 12,
                            color: rgb(0, 0, 0),
                        })
                        y = y - 15;
                        if (y <= 30) {
                            currentPage = pdfDoc.addPage([595, 842]);
                            y = 780;
                        }
                    }
                    y = y - 20;

                    if (petalo.imageBody) {
                        y = y - (lines.length * 14)

                        if (y <= 30) {
                            currentPage = pdfDoc.addPage([595, 842]);
                            y = 780;
                        }

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


const getColorOfFont = (link) => {
    const match = link.match(/petalo-(\d+)/);

    const number = parseInt(match[1]);
    switch (number) {
        case 1:
            return rgb(1, 0, 0);
        case 2:
            return rgb(1, 0.286, 0);
        case 3:
            return rgb(1, 0.925, 0);
        case 4:
            return rgb(0, 1, 0);
        case 5:
            return rgb(0, 0.865, 1);
        case 6:
            return rgb(0, 0, 1);
        default:
            return rgb(0.865, 0, 1);
    }
}

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
        historyArray.forEach((link, index) => {
            let p;
            if (link === "ramificar") {
                let ramificar = 0;
                for (let x = 0; x <= index; x++)
                    if (historyArray[x] === "ramificar")
                        ramificar++;

                p = {title: ramificar % 2 ? "RAMIFICAROPEN" : "RAMIFICARCLOSE"};
            }
            else {
                p = getPetaloWithLink(petalos, link);

                if (!p) {
                    const splitted = link.split(", ");
                    p = getPetaloWithLink(petalos, splitted[0]);
                    if (!p)
                        return;

                    if (splitted.length > 1) {
                        if (!p.textField) {
                            p.textField = splitted[1];
                        } else {
                            p.textField += `, ${splitted[1]}`;
                            return;
                        }
                    }

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

        console.log("ORDENADO: " + OrdenarFuente(petalos[i]))
        OrdenarFuente(petalos[i]).forEach(link => {
            historyArrayOrden.push(link)
        })
    }

    return historyArrayOrden;
}

const OrdenarFuente = (links) => {

    const linksWithOutRami = []
    const ramificaciones = []

    let antLink;
    let ramificando = false;
    let ramificandoPetalos = [];

    links.forEach(link => {
          if (link === "ramificar") {
              ramificandoPetalos.push(link)
              if (ramificando) {
                  const uniqueArrayRami = Array.from(new Set(ramificandoPetalos));
                  uniqueArrayRami.sort(sortArray);

                  ramificaciones.push({
                      antLink: antLink,
                      ramificandoPetalos: uniqueArrayRami
                  })

                  ramificandoPetalos = [];
              }
              ramificando = !ramificando
          } else if (!ramificando) {
              antLink = link;
              linksWithOutRami.push(link)
          } else if (ramificando) {
              ramificandoPetalos.push(link)
          }
    })

    linksWithOutRami.sort(sortArray);

    return putRamificaciones(ramificaciones, Array.from(new Set(linksWithOutRami)))
}

const sortArray = (a, b) => {
    const parsePath = (str) => {
        return str.split('/').map(part => {
            if (part.startsWith('petalo-')) {
                return part.split('-')[1];
            }
            return part;
        }).map(Number);
    };

    const pathA = parsePath(a);
    const pathB = parsePath(b);

    for (let i = 0; i < Math.max(pathA.length, pathB.length); i++) {
        const partA = pathA[i] !== undefined ? pathA[i] : -Infinity;
        const partB = pathB[i] !== undefined ? pathB[i] : -Infinity;

        if (partA !== partB) {
            return partA - partB;
        }
    }
    return 0;
};

const putRamificaciones = (ramificaciones, arrayWithOutRami) => {
    let newArray = [];
    arrayWithOutRami.forEach(link => {
        newArray.push(link)
        ramificaciones.forEach(rami => {
            if (rami.antLink === link)
                rami.ramificandoPetalos.forEach(ramiP => newArray.push(ramiP))
        })
    })
    return newArray;
}

export default createAndSendPDF;