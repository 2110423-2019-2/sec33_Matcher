import chai = require('chai');
import chaiHttp = require('chai-http');
import { describe } from 'mocha';
import { User } from '../../models';

chai.use(chaiHttp);
const { expect } = chai;

import FastphotoApp from '../../server';
import * as sinon from 'sinon';

const app = new FastphotoApp().application;

const dummyUser = {
    firstname: 'Clara',
    lastname: 'Carlson',
    email: 'pearl.williams@hotmail.com',
    password: '$2a$10$6UYIYs8P4rdiBV1VxhJAWOviB2qCOEF0JropzuoOsF6I9r/W6PJEy', //password
    createTime: String(new Date()),
    role: 'photographer',
};

const dummyLoginPayload = {
    email: 'pearl.williams@hotmail.com',
    password: 'password',
};

describe('Profile', () => {
    describe('GET /profile', () => {
        beforeEach(() => {
            sinon
                .mock(User)
                .expects('findOne')
                .atLeast(1)
                .atMost(2)
                .resolves(dummyUser);
        });

        afterEach(() => {
            sinon.restore();
        });

        it('Should return Unauthorized for unauth user', async () => {
            const res = await chai.request(app).get('/profile');
            expect(res).to.have.status(401);
        });

        it('Should return all user fields except password correctly', async () => {
            const agent = chai.request.agent(app);
            await agent.post('/login').send(dummyLoginPayload);
            const res = await agent.get('/profile');
            expect(res).to.have.status(200);
            const expected = dummyUser;
            delete expected.password;
            expect(res.body).to.deep.equal(expected);
        });
    });
});
