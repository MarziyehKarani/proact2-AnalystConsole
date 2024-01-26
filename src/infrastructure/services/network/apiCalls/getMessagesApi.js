const axios = require('axios');

async function getMessagesApi(userId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`AnalystConsole/UserId/${userId}/messages`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getMessagesApi;