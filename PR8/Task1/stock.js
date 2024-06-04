const evt = require('events');



let storage = {};
 storage['phones'] = 5;
 storage['laptops'] = 7;
 storage['headphones'] = 2;
 storage['monitors'] = 1;
 storage['mice'] = 0;

function checkAvailability(key){



    return key in storage
 }


class Stock extends evt {
    constructor() {
        super();
    }

    availability(name,value){
        this.emit('availability')
        if (name in storage ) {
            this.emit('item_bool')
            if(storage[name] >= value){
            console.log('Дана кількість товару є в наявності: ' + value);
            return true;
        }
        else{
            console.log('На складі немає стільки товару'); 
            return false;
        }
            
        } 
        else {
            console.log('Товара немає в наявності'); 
            return false;
        }
       
    }


}module.exports = Stock