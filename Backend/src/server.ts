import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { UserController } from './controllers';
import { errorHandler, asyncHandler } from './utils/handlers';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { IUser, User } from './models';

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
            err => {
                if (err) console.log('MongoDB Error');
            },
        );

        passport.serializeUser(function (user: IUser, done) {
            done(null, user.email);
        });

        passport.deserializeUser(function (email, done) {
            User.findOne(email, function (err, user) {
                done(err, user);
            });
        });

        /* Start using middleware */
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            this.userController.loginLocal
        ));
        /* End of middlewares */

        app.get('/', asyncHandler(this.userController.hello));

        app.post('/register', asyncHandler(this.userController.createUser));

        app.post('/login', passport.authenticate('local'), this.userController.login);

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
