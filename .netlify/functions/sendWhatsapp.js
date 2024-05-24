const twilio = require('twilio');

exports.handler = async (event, context) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
    const client = twilio(accountSid, authToken);

    const pdfUrl = body.pdfUrl;

    const messageOptions = {
        from: 'whatsapp:+14155238886',
        body: 'Aquí está tu documento PDF',
        to: 'whatsapp:+5492262536209',
    };

    try {
        const message = await client.messages.create(messageOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'PDF enviado por WhatsApp', sid: message.sid }),
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al enviar el PDF por WhatsApp', message: error.message }),
        };
    }
};