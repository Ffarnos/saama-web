const { Buffer } = require('buffer');
const { writeFileSync } = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    try {
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                body: 'Method Not Allowed',
            };
        }

        // Obtiene el cuerpo de la solicitud
        const body = JSON.parse(event.body);
        console.log(body)
        const pdfBase64 = body.pdf;
        console.log(pdfBase64)
        const pdfBuffer = Buffer.from(pdfBase64, 'base64');
        console.log("3")

        // Genera un nombre único para el archivo
        const fileName = `document-${Date.now()}.pdf`;
        const filePath = path.join('/tmp', fileName);

        // Guarda el archivo en el sistema de archivos temporal de Netlify
        writeFileSync(filePath, pdfBuffer);

        // Mueve el archivo a la carpeta de publicaciones
        const publicFilePath = path.join(process.env.PUBLISH_DIR || 'public', fileName);
        writeFileSync(publicFilePath, pdfBuffer);

        // Obtiene la URL del archivo
        const fileUrl = `${process.env.URL || 'http://localhost:8888'}/${fileName}`;

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'PDF uploaded successfully', url: fileUrl }),
        };
    } catch (error) {
        console.error('Error uploading PDF:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error uploading PDF', message: error.message }),
        };
    }
};