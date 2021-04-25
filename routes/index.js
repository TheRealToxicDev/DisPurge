const { Router } = require("express");

const route = Router();

/**
* Error Page Routing
*/
const error_404 = require('./errors/404');
const error_500 = require('./errors/500');
route.use('/404', error_404);
route.use('/500', error_500);

route.get('/', (req, res) => {
  res.redirect(301, 'https://cordx.wtf/discord' + req.path)
});

route.use(function (req, res, next) {
    res.status(404).redirect('/404');
});

route.use(function (error, req, res, next) {
    res.status(500).redirect('/500');
    console.log(error)
});


module.exports = route;
