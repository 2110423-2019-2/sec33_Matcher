import chai = require('chai');
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

import FastphotoApp from '../../server';

const app = new FastphotoApp().application;

describe('Test the root path', () => {
    it('It should response the GET method', async () => {
        const res = await chai.request(app).get('/');
        expect(res).to.have.status(200);
    });
});
