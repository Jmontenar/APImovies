const request = require('supertest');
const app = require('../app.js');
require('../models')

let directorsId;

test("POST /directors should return 2 directors", async() => {
    const newDirector = {
        firstname: "Quentin Jerome",
        lastname: "Tarantino",
        nationality: "USA",
        image: "https://variety.com/wp-content/uploads/2023/03/1324F06_DX128.jpg?w=681&h=383&crop=1",
        birthday: "1963-03-27"
    }
    const res = await request(app).post('/directors').send(newDirector);
    directorsId = res.body.id
		expect(res.status).toBe(201);
        expect(res.body.firstname).toBe(newDirector.firstname);
})

test("GET /directors should return all directors", async() =>{
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("PUT /directors/:id should update one actors", async() => {
    const body = {
        firstname: "Quentin",
        lastname: "Tarantino",
    }
    const res = await request(app)
    .put(`/directors/${directorsId}`)
    .send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstname).toBe(body.firstname);
})

test("DELETE /directors/:id should delete one directors", async() => {
    const res = await request(app).delete(`/directors/${directorsId}`);
    expect(res.status).toBe(204)
})


