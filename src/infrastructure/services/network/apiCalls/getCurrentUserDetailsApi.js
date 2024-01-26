const axios = require('axios');

async function getCurrentUserDetailsApi( onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Users/me`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getCurrentUserDetailsApi;