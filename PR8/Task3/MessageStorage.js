const evt = require('events');

class Storage extends evt {
    constructor() {
        super();
        this.sentMessages = []
    }
    save_my_message(message){
        this.sentMessages.push(message)
    }
show_my_message(){
    this.emit('show')
}
    get_all_messages() {
        return this.sentMessages;
    }

}module.exports = Storage