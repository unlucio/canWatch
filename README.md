# canWatch
Canwatch is a service designed to limit the number of resources an agent can access.
By default the limit is set to 3 resources per agent.
Our resources are hypothetical video streams, and our agents are the user watching videos.

## Quick start

#### Running it
CanWatch requires a recent version of [node.js](https://nodejs.org) and [docker](https://www.docker.com/) in order to run on a local machine

Starting the dev environment:
```bash
$ npm run dev
```

Stoppping the dev environment:
```bash
$ npm run dev-stop
```

By default it will be accessible at [http://localhost:9004](http://localhost:9004)

#### Testing
End to end tests can be run against a local instace by running:
```bash
$ npm run endtoend
```

A demo enviroment is also avvailable, you can run end to end tests with the following command:
```bash
$ HOST='https://canwatch.unlucio.com/' npm run endtoend
```

Unit tests can be run with:
```bash
$ npm run unit
```

A broken demo app is also available at:
```bash
$ curl -i https://canwatchb.herokuapp.com/
```

## Internals


#### Available Routes
**obtaining a new user id**: GET /users/newId
**obtaining a new stream id**: GET /streams/newId
**starting a stream**: PATCH[^1] /streams/{streamId}/activate
**stopping a stream**: PATCH[^1] /streams/{streamId}/deactivate

The `activate` and `deactivate` routes expect an `x-userid` HTTP header
with a valid userId.
In a live environment, the service would sit behind an nginx proxy in charge of providing such header
if the client is not capable due to limitations.

#### Data Store
Data are store in [Redis](https://redis.io/) as sets, this allows to leverage on the DB's capabilities
for a faster check of our view limit.
Tight dependency with Redis is avoided with a simple store module `redisClient.js` exposing
a generic api:

```javascript
{
  add(what, where),
  remove(what, where),
  check(what, where),
  count(what, where),
  isConnected()
}
```

In a live deployment the use of a cloud radis service is recommended for both realiability
and scaling.
In an aws deployment [ElastiCache](https://aws.amazon.com/elasticache/) is suggested for both
close availabilty and compatibility with the Redis api.

On error or clinet disconnect en error is emitted while retriying to estabilsh a connection.

#### Log facility:
The `logger.js` module includes the support for [graylog](https://www.graylog.org/),
though using [winston](https://www.npmjs.com/package/winston) allows for easy change
of the facility.

When lancing the dev envorinment the 1st time, the graylog container needs a basic configuration
accessible at [http://localhost:9000](http://localhost:9000)
*Due to the verbosity of the containers, the log facility is currently inactive*

### Queue _(missing)_
In a high traffic deployment the `data store` could organise the incoming requests in
atomic packages and push them to Readis throught a queue service to prevent
concurrency collisions.

## Suggested Deployment
A simple example for a [kubernetes](https://kubernetes.io/) deployment in single core pods
can be found in the deploy directory.

## Monitoring _(missing)_
Suggested tools for monotoring:
- [sysdig](https://sysdig.com/) for pod instrumentation.
- [newrelic](https://newrelic.com/) for the service's performaces
The service also replys to the cients with a 503 HTTP status code if the connection
to the data store is lost, preventing the queueing of reqeusts and allowing the clients
for faster decision making.
This can be also used as a probe point for [pager](https://www.pagerduty.com) means.


[^1]: POST is also available for clients that might have llimits.
