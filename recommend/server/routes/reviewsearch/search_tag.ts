import * as http from 'http';
import { Router } from 'express';
import * as async from 'async';

import { error, hadLoginError, hadDbError, hadInputdataError } from '../../error_config';
import * as url from 'url';
import * as qstring from 'querystring';

import * as Review from '../../models/review';
import * as User from '../../models/user';

const searchtagRouter: Router = Router();
searchtagRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  const u = url.parse(req.url, false);
  const query = qstring.parse(u.query);

  const tag = JSON.parse(query.tag);
  let tags = [];
  if (tag !== undefined && tag.length !== 0 ) {
    tags = tag.map(data => {
      return { tag: data.value };
    });
    Review[0].find({ $or: tags },(err, review) => {
      if (err) return hadDbError(req, res);
      let reviewback = [];
      let list = [];
      reviewback = review;
      for (let i = 0; i < review.length; i++) {
        list.push({ id: review[i].hostid, number: i });
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
    });
  } else {
    res.send([]);
  }
});

export { searchtagRouter };
