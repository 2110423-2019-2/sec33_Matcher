import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { UserController } from './controllers';

dotenv.config();

const port = process.env.PORT || 8080;

export default class FastphotoApp {
    application: Application;

    userController = new UserController();

    constructor() {
        const app = express();

        mongoose.connect(
            process.env.DB_CONNECTION_URI || `mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log('MongoDB Error'),
        );

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.get('/', (req, res) => {
            res.send('Hello World');
        });

        app.post('/register', this.userController.createUser);

        app.listen(port, () => {
            console.log(`Fastphoto listening on port ${port}!`);
        });

        this.application = app;
    }
}
