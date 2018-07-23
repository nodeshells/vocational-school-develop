import * as http from 'http';
import { Router } from 'express';

import * as Review from '../../../models/review';

import { error, hadLoginError, hadDbError, hadFavoriteaddSuccess } from '../../../error_config';

const reviewfavadd: Router = Router();
reviewfavadd.post('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);

  Review[0].findOneAndUpdate({ _id: req.body.id },{ $push: { fav: req.session.user } },{ upsert: true },(err) => {
    if (err) return hadDbError(req, res);
    return hadFavoriteaddSuccess(req, res);
  });
});

export { reviewfavadd };
