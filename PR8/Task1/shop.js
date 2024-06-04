
const evt = require('events');
class Shop extends evt{
    constructor() {
        super();
        
    }
    choosing_item(item){
        console.log('Ваш товар '+item);
        return item;
    }
    number_item(value){
        
        console.log("Кількість товару "+value);
        this.emit('choosing')
        return value;
    }
    Add_item_in_card(){
        this.emit('Add_item')
    }

    payment(){
        console.log('Перевірка способу оплати');
        this.checking()
        this.emit('payment')

    }
    checking(){
        console.log('Ваша картка: MasterCard');
    }
    delivery(){
        this.emit('delivery')
    }


}
module.exports = Shop