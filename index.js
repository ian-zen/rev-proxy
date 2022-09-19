const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

http.createServer(function handleRequest(req, res) {
  if (req.url.startsWith('/d/')) {
    console.log(`zendash /d request to ${req.url} successfully intercepted`)
    return proxy.web(req, res, { target: 'http://local.zenbusiness.com:8084' });
  }
  if (req.url.startsWith('/b/graphql')) {
    console.log(`banking-ui graphl request to ${req.url} successfully intercepted`)
    return proxy.web(req, res, { target: 'http://local.zenbusiness.com:8083' });
  }
  if (req.url.startsWith('/b')) {
    console.log(`banking-ui /b request to ${req.url} successfully intercepted`)
    return proxy.web(req, res, { target: 'http://local.zenbusiness.com:8084' });
  }

  // no matches
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.write('Not Found');
  res.end();
}).listen(8080);