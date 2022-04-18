import axios from 'axios';

const queryString = require('query-string');

export const getSupportedProjects = (callback) => {
    let request = axios.get('https://api.nftwalls.art/getSupportedProjects').then(res => res).catch(error => error);
    request.then((api_response) => {
        callback(api_response.status, api_response.data);
    });
};

export const getProjectInformation = (assetProjectName, callback) => {
    const queryParams = queryString.stringify({
        "asset_project_name": assetProjectName
    }, { skipNull: true,  skipEmptyString: true });

    let request = axios.get(`https://api.nftwalls.art/getProjectInformation?${queryParams}`).then(res => res).catch(error => error);
    request.then((api_response) => {
        callback(api_response.status, api_response.data);
    });
};

