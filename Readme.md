# Multiple socket.io processes with redis

By default configuration, socket.io uses the memory (MemoryStore) to hold open 
connections. Hence it is not possible to run several socket.io processes, because
the processes won't know nothing about the open connections of the other processes.
But it's quite easy to use redis as store, which allows to share the open connections 
between several socket.io processes, which run on different ports.

You can use some kind of load balancer to distribute workload or use nodes http proxy 
module node-http-proxy to access the processes.

## Usage

Install node.js: http://nodejs.org/

```bash
npm install socket.io
```

```bash
npm install socket.io-client
```

```bash
npm install redis
```

Install and run redis: http://redis.io/download/

Run two socket.io server processes:

```bash
node server.js // default port is 8090
node server.js 8091
node server.js 8092
...
```

Start as much clients you like:

```base
node client.js // default port is 8090
node client.js 8091
node client.js 8092
```



