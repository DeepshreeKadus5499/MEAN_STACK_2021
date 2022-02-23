const server = require('./app');
const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.use(chaiHttp)
       
//login with credentials
describe('POST user login', () => {
    it('POST user login', async () => {
        let user = {"username":"Test","password":"Deepu@1251"}
      let res= await chai.request(server)
          .post('/user/login')
          .send(user)
          expect(res.status).to.equal(200)
    });

});

//register give 400 if already username is taken or existed

describe('POST user register', () => {
    it('POST user register', async () => {
        let user = {"username":"Sharvil12344","avatar":"","password":"Deepu@1265","confirmPassword":"Deepu@1265","email":"deep.kadus@gmail.com"}
      let res= await chai.request(server)
          .post('/user/register')
          .send(user)
          expect(res.status).to.equal(400)
    });

});

//add to cart will give 400 if already added

describe('POST add cart', () => {
    it('POST add cart', async () => {
        let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MjE1NDI5ZjQ1NWEwYzRlODg3YTFiNjEiLCJ1c2VybmFtZSI6IlRlc3QiLCJhdmF0YXIiOiJodHRwczovL2kuaW1ndXIuY29tLzRzNXFMelUucG5nIiwiaXNDb21tZW50c0Jsb2NrZWQiOmZhbHNlLCJpc0FkbWluIjpmYWxzZSwicm9sZXMiOlsiNjIxMTRhMjcxNGRhZTAwMzQwZGVjODJlIl19LCJpYXQiOjE2NDU1NjkyNTIsImV4cCI6MjI1MDM2OTI1Mn0.85bYzskxtQtPMudlURkRaCE0YvMsWH0exFEjSceQOVE'
      let res= await chai.request(server)
          .post('/user/cart/add/5b8002915b8f1b10d4b666dd')
         .set('Authorization', token)
          expect(res.status).to.equal(400)
    });

});

//get cart size

describe('GET cart size', () => {
    it('GET cart size', async () => {
     let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MjE1NDI5ZjQ1NWEwYzRlODg3YTFiNjEiLCJ1c2VybmFtZSI6IlRlc3QiLCJhdmF0YXIiOiJodHRwczovL2kuaW1ndXIuY29tLzRzNXFMelUucG5nIiwiaXNDb21tZW50c0Jsb2NrZWQiOmZhbHNlLCJpc0FkbWluIjpmYWxzZSwicm9sZXMiOlsiNjIxMTRhMjcxNGRhZTAwMzQwZGVjODJlIl19LCJpYXQiOjE2NDU1NjkyNTIsImV4cCI6MjI1MDM2OTI1Mn0.85bYzskxtQtPMudlURkRaCE0YvMsWH0exFEjSceQOVE'
      let res= await chai.request(server)
          .get('cart/getSize')
         .set('Authorization', token)
          expect(res.status).to.equal(400)
    });

});

//delete from cart
describe('DELETE cart delete', () => {
    it('DELETE cart delete', async () => {
        let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MjE1NDI5ZjQ1NWEwYzRlODg3YTFiNjEiLCJ1c2VybmFtZSI6IlRlc3QiLCJhdmF0YXIiOiJodHRwczovL2kuaW1ndXIuY29tLzRzNXFMelUucG5nIiwiaXNDb21tZW50c0Jsb2NrZWQiOmZhbHNlLCJpc0FkbWluIjpmYWxzZSwicm9sZXMiOlsiNjIxMTRhMjcxNGRhZTAwMzQwZGVjODJlIl19LCJpYXQiOjE2NDU1NjkyNTIsImV4cCI6MjI1MDM2OTI1Mn0.85bYzskxtQtPMudlURkRaCE0YvMsWH0exFEjSceQOVE'
      let res= await chai.request(server)
          .delete('user/cart/delete/5b8002915b8f1b10d4b666dd')
         .set('Authorization', token)
          expect(res.status).to.equal(200)
    });

});

//cart checkout

describe('POST cart checkout', () => {
    it('POST cart checkout', async () => {
     let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MjE1NDI5ZjQ1NWEwYzRlODg3YTFiNjEiLCJ1c2VybmFtZSI6IlRlc3QiLCJhdmF0YXIiOiJodHRwczovL2kuaW1ndXIuY29tLzRzNXFMelUucG5nIiwiaXNDb21tZW50c0Jsb2NrZWQiOmZhbHNlLCJpc0FkbWluIjpmYWxzZSwicm9sZXMiOlsiNjIxMTRhMjcxNGRhZTAwMzQwZGVjODJlIl19LCJpYXQiOjE2NDU1NjkyNTIsImV4cCI6MjI1MDM2OTI1Mn0.85bYzskxtQtPMudlURkRaCE0YvMsWH0exFEjSceQOVE'
     let grocery='{"6212a7378da13c387c3fecfd":1}'
      let res= await chai.request(server)
          .post('user/cart/checkout')
          .send(grocery)
         .set('Authorization', token)
          expect(res.status).to.equal(400)
    });

});

//get grocery details
describe('GET grocery details', () => {
    it('GET grocery details', async () => {
  
      let res= await chai.request(server)
          .get('grocery/details/5b8002905b8f1b10d4b666d2')
          expect(res.status).to.equal(400)
          console.log(res.body.message)
    });

});

//Updated price -edit grocery (admin functionality)
describe('PUT grocery', () => {
    it('PUT grocery', async () => {
     let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MjExNGEyYTE0ZGFlMDAzNDBkZWM4MzEiLCJ1c2VybmFtZSI6ImFkbWluIiwiYXZhdGFyIjoiaHR0cHM6Ly9pLmltZ3VyLmNvbS80czVxTHpVLnBuZyIsImlzQ29tbWVudHNCbG9ja2VkIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJyb2xlcyI6WyI2MjExNGEyNzE0ZGFlMDAzNDBkZWM4MmQiXX0sImlhdCI6MTY0NTYxODM3NywiZXhwIjoyMjUwNDE4Mzc3fQ.DT7QDyTjXtVwItC_3hvaOH0xR4dBqj7gdl4NiS_-xIk'
     let grocery='{"name":"Maggi","brand":"Nestle","category":"Maggi","mfgyear":2007,"description":"MAGGI 2 Minute Instant Noodles - Veggie Masala, Made With Quality Spices, Rich In Fibre","cover":"https://www.bigbasket.com/media/uploads/p/l/40237235_1-maggi-2-minute-instant-noodles-veggie-masala-made-with-quality-spices-rich-in-fibre.jpg","productid":"0765316889","quantity":592,"price":115}'
      let res= await chai.request(server)
          .put('grocery/edit/5b8002905b8f1b10d4b666d2')
          .send(grocery)
         .set('Authorization', token)
          expect(res.status).to.equal(200)
    });

});

//add to favorites

describe('POST grocery favourites', () => {
    it('POST grocery favourites', async () => {
     let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MjExNGEyYTE0ZGFlMDAzNDBkZWM4MzEiLCJ1c2VybmFtZSI6ImFkbWluIiwiYXZhdGFyIjoiaHR0cHM6Ly9pLmltZ3VyLmNvbS80czVxTHpVLnBuZyIsImlzQ29tbWVudHNCbG9ja2VkIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJyb2xlcyI6WyI2MjExNGEyNzE0ZGFlMDAzNDBkZWM4MmQiXX0sImlhdCI6MTY0NTYxODM3NywiZXhwIjoyMjUwNDE4Mzc3fQ.DT7QDyTjXtVwItC_3hvaOH0xR4dBqj7gdl4NiS_-xIk'
      let res= await chai.request(server)
          .post('grocery/addToFavorites/5b8002905b8f1b10d4b666d5')
         .set('Authorization', token)
          expect(res.status).to.equal(400)
    });

});

//delete - grocery (admin functionality)

describe('DELETE grocery', () => {
    it('DELETE grocery', async () => {
     let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MjExNGEyYTE0ZGFlMDAzNDBkZWM4MzEiLCJ1c2VybmFtZSI6ImFkbWluIiwiYXZhdGFyIjoiaHR0cHM6Ly9pLmltZ3VyLmNvbS80czVxTHpVLnBuZyIsImlzQ29tbWVudHNCbG9ja2VkIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJyb2xlcyI6WyI2MjExNGEyNzE0ZGFlMDAzNDBkZWM4MmQiXX0sImlhdCI6MTY0NTYxODM3NywiZXhwIjoyMjUwNDE4Mzc3fQ.DT7QDyTjXtVwItC_3hvaOH0xR4dBqj7gdl4NiS_-xIk'
       let res= await chai.request(server)
          .delete('grocery/delete/5b8002905b8f1b10d4b666d5')
         .set('Authorization', token)
          expect(res.status).to.equal(400)
        //   expect(res.body.message).to.equal("There is no grocery with the given id in our database.")
    });

});