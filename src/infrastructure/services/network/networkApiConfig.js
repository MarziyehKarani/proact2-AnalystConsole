import axios from "axios";

function getDevEvironment() {
}

function getProdEnvironment() {
}

export function setupApiConfiguration(languageTag) {
    var environmentBaseUrl = process.env.REACT_APP_APIENDPOINT;
    axios.defaults.baseURL = `${environmentBaseUrl}/${languageTag}/`;
}

export function setApiAuthToken(authToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}