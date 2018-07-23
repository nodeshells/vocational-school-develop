import * as http from 'http';
import { Router } from 'express';

import { error, hadLogoutError, hadLogoutSuccess } from '../../error_config';

const logoutRouter: Router = Router();

logoutRouter.get('/' , (req: any, res, next) => {
    // ログアウト処理
  req.session.destroy((err) => {
    if (err) return hadLogoutError(req, res);
    hadLogoutSuccess(req, res);
  });
});

export { logoutRouter };
