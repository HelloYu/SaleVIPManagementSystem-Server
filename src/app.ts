import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as config from './config';
// Routers
import GoodsRouter from './goods-management/goods/router';
import AuthenticateRouter from './authentication/router'

// authenticate middleware
import AuthenticateController from './authentication/controller';
// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.initDB();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // init MongoDB 
    private initDB(): void {
        // TODO: able to switch dev database for test.
        mongoose.connect(config.db);
    }

    
    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });

        this.express.use('/', router);
        this.express.use(AuthenticateRouter);
        this.express.use('/api/goods', GoodsRouter);

    }

}

export default new App().express;