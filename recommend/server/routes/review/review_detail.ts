import * as http from 'http';
import { Router } from 'express';

import * as url from 'url';
import * as qstring from 'querystring';

import * as Review from '../../models/review';
import * as User from '../../models/user';

import { error, hadLoginError, hadDbError } from '../../error_config';

const reviewdetailRouter: Router = Router();
reviewdetailRouter.get('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);

  const u = url.parse(req.url, false);
  const query = qstring.parse(u.query);

  Review[0].findOne({ _id: query.id },(err, data) => {
    if (err) return hadDbError(req, res);
    if (data != null) {
      let detail = data;
      User.findOne({ _id: data.hostid }, (err, resp) => {
        if (err) return hadDbError(req, res);
        if (resp != null) {
          detail.prop = resp.prop;
          detail.name = resp.name;
        }
        res.send(detail);
      });
    }
  });
});

export { reviewdetailRouter };
