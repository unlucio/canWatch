const superagent = require('superagent');
const { URL } = require('url');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const host = process.env.HOST|| 'http://localhost:9004';

function request(path, method, userId) {
    method = method || 'get';
    const url = new URL(host);
    url.pathname = path;

    return new Promise(function(resolve, reject) {
        const req = superagent[method](url.href);
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
    return request(`/streams/${streamId}/activate`, 'patch', userId).then(function(result) {
        console.log('Activate result: ', result);
        return { userId, streamId };
    });
}

function deactivateStream({ userId, streamId }) {
    return request(`/streams/${streamId}/deactivate`, 'patch', userId).then(function(result) {
        console.log('deactivate result: ', result);
        return { userId, streamId };
    });
}

module.exports = {
    getUserId: () => request('/users/newId'),
    getStremId: () => request('/streams/newId'),
    activateStream,
    deactivateStream
}
