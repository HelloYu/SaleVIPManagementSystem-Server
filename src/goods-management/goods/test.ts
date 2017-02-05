import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../app';

chai.use(chaiHttp);

const expect = chai.expect;

const api = '/api/goods';
let apiById;
let goods;

describe('Goods API Test', () => {
  before(function (done) {
    chai.request(app).get(api)
      .then(res => {

        goods = res.body.data[0];

        apiById = api + `/${goods._id}`;

        done();
      });
  });

  // GET api/goods
  describe('GET api/goods', () => {

    it('responds with JSON array', () => {
      return chai.request(app).get(api)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body.data).to.be.an('array');
        });
    });


    it('should include an item with keys', () => {
      return chai.request(app).get(api)
        .then(res => {
          let result = res.body.data.find(item => item.name === goods.name);
          expect(result).to.exist;
          expect(result).to.have.all.keys([
            "_id",
            "operator",
            "store",
            "class",
            "code",
            "name",
            "portrait",
            "short_name",
            "unit",
            "type",
            "exchange_points",
            "discount_rate",
            "lowest_discount_rate",
            "inventories",
            "reward_points",
            "entry_price",
            "sale_price",
            "remark"
          ]);


        });
    });

    // GET api/goods/:id
    describe('GET api/goods/:id', () => {

      it('responds with JSON object', () => {

        return chai.request(app).get(apiById)
          .then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
          });
      });

      it('should return the item', () => {
        return chai.request(app).get(apiById)
          .then(res => {
            expect(res.body.name).to.equal(goods.name);
          });
      });

    });
  });

  // create new goods
  describe('POST api/goods', () => {

    it('responds with JSON object', () => {

    });

  });

  // Delete an goods
  describe('Delete api/goods/:id', () => {

    it('responds with JSON object', () => {

    });

  });

});


