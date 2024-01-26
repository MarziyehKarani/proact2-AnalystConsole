const axios = require('axios');

async function postMessageAnalysisApi(request, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.post(`MessageAnalysis/messages/${request.messageId}`, request)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default postMessageAnalysisApi;