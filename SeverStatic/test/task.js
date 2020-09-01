const chai = require('chai');
const server = require('../server');
const chaiHttp = require('chai-http');
const { response } = require('express');
const { describe } = require('mocha');
chai.use(chaiHttp)


chai.should();

chai.use(chaiHttp);
describe("Task Api",()=>{
    //Test GET
    describe ("GET /api/user",()=>{
        it("it should GET all the task",(done)=>{
            chai.request(server)
                .get('/api/user')
                .end((err,response)=>{
                response.should.have.status(200)
                response.body.should.be.a('array')
                response.body.length.should.be.eq(2);
            done();
            })
    })
        it("it should NOT GET all the task",(done)=>{
            chai.request(server)
                .get('/api/usersss')
                .end((err,response)=>{
                response.should.have.status(404);
            done();
            })
})
})
    //Test the GET (by id) route
    describe("GET/api/user/:id",()=>{
        it("it should GET all the task by ID",(done)=>{
            const taskID = 1; 
            chai.request(server)
                .get("/api/user/" + taskID)
                .end((err,response)=>{
                response.should.be.a('object');
                response.body.should.have.property('userName');
                response.body.should.have.property('id').equal(1);
            done();    
            })
        })
        it("it should not GET task by ID",(done)=>{
            const taskID = 123; 
            chai.request(server)
                .get("/api/user/" + taskID)
                .end((err,response)=>{
                response.should.have.status(404);
                response.text.should.equal(' not found user given ID')
            done();    
            })
        })

    })
    //Test POST route
    describe("POST/api/user/",()=>{
        it("it should POST all the task by ID",(done)=>{
            const user = {
                userName: 'rubydog',
                password: '123456',
        }; 
            chai.request(server)
                .post("/api/user/register")
                .send(user)
                .end((err,response)=>{
                response.should.be.a('object');
                response.body.should.have.property('userName').eq("rubydog");
                response.body.should.have.property("password").eq("123456");
                response.body.should.have.property('id').equal(3);
            done();    
            })
        })
    })
    //TEST PUT route
    describe("PUT/api/user/:id",()=>{
        it("it should POST all the task by ID",(done)=>{
            const user = {
                id : 1,
                userName: 'sssrubydog',
                password: '123456',
        }; 
            chai.request(server)
                .put("/api/user/fix")
                .send(user)
                .end((err,response)=>{
                response.should.be.a('object');
                response.body.should.have.property('userName').eq("sssrubydog");
                response.body.should.have.property("password").eq("123456");
            done();    
            })
        })
    })
})

