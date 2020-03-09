import chai = require('chai');
import chaiHttp = require('chai-http');
import mongoose from 'mongoose';
import { describe } from 'mocha';

chai.use(chaiHttp);
const { expect } = chai;

import FastphotoApp from '../../server';
import * as sinon from 'sinon';
import { Task } from '../../models';
const TaskPrototype: mongoose.Document = Task.prototype;

const app = new FastphotoApp().application;

const goodTaskPayload = {
    title: '#saveasjpg',
    description: 'this task is for saving everything as jpg.',
    location: 'Paragon',
    owner: '5e54b4b7ccff1b11386db0d6',
    availableTime: new Date(),
    photoStyle: 'Graduation',
    price: 1234.4321,
    image: 'https://picsum.photos/200/300',
    createTime: new Date(),
};

describe('CreateTask', () => {
    describe('POST /createtask', () => {
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
        describe('UnAuthorized createTask', () => {
            it('Should be authorized before createTask', async () => {
                const unAuthorizedRes = await chai
                    .request(app)
                    .post('/createtask')
                    .send({ ...goodTaskPayload });
                expect(unAuthorizedRes).to.have.status(401);
            });
        });
    });
});
