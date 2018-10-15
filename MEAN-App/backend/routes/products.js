var express = require('express');
var router = express.Router();
var Products = require('../models/products')
var UserProducts = require('../models/userProducts')

router.get('/', function (req, res) {
    Products.find().then(products => {
        return res.status(200).send(products);
    }).catch(err => {
        return res.status(501).send({ message: 'Some Internal Error' });
    })
})

router.post('/add', function (req, res, next) {
    UserProducts.create(req.body).then(() => {
        return res.status(201).json({ message: 'Product(s) Added' });
    }).catch(err => {
        console.log(err)
        return res.status(501).json({ message: 'Error saving products' })
    })
})

router.get('/myProducts', function (req, res) {
    UserProducts.find().then(products => {
        return res.status(200).send(products);
    }).catch(err => {
        return res.status(501).send({ message: 'Some Internal Error' });
    })
})

var decodedToken = '';
function verifyToken(req, res, next) {
    let token = req.query.token;

    jwt.verify(token, 'secret', function (err, tokendata) {
        if (err) {
            return res.status(400).json({ message: ' Unauthorized request' });
        }
        if (tokendata) {
            decodedToken = tokendata;
            next();
        }
    })
}

module.exports = router;
