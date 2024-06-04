const evt = require('events');
class Manager extends evt {
    constructor() {
        super();
    }
    send_message(massage){
        this.emit('checking')
        console.log('Повідомлення відправленно');
        return massage;
    }


}module.exports = Manager