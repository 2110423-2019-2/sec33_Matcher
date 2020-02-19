import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { UserController, AuthController } from './controllers';
import { errorHandler, asyncHandler } from './utils/handlers';
import { ensureLoggedIn } from './utils/userHandlers';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { IUser, User } from './models';
import session from 'express-session';

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

        passport.serializeUser(async (user: IUser, done) => {
            return done(null, user.email);
        });

        passport.deserializeUser(async (email: string, done) => {
            const user = await User.findOne({ email });
            return done(null, user);
        });

        /* Start using middleware */
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(
            session({
                secret: process.env.SESSION_SECRET,
                resave: false,
                saveUninitialized: false,
            }),
        );
        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(
            new LocalStrategy(
                {
                    usernameField: 'email',
                    passwordField: 'password',
                },
                AuthController.loginLocal,
            ),
        );
        /* End of middlewares */

        // User Routing
        app.get('/', asyncHandler(UserController.hello));

        app.post('/register', asyncHandler(UserController.createUser));

        app.post('/login', passport.authenticate('local'), AuthController.login);

        app.get('/whoami', ensureLoggedIn(), AuthController.whoami);

        app.get('/logout', AuthController.logout);

        // TODO: createtask route
        // app.post('/createtask', ensureLoggedIn(), asyncHandle(TaskController.createTask))

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
