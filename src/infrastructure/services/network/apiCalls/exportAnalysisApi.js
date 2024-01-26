const axios = require('axios');

async function exportAnalysisOfAPatientAsCsvApi( patientId,onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`DataExporters/analysis/user/${patientId}/csv`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default exportAnalysisOfAPatientAsCsvApi;