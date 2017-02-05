import { Request, Response, NextFunction } from 'express';
import * as mongoose from "mongoose";
import * as jwt from 'jsonwebtoken';
import * as config from '../config';
import User from '../users/model';

export class AuthenticateController {

    constructor() {

    }
    /**
     * login 
     */
    public login(req: Request, res: Response, next: NextFunction) {
        // find the user
        User.findOne({
            username: req.body.username
        }, function (err, user) {

            if (err) throw err;

            if (!user) {
                res.status(400).send({ message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.status(401).send({ message: 'Authentication failed. Wrong password.' });
                } else {

                    let expiresIn = 86400;
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: expiresIn // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.send({

                        access_token: token,
                        expires_in: expiresIn
                    });
                }

            }

        });
    }
    /**
     * logout 
     */
    public logout(req: Request, res: Response, next: NextFunction) {
        delete res.locals.user;
        res.send({
            message: 'logout success!'
        });
    }
    /**
     * authenticate middleware 
     */
    public authenticate(req: Request, res: Response, next: NextFunction) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.status(400).send({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    res.locals.user = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(401).send({
                message: 'No token provided.'
            });

        }
    }
}

export default new AuthenticateController();