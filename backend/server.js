// requirements
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

// initialization
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on("connection", socket => {
    console.log("What is socket: ", socket);
    socket.on("chat", payload => {
        console.log("What is payload: ", payload);
        io.emit('chat', payload);
    })
})

httpServer.listen(5000, () => console.log("Server is active..."))

