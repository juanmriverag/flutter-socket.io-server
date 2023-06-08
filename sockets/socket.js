const {io} = require('../index');

//Messages Sockets
io.on('connection', client => {
    console.log('client connect')
    client.on('disconnect', () => { console.log('client disconnect')});
    client.on('mensaje',(payload)=>{
      console.log('Mensaje!!!',payload);
    });
  });
