const { Buffer } = require('buffer');
const AWS = require('aws-sdk');
const emailjs = require('emailjs-com');

exports.handler = async (event, context) => {
    try {
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


        await emailjs.send("service_u9dlni4", "template_q0rb42f", {
            to_email: "ffarnos12@gmail.com",
            body: 'Hola, te envío el PDF que solicitaste ' + fileUrl,
            to_name: "Fernando",
        }, );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'PDF uploaded successfully', url: fileUrl }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error uploading PDF ' + error}),
        };
    }
};
