const request = require('supertest');
const app = require('../app.js');
const Actors = require('../models/Actors.js');
const Directors = require('../models/Directors.js');
const Genre = require('../models/Genre.js');
require('../models')

let moviesId;

test("POST /movies should return 2 movies", async() => {
    const newMovie = {
        name: "Hostel",
        image: "https://es.web.img3.acsta.net/c_310_420/medias/nmedia/18/89/70/34/20062844.jpg",
        synopsis: "La serie de películas Hostel consta de películas estadounidenses de terror salpicado, que incluyen dos películas teatrales y una película de estreno directo a casa.",
        releaseYear: 2005
    }
    const res = await request(app).post('/movies').send(newMovie);
    moviesId = res.body.id
		expect(res.status).toBe(201);
        expect(res.body.name).toBe(newMovie.name);
})

test("GET /movies should return all movies", async()=>{
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("PUT /movies/:id should update one movies", async() => {
    const body = {
        name: "Hostel II"
    }
    const res = await request(app)
    .put(`/movies/${moviesId}`)
    .send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
})

test("POST /movies/:id/genres should set the genre movies", async()=>{
    const genre = await Genre.create({name: "Terror"});
    const res = await request(app)
    .post(`/movies/${moviesId}/genres`)
    .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1)
})

test("POST /movies/:id/actors should set the actors movies", async()=>{
    const actors = await Actors.create({
        firstname: "Denzel",
        lastname: "Washington",
        nationality: "USA",
        image: "https://elcomercio.pe/resizer/qAvj2qpinttjOJZhA9XygExJLdI=/1200x1200/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/JZPDCUSTGRBIBBFRUHGZ2O746M.jpg",
        birthday: "1989-12-28"
    });
    const res = await request(app)
    .post(`/movies/${moviesId}/actors`)
    .send([actors.id]);
    await actors.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1)
})

test("POST /movies/:id/directors should set the directors movies", async()=>{
    const directors = await Directors.create({
        firstname: "Steven",
        lastname: "Spielberg",
        nationality: "USA",
        image: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/T6B4RGXLGBF7TIOIHNPP7LNKRM.jpg",
        birthday: "1946-12-18"
    });
    const res = await request(app)
    .post(`/movies/${moviesId}/directors`)
    .send([directors.id]);
    await directors.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1)
})

test("DELETE /movies/:id should delete one movies", async() => {
    const res = await request(app).delete(`/directors/${moviesId}`);
    expect(res.status).toBe(204)
})
