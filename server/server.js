const path = require('path')
const express = require('express');
const app = express()
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  socket.on("setans",(payload) => {
    io.sockets.emit("addans",payload);
  })
  
});
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname+'/../build/index.html'));
});
app.use(express.static('build'));
const PORT = process.env.PORT || 4000
httpServer.listen(PORT,"0.0.0.0", () => {
  console.log(`Listening on http://0.0.0.0:${PORT}`)
})