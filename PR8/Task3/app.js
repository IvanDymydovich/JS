const manager = require('./MessageManager')

const messageManager = new manager();
const storage = require('./MessageStorage')

const messageStorage = new storage()

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

messageManager.on('checking', function () {
    console.log('Перевірка повідомлення');
});
messageStorage.on('show', function () {
    const savedMessages = messageStorage.get_all_messages();
    console.log("Відправленні повідомлення");
    savedMessages.forEach((message, index) => {
        console.log(`${index + 1}. ${message}`);
    });
});

function askAction(number) {
    if (number = 1) {
        readline.question('Яку функцію хочете виконати(Send,Receive.ShowReceived,Stop)', time => {
            if (time.toLocaleUpperCase() == "SEND") {
                readline.question('Введіть повідомлення ', message => {
                    var save_message = messageManager.send_message(message)
                    messageStorage.save_my_message(save_message)
                    askAction(1);
                });
            } else if (time.toLocaleUpperCase() == "RECEIVE") {
                console.log('Повідомлення не знайденні');
                askAction(1);
            } else if (time.toLocaleUpperCase() == "SHOWRECEIVED") {
                messageStorage.show_my_message()
                askAction(1);
            } else if (time.toLocaleUpperCase() == "STOP") {
                console.log('Завершення роботи');
                readline.close();
            } else {
                console.log('Команду введено неправильно');
                askAction(1);
            }
        });
    } else {

    }
}

askAction(1);