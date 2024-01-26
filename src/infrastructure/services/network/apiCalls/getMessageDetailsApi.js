const axios = require('axios');

async function getMessageDetailsApi(userId, messageId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`AnalystConsole/UserId/${userId}/messages/${messageId}`)
        .then(response => {

            var sortingReplies = response.data.replyMessages.sort(
                (a, b) => new Date(a.createdDateTime).getTime() - new Date(b.createdDateTime).getTime());
            response.data.replyMessages = sortingReplies;

            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getMessageDetailsApi;