import express, { Application } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8080;

export default class FastphotoApp {
    application: Application;

    constructor() {
        const app = express();

        app.get('/', (req, res) => {
            res.send('Hello World');
        });

        app.listen(port, () => {
            console.log(`Fastphoto listening on port ${port}!`);
        });

        this.application = app;
    }
}
