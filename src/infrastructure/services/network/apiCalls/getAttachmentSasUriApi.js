const axios = require('axios');

async function getAttachmentSasUriApi( messageId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Attachments/${messageId}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getAttachmentSasUriApi;