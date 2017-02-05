// import * as mocha from 'mocha';
// import * as chai from 'chai';
// import chaiHttp = require('chai-http');

// import app from '../../app';

// chai.use(chaiHttp);
// const expect = chai.expect;

// const api = '/api/goods';

// describe('GET api/goods', () => {

//   it('responds with JSON array', () => {
//     return chai.request(app).get(api)
//       .then(res => {
//         expect(res.status).to.equal(200);
//         expect(res).to.be.json;
//         expect(res.body.data).to.be.an('array');
//         expect(res.body.data).to.have.length(5);
//       });
//   });

//   it('should include 安儿乐护舒宝', () => {
//     return chai.request(app).get(api)
//       .then(res => {
//         let result = res.body.data.find(item => item.name === '安儿乐护舒宝');
//         expect(result).to.exist;
//         expect(result).to.have.all.keys([
//            "id",
//             "operator",
//             "store",
//             "class",
//             "code",
//             "name",
//             "portrait",
//             "short_name",
//             "unit",
//             "type",
//             "exchange_points",
//             "discount_rate",
//             "lowest_discount_rate",
//             "inventories",
//             "reward_points",
//             "entry_price",
//             "sale_price",
//             "remark"
//         ]);
//       });
//   });

// });

// describe('GET api/goods/:id', () => {

//   it('responds with JSON object', () => {
//     return chai.request(app).get('/api/goods/1')
//       .then(res => {
//         expect(res.status).to.equal(200);
//         expect(res).to.be.json;
//         expect(res.body).to.be.an('object');
//       });
//   });

//   it('should return 安儿乐护舒宝', () => {
//     return chai.request(app).get('/api/goods/1')
//       .then(res => {
//         expect(res.body.name).to.equal('安儿乐护舒宝');
//       });
//   });

// });