import {Router} from 'express';
import GoodsController from './controller';

export class GoodsRouter {
  public router: Router

  /**
   * Initialize the GoodsRouter
   */
  constructor() {
    this.router = Router();
  }

 

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    console.info('init');
    this.router.get('/', GoodsController.getAll);
    this.router.get('/:id', GoodsController.getOne);
    this.router.delete('/:id', GoodsController.delete);
    this.router.put('/:id', GoodsController.update);
    this.router.patch('/:id', GoodsController.update);
    this.router.post('/', GoodsController.create);

    this.router.param('id', GoodsController.byID);
  }

}

// Create the GoodsRouter, and export its configured Express.Router
let GoodsRoutes = new GoodsRouter();
GoodsRoutes.init();

export default GoodsRoutes.router;