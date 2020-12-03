const net = require('net');
const fs = require('fs');

const server = net.createServer()
const PORT = 3000;

server.on('connection', (connection) => {
  connection.setEncoding('utf8');
  console.log('someone connected');
  // receive data from client side
  connection.on('data', (data) => {
    // use data to check the file system
    const filePath = `./${data}`
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        connection.write('Sorry we could not find your file')
        throw err
      } else {
        // write the file to client
        console.log(filePath, 'was sent')
        connection.write(data);

        // close the server
        connection.destroy()
        server.close();
      }
    })
  })
})

// listen on our specified port
server.listen(PORT);