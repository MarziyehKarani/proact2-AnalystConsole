const axios = require('axios');

async function getStudiesApi(onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get("Projects")
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getStudiesApi;