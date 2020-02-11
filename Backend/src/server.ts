import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { UserController } from './controllers';
import { errorHandler, asyncHandler } from './utils/handlers';

dotenv.config();

const port = process.env.PORT || 8080;

export default class FastphotoApp {
    application: Application;

    constructor() {
        const app = express();

        mongoose.connect(
            process.env.DB_CONNECTION_URI || `mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`,
            { useNewUrlParser: true, useUnifiedTopology: true },
            err => {
                if (err) console.log('MongoDB Error');
            },
        );
        mongoose.set('useCreateIndex', true);

        /* Start using middleware */
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        /* End of middlewares */

        app.get('/', asyncHandler(UserController.hello));

        app.post('/register', asyncHandler(UserController.createUser));

        /* Middleware for error handling */
        app.use(errorHandler);
        /* End of error handling */

        // Prevent port collision when running tests.
        if (!module.parent || !/.*\.test\.ts\b/.test(module.parent.filename)) {
            app.listen(port, () => {
                console.log(`Fastphoto listening on port ${port}!`);
            });
        }

        this.application = app;
    }
}
