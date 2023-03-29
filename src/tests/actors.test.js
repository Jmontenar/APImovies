const request = require('supertest');
const app = require('../app.js');
require('../models')

let actorsId;

test("POST /actors should return 2 actors", async() => {
    const newActors = {
        firstname: "Will Carroll",
        lastname: "Smith",
        nationality: "USA",
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/will-smith-oscar-1648468976.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*",
        birthday: "1968-09-25"
    }
    const res = await request(app).post('/actors').send(newActors);
    actorsId = res.body.id
		expect(res.status).toBe(201);
        expect(res.body.firstname).toBe(newActors.firstname);
})

test("GET /actors should return all actors", async() =>{
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("PUT /actors/:id should update one actors", async() => {
    const body = {
        firstname: "Will",
        lastname: "Smith"
    }
    const res = await request(app)
    .put(`/actors/${actorsId}`)
    .send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstname).toBe(body.firstname);
})

test("DELETE /actors/:id should delete one actors", async() => {
    const res = await request(app).delete(`/actors/${actorsId}`);
    expect(res.status).toBe(204)
})