const express = require("express");
const Joi = require('joi');
const Router = express.Router();
const products = [
    {id: 1, time: "5:30", action: "Підйом"},
    {id: 2, time: "5:45", action: "Чистим зуби"},
    {id: 3, time: "6:30", action: "Виходим з дому"},
    {id: 4, time: "6:45", action: "Сідаємся в тролейбус"},
    {id: 5, time: "8:00", action: "Починаєм спати на парі"},
    {id: 6, time: "15:30", action: "Прихожу додому"},
    {id: 7, time: "16:00", action: "Кушаю"},
    {id: 8, time: "16:30", action: "Граю в компютерні ігри"},
    {id: 9, time: "19:00", action: "Прогулююсь з собакою"},
];
const productSchema = Joi.object({
    action: Joi.string()
        .min(3)
        .required(),

    time: Joi.string()
        .min(3)
        .required()
});

Router.route("/")
    .get((req, res) => {
        res.send(products);
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
            time: req.body.time,
            action: req.body.action
        }


        products.push(products_numb)
        res.send(products_numb);
    })
Router.route("/clearleast")
    .delete((req, res) => {
            // Удаление всех элементов массива
            products.splice(0, products.length);

            res.status(200).send(products)
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
        product.time = req.body.time;
        product.action = req.body.action;

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
            "Час виконання " + product.time + " Івент " + product.action);
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
