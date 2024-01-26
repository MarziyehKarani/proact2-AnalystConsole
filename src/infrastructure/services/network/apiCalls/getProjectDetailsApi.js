const axios = require('axios');

async function getProjectDetailsApi( projectId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Projects/${projectId}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getProjectDetailsApi;