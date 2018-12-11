var StaticServer = require('static-server');
var server = new StaticServer({
  rootPath: '.',            // required, the root of the server file tree
  port: 8000,               // required, the port to listen
  name: 'http-server',   // optional, will set "X-Powered-by" HTTP header
  templates: {
    index: 'index.html',     
  }
});
 
server.start(function () {
  console.log('Server listening to', server.port);
});