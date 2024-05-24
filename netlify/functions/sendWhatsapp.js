const { Buffer } = require('buffer');
const AWS = require('aws-sdk');

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

        // Configura el SDK de AWS con tus credenciales de SW3
        const s3 = new AWS.S3({
            accessKeyId: process.env.SW3_ACCESS_KEY_ID,
            secretAccessKey: process.env.SW3_ACCESS_SECRET_KEY
        });


        // Guarda el archivo en SW3
        const now = new Date();
        const fileName = `document-${now.getTime()}-${Math.floor(Math.random() * 1000)}.pdf`;
        const params = {
            Bucket: process.env.SW3_BUCKET_NAME,
            Key: fileName,
            Body: pdfBuffer,
            ContentType: 'application/pdf',
        };
        await s3.upload(params).promise();

        const fileUrl = `https://${process.env.SW3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;

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
