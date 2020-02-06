import chai = require('chai');
import chaiHttp = require('chai-http');
import mongoose from 'mongoose';
import { describe } from 'mocha';
import { compareSync } from 'bcryptjs';

chai.use(chaiHttp);
const { expect } = chai;

import FastphotoApp from '../../server';
import * as sinon from 'sinon';
import { User } from '../../models';
const UserPrototype: mongoose.Document = User.prototype;

const app = new FastphotoApp().application;

const goodUserPayload = {
    email: 'prayuthza@gmail.com',
    password: '12345678',
    firstname: 'Prayuth',
    lastname: 'Jun o cha',
    role: 'photographer',
};

describe('Registration', () => {
    describe('POST /register', () => {
        beforeEach(() => {
            sinon.stub(User.prototype, 'save');

            (UserPrototype.save as sinon.SinonStub).callsFake(function(this: any) {
                const currentRecord = this;
                return Promise.resolve(currentRecord);
            });
        });

        afterEach(() => {
            (UserPrototype.save as sinon.SinonStub).restore();
        });

        it('Should contains all required fields', async () => {
            const noEmailRes = await chai
                .request(app)
                .post('/register')
                .send({ ...goodUserPayload, email: undefined });
            expect(noEmailRes).to.have.status(400);

            const noFirstnameRes = await chai
                .request(app)
                .post('/register')
                .send({ ...goodUserPayload, firstname: undefined });
            expect(noFirstnameRes).to.have.status(400);

            const noLastnameRes = await chai
                .request(app)
                .post('/register')
                .send({ ...goodUserPayload, lastname: undefined });
            expect(noLastnameRes).to.have.status(400);

            const noRoleRes = await chai
                .request(app)
                .post('/register')
                .send({ ...goodUserPayload, role: undefined });
            expect(noRoleRes).to.have.status(400);

            const noPassword = await chai
                .request(app)
                .post('/register')
                .send({ ...goodUserPayload, password: undefined });
            expect(noPassword).to.have.status(400);
        });

        it('Role should be either "photographer" or "customer"', async () => {
            const goodRes1 = await chai
                .request(app)
                .post('/register')
                .send({ ...goodUserPayload, role: 'photographer' });
            expect(goodRes1).to.have.status(200);

            const goodRes2 = await chai
                .request(app)
                .post('/register')
                .send({ ...goodUserPayload, role: 'customer' });
            expect(goodRes2).to.have.status(200);

            const badRes = await chai
                .request(app)
                .post('/register')
                .send({ ...goodUserPayload, role: 'admin' });
            expect(badRes).to.have.status(400);
        });

        it('Should validate good email properly', async () => {
            const res = await chai
                .request(app)
                .post('/register')
                .send(goodUserPayload);
            expect(res).to.have.status(200);
        });

        it('Should reject bad email', async () => {
            const res = await chai
                .request(app)
                .post('/register')
                .send({ ...goodUserPayload, email: 'prayuthza555+' });
            expect(res).to.have.status(400);
        });

        it('Firstname and Lastname length must be between 2 and 20 characters', async () => {
            const nameTooShortRes = await chai
                .request(app)
                .post('/register')
                .send({ ...goodUserPayload, firstname: 'a', lastname: 'x' });
            expect(nameTooShortRes).to.have.status(400);

            const nameTooLongRes = await chai
                .request(app)
                .post('/register')
                .send({
                    ...goodUserPayload,
                    firstname: 'longggggggggggggggggg',
                    lastname: 'warningvalidatorisdefinedbutneverused',
                });
            expect(nameTooLongRes).to.have.status(400);

            const goodNameRes = await chai
                .request(app)
                .post('/register')
                .send({ ...goodUserPayload, firstname: 'Nisaruj', lastname: 'Rattanaaram' });
            expect(goodNameRes).to.have.status(200);
        });

        it('Password length must be between 8 and 20 characters', async () => {
            const passwordTooShortRes = await chai
                .request(app)
                .post('/register')
                .send({ ...goodUserPayload, password: 'eieieie' });
            expect(passwordTooShortRes).to.have.status(400);

            const passwordTooLongRes = await chai
                .request(app)
                .post('/register')
                .send({ ...goodUserPayload, password: 'longgggggggggggggggggggggggggggg' });
            expect(passwordTooLongRes).to.have.status(400);

            const goodPasswordRes = await chai
                .request(app)
                .post('/register')
                .send({ ...goodUserPayload, password: 'password1234' });
            expect(goodPasswordRes).to.have.status(200);
        });
    });

    describe('Hashing', () => {
        let record: any;
        beforeEach(() => {
            sinon.stub(User.prototype, 'save');

            (UserPrototype.save as sinon.SinonStub).callsFake(function(this: any) {
                const currentRecord = this;
                record = currentRecord;
                return Promise.resolve(currentRecord);
            });
        });

        afterEach(() => {
            (UserPrototype.save as sinon.SinonStub).restore();
        });

        it('Password must be hashed properly', async () => {
            const password = 'testhash123';
            await chai
                .request(app)
                .post('/register')
                .send({ ...goodUserPayload, password });
            expect(compareSync(password, record.password)).to.be.true;
        });
    });
});