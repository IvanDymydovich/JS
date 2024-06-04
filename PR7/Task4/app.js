function cookBreakfast(teapack, sugar, bread, sausage, butter){
    return new Promise((resolve, reject) => {
        if (!bread) {
            return reject("There is no bread for sandwich. Cannot cook breakfast for you.");
        }
        if (!teapack || !sausage || !butter) {
            return reject(new Error("Не достатньо інгрилієнтів"));
        }
        let makingTeaPromise = boilWater()
            .then(() => pourWater())
            .then(() => addTeapack(teapack))
            .then(() => {
                if (sugar) {
                    return addSugar();
                } else {
                    return  resolve("no sugar added");
                }
            });
        let makingSandwichPromise = takeBread()
            .then(() => takeSaussage())
            .then(() => addButter())
            .then(() => combinate_product());

        Promise.all([makingTeaPromise, makingSandwichPromise])
            .then(() => {
                console.log("Обід готов");
                resolve();
            })
            .catch(error => {
                reject(error);
            });
    });
}
function pourWater() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Наливаэмо воду в чашку");
        }, 1000);
    }).then(result => {
        console.log(result);
    });
}
function combinate_product() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Бутерброт готов>");
        }, 1000);
    }).then(result => {
        console.log(result);
    });
}
function boilWater() {
    console.log("включили чайник");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Вода нагрілась");
        }, 2000);
    }).then(result => {
        console.log(result);
    });
}

function addTeapack(teapack) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Дадаєм пакет чаю ${teapack}`);
        }, 5000);
    }).then(result => {
        console.log(result);
    });
}

function addSugar() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Додаєм цукор");
        }, 2000);
    }).then(result => {
        console.log(result);
    });
}

function takeBread() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("ріжим хліб");
        }, 15000);
    }).then(result => {
        console.log(result);
    });
}

function takeSaussage() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("ріжим сосиску");
        }, 10000);
    }).then(result => {
        console.log(result);
    });
}

function addButter() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Мажемо маслом");
        }, 5000);
    }).then(result => {
        console.log(result);
    });
}

cookBreakfast("ЛІПТОН",true,true,true,true)