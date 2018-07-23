import * as http from 'http';
import { Router } from 'express';
import * as async from 'async';

import { error, hadLoginError, hadDbError } from '../../error_config';
import * as Review from '../../models/review';
import * as User from '../../models/user';

const reviewtopRouter: Router = Router();
reviewtopRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  Review[0].find({},null, { sort: { uday: -1 } },(err, account) => {
    if (err) return hadDbError(req, res);
    if (account) {
      let reviewback = [];
      let list = [];
      reviewback = account;
      for (let i = 0; i < account.length; i++) {
        list.push({ id: account[i].hostid, number: i });
      }
      async.eachSeries(list, (data, next) => {// ユーザーIDをキーにして動的にWebページの投稿者名を変更する
        setTimeout(() => {
          User.findOne({ _id: data.id },{},{},(err, result) => {
            if (err) return hadDbError(req, res);
            if (result === null) {
              reviewback[data.number].name = 'このユーザは存在しません。';
              reviewback[data.number].prop = './assets/prof/user13.png';
              return next();
            }
            // ↓要変更
            reviewback[data.number].name = result.name;
            reviewback[data.number].prop = result.prop;
            return next();
          });
        }, 0);
      }, () => {
        res.send(reviewback);
      });
    }
  });
});

export { reviewtopRouter };
