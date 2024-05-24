const { Buffer } = require('buffer');
const { writeFileSync, mkdirSync, existsSync } = require('fs');
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
        const pdfBase64 = body.pdf;
        const pdfBuffer = Buffer.from(pdfBase64, 'base64');

        // Genera un nombre único para el archivo
        const now = new Date();
        const fileName = `document-${now.getTime()}-${Math.floor(Math.random() * 1000)}.pdf`;
        const filePath = path.join('public', fileName); // Guarda en el directorio 'public'

        // Guarda el archivo en el sistema de archivos de tu proyecto
        writeFileSync(filePath, pdfBuffer);

        // Obtiene la URL del archivo
        const fileUrl = `${process.env.URL || 'http://localhost:8888'}/${fileName}`;

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'PDF uploaded successfully', url: fileUrl }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error uploading PDF', message: error.message }),
        };
    }
};