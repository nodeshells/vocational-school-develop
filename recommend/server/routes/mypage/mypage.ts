import * as http from 'http';
import { Router } from 'express';
import * as url from 'url';
import * as qstring from 'querystring';

import { error, hadLoginError, hadDbError } from '../../error_config';
import * as Users from '../../models/user';
import * as Review from '../../models/review';

const mypageRouter: Router = Router();
mypageRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  const u = url.parse(req.url, false);
  const query = qstring.parse(u.query);

  readmypage(req, res, query);
});

function readmypage (req, res, query) {
  let userid = req.session.user;
  if ( query.id !== undefined ) {
    userid = query.id;
  }
  Users.findOne({ _id: userid }, (err, user) => {
    if (err) hadDbError(req, res);
    if (user) {
      let backdata = {
        _id: user._id,
        uid: user.uid,
        email: user.email,
        name: user.name,
        birthday: user.birthday,
        prop: user.prop,
        sex: user.sex,
        syoukai: user.syoukai,
        review: []
      };
      readreview(req, res, backdata);
    }
  });
}

function readreview (req, res, data) {
  Review[0].find({ hostid: data._id }, (err, result) => {
    if (err)return hadDbError(req, res);
    if (result.lenght === 0) return hadDbError(req, res);
    for (let i = 0; result.length > i ; i++) {
      let inputrev = {};
      inputrev['id'] = result[i]._id;
      inputrev['title'] = result[i].title;
      inputrev['fav'] = result[i].fav.length;
      inputrev['star'] = result[i].star;
      inputrev['recommend'] = result[i].recommend;
      inputrev['improvement'] = result[i].improvement;
      inputrev['category'] = result[i].category;
      inputrev['tag'] = result[i].tag;
      data.review.push(inputrev);
    }
    res.send(data);
  });

}

export { mypageRouter };
