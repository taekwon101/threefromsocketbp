'use strict';

const io = require('socket.io')();
const eventHandlers = require('./eventHandlers');
// const Game = require('./game.js');

// return to after fixing break
// function stateUpdate(id){
//   hasClicked[id] = True;
// };

// function resetToggleState(){
//   hasClicked.forEach((element) => {
//     hasClicked[element] = false;
//   });
// };

// function emitGameState() {
//   io.emit('state', game.state());
//   resetToggleState();
// };

// setInterval(emitGameState, 1000/60);



io.on('connection', (socket) => {
  let clients = eventHandlers.addToDB(socket.id);
  const connectedClients = () => clients.length;

  socket.on('/root/new_socket_connected', (data) => {
    const { message, sender } = eventHandlers.welcomeClient(data);
    const clientCount = connectedClients();
    socket.emit('/root/welcome',  {message, sender, id: socket.id});
    io.sockets.emit('root/update_socket_count', { clientCount });
  });

  socket.on('/root/new_message', (data) => {
    let message = eventHandlers.sendMessageToClient(data, socket.id);
    if (message.hasOwnProperty('sender')) {
      socket.emit('/root/update_chat', message);
    } else {
      message.sender = 'server';
      socket.broadcast.emit('/root/update_chat', message);
    }
  });

  socket.on('userclick', () => { 
    console.log(socket.id, "has clicked");
    socket.broadcast.emit('serverclick')
    // stateUpdate(socket.id);
  });

  socket.on('disconnect', () => {
    clients = eventHandlers.onClientDisconnect(socket.id);
    const clientCount = connectedClients();
    socket.broadcast.emit('root/update_socket_count', { clientCount });
  });

});

module.exports = io;