const superagent = require('superagent');

const host = 'http://localhost:9004';

function request(url, method, userId) {
    method = method || 'get';
    const uri = `${host}${url}`

    return new Promise(function(resolve, reject) {
        const req = superagent[method](uri);
        req.set('Accept', 'application/json')

        if (userId) {
            req.set('x-userid', userId)
        }

        req.end(function(error, res) {
            if (error) {
                reject(error);
                return;
            }

            resolve(res.body);
        });
    });
}

function activateStream({ userId, streamId }) {
    return request(`/streams/${streamId}/activate`, 'put', userId).then(function(result) {
        console.log('Activate result: ', result);
        return { userId, streamId };
    });
}

function deactivateStream({ userId, streamId }) {
    return request(`/streams/${streamId}/deactivate`, 'put', userId).then(function(result) {
        console.log('deactivate result: ', result);
        return { userId, streamId };
    });
}

function getIds() {
    return Promise.all([request('/users/newId'), request('/streams/newId')]).then(function(result) {
        const [ userRes, streamsRes ] = result;
        return Object.assign(userRes, streamsRes);
    });
}

module.exports = {
    getUserId: () => request('/users/newId'),
    getStremId: () => request('/streams/newId'),
    getIds,
    activateStream,
    deactivateStream
}
