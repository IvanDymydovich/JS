const mainShop=require('./shop')

const myShop = new mainShop()
const shop_stock=require('./stock')

const stock = new shop_stock()

myShop.on('deliver_product', function(){
    console.log('Товар Відправлено');
});
myShop.on('choosing', function(){
    console.log('Виберіть товар');
    console.log('Товар Вибрано');
});
stock.on('availability', function(){
    console.log('Перевірка товару ');
});
stock.on('item_bool', function(){
    console.log('Товар є в магазині ');
});
myShop.on('Add_item', function(){
    console.log('Товар додано в корзину');
});
myShop.on('payment', function(){
    console.log('Товар  оплачено');
});
myShop.on('delivery', function(){
    console.log('Товар відправленно');
});
var name =myShop.choosing_item("phones")
var value=myShop.number_item(2)
var bool =stock.availability(name,value)
if(bool==true){
    buying();
}
else{
    console.log('Пізніше зявиться товар');
    console.log('Товар зявився');
    buying();
}
function buying() {
    setTimeout(function() {
        myShop.Add_item_in_card();
        setTimeout(function() {
            myShop.payment();
            setTimeout(function() {
                myShop.delivery();
            }, 1000); 
        }, 1000); 
    }, 1000); 
}