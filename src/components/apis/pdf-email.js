import 'firebase/auth';
import {petalos} from "../../../static/data";
import {PDFDocument, rgb} from 'pdf-lib';

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
            
            //VIDAS PASADAS DEFAULT TEXT
            if (petalo.title === "BLOQUEO EN LA ACTUALIDAD") {
                const index = petalosArray.indexOf(petalo);
                const lastBloqueoIndex = petalosArray.reduceRight((acc, item, index) => {
                    return item.title === "BLOQUEO EN LA ACTUALIDAD" && acc === -1 ? index : acc;
                }, -1);

                if (index === lastBloqueoIndex) {
                    console.log("PUSO TEXTO")
                    const defaultText = "Mediante la transmutación de Registros Akáshicos liberamos el bloqueo detectado en la actualidad, así de este modo incorporarlo en diferentes ámbitos de nuestra vida";
                    const wrappedDefaultText = wrapText(defaultText, maxWidth, font, 12);
                    const lines = wrappedDefaultText.split("\n");

                    for (const line of lines) {
                        currentPage.drawText(line, {
                            x: 22,
                            y: y,
                            size: 12,
                            color: rgb(0.6, 0, 0.6), // Color violeta más intenso
                        });
                        y = y - 15;
                        if (y <= 30) {
                            currentPage = pdfDoc.addPage([595, 842]);
                            y = 780;
                        }
                    }
                    y = y-20
                    if (y <= 30) {
                        currentPage = pdfDoc.addPage([595, 842]);
                        y = 780;
                    }
                }
            }
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

    for (let i = 0; i < ramifiArray.length; i++) {        
        if (ramifiArray[i].length >= 3) {
            const firstElement = ramifiArray[i].shift(); // Elimina y guarda el primer elemento
            ramifiArray[i].splice(2, 0, firstElement); // Inserta el primer elemento en la posición 2
        }
        
    }
    

    for (const petalo of ramifiArray) {
        if (y <= 30) {
            currentPage = pdfDoc.addPage([595, 842]);
            y = 780;
        }

        if (petalo.title === "RAMIFICAROPEN" || petalo.title === "RAMIFICARCLOSE") {

            if (petalo.title === "RAMIFICAROPEN") {
                const startX = 50;
                const startY = y+15;
                const endX = 50;
                const endY = y-20;

                currentPage.drawLine({
                    start: { x: startX, y: startY },
                    end: { x: endX, y: endY },
                    thickness: 2,
                    color: rgb(0, 0, 0),
                });

                const arrowHeadLength = 10;
                const arrowHeadWidth = 8;

                currentPage.drawLine({
                    start: { x: endX, y: endY },
                    end: { x: endX - arrowHeadWidth, y: endY + arrowHeadLength },
                    thickness: 2,
                    color: rgb(0, 0, 0),
                });

                currentPage.drawLine({
                    start: { x: endX, y: endY },
                    end: { x: endX + arrowHeadWidth, y: endY + arrowHeadLength },
                    thickness: 2,
                    color: rgb(0, 0, 0),
                });

                y = y - 50;

                if (y <= 30) {
                    currentPage = pdfDoc.addPage([595, 842]);
                    y = 780;
                }
            }

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

            if (petalo.title === "BLOQUEO EN LA ACTUALIDAD") {
                const index = petalosArray.indexOf(petalo);
                const lastBloqueoIndex = petalosArray.reduceRight((acc, item, index) => {
                    return item.title === "BLOQUEO EN LA ACTUALIDAD" && acc === -1 ? index : acc;
                }, -1);

                if (index === lastBloqueoIndex) {
                    console.log("PUSO TEXTO")
                    const defaultText = "Mediante la transmutación de Registros Akáshicos liberamos el bloqueo detectado en la actualidad, así de este modo incorporarlo en diferentes ámbitos de nuestra vida";
                    const wrappedDefaultText = wrapText(defaultText, maxWidth, font, 12);
                    const lines = wrappedDefaultText.split("\n");

                    for (const line of lines) {
                        currentPage.drawText(line, {
                            x: 22,
                            y: y,
                            size: 12,
                            color: rgb(0.6, 0, 0.6), // Color violeta más intenso
                        });
                        y = y - 15;
                        if (y <= 30) {
                            currentPage = pdfDoc.addPage([595, 842]);
                            y = 780;
                        }
                    }
                    y = y-20
                    if (y <= 30) {
                        currentPage = pdfDoc.addPage([595, 842]);
                        y = 780;
                    }
                }
            }
        }
    }

    currentPage = pdfDoc.addPage([595, 842]);
    y = 780;
    
    currentPage.drawText("CAMBIO CURATIVO", {
        x: 22,
        y: y,
        size: 16,
        color: rgb(0, 0, 0),
        font: font,
    });
    
    y = y - 30;

    const textoFinal = "DESPUÉS DE REALIZAR LA TERAPIA CUÁNTICA GENESIS, EN ALGUNAS OCASIONES SE PUEDE INICIAR UN PROCESO DE SANACIÓN CONOCIDA COMO ¨¡CAMBIO CURATIVO!¨, DONDE TANTO EL CUERPO COMO LA MENTE Y EL ESPÍRITU SE LIBERAN! AL DESBLOQUEARSE LAS EMOCIONES ATRAPADAS, TAMBIÉN SE LIBERAN TOXINAS Y DESECHOS DEL CUERPO. ESTO HACE QUE ALGUNAS VECES EL DOLOR Y LOS SÍNTOMAS DE AGUDICEN, PERO ESTE PROCESO ES PASAJERO Y NECESARIO PARA LA SANACIÓN DEFINITIVALAS REACCIONES FÍSICAS QUE SE EXPERIMENTAN DURANTE UNA CRISIS CURATIVA PUEDEN INCLUIR ERUPCIONES EN LA PIEL, NÁUSEAS, VÓMITOS, DOLOR DE CABEZA, SOMNOLENCIA, INSOMNIO, FATIGA, ESTREÑIMIENTO, RESFRIADO, ATAQUE DE RISA, LLANTO, SUBIDA DE TEMPERATURA CORPORAL, ETC. UNA CRISIS DE CURACIÓN NORMALMENTE DURA ALREDEDOR DE UNO O TRES DÍAS, PERO SI LA ENERGÍA O VITALIDAD DE LA PERSONA ES BAJA, PUEDE DURAR UN POCO MÁS... EN ESTE MOMENTO EL CUERPO NECESITA MUCHA AGUA Y EN LO POSIBLE DESCANSO LA MAYORÍADE LAS VECES, LA CRISIS CURATIVA ES POCO PERCEPTIBLE Y LA PERSONA CONTINÚA SU VIDA NORMAL. SIEMPRE DESPUÉS DE LA CRISIS CURATIVA VIENE EL PROCESO DE SANACIÓN."

    const wrappedTextoFinal = wrapText(textoFinal, maxWidth, font, 12);
    wrappedTextoFinal.split('\n').forEach(line => {
        currentPage.drawText(line, {
            x: 22,
            y: y,
            size: 12,
            color: rgb(0, 0, 0),
        });
        y -= 15;
        if (y <= 30) {
            currentPage = pdfDoc.addPage([595, 842]);
            y = 780;
        }
    });

    const textoAdicional = "Recorda que somos cocreadores de nuestra realidad y que al hacer consciente toda esta información te re conectas con tu cambio. También ten en cuenta que todo lo trabajado ya no te pertenece";

    const wrappedTextoAdicional = wrapText(textoAdicional, maxWidth, font, 12);
    wrappedTextoAdicional.split('\n').forEach(line => {
        currentPage.drawText(line, {
            x: 22,
            y: y,
            size: 12,
            color: rgb(0.8, 0.6, 1), 
        });
        y -= 15;
        if (y <= 30) {
            currentPage = pdfDoc.addPage([595, 842]);
            y = 780;
        }
    });

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
    } else if (petalo.title === "CORRECCIONOPEN" || petalo.title === "CORRECCIONCLOSE") {
        const text = petalo.title === "CORRECCIONOPEN" ? "DESDE AQUI SE TRABAJO, LA SIGUIENTE INFORMACION DEL LEGADO" : "HASTA AQUI SE TRABAJO, LA INFORMACION DEL LEGADO";
        currentPage.drawText(text, {
            x: 22,
            y: y,
            size: 14,
            color: rgb(0.5, 0, 0.5), // Color violeta
        });
        y -= 20;
    }
    else {
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
                    currentPage.drawText((petalo.useText && !petalo.useDesc ? (petalo.linkName !== "petalo-5/7/1" ? petalo.title : petalo.titlePage) + ": " : "- ") + petalo.textField, {
                        x: 22,
                        y: y,
                        size: (petalo.linkName !== "petalo-5/7/1") ? 12 : 14,
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

                if (petalo.linkName.includes("petalo-5/7") && (petalo.title !== "BLOQUEO EN LA ACTUALIDAD"))
                    y = y-5
                else y = y-20
                

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
    const cleanText = text.replace(/[\u200B-\u200D\uFEFF]/g, '');
    const words = cleanText.split(' ');
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
    let petalosArray = [];
    let ramifiArray = [];
    const history = localStorage.getItem("history");

    console.log("COMENZANDO VER HISTORIAL");

    if (history) {
        const {historyArrayOrden, ramiLinks} = ordenarPetalo(JSON.parse(history).map(item => item.replace("/circulo-base/", "")));

        ordenarRamiLinks(ramiLinks)

        ramiLinks.forEach(rami => {
            const indexRamificar = rami.indexOf("ramificar");
            if (indexRamificar !== -1) {
                const primeros = rami.slice(0, indexRamificar + 1);
                console.log("PRIMEROS " +  primeros);
                const resto = rami.slice(indexRamificar + 1);
                console.log("RESTO " +  resto);

                const restoOrdenado = OrdenarFuenteByVidas(resto);

                rami.splice(0, rami.length, ...primeros, ...restoOrdenado);
            }
        });

        console.log(ramiLinks)
        // Los convierte a cada link en objeto petalo.
        let correcciones = 0;
        const getObjectOfLink = (link) => { 
            let p;
            if (link === "correccion") {
                // Verificar si la corrección abre o cierra
                    p = {title: ((correcciones%2) === 0) ? "CORRECCIONOPEN" : "CORRECCIONCLOSE"}
                
                    correcciones++;
                } else {
                    p = getPetaloWithLink(petalos, link);
                    
                    //SI NO ENCUENTRA EL PETALO (PORQUE EL LINK TIENE TEXTFIELD)
                    if (!p || p.fieldText) {
                        const splitted = link.split(":");
                        p = getPetaloWithLink(petalos, splitted[0] || link);
                        
                        if (!p) return;
                        
                        if (splitted.length > 1) {
                            if (p.separate) {
                                p = { ...p, textField: splitted[1] };
                            } else {
                                p.textField = p.textField ? `${p.textField}:${splitted[1]}` : splitted[1];
                            }
                        }
                    }
                    
                }
                return {...p}
        }

        //CONSIGUE EL OBJETO PETALO DE CADA LINK DE CADA PETALO.
        historyArrayOrden.forEach((link) => {
            console.log("LINK ", link);
            
            
            const p = getObjectOfLink(link)
            if (p) {
                if (petalosArray.find(item => item.linkName === p.linkName) && p.textField && !isStringInCorrecciones(historyArrayOrden,link)) 
                    petalosArray = petalosArray.filter(item => item.linkName !== p.linkName);

                if (!p.linkName || (!petalosArray.find(item => item.linkName === p.linkName)) || p.linkName.includes("petalo-5/7") || isStringInCorrecciones(historyArrayOrden,link))
                    petalosArray.push(p);
            }

        });


        //CONSIGUE EL OBJETO PETALO DE CADA LINK DE CADA RAMIFICACION

        const clearTextFields = (petalo) => {
            if (petalo.textField) {
                console.log("ENCONTRO PETALO CON TEXTFIELD Y LO SACO")
                petalo.textField = '';
            }
            if (petalo.subPetalos) 
                petalo.subPetalos.forEach(clearTextFields);
        };

        petalos.forEach(petalo => clearTextFields(petalo));

        
        let x = 0;
        let ramificando = false;
        console.log(ramiLinks)
        ramiLinks.forEach((rami) => {
            rami.forEach((link) => {
                let p;
                if (link === "ramificar") {
                    p = {title: ramificando ? "RAMIFICARCLOSE" : "RAMIFICAROPEN"}
                    ramificando = !ramificando
                }else 
                    p = getObjectOfLink(link)
                     
                if (p) {
                    if (ramiLinks[x].find(item => item.linkName === p.linkName) && p.textField && !isStringInCorrecciones(ramiLinks,link)) 
                        petalosArray = petalosArray.filter(item => item.linkName !== p.linkName);
    
                    if (!p.linkName || (!ramiLinks[x].find(item => item.linkName === p.linkName)) || p.linkName.includes("petalo-5/7") || isStringInCorrecciones(ramiLinks,link))
                        petalosArray.push(p);
                }
                
            })
            x++;
        })
    }

    console.log("HISTORIAL", petalosArray);
    console.log("RAMIFICACIONES", ramifiArray);
    return { petalosArray, ramifiArray };
}

const ordenarPetalo = (historyArray) => {

    //PRIMER PASO DE LA CADENA. RECORRE TODO EL HISTORIAL Y SEPARA EN DISTINTOS PETALOS, ADEMAS DE EN RAMIFICACIONES
    //LUEGO LLAMA AL METODO PARA ORDENAR CADA PETALO (EN CASO DE FUENTE 5 HACE UNA EXEPCION PARA VIDAS PASADAS)

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

    let ramificacion = []
    const ramiLinks = []

    let lastPetalo = 1; //ES PARA IDENTIFICAR EN QUE ARRAY PONERLO (DEPENDE EL NUMERO DEL PETALO)
    
    let ramificando = false;

    let correccion = false;

    historyArray.forEach(link => {
        if ((link === "/petalo-1") || (link === "/petalo-2") || (link === "/petalo-3") || (link === "/petalo-4") || (link === "/petalo-5") || (link === "/petalo-6") || link === ("/petalo-7"))
            return;

        if (link === "ramificar") {
            ramificacion.push(link);

            if (ramificando) {
                ramiLinks.push([...ramificacion])
                ramificacion = []
            }

            ramificando = !ramificando
            return;
        } else if (link === "correccion") {
            if (ramificando)
                ramificacion.push(link)
            else 
                petalos[lastPetalo].push("correccion")
            correccion = !correccion;
            return;
        }
        else if (ramificando) {
            ramificacion.push(link)
            return;
        }

        const match = link.match(/petalo-(\d+)/);

        const number = match ? parseInt(match[1], 10) : null;

        if (correccion) {
            if (ramificando)
                ramificacion.push(link)
            else 
                petalos[lastPetalo].push(link)
        } else {
            petalos[number].push(link)
            lastPetalo = number;
        }
    })

    console.log(petalos)
    console.log(ramiLinks)

    const historyArrayOrden = []

    
    //RECORRE TODOS LOS PETALOS Y LOS ORDENA UNO POR UNO.
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
    
    return {historyArrayOrden,ramiLinks};
}

const ordenarRamiLinks = (ramiLinks) => {
    ramiLinks.forEach(ramificacion => {

        console.log(ramificacion)
        const toCheck = ramificacion[2];
        const petaloToCheck = getPetaloWithLink(petalos, toCheck.split(":")[0]);

        ramificacion.splice(0, 1);

        if (petaloToCheck.title.length === 1) 
            ramificacion.splice(3, 0, "ramificar");
        else 
            ramificacion.splice(2, 0, "ramificar");

    });
}

const OrdenarFuenteByVidas = (links, sort) => {

    //ORDENA LOS PETALOS Y LAS VIDAS PASADAS
    const linksWithOutVidas = []
    const vidasPasadas = []

    let startLink;
    let vidasp = false;
    let vidasPasadasPetalos = [];

    let x = 0;
    links.forEach(link => {
        x++;
        if (link.includes("petalo-5/7/1:")) {
            //APERTURA Y CIERRE DE LAS VIDAS PASADAS
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
            //CIERRE EN CASO DE NO IR AL INICIO.
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

    const fuenteOrdenada = OrdenarFuente(linksWithOutVidas); //UTILIZA EL ORDENAR FUENTE COMO LAS DEMAS Y LUEGO LES AGREGA LAS VIDAS PASADAS
    return vidasPasadas.length > 1 ? putVidasPasadas(vidasPasadas, fuenteOrdenada) : fuenteOrdenada;
}

const OrdenarFuente = (links) => {
    const linksWithOutCorreciones = [];
    let antLink;

    const correcciones = [];
    let correccion = false;
    let correccionPetalos = [];

    links.forEach(link => {
        if (link === "correccion") {
            if (correccion) {
                correcciones.push({
                    antLink: antLink,
                    correccionPetalos: correccionPetalos
                })
                correccionPetalos = []
            }
            else 
                antLink = linksWithOutCorreciones[linksWithOutCorreciones.length - 1];
            
            correccion = !correccion;
        } else if (correccion) {
            correccionPetalos.push(link);
        } else linksWithOutCorreciones.push(link);
    });

    linksWithOutCorreciones.sort(sortArray);

    const uniqueCorrecciones = []

    correcciones.forEach(({ antLink, correccionPetalos }) => {
        uniqueCorrecciones.push({
            antLink,
            correccionPetalos: new Set(correccionPetalos)
        });
    });

    return putCorrecciones(uniqueCorrecciones, Array.from(new Set(linksWithOutCorreciones)))
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

const putCorrecciones = (correcciones, arrayWithOutCorrecciones) => {
    let newArray = [];
    arrayWithOutCorrecciones.forEach(link => {
        newArray.push(link);
        correcciones.forEach(correccion => {
            if (correccion.antLink === link) {
                newArray.push("correccion", ...correccion.correccionPetalos, "correccion");
            }
        });
    });
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

const isStringInCorrecciones = (array, targetString) => {
    let inCorreccion = false;
    let foundTarget = false;

    for (const item of array) {
        if (item === "correccion") {
            if (inCorreccion) {
                // Si ya está en corrección y encontramos otra, salimos
                inCorreccion = false; // Cambiamos el estado al salir de la corrección
            } else {
                inCorreccion = true; // Entramos en una nueva corrección
                foundTarget = false; // Reiniciamos la búsqueda al entrar en una nueva corrección
            }
        } else if (inCorreccion) {
            if (item === targetString) {
                if (foundTarget) {
                    return false; // El string ya fue encontrado en esta corrección
                }
                foundTarget = true; // Marcamos que encontramos el string
            }
        }
    }

    return foundTarget; // Retorna true si el string fue encontrado en la corrección
};

export default createAndSendPDF;