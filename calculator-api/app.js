const http = require('http');
const app = require('./server');
const port = process.env.PORT || 30; //
const server = http.createServer(app);
server.listen(port);
console.log('Numerology API listening at ' + port);
