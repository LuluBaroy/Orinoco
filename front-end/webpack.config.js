const path = require('path');

module.exports = {
    devServer: {
        port: 3000,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
        }
    },
    mode: "production",
    entry: {
        'index': [
            "./assets/js/index.js",
            "./assets/js/main.js"
        ],
        'products': [
            "./assets/js/main.js",
            "./assets/js/products.js"
        ],
        'cart': [
            "./assets/js/main.js",
            "./assets/js/cart.js",
            "./assets/js/suggestions.js",
            "./assets/js/form.js"
        ],
        'confirmation': [
            "./assets/js/main.js",
            "./assets/js/confirmation.js"
        ]
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    }
};