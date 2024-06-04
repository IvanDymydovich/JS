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
                const newLiItem = `<div class="list_items"><li> <input type="checkbox" class="select-item" data-id="${item.id}"><em><input class="button delete" type="button" value="Delete" onclick="deleteProduct(${item.id})"></em>
                        <em><input class="button update" type="button" value="Update" onclick="updateProduct(${item.id})"></em><span> Модель телефону:<b> ${item.model}</b> Версія: <b>${item.version} </b> </span> </li></div>`;
                container.insertAdjacentHTML('beforeend', newLiItem);
            })
            const button ='<div class="delete_check"><input class="button delete" type="button" value="Several Delete" onclick="delete_same_Product()"></div>'
            container.insertAdjacentHTML('beforeend', button);

        })
        .catch(error => {
            console.log(error);
            alert(error);
        });
}

function deleteProduct(id){
    const confirmResult = confirm("Ви хочете видалити цей продукт?");
    if(!confirmResult){return;}
    fetch(`/api/products/${id}`, {
        method: 'DELETE'})
        .then(document.location = "/products")
        .catch(error => {
            console.log(error);
            alert(error);
        });
    alert("Товар видалено");

}

function updateProduct(id){
    const newProductModel = prompt('На яку МОДЕЛЬ змінюємо?');
    const newProductVersion = prompt('А яка ВЕРСІЯ моделі?');

    if (!newProductModel || !newProductVersion) {
        return;
    }
    fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ version: newProductVersion ,model:newProductModel})
    })
        .then(document.location = "/products")
        .catch(error => {
            console.log(error);
            alert(error);
        });
    alert("Товар оновлено");
}
function delete_same_Product() {
    const confirmResult = confirm("Ви хочете видалити ці продукти?");
    if(!confirmResult){return;}
        const selectedItems = document.querySelectorAll('.select-item:checked');
    if (selectedItems.length === 0) {
        alert("Ви не обрали товари");
    }
    selectedItems.forEach(item => {
            const id = item.getAttribute('data-id');
            fetch(`/api/products/${id}`, {
                method: 'DELETE'})
                .then(document.location = "/products")
                .catch(error => {
                    console.log(error);
                    alert(error);
                });
        });

}