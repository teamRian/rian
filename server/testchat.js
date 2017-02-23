const server = require('./index.js');
const http = require('http').createServer(server)
const PORT = process.env.PORT || 8000;
const io = require('socket.io').listen(http)
const socket = require('./routes/socket');

io.on('connection', socket)
// Socketio Chat
// const server = require('http').createServer(app);
// const io = require('socket.io').listen(server);


http.listen(PORT, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});