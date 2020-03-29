module.exports = function(socket) {
    console.log('New WebSocket connection');

    socket.on('message', (message) => {
        console.log(message);
    });
  };