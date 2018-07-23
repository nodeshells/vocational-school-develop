import * as http from 'http';
import { Router } from 'express';

import * as Review from '../../../models/review';
import * as Users from '../../../models/user';

import { error, hadLoginError, hadDbError2, hadFavoriteaddSuccess, hadComSuccess } from '../../../error_config';
import { getDate } from '../../../config';

const comupload: Router = Router();
comupload.post('/' , (req: any, res: any, next) => {
  if (!req.session.user) return hadLoginError(req, res);
  // const proto = {
  //   name: 'test',
  //   text: 'testlll'
  // };
  Users.findOne({ _id: req.session.user }, (err, user) => {
    if (err) return hadDbError2(req, res, err);
    if (user != null) {
      const comment = new Review[1]({
        mfo: req.body.reviewid,
        com: user._id,
        name: user.name,
        prop: user.prop,
        cuday: getDate(), // コンテンツを上げた日
        text: req.body.comment// レビューに対してコメンターが入力(回答内容)
      });
      savecom(req, res, comment);
    }
  });
});

function savecom (req, res, data) {
  data.save((err) => {
    if (err) return hadDbError2(req, res, err);
    return hadComSuccess(req, res);
  });
}

export { comupload };
