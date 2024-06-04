
window.onload = (event) => {
            fillProductsList();
};

function fillProductsList(){
    fetch('/api/products')
        .then(res => {
            return res.json();
        })
        .then(data => {
            const container = document.getElementById('productsContainer');
            data.forEach(item => {
                const newLiItem = `<div class="list_items"><li><em><input class="button delete" type="button" value="Виконав" onclick="deleteProduct(${item.id})"></em>
                        <em><input class="button update" type="button" value="Замінити" onclick="updateProduct(${item.id})"></em><span><b> ${item.time}</b>    : <b>${item.action} </b> </span> </li></div>`;
                container.insertAdjacentHTML('beforeend', newLiItem);
            })
        })
        .catch(error => {
            console.log(error);
            alert(error);
        });
}

function deleteProduct(id){
    const confirmResult = confirm("Ви точно виконали цей пункт????????");
    if(!confirmResult){return;}


    fetch(`/api/products/${id}`, {
        method: 'DELETE'})
        .then(document.location = "/products")
        .catch(error => {
            console.log(error);
            alert(error);
        });
}

function updateProduct(id){
    const newAction = prompt('Який час?');
    const newTime = prompt('Яка подія');

    if (!newAction || !newTime) {
        return;
    }
    fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ time: newTime ,action:newAction})
    })
        .then(document.location = "/products")
        .catch(error => {
            console.log(error);
            alert(error);
        });

}