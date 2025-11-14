import 'firebase/auth';
import { petalos } from "../../../static/data";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const createAndSendPDF = async () => {
    const existingPdfBytes = await loadPDF();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const page = pdfDoc.getPage(0);
    const problems = (localStorage.getItem("problems") || "").split(",").filter(Boolean)
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
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
    const { petalosArray, ramifiArray } = getListOfPetalos();

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
            const result = await textPetalo(petalo, currentPage, y, pdfDoc, maxWidth, font, fontBold);
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
                    y = y - 20
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

    y = y - 20

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

    y = y - 30

   


    for (const petalo of ramifiArray) {
        if (y <= 30) {
            currentPage = pdfDoc.addPage([595, 842]);
            y = 780;
        }

        if (petalo.title === "RAMIFICAROPEN" || petalo.title === "RAMIFICARCLOSE") {

            if (petalo.title === "RAMIFICAROPEN") {
                const startX = 50;
                const startY = y + 15;
                const endX = 50;
                const endY = y - 20;

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
            const result = await textPetalo(petalo, currentPage, y, pdfDoc, maxWidth, font,fontBold);
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
                    y = y - 20
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


const textPetalo = async (petalo, currentPage, y, pdfDoc, maxWidth, font, fontBold) => {
    if (petalo.subPetalos && petalo.subPetalos.length > 0) {
        if (petalo.title.length > 2) {
            const renderTitle = (petalo.title === 'Emociones')
            ? 'EMOCIONES (se anularon las siguientes emociones)'
            : petalo.title;
            const estilo = getEstiloForTextField(renderTitle, font, fontBold, 16);
            currentPage.drawText(renderTitle, {x: 22, y, size: estilo.size, color: estilo.color, font: estilo.font});
            y -= 18; // gap tras título de subPetalos
        }

        if (petalo.text) {
            const wrappedText = wrapText(petalo.text, maxWidth, font, 12);
            for (const line of wrappedText.split('\n')) {
                const estilo = getEstiloForTextField(line, font, fontBold, 12);
                currentPage.drawText(line, { x: 22, y, size: estilo.size, color: estilo.color, font: estilo.font });
                y -= 15;// interlineado normal
                if (y <= 30) { currentPage = pdfDoc.addPage([595, 842]); y = 780; }
            }
            y -= 12; // 👈 antes era 30: espacio entre párrafos en subPetalos
        }
    } else if (petalo.title === "CORRECCIONOPEN" || petalo.title === "CORRECCIONCLOSE") {
        // 🔹 Corrección con fuente 3
        const text = petalo.title === "CORRECCIONOPEN"
            ? "DESDE AQUI SE TRABAJO, LA SIGUIENTE INFORMACION DEL LEGADO"
            : "HASTA AQUI SE TRABAJO, LA INFORMACION DEL LEGADO";
        const estilo = getEstiloForTextField(text, font, fontBold, 14);
        currentPage.drawText(text, { x: 22, y, size: estilo.size, color: rgb(0.6, 0, 0.6), font: estilo.font });

        y -= (petalo.title === "CORRECCIONCLOSE") ? 22 : 45;

        if (petalo.title === "CORRECCIONCLOSE") {
            if (y <= 30) { currentPage = pdfDoc.addPage([595, 842]); y = 780; }
            currentPage.drawLine({
                start: { x: 22, y },
                end: { x: currentPage.getSize().width - 22, y },
                thickness: 0.5,
                color: rgb(0, 0, 0)
            });
            y -= 30;
        }
    } else {
        // PETALO FINAL
        
        //Texto Princiapal
        if (petalo.text) {
            
            // 🚨 Nuevo control: si hay fieldText y NO es legado, no imprimo petalo.text
            if (petalo.noText && !petalo.isLegado) {
                // no escribo nada del text normal
            }else if(petalo.onlyTitleP || petalo.onlyT ){
                // 🔹 Imprime SOLO títuloPage - title    ¡¡Especialmente en VIDAS PASADAS!!
                y-= 16;
                
                //Va let porque es una variable no una constante
                let titleText = '';
               
                // Asigno a la variable titlePage - title
                if(petalo.onlyTitleP){
                    titleText = `${petalo.titlePage}:`;
                }else{
                    titleText = `${petalo.title}:`;
                }
                
                // 🔸 Dibuja el título en bold (12)
                currentPage.drawText(titleText, {
                    x: 22,
                    y,
                    size: 12,
                    color: rgb(0, 0, 0),
                    font: fontBold
                });

                y -= 10;// gap entre título y párrafo
            }
            else if (petalo.isLegado || petalo.onlyText) {
                // 🔹 Solo para  escibir en el pdf el texto del petalo, y no seguir el formato titulo:texto (Ejemplo legado : SANANDO, REPARANDO , REVIVIENDO)
                
                y-= 12;// pequeña separación previa
                const wrappedText = wrapText(petalo.text, maxWidth, font, 12);
                for (const line of wrappedText.split('\n')) {
                    const estilo = getEstiloForTextField(line, font, fontBold, 12);
                    currentPage.drawText(line, {
                        x: 22,
                        y,
                        size: estilo.size,
                        color: estilo.color,
                        font: estilo.font
                    });
                    y -= 16;// 👈 antes: 35 por línea
                    if (y <= 30) {
                        currentPage = pdfDoc.addPage([595, 842]);
                        y = 780;
                    }
                }
            } else if (!petalo.isLegado) {
                // 🔹 Imprime título + texto solo si no es legado , es decir a todos los demas que no entren en los else if de arriba
                y-= 18;
                
                // 🔸 Dibuja el título en bold (14)
                const titleText = `${petalo.title}:`;
               
                currentPage.drawText(titleText, {
                    x: 22,
                    y,
                    size: 12,
                    color: rgb(0, 0, 0),
                    font: fontBold
                });

                y -= 20;// gap entre título y párrafo
                // 🔸Abajo del titulo dibuja el texto normal (12) 
                const wrappedText = wrapText(petalo.text, maxWidth, font, 12);
                for (const line of wrappedText.split('\n')) {
                    const estilo = getEstiloForTextField(line, font, fontBold, 12);
                    currentPage.drawText(line, {
                        x: 22,
                        y,
                        size: estilo.size,
                        color: estilo.color,
                        font: estilo.font
                    });
                    y -= 16;
                    if (y <= 30) {
                        currentPage = pdfDoc.addPage([595, 842]);
                        y = 780;
                    }
                }
            } 
    
            y -= 10;


            // Imagen
            if (petalo.imageBody) {
                
                //verificar si la imagen entra en la pagina
                const imgHeight = 100, imgWidth = 100;
                 // Verificar si la imagen entra en la página
                if (y - imgHeight <= 30) {
                    currentPage = pdfDoc.addPage([595, 842]);
                    y = 780;
                }

                const imageBody = await fetch(`/images/simbolos/${petalo.imageBody}`);
                const imageBodyArrayBuffer = await imageBody.arrayBuffer();
                const imageBodyImage = await pdfDoc.embedPng(imageBodyArrayBuffer);
                
                 currentPage.drawImage(imageBodyImage, {
                    x: 22,
                    y: y - imgHeight, // posición correcta arriba de y actual
                    width: imgWidth,
                    height: imgHeight,
                });

                // Ajustar el cursor Y **antes de continuar** con texto
                y = y - imgHeight - 15; // 15px de espacio después de la imagen
            }
        } else if (petalo.title) {
            const estilo = getEstiloForTextField(petalo.title, font, fontBold, 12);
            currentPage.drawText(petalo.title, { x: 22, y, size: estilo.size, color: estilo.color, font: estilo.font });
            y -= 18; // 👈 antes: 70
        }
        
        y-=12;
    }

        // TEXTFIELD FINAL (para cualquier nodo)
    if (petalo.textField) {
        if (petalo.isLegado) {
            y -= 16;
            if (y <= 30) { currentPage = pdfDoc.addPage([595, 842]); y = 780; }

            const contenido = (petalo.textField ?? "").toString();
            currentPage.drawText("HEREDADO DE:", { x: 22, y, size: 13, font: fontBold, color: rgb(0,0,0) });
            currentPage.drawText(contenido,       { x: 127, y, size: 12, font,       color: rgb(0,0,0) });
            y -= 32;
        } 
    }
    // arriba del archivo (opcional, para centralizar valores)
const LEADING = 15;      // salto por renglón dentro del bullet
const BULLET_GAP = 6;    // espacio extra entre bullets

// ...

// TEXTFIELD FINAL fuera de LEGADO
if (petalo.textField && !petalo.isLegado) {
    const esFuente2 = petalo.linkName?.startsWith("petalo-2/1");

    const lines = petalo.textField
        .split(/\n|:/)
        .map(l => l.trim())
        .filter(Boolean);

    for (const line of lines) {
        const bullet = `- ${line}`;
        const wrappedTextField = wrapText(bullet, maxWidth, font, 12);

        // cada renglón del bullet
        for (const subLine of wrappedTextField.split('\n')) {
        currentPage.drawText(subLine, {
            x: 22,
            y,
            size: 12,
            color: rgb(0, 0, 0),
            font
        });
        y -= LEADING;                 // <-- antes 12
        if (y <= 30) {                // control de salto de página
            currentPage = pdfDoc.addPage([595, 842]);
            y = 780;
        }
        }

        // gap entre un bullet y el siguiente
        y -= (esFuente2 ? BULLET_GAP : BULLET_GAP); // podés dejar un valor fijo
    }

    // margen inferior del bloque de bullets (separación del próximo título)
    y -= 18;
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

const getEstiloForTextField = (textField, font, fontBold , defaultSize = 12) => {
  if (!textField) {
    return {
      color: rgb(0, 0, 0),
      font: font,
      size: defaultSize,
    };
  }

  const text = textField.toLowerCase();
  const reSanado = /\b(sanando|reparando|reviviendo)(?:\s+legado)?\b/;

  if (reSanado.test(text)) {
    return {
      color: rgb(0.6, 0, 0.6), // violeta
      font: fontBold,          // bold
      size: defaultSize + 2,                // más grande
    };
  }

  return {
    color: rgb(0, 0, 0),
    font: font,
    size: defaultSize,
  };
};

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
        const { historyArrayOrden, ramiLinks } = ordenarPetalo(JSON.parse(history).map(item => item.replace("/circulo-base/", "")));

        ordenarRamiLinks(ramiLinks)


        ramiLinks.forEach(rami => {
            const indexRamificar = rami.indexOf("ramificar");
            if (indexRamificar !== -1) {
                const primeros = rami.slice(0, indexRamificar + 1);
                console.log("PRIMEROS " + primeros);
                const resto = rami.slice(indexRamificar + 1);
                console.log("RESTO " + resto);

                const restoOrdenado = OrdenarFuenteByVidas(resto);

                rami.splice(0, rami.length, ...primeros, ...restoOrdenado);
            }
        });
        console.log("RAMILINKS");
        console.log(ramiLinks)
        // Los convierte a cada link en objeto petalo.
        let correcciones = 0;
        const getObjectOfLink = (link) => {
            let p;
            if (link === "correccion") {
                // Verificar si la corrección abre o cierra
                p = { title: ((correcciones % 2) === 0) ? "CORRECCIONOPEN" : "CORRECCIONCLOSE" }

                correcciones++;
            } else {
                // separar base y texto SIEMPRE (aunque p exista sin fieldText)
                const [base, ...rest] = link.split(':');
                p = getPetaloWithLink(petalos, base || link);
                if (!p) return;
                p = { ...p }; // clonar antes de tocar

                if (rest.length) {
                    const tf = rest.join(':');
                    
                    if (p.separate) {
                        
                        p.textField = tf;
                    } 
                    else if (isStringInCorrecciones(historyArrayOrden, link)) {
                        
                        p.textField = tf; // reemplazo dentro de corrección
                    } 
                    else {
                        
                        p.textField = p.textField ? `${p.textField}:${tf}` : tf; // acumular en el clon
                    }
                }

            }
            return { ...p }
        }

        //CONSIGUE EL OBJETO PETALO DE CADA LINK DE CADA PETALO.
        historyArrayOrden.forEach((link) => {
            console.log("LINK ", link);

            const p = getObjectOfLink(link);
            if (!p) return;

            const enCorreccion = isStringInCorrecciones(historyArrayOrden, link);
            const key = p.linkName || "";
            const idx = petalosArray.findIndex(item => item.linkName === key);

            // Helper para acumular texto (a:b:c)
            const acc = (prev, val) => (prev ? `${prev}:${val}` : val);

            if (
                idx !== -1 &&         // ya existe ese pétalo en el array
                p.textField &&        // viene nuevo texto
                !enCorreccion         // (si querés acumular también en corrección, quitá esta condición)
            ) {
                // ✅ MERGE en vez de reemplazar/borrar
                const prev = petalosArray[idx];
                petalosArray[idx] = {
                ...prev,
                ...p,
                textField: acc(prev.textField, p.textField),
                };
            } else {
                // Alta normal: no existe aún, o estamos en corrección, o casos especiales
                if (!key || idx === -1 || key.includes("petalo-5/7") || enCorreccion) {
                petalosArray.push(p);
                }
            }
        });



        let x = 0;
        console.log(ramiLinks);

        ramiLinks.forEach((rami) => {
        let ramificando = false;
        const seenBase = new Set(); // bases ya agregadas en ESTA ramificación (sin :texto)
        let lastRoot = null;        // 👈 nuevo: para trackear la raíz (ej: petalo-7)
        
        rami.forEach((link) => {
            let p;
            if (link === "ramificar") {
            p = { title: ramificando ? "RAMIFICARCLOSE" : "RAMIFICAROPEN" };
            ramificando = !ramificando;
            lastRoot = null; // 👈 resetea al abrir/cerrar rama

            } else {
            p = getObjectOfLink(link);
            }

            if (!p) return;

            // Marcadores visuales de apertura/cierre: siempre se agregan
            if (p.title === "RAMIFICAROPEN" || p.title === "RAMIFICARCLOSE") {
            ramifiArray.push(p);
            return;
            }

            const baseName = ((p.linkName || "")).split(":")[0];   // ej: "petalo-3/2/2/8"
            const inCorreccion = isStringInCorrecciones(rami, link);

            // 👇 NUEVO BLOQUE: inserta el padre antes del primer hijo de cada raíz
            if (p.linkName) {
                const root = p.linkName.split("/")[0]; // ej: "petalo-7"
                if (root && root !== lastRoot) {
                    const parent = getPetaloWithLink(petalos, root);
                    if (parent) {
                        ramifiArray.push({ ...parent });
                    }
                    lastRoot = root;
                }
            }
            
            
            // Si no hay baseName (obj sin linkName) lo agrego igual
            if (!baseName) {
            ramifiArray.push(p);
            return;
            }

            // Si aún no agregué esta base en ESTA ramificación, o es un caso especial
            // (vidas pasadas petalo-5/7) o viene desde corrección, lo agrego.
            if (!seenBase.has(baseName) || baseName.includes("petalo-5/7") || inCorreccion) {
            ramifiArray.push(p);
            seenBase.add(baseName);
            return;
            }

            // Si ya estaba esa base y ahora viene una versión con textField (más “rica”),
            // reemplazo la anterior por esta.
            if (p.textField && !inCorreccion) {
            ramifiArray = ramifiArray.filter(
                (item) => ((item.linkName || "").split(":")[0]) !== baseName
            );
            ramifiArray.push(p);
            // seenBase ya la tenía marcada
            return;
            }

            // Si ya estaba y no trae nada nuevo, no hago nada.
        });

        x++;
        });
    }

    console.log("HISTORIAL", petalosArray);
    console.log("RAMIFICACIONES", ramifiArray);
    return { petalosArray, ramifiArray };
}

const ordenarPetalo = (historyArray) => {

    //PRIMER PASO DE LA CADENA. RECORRE TODO EL HISTORIAL Y SEPARA EN DISTINTOS PETALOS, ADEMAS DE EN RAMIFICACIONES
    //LUEGO LLAMA AL METODO PARA ORDENAR CADA PETALO (EN CASO DE FUENTE 5 HACE UNA EXEPCION PARA VIDAS PASADAS)

    console.log("HISTOY ARRAY", historyArray)
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
                petalos[3].push("correccion")
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
    console.log(JSON.stringify(ramiLinks))
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

    return { historyArrayOrden, ramiLinks };
}


const ordenarRamiLinks = (ramiLinks) => {
    ramiLinks.forEach(ramificacion => {

        const toCheck = ramificacion[2];
        const petaloToCheck = getPetaloWithLink(petalos, toCheck.split(":")[0]);

        const toCheck2 = ramificacion[3]
        const petaloToCheck2 = getPetaloWithLink(petalos, toCheck2.split(":")[0]);

        ramificacion.splice(0, 1);

        // Verificar el pétalo en la posición 3 antes de hacer el splice

        if (petaloToCheck.title.length === 1) {
            ramificacion.splice(3, 0, "ramificar");
        }
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
        } else if (vidasp && (!link.includes("petalo-5/7") || (x === links.length))) {
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

    return vidasPasadas.length > 0 ? putVidasPasadas(vidasPasadas, fuenteOrdenada) : fuenteOrdenada;
}


//ORDENA LOS PETALOS DE LA FUENTE (EXCEPTO VIDAS PASADAS)
const OrdenarFuente = (links) => {
    // BUSCO TODAS LAS CORRECCIONES Y LAS GUARDO EN UN ARRAY APARTE , MIENTAS QUE LOS DEMAS LINKS LOS GUARDO EN OTRO ARRAY
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
                    correccionPetalos: dedupeLinksByBase(correccionPetalos)
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

    // ORDENAR LOS LINKS SIN CORRECCIONES, MANTENIENDO "petalo-3/2/2/5" AL FINAL
    const petaloEspecial = [];
    const linksNormales = [];

    
    console.log("Links sin correcciones:", linksWithOutCorreciones);
    linksWithOutCorreciones.forEach(link => {
        const base = getBaseFromLink(link); // <-- usamos la base
        if (base === "petalo-3/2/2/5") {
            petaloEspecial.push(link);      // cualquier variante: con o sin :texto
        } else {
            linksNormales.push(link);
        }
    });

    // Ordenar solo los PETALOS normales
    linksNormales.sort(sortArray);
    // Combinar los arrays: primero los normales ordenados, luego los especiales al final
    const linksOrdenados = [...linksNormales, ...petaloEspecial];
    console.log("Links finales ordenados:", linksOrdenados);
    
    
    // ⚠️ NUEVO: Ordenar los elementos dentro de cada corrección
    correcciones.forEach(correccion => {
    // Arrays para los pétalos prioritarios y los demás especiales
    const petalosPrioritarios = [];
    const otrosEspeciales = [];
    const elementosNormales = [];

    correccion.correccionPetalos.forEach(elemento => {
        if (
            elemento.startsWith("petalo-3/2/2/5/1/") ||
            elemento.startsWith("petalo-3/2/2/5/2/") ||
            elemento.startsWith("petalo-3/2/2/5/3/")
        ) {
            petalosPrioritarios.push(elemento);
        } else if (elemento.startsWith("petalo-3/2/2/5/")) {
            otrosEspeciales.push(elemento);
        } else {
            elementosNormales.push(elemento);
        }
    });

    // Ordenar los prioritarios por el número final (1, 2, 3)
    petalosPrioritarios.sort((a, b) => {
        const numA = parseInt(a.split('/')[5]);
        const numB = parseInt(b.split('/')[5]);
        return numA - numB;
    });

    // Ordenar otros especiales por el número final
    otrosEspeciales.sort((a, b) => {
        const numA = parseInt(a.split('/')[5]);
        const numB = parseInt(b.split('/')[5]);
        return numA - numB;
    });

    // Ordenar normales
    elementosNormales.sort(sortArray);

    // Combinar: prioritarios arriba, luego otros especiales, luego normales
    correccion.correccionPetalos = [
        ...petalosPrioritarios,
        ...otrosEspeciales,
        ...elementosNormales
    ];
    
    // 🛡 Limpieza final por si todavía quedó algún duplicado
    correccion.correccionPetalos = dedupeLinksByBase(correccion.correccionPetalos);
 });

    console.log("🔧 Correcciones ordenadas:", correcciones);
    console.log("🔧 Links sin correcciones:", linksOrdenados);
    return putCorrecciones(correcciones, Array.from(new Set(linksOrdenados)))
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
    let newArray = [...arrayWithOutCorrecciones];
    correcciones.forEach(correccion => {
        console.log("🔧 Insertando corrección ordenada para", correccion.antLink, ":", correccion.correccionPetalos);
        newArray.push("correccion", ...correccion.correccionPetalos, "correccion");
    });
    console.log("🔧 putCorrecciones resultado:", newArray);
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
   
  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    if (item === "correccion") {
      // Si hay dos 'correccion' seguidas => cierre + apertura (no cambia el estado neto)
      if (array[i + 1] === "correccion") {
        i++;                // consumir la segunda
        continue;           // estado inCorreccion queda igual
      }
      inCorreccion = !inCorreccion; // toggle normal
      continue;
    }

    if (inCorreccion && item === targetString) {
      return true;
    }
  }

  return false;
};

// Devuelve la parte "base" del link, sin el texto a la derecha de los :
const getBaseFromLink = (link) => (link || "").split(':')[0];


// Paso el Array de links y devuelve otro sin duplicados por base
// Elimina duplicados por base (petalo-3/3/1/2) dejando, si es posible,
// la versión que tenga texto (petalo-3/3/1/2:algo)
const dedupeLinksByBase = (links) => {
    const result = [];
    const indexByBase = new Map();

    links.forEach(link => {
        const base = getBaseFromLink(link);
        const hasText = (link || "").includes(':');

        if (!indexByBase.has(base)) {
            indexByBase.set(base, result.length);
            result.push(link);
        } else {
            const idx = indexByBase.get(base);
            const existing = result[idx];
            const existingHasText = existing.includes(':');

            // Si el nuevo tiene texto y el viejo no, reemplazo
            if (hasText && !existingHasText) {
                result[idx] = link;
            }
            // Si ambos tienen texto, dejo el primero (o podrías combinar, pero no hace falta)
        }
    });

    return result;
};

export default createAndSendPDF;