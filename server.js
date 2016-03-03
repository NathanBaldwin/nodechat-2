'use strict'

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const ws = require('socket.io')(server);//passing server into io. We'll be using express to serve up html
//but socket communication is over a different protocol, but we want to use same port
//by doing this, we can use same port, but communicate via 2 different protocals (http and socket)
//at this point, we have an express app and native io server running.
const PORT = process.env.PORT || 3000;
app.set('view engine', 'jade');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
})

//the browser will talk to the server through a websocket

//anyhting above port 1,024 and 65,135 is good for personal use.
server.listen(PORT, () => {
  console.log(`server listing on PORT ${PORT}`);
})

//whenever we get a connection event
ws.on('connection', socket => {
  // console.log("connection", socket);
  //this is where you listen for events on socket

  socket.on('sendChat', msg => {
    //as soon as we hear the send chat event, we'll emit another event
    socket.broadcast.emit('receiveChat', msg);
  })
})
