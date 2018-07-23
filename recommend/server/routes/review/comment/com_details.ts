import * as http from 'http';
import { Router } from 'express';
import * as async from 'async';

import * as Review from '../../../models/review';
import * as Users from '../../../models/user';

import { error, hadLoginError, hadDbError, hadFavoriteaddSuccess } from '../../../error_config';

const comdetails: Router = Router();
comdetails.post('/' , (req: any, res: any, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  const reviewid = req.body.reviewid;

  Review[1].find({ mfo: reviewid },null,{ sort: { cuday: -1 } }, (err, resp) => {
    if (err) return hadDbError(req, res);
    let reviewback = [];
    let list = [];
    reviewback = resp;
    for (let i = 0; i < resp.length; i++) {
      list.push({ com: resp[i].com, number: i });
    }
    async.eachSeries(list, (data, next) => {// ユーザーIDをキーにして動的にWebページの投稿者名を変更する
      setTimeout(() => {
        Users.findOne({ _id: data.com },{},{},(err, result) => {
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
  });
});

export { comdetails };
