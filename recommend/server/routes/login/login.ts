import * as http from 'http';
import * as passport from 'passport';
import { Router } from 'express';

import * as Users from '../../models/user';

const LocalStrategy = require('passport-local').Strategy;

import { getPhash } from '../../config';
import { LOGIN_S_REDIRECT_URL, LOGIN_F_REDIRECT_URL } from '../../redirect_config';
import { error, hadLogintfaildError, hadLoginSuccess, hadLogoutedError, hadLoginError } from '../../error_config';

const loginRouter: Router = Router();

// ログイン認証
passport.use('local-login', new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
  passReqToCallback: true
}, (req, name, password, done) => {
  process.nextTick(() => {
    Users.findOne({ $or: [{ email: name }, { uid: name }] }, (err, user) => {
      if (err) return done(console.log(err));
      if (!user) {// アカウントが見つからない
        return done(null, false);
      }
      const hashedPassword = getPhash(password, user.salt); // 本番用
        // let hashedPassword = req.body.password;//テスト用
      if (user.hashpass !== hashedPassword[0]) { // パスワードが一致しない
        return done(null, false);
      }
      if (user.ac_st !== true) {// アカウントの登録が済んでいない
        return done(null, false);
      }
      return done(null, user);
    });
  });
}));
passport.serializeUser((user: any, done) => {
  done(null, user.id); // useridをセット
});
passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user);
  });
});

loginRouter.post('/' , (req: any, res: any, next: any) => {
  passport.authenticate('local-login', { session: false }, (err, user, info) => {
    if (err) { return hadLogintfaildError(req, res); }
    if (!user) { return hadLogintfaildError(req, res); }
    req.session.user = user._id;
    hadLoginSuccess(req, res);
  })(req, res, next);
});

loginRouter.get('/' , (req: any, res, next) => {
    // ログイン確認用
  if (req.session.user != null) {
    hadLogoutedError(req, res);
  } else {
    hadLoginError(req, res);
  }
});

export { loginRouter };
