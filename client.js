const net = require('net');
const stdin = process.stdin;

stdin.resume();
stdin.setEncoding('utf8');

// write data from client
stdin.on('data', (data) => {
  if (data === '\\q\n') {
    client.end();
    process.exit();
  } else {
    client.write(data.trim());
  }
})
// create connection with server
const client = net.createConnection({
  host: '10.0.2.15',
  port: 3000
})

client.setEncoding('utf8');

client.on('connect', () => {
  console.log('connected to server');
  // listen for data event
  client.on('data', (data) => {
    if (data.trim() === 'Sorry we could not find your file') {
      console.log('Error: ', data);
      client.end();
      process.exit();
    } else {
      console.log('Data inside file: ', data);
      client.end();
      process.exit();
    }
  })
})