import * as http from 'http';
import { Router } from 'express';
import * as url from 'url';
import * as qstring from 'querystring';

import { error, hadLoginError, hadDbError } from '../../error_config';
import * as Users from '../../models/user';

const updateIcon: Router = Router();
updateIcon.post('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);

  updateicon(req, res, req.body.picid);
});

function updateicon (req, res, picid) {
  let userid = req.session.user;
  Users.findOneAndUpdate({ _id: userid }, { $set: { prop: picid } }, (err, result) => {
    if (err) return hadDbError(req, res);
    res.send(result);
  });
}

export { updateIcon };
