import request from 'supertest';
import FastphotoApp from '../../server';

const app = new FastphotoApp().application;

describe('Test the root path', () => {
    test('It should response the GET method', async done => {
        return await request(app)
            .get('/')
            .then(response => {
                expect(response.status).toBe(200);
                done();
            });
    });
});
