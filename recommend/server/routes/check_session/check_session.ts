import * as http from 'http';
import { Router } from 'express';

const checksessionRouter: Router = Router();
checksessionRouter.get('/' , (req: any, res, next) => {
  // sessionを要求されたら返す
  res.send(req.session);
});

export { checksessionRouter };
