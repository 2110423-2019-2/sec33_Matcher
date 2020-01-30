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

        mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`, { useNewUrlParser: true });

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
