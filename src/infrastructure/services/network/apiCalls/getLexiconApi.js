const axios = require('axios');

async function getLexiconApi(studyId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Lexicons/projects/${studyId}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getLexiconApi;