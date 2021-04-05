const request = require('supertest');
const app = require('../server');
const db = require('./db-handler');

// Pass supertest agent for each test
const agent = request.agent(app);
//
beforeAll(async () => await db.connect());
// /**
//  * Clear all test data after every test.
//  */
//afterEach(async () => await db.clear());
//
// /**
//  * Remove and close the db and server.
//  */
//
afterAll(async () => await db.close());


describe('Testing POST and the Unique name constraint', () => {
    test('It should store a new secteur',  done => {
        agent
            .post('/secteurs/add')
            .send({ nom: 'Camel', description: 'Some Description'})
            .expect(200)
            .then(res => {
                done();
            });
    });
    test('It should not store a new secteur',  done => {
        agent
            .post('/secteurs/add')
            .send({ nom: 'Camel', description: '3333'})
            .expect(400)
            .then(res => {
                done();
            });
    });
});