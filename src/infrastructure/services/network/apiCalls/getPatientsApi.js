const axios = require('axios');

async function getPatientsApi(projectId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Patient/Projects/${projectId}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getPatientsApi;