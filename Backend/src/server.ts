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
import { taskRoute, profileRoute } from './routes';
import { load as loadYAML } from 'yamljs';
import * as swaggerUI from 'swagger-ui-express';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 8080;

const whitelist = ['http://localhost:3000', 'https://fast-photo-8e48a.web.app'];
const corsOptions = {
    origin: (origin: string, callback: any): any => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

export default class FastphotoApp {
    application: Application;

    constructor() {
        const app = express();

        mongoose.connect(
            process.env.DB_CONNECTION_URI || `mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`,
            { useNewUrlParser: true, useUnifiedTopology: true },
            err => {
                if (err) console.log('MongoDB Error ' + err);
            },
        );
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);

        passport.serializeUser(async (user: IUser, done) => {
            return done(null, user.email);
        });

        passport.deserializeUser(async (email: string, done) => {
            const user = await User.findOne({ email });
            return done(null, user);
        });

        /* Start using middleware */

        /* Setup body parser */
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        if (process.env.DISABLE_CORS !== '1') {
            app.use(cors(corsOptions));
        }

        /* Setup session and passport */
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

        /* Setup swagger ui document */
        if (process.env.NODE_ENV !== 'production') {
            const swaggerDocument = loadYAML('./swagger.yaml');
            app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
        }
        /* End of middlewares */

        // User Routing
        app.get('/', asyncHandler(UserController.hello));

        app.post('/register', asyncHandler(UserController.createUser));

        app.post('/login', passport.authenticate('local'), AuthController.login);

        app.get('/whoami', ensureLoggedIn(), AuthController.whoami);

        app.get('/logout', AuthController.logout);

        app.use('/task', taskRoute);
        
        app.use('/profile', profileRoute);
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
