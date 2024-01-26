const axios = require('axios');

async function getMessageAnalysisApi(
    messageId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`AnalystConsole/messageId/${messageId}/analysis`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getMessageAnalysisApi;