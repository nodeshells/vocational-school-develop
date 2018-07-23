import * as http from 'http';
import { Router } from 'express';

import * as Review from '../../../models/review';

import { error, hadLoginError, hadDbError, hadFavoriteaddSuccess, hadFavoritedelSuccess } from '../../../error_config';

const reviewfavdel: Router = Router();
reviewfavdel.post('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);

  // Review[0].findOne({ _id: req.body.id },(err, data) => {
  //   if (err) return hadDbError(req, res);

  //   return hadFavoritedelSuccess(req, res);
  // });
  Review[0].findOneAndUpdate({ _id: req.body.id },{ $pull: { fav: req.session.user } },{ 'new': true },(err) => {
    if (err) return hadDbError(req, res);
    return hadFavoritedelSuccess(req, res);
  });
});

export { reviewfavdel };
