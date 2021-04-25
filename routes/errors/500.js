const { Router } = require("express");
const route = Router();

route.get('/', (req, res) => {

    res.render('500');
});

module.exports = route;
