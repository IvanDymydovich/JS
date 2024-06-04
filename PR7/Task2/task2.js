
function main() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('hello world');
        }, 2000);
    });
}
module.exports = main;