const path = require ('path');
const express = require ('express');
const cookieParser = require ('cookie-parser');

const getFilesSync = require ('../utils/fileLooping');

class App {

    constructor (client, locals = {}) {

        this.express = express();
        this.express.set('views', 'views');
        this.express.set('view engine', 'ejs');
        this.express.set('client', client);
        this.express.use(cookieParser());
        this.express.use('/static', express.static(path.join('public')))
        this.express.use('/images', express.static(path.join('images')))
        this.express.use('/storage', express.static(path.join('storage')))
        this.express.locals = locals;

        this
        .loadRoutes()
        .loadErrorHandler();
    }

    listen (port) {

        return new Promise((resolve) => this.express.listen(port, resolve));
    }
    

    /**
     * LOAD ALL THE ROUTE FILES
     */
    loadRoutes() {

        const route_paths = path.join(__dirname, '../routes');

        const routes = getFilesSync(route_paths);

        if (!routes.length) return this;

        routes.forEach((fileName) => {

            const route = require (path.join(route_paths, fileName));

            const routePath = fileName === "index.js" ? "/" : `/${fileName.slice(0, -3)}`;

            try {

                this.express.use(routePath, route);
            } catch (error) {
                console.error(`Error occured with the route "${fileName}"\n\n${error}`);
            }
        });

        return this;
    }

    /**
     * INITIALIZE THE ERROR HANDLER
     */
    loadErrorHandler() {

        this.express.use((error, _req, res, _next) => {

            const { message, statusCode = 500 } = error;

            if (statusCode >= 500) console.error(error);

            res.status(statusCode).send({
                message,
                status: statusCode
            });
        });
    }
}

module.exports = App;
