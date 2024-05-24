const { Buffer } = require('buffer');
const AWS = require('aws-sdk');
const emailjs = require('emailjs-com');

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


        AWS.config.update({
            accessKeyId: process.env.SW3_ACCESS_KEY,
            secretAccessKey: process.env.SW3_ACCESS_SECRET_KEY
        });
        const s3 = new AWS.S3({
            params: { Bucket: process.env.SW3_BUCKET_NAME },
        });

        const now = new Date();
        const fileName = `document-${now.getTime()}-${Math.floor(Math.random() * 1000)}.pdf`;


        const params = {
            Bucket: process.env.SW3_BUCKET_NAME,
            Key: fileName,
            Body: pdfBuffer,
        };

        await s3.upload(params).promise();

        const fileUrl = `https://${process.env.SW3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;


        const templateParams = {
            pdf_url: fileUrl,
            body: 'Hola, te envío el PDF que solicitaste ' + fileUrl,
            to_email: 'ffarnos12@gmail.com'
            // Add other required fields here
        };

        emailjs.send('service_u9dlni4', 'template_q0rb42f', templateParams,"GDJnvGlc9y4o6oeeR").then(
            (response) => {
                console.log('SUCCESS!', response.status, response.text);
            },
            (error) => {
                console.log('FAILED...', error);
            },
        );
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
