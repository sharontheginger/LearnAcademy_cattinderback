const request = require('supertest')
const app = require('../app')
jest.mock('../models/cat')

describe("App", ()=>{
  it("Tests the root path", ()=>{
    return request(app).get("/").then(response => {
      expect(response.statusCode).toBe(200)
    })
  })
  it("Lists cats", ()=>{
  return request(app).get("/cats").then(response =>{
    expect(response.statusCode).toBe(200)
    expect(response.body.cats[0].name).toBe('Paws')
  })
  })
  it("Creates cats", ()=>{
  return request(app)
    .post("/cats")
    .send({
      name: 'Morris',
      age: 2,
      city: "San Diego",
      bio: "Enjoys quiet evenings by the fire."
    })
    .then(response => {
      expect(response.statusCode).toBe(201)
      expect(response.body.cat.name).toBe('Morris')
      expect(response.body.cat.age).toBe(2)
      expect(response.body.cat.city).toBe("San Diego")
      expect(response.body.cat.bio).toBe("Enjoys quiet evenings by the fire.")
    })
    })
    it("Validates name when creating cat", ()=>{
  return request(app)
    .post("/cats")
    .send({
      age: 2,
      city: "San Diego",
      bio: "Food!"
    })
    .then(response =>{
      expect(response.statusCode).toBe(400)
      const error = response.body.errors.validations[0]
      expect(error.param).toBe('name')
      expect(error.msg).toBe('Is required')
})
})
})
