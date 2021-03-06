import chai = require('chai');
import chaiHttp = require('chai-http');
import { describe } from 'mocha';
import mongoose from 'mongoose';

chai.use(chaiHttp);
const { expect } = chai;

import FastphotoApp from '../../server';
import * as sinon from 'sinon';
import { Task } from '../../models';
import { PhotoStyles } from '../../const';
const TaskPrototype: mongoose.Document = Task.prototype;

const app = new FastphotoApp().application;

const goodTaskPayload = {
    title: '#saveasjpg',
    location: 'Paragon',
    photoStyle: PhotoStyles.WEDDING,
    price: 1234.4321,
    image: 'https://picsum.photos/200/300',
};

const dummyPhotographerLoginPayload = {
    email: 'prayuthza@gmail.com',
    password: '12345678',
};
const dummyCustomerLoginPayload = {
    email: 'poom007.sk135@gmail.com',
    password: '12345678',
};

describe('CreateTask', () => {
    describe('POST /task', () => {
        beforeEach(() => {
            sinon.stub(Task.prototype, 'save');
            (TaskPrototype.save as sinon.SinonStub).callsFake(function(this: any) {
                const currentRecord = this;
                return Promise.resolve(currentRecord);
            });
            sinon
                .mock(Task)
                .expects('exists')
                .atLeast(0)
                .resolves(false);
        });

        afterEach(() => {
            (TaskPrototype.save as sinon.SinonStub).restore();
            sinon.restore();
        });
        describe('Unauthorized create task', () => {
            it('Should be authorized before createTask', async () => {
                const unAuthorizedRes = await chai
                    .request(app)
                    .post('/task')
                    .send({ ...goodTaskPayload });
                expect(unAuthorizedRes).to.have.status(401);
            });
        });
        describe('Authorized create task', () => {
            const agent = chai.request.agent(app);
            beforeEach(async () => {
                await agent.post('/login').send(dummyCustomerLoginPayload);
            });

            it('Should contains all required fields', async () => {
                const noTitleRes = await agent.post('/task').send({ ...goodTaskPayload, title: undefined });
                expect(noTitleRes).to.have.status(400);

                const noLocationRes = await agent.post('/task').send({ ...goodTaskPayload, location: undefined });
                expect(noLocationRes).to.have.status(400);

                const noPhotoStyleRes = await agent.post('/task').send({ ...goodTaskPayload, photoStyle: undefined });
                expect(noPhotoStyleRes).to.have.status(400);

                const noPriceRes = await agent.post('/task').send({ ...goodTaskPayload, price: undefined });
                expect(noPriceRes).to.have.status(400);

                const goodRes = await agent.post('/task').send({ ...goodTaskPayload });
                expect(goodRes).to.have.status(200);
            });
            it('Task should be created by "customer" or "admin"', async () => {
                const agent = chai.request.agent(app);

                await agent.post('/login').send(dummyCustomerLoginPayload);
                const goodRes1 = await agent.post('/task').send({ ...goodTaskPayload });
                expect(goodRes1).to.have.status(200);
                // await agent.get('/logout');

                await agent.post('/login').send(dummyPhotographerLoginPayload);
                const badRes1 = await agent.post('/task').send({ ...goodTaskPayload });
                expect(badRes1).to.have.status(400);
                // await agent.get('/logout');
            });
            it('Price should be positive number or zero', async () => {
                const agent = chai.request.agent(app);
                await agent.post('/login').send(dummyPhotographerLoginPayload);

                const badRes1 = await agent.post('/task').send({ ...goodTaskPayload, price: -1.2 });
                expect(badRes1).to.have.status(400);

                const priceZeroRes = await agent.post('/task').send({ ...goodTaskPayload, price: 0 });
                expect(priceZeroRes).to.have.status(400);
            });
            it('Title length should be between 1-20 inclusive', async () => {
                const agent = chai.request.agent(app);
                await agent.post('/login').send(dummyPhotographerLoginPayload);

                const badRes1 = await agent.post('/task').send({ ...goodTaskPayload, title: '' });
                expect(badRes1).to.have.status(400);

                const badRes2 = await agent.post('/task').send({ ...goodTaskPayload, title: '111111111111111111111' });
                expect(badRes2).to.have.status(400);
            });
        });
    });
});
