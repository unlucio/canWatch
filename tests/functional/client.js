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

function activate({ userId, streamId }) {
    return request(`/streams/${streamId}/activate`, 'put', userId).then(function(result) {
        console.log('activate result: ', result);
        return { userId, streamId };
    });
}

function deactivate({ userId, streamId }) {
    return request(`/streams/${streamId}/deactivate`, 'put', userId).then(function(result) {
        console.log('deactivate result: ', result);
        return { userId, streamId };
    });
}

function getIds() {
    return Promise.all([request('/users/new'), request('/streams/new')]).then(function(result) {
        const [ userRes, streamsRes ] = result;
        return Object.assign(userRes, streamsRes);
    });
}

console.log('====== Happy Path');
getIds().then(function(ids) {
    return activate(ids);
}).then(function(ids) {
    return deactivate(ids);
})
.catch(function (error) {
    console.error(error);
});

console.log('====== /Happy Path');
getIds().then(function(ids) {
    return activate(ids);
}).then(function(ids) {
    return activate(ids);
}).then(function(ids) {
    return activate(ids);
}).then(function(ids) {
    return activate(ids);
})
.catch(function (error) {
    console.error(error);
});
console.log('====== /Too many streams');
