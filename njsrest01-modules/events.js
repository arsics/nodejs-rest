const EventEmitter = require('events');
const emitter = new EventEmitter();

// register a listener
emitter.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});

// raise an event with args
emitter.emit('messageLogged', {id: 1, url: 'http://'});