const express = require("express");
const Joi = require('joi');
const path = require("path");
const Router = express.Router();
const products = [
    {id: 1, model: "Iphone", version: "15 Pro Max"},
    {id: 2, model: "Iphone", version: "14 Pro"},
    {id: 3, model: "Iphone", version: "13 Pro"},
    {id: 4, model: "Xiaomi", version: "Poco F5"},
    {id: 5, model: "Xiaomi", version: "Poco M4 Pro"}
];
const productSchema = Joi.object({
    version: Joi.string()
        .alphanum()
        .min(3)
        .required(),

    model: Joi.string()
        .alphanum()
        .min(3)
        .required()
});

Router.route("/(.html)?")
    .get((req, res) => {
        let string_list = "";
        for (let j = 0; j < products.length; j++) {
            string_list += products[j].id + "МОДЕЛЬ ТЕЛЕФОНУ " + products[j].model + " ВЕРСІЯ ПРОДУКТУ " + products[j].version + '<br>';
        }
        res.send(string_list);
       // res.sendFile(path.join(__dirname, '../views/products.html'));
    })
    .post((req, res) => {
        const validationResult = productSchema.validate(req.body);

        if (validationResult.error) {
            console.log(validationResult.error);

            res.status(400).send(validationResult.error.details)
            return;
        }


        const id = find(products);
        const products_numb = {
            id: id,
            sku: req.body.model,
            name: req.body.version
        }


        products.push(products_numb)
        res.send(products_numb);
    })
Router.route("/:id")
    .put((req, res) => {
        const product = products.find(item => item.id == req.params.id)

        if (!product) {
            res.status(404).send(`Product with id: ${req.params.id} not found`)
        }
        const validationResult = productSchema.validate(req.body);

        if (validationResult.error) {
            console.log(validationResult.error.message);

            res.status(400).send(validationResult.error.details)
            return;
        }
        product.name = req.body.name;
        res.send(product);
    })
    .get((req, res) => {
        const product = products.find(item => item.id == req.params.id)
        res.send(show_l(product, req, res));
    })
    .delete((req, res) => {
        const product = products.find(item => item.id == req.params.id)

        if (!product) {
            res.status(404).send(`Product with id: ${req.params.id} not found`)
        }

        const indexOfProduct = products.indexOf(product);
        products.splice(indexOfProduct, 1)
        res.status(200).send(product)
    })
function show_l(product, req, res) {

    if (product) {

        return (//'id: ' + product.id //+
            " МОДЕЛЬ ТЕЛЕФОНУ " + product.model + " ВЕРСІЯ ПРОДУКТУ " + product.version);
    } else {
        res.status(404).send(`Product with id: ${req.params.id} not found`)
    }
}

function find(products) {
    let j = 0;
    for (let i = 0; i < products.length; i++) {
        if (i < products.length - 1 && products[i].id < products[i + 1].id) {
            j = products[i].id;
        } else {
            j = products[i].id;
        }
    }
    return j + 1;
}

module.exports = Router;