import {Router} from 'express';
import AuthenticateController from './controller'

export class AuthenticateRouter {
  public router: Router

  /**
   * Initialize the AuthenticateRouter
   */
  constructor() {
    this.router = Router();
  }


  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {

    this.router.post('/login', AuthenticateController.login);
    this.router.get('/logout', AuthenticateController.login);
    this.router.use('/api', AuthenticateController.authenticate);
    
  }

}

// Create the AuthenticateRouter, and export its configured Express.Router
let AuthenticateRoutes = new AuthenticateRouter();
AuthenticateRoutes.init();

export default AuthenticateRoutes.router;