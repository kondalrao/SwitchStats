const socketIO = require('socket.io')

var sio = function (server) {
    const io = socketIO(server)

    io.on('connection', socket => {
        console.log('User connected')
        
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
}

module.exports = sio;