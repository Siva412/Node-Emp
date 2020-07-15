const http = require('http');
const debug = require('debug');
const app = require('./Backend/app');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.on('listening', () =>{
    const ip = server.address();
    const debugData = ip+port;
    debug("Listening on"+debugData);
});

server.listen(port);