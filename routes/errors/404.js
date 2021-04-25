const { Router } = require("express");
const route = Router();

route.get('/', (req, res) => {

    res.render('404');
});

module.exports = route;
