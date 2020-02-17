const request = require('supertest');
const app = require('../app');
const server = require('../server.js');
let supertest = require('supertest');


describe('Test GET all records works', () => {
        test('It should response code:0 GET method', (done) => {
            request(server).get('/api/records').then((response) => {
                expect(response.body.code).toBe(0);
                done();
            });
        });
});

describe('Test POST filter method works', () => {
    test('It should response code:0 and msg:success POST method ', (done) => {
        var params = {
            startDate: '2016-03-01',
            endDate: '2017-05-01',
            minCount: 0,
            maxCount: 1000,
        };
        request(server).post('/api/records').send(params).then((response) => {
            expect(response.body.code).toBe(0);
            expect(response.body.msg).toBe('success');
            done();
        });
    });
});

describe('Test POST records filter with params', () => {
    test('Records must be greater than 0 with params of POST request', (done) => {
        var params = {
            startDate: '2016-01-01',
            endDate: '2018-01-01',
            minCount: 0,
            maxCount: 1000,
        };
        request(server).post('/api/records').send(params).then((response) => {
            var records = response.body.records.length;
            expect(records).toBeGreaterThan(0);
            done();
        });
    });
});




