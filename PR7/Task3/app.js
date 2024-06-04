
function main(data) {
    return new Promise((resolve) => {
         if (typeof data !== 'number') {
            resolve("error");
        }
         if(data%2==0){
             setTimeout(() => {
                 resolve("even");
             }, 1000);

         }
         else{setTimeout(() => {
             resolve("odd");
         }, 2000);
         }
    }).then(result => {
        console.log(result);
});
}
main("fsdf")
