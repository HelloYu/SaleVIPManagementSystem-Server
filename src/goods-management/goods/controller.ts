import { Request, Response, NextFunction } from 'express';
import * as mongoose from "mongoose";
import GoodsModel from './model';
import { IList } from './model';

export class GoodsController {

  constructor() {

  }

  /**
   * GET one goods by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let model = res.locals.model;

    res.status(200).send(model);

  }

  /**
  * GET all Goods.
  */
  public getAll(req: Request, res: Response, next: NextFunction) {


    let list = <IList>{};

    let query = req.query;

   

    let getList = GoodsModel.find(query,(err, result) => {
      if (err) return console.error(err);
      list.data = result;
    });

    let getCount = GoodsModel.count(query, (err, count) => {
      list.record = count;
    });

    Promise.all([getList, getCount]).then(result => {
      res.send(list);
    });

  }

  /**
   * create new goods.
   */
  public create(req: Request, res: Response, next: NextFunction) {
    let newGoods = new GoodsModel(req.body);

    newGoods.save((err, newGoods) => {
      if (err) {
        return res.status(400).send({
          message: err
        });
      }

      res.status(200).send(newGoods);

    });
  }

  /**
   * delete goods by id.
   */
  public delete(req: Request, res: Response, next: NextFunction) {

    let model = res.locals.model;

    model.remove();
    res.status(200).send();

  }

  /**
  * update goods by id.
  */
  public update(req: Request, res: Response, next: NextFunction) {

    let model = res.locals.model;

    let item = req.body;

    // single object update
    for (let key in item) {
      if (model[key]) {
        model[key] = item[key];
      }
    }

    model.save((err, result) => {
      if (err) {
        return res.status(400).send({
          message: err
        });
      }

      res.status(200).send(result);
    });

  }

  /**
   *  middleware
   */
  public byID(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: 'ID is invalid'
      });
    }

    GoodsModel.findById(id, (err, result) => {

      if (err) {
        return next(err);
      }

      if (!result) {
        return res.status(404).send({
          message: 'No goods found with the given id.',
          status: res.status
        });
      }

      res.locals.model = result;
      next();
    });
  }
}
const goodsController = new GoodsController();

export default goodsController;
