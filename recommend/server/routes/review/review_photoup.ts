import * as http from 'http';
import { Router } from 'express';
import * as multer from 'multer';
import * as path from 'path';

const upload = multer({ dest: path.join(__dirname, '../../public/img') });

import { error, hadLoginError, hadDbError, hadUpload } from '../../error_config';

import { getDate } from '../../config';

const reviewphotouploadRouter: Router = Router();
reviewphotouploadRouter.post('/' ,upload.array('upfile'), (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);

  res.send(req.files);
});

export { reviewphotouploadRouter };
