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

    let now = new Date();

    let options = {
        timeZone: 'America/Argentina/Buenos_Aires',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    let formattedDate = new Intl.DateTimeFormat('es-AR', options).format(now);

    page.drawText(formattedDate, {
        x: 150,
        y: 622,
        size: 15,
        color: rgb(0, 0, 0),
        font: font,
    });

    page.drawText(localStorage.getItem("paciente"), {
        x: 122,
        y: 589,
        size: 15,
        color: rgb(0, 0, 0),
        font: font,
    });

    let yProblems = 542;

    for (const problem of problems) {
        page.drawText("- " + problem, {
            x: 30,
            y: yProblems,
            size: 14,
            color: rgb(0, 0, 0),
        });
        yProblems = yProblems - 18;
    }

    let y = 780;
    let currentPage = pdfDoc.addPage([595, 842]);

    const petalosCopy = JSON.parse(JSON.stringify(petalos));

    const {petalosArray, ramifiArray} = getListOfPetalos();

    console.log(petalosArray);
    console.log(ramifiArray);
    for (const petalo of petalosArray) {
        console.log(petalo)
        if (y <= 30) {
            currentPage = pdfDoc.addPage([595, 842]);
            y = 780;
        }
        //FUENTES
        if (petalo.title.toLowerCase().includes("fuente") && (petalo.linkName === 'petalo-1' || petalo.linkName === 'petalo-2' || petalo.linkName === 'petalo-3' || petalo.linkName === 'petalo-4' || petalo.linkName === 'petalo-5' || petalo.linkName === 'petalo-6' || petalo.linkName === 'petalo-7')) {

            if (y !== 780) {
                currentPage = pdfDoc.addPage([595, 842]);
                y = 780;
            }

            console.log("1")
            currentPage.drawText(petalo.title, {
                x: 22,
                y: y,
                size: 22,
                color: getColorOfFont(petalo.linkName),
            });
            y = y - 35;
        } else {
            const result = await textPetalo(petalo, currentPage, y, pdfDoc, maxWidth, font);
            y = result.y;
            currentPage = result.currentPage
        }
    }

    if (y !== 780) {
        currentPage = pdfDoc.addPage([595, 842]);
        y = 780;
    }

    currentPage.drawText("Ramificaciones", {
        x: 22,
        y: y,
        size: 16,
        color: rgb(0.865, 0, 1),
    });

    y = y-20

    const subTitleRami = "Aquí se verán reflejados los puntos trabajados y profundizados para lograr desbloquear la corrección seleccionada";
    wrapText(subTitleRami, maxWidth, font, 12).split('\n').forEach(line => {
        currentPage.drawText(line, {
            x: 22,
            y: y,
            size: 12,
            color: rgb(0.865, 0, 1),
        });
        y = y - 15;
    });

    y = y-30

    for (const petalo of ramifiArray) {
        if (y <= 30) {
            currentPage = pdfDoc.addPage([595, 842]);
            y = 780;
        }

        if (petalo.title === "RAMIFICAROPEN" || petalo.title === "RAMIFICARCLOSE") {
            let texto = petalo.title === "RAMIFICAROPEN" ? "Aqui se profundizo el siguiente punto" : "Hasta aquí se profundizo el punto seleccionado"

            currentPage.drawText(texto, {
                x: 22,
                y: y,
                size: 14,
                color: rgb(1, 0, 0),
            });
            y = y - 40

        }
        else {
            const result = await textPetalo(petalo, currentPage, y, pdfDoc, maxWidth, font);
            y = result.y;
            currentPage = result.currentPage
        }
    }
    /*const arrayBufferToBase64 = (buffer) => {
        const chunkSize = 0x8000; // 32768 bytes, un tamaño razonable para dividir en trozos
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.length; i += chunkSize) {
            const chunk = bytes.subarray(i, i + chunkSize);
            binary += String.fromCharCode.apply(null, chunk);
        }
        return btoa(binary);
    }*/

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = localStorage.getItem("paciente") + '.pdf';
    link.click();

    petalos = petalosCopy;

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


const textPetalo = async (petalo, currentPage, y, pdfDoc, maxWidth, font) => {
    if (petalo.subPetalos) {

        if (petalo.title.length > 2) {
            console.log("2")
            if (petalo.title === 'Emociones')
                petalo.title = 'EMOCIONES (se anularon las siguientes emociones)'

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
                const splittedTextField = petalo.textField ? petalo.textField.split(":") : [];
                console.log("4");
                if (petalo.useDesc) {
                    const text = petalo.title + ": " + petalo.text;
                    const wrappedText = wrapText(text, maxWidth, font, 12);
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
                }

                if (splittedTextField.length > 1) {
                    if (y <= 30) {
                        currentPage = pdfDoc.addPage([595, 842]);
                        y = 780;
                    }

                    const splittedTextField = petalo.textField.split(":");
                    let first = true;
                    splittedTextField.forEach((text) => {
                        if (!first)
                            y = y - 30
                        else first = false;

                        currentPage.drawText("- " + text, {
                            x: 22,
                            y: y,
                            size: 12,
                            color: rgb(0, 0, 0),
                        });

                        if (y <= 30) {
                            currentPage = pdfDoc.addPage([595, 842]);
                            y = 780;
                        }
                    });
                } else {
                    currentPage.drawText((petalo.useText && !petalo.useDesc ? petalo.title + ": " : "- ") + petalo.textField, {
                        x: 22,
                        y: y,
                        size: 12,
                        color: rgb(0, 0, 0),
                    });
                }
                y = y - 10;
            } else {
                let titleWithoutSpaces = petalo.title.replace(/\s+/g, "");
                console.log(petalo.title + " " + titleWithoutSpaces.length)
                const text = (titleWithoutSpaces.length >= 4 ? petalo.title.toUpperCase() + ": " : "") + petalo.text;
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

    return { y, currentPage };
}

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
    const ramifiArray = [];

    const history = localStorage.getItem("history");
    if (history) {
        let historyArray = JSON.parse(history);
        console.log(historyArray)
        historyArray = ordenarPetalo(historyArray.map(item => item.replace("/circulo-base/", "")));
        console.log(historyArray)
        let ramificando = false;
        historyArray.forEach((link, index) => {
            let p;
            if (link === "ramificar") {
                ramificando = !ramificando;

                p = {title: ramificando ? "RAMIFICAROPEN" : "RAMIFICARCLOSE"};
                ramifiArray.push(p);
                return;
            }
            else {
                p = getPetaloWithLink(petalos, link);

                if (!p || p.fieldText) {
                    const splitted = link.split(":");

                    p = getPetaloWithLink(petalos, splitted ? splitted[0] : link);
                    if (!p)
                        return;

                    if (splitted.length > 1) {
                        if (p.separate) {
                            const newPetalo = { ...p };
                            newPetalo.textField = splitted[1];
                            if (ramificando)
                                ramifiArray.push(newPetalo)
                            else
                                petalosArray.push(newPetalo);
                            return;
                        }
                        else if (p.textField === undefined) {
                            p.textField = splitted[1];
                            console.log("ES SIN " + p.textField);
                        } else {
                            p.textField += `:${splitted[1]}`;
                            console.log("ES CON " + p.textField);
                            return;
                        }
                    } else if (petalosArray.find(p => p.linkName === link) || (ramificando && ramifiArray.find(p => p.linkName === link)))
                        return;


                }
            }

            if (p) {
                if (ramificando)
                    ramifiArray.push(p)
                else
                    petalosArray.push(p);
            }
        });
    }
    return { petalosArray, ramifiArray};
}


const ordenarPetalo = (historyArray) => {
    console.log(historyArray)
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

    console.log(petalos)
    const historyArrayOrden = []

    for (let i = 1; i < 8; i++) {
        if (petalos[i].length === 1)
            continue

        if (i === 5) {
            console.log("ORDENADO VIDAS: " + OrdenarFuenteByVidas(petalos[i]))

            OrdenarFuenteByVidas(petalos[i]).forEach(link => {
                historyArrayOrden.push(link)
            })
        }
        else {
            console.log("SIN ORDENAR " + petalos[i])
            console.log("ORDENADO: " + OrdenarFuente(petalos[i]))
            OrdenarFuente(petalos[i]).forEach(link => {
                historyArrayOrden.push(link)
            })
        }
    }

    return historyArrayOrden;
}

const OrdenarFuenteByVidas = (links) => {

    const linksWithOutVidas = []
    const vidasPasadas = []

    let startLink;
    let vidasp = false;
    let vidasPasadasPetalos = [];

    let x = 0;
    links.forEach(link => {
        x++;
        if (link.includes("petalo-5/7/1:")) {
            if (vidasp) {
                console.log("VIDA PASADA FINALIZADA", vidasPasadasPetalos);
                vidasPasadas.push({
                    startLink: startLink,
                    vidasPasadasPetalos: vidasPasadasPetalos
                })
                vidasPasadasPetalos = []
            }

            vidasp = true;
            startLink = link;
            linksWithOutVidas.push(link)
            return;
        } else if ((!link.includes("petalo-5/7") && vidasp) || (x === links.length)) {
            console.log("VIDA PASADA FINALIZADA", vidasPasadasPetalos);
            vidasp = false;
            vidasPasadas.push({
                startLink: startLink,
                vidasPasadasPetalos: vidasPasadasPetalos
            })
            vidasPasadasPetalos = []
        }

        if (!vidasp) {
            linksWithOutVidas.push(link)
        }
        else {
            if (link !== "petalo-5/7")
                vidasPasadasPetalos.push(link)
        }
    })

    const fuenteOrdenada = OrdenarFuente(linksWithOutVidas);
    return vidasPasadas.length > 1 ? putVidasPasadas(vidasPasadas, fuenteOrdenada) : fuenteOrdenada;
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
                  uniqueArrayRami.push("ramificar")

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
        const parts = str.split(':');
        const numericPath = parts[0].split('/').map(part => {
            if (part.startsWith('petalo-')) {
                return part.split('-')[1];
            }
            return part;
        }).map(Number);
        const label = parts[1] ? parts[1] : "";
        return { numericPath, label };
    };

    const pathA = parsePath(a);
    const pathB = parsePath(b);

    // First compare the numeric paths
    for (let i = 0; i < Math.max(pathA.numericPath.length, pathB.numericPath.length); i++) {
        const partA = pathA.numericPath[i] !== undefined ? pathA.numericPath[i] : -Infinity;
        const partB = pathB.numericPath[i] !== undefined ? pathB.numericPath[i] : -Infinity;

        if (partA !== partB) {
            return partA - partB;
        }
    }

    // If numeric paths are the same, compare the labels if they exist
    if (pathA.label !== pathB.label) {
        return pathA.label.localeCompare(pathB.label);
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

const putVidasPasadas = (vidasPasadas, arrayWithOutVidas) => {
    let newArray = [];
    arrayWithOutVidas.forEach(link => {
        newArray.push(link)
        console.log("EN EL LINK " + link + " HAY " + vidasPasadas.length)
        vidasPasadas.forEach(vida => {
            console.log("EN EL LINK " + link + " COMPARANDO CON " + vida.startLink)
            if (vida.startLink === link) {
                console.log("ENCONTRO LA VIDA ORDENANDO")
                vida.vidasPasadasPetalos.forEach(vidaP => newArray.push(vidaP))
            }
        })
    })
    return newArray;
}

export default createAndSendPDF;