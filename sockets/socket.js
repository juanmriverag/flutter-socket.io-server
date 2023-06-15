const {io} = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('can'));
bands.addBand(new Band('Santa'));
bands.addBand(new Band('Mc'));

//Messages Sockets
io.on('connection', client => {
    console.log('client connect')

    client.emit('active-bands', bands.getBands());
    client.on('disconnect', () => { console.log('client disconnect')});


    client.on('vote-band',(data)=>{
      bands.voteBand(data.id);
      io.emit('active-bands', bands.getBands());
      });

      client.on('new-band',(data)=>{
        const newBand = new Band(data.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
        });

        client.on('delete-band',(data)=>{
         bands.deleteBand(data.id)
          io.emit('active-bands', bands.getBands());
          });
  });
