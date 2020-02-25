import chai = require('chai');
import chaiHttp = require('chai-http');
import { describe } from 'mocha';

chai.use(chaiHttp);
const { expect } = chai;

import FastphotoApp from '../../server';
const app = new FastphotoApp().application;

describe('Root path', () => {
    describe('GET /', () => {
        it('Should return 200 OK', async () => {
            const res = await chai.request(app).get('/');
            expect(res).to.have.status(200);
        });
    });
});
