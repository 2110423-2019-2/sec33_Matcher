import chai = require('chai');
import chaiHttp = require('chai-http');
import { describe } from 'mocha';
import { User } from '../../models';
import { Document } from 'mongoose';

chai.use(chaiHttp);
const { expect } = chai;

import FastphotoApp from '../../server';
import * as sinon from 'sinon';
const UserPrototype: Document = User.prototype;

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
    beforeEach(() => {
        sinon
            .mock(User)
            .expects('findOne')
            .atLeast(0)
            .atMost(20)
            .resolves(dummyUser);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('GET /profile', () => {
        it('Should return Unauthorized for unauth user', async () => {
            const res = await chai.request(app).get('/profile');
            expect(res).to.have.status(401);
        });

        it('Should return all user fields except password correctly', async () => {
            const agent = chai.request.agent(app);
            await agent.post('/login').send(dummyLoginPayload);
            const res = await agent.get('/profile');
            expect(res).to.have.status(200);
            const expected = JSON.parse(JSON.stringify(dummyUser));
            delete expected.password;
            expect(res.body).to.deep.equal(expected);
        });
    });

    describe('POST /profile', () => {
        beforeEach(() => {
            sinon
                .mock(User)
                .expects('findByIdAndUpdate')
                .atLeast(0)
                .atMost(20)
                .resolves(dummyUser);
        });

        afterEach(() => {
            // (UserPrototype.save as sinon.SinonStub).restore();
            sinon.restore();
        });

        it('Should return Unauthorized for unauth user', async () => {
            const res = await chai.request(app).post('/profile');
            expect(res).to.have.status(401);
        });

        it('Should not update role and createTime', async () => {
            const agent = chai.request.agent(app);
            await agent.post('/login').send(dummyLoginPayload);
            const badRes = await agent.post('/profile').send({
                firstname: 'Octocat',
                role: 'admin',
                createTime: new Date(new Date().getTime() + 86400000),
            });
            expect(badRes).to.have.status(400);
            const goodRes = await agent.post('/profile').send({
                firstname: 'Rebecca',
                lastname: 'Davis',
                password: 'password123',
            });
            expect(goodRes).to.have.status(200);
        });
    });
});
