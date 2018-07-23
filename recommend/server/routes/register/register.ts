import * as http from 'http';
import * as url from 'url';
import * as qstring from 'querystring';
import { Router } from 'express';

const nodemailer = require('nodemailer');

import { G_USER, G_PASS, REGI_RAND, REGI_SUB, M_MINUTE, getHash, getRand, getDate, getPhash, API_URL, CONF_URL } from '../../config';
import { SEND_REDIRECT_URL } from '../../redirect_config';
import { error, hadDbError, hadInputdataError, hadLoginError, hadOverlapError, hadRateoverError, hadSendmailError, hadEntryedError, hadUrlError, hadEntryError, hadEntrySuccess, hadSendmailSuccess } from '../../error_config';
import * as Users from '../../models/user';

const registerRouter: Router = Router();
registerRouter.post('/' , (req: any, res: any, next: any) => {
  const email = req.body.email;
  const uid = req.body.uid;
  const password = req.body.password;
  const name = req.body.name;
  const date = req.body.date;
  const sex = req.body.sex;
  const syoukai = req.body.syoukai;

  const rand = getRand(REGI_RAND);
  const onetimeUrl = getHash(rand);

  exec(req, res, onetimeUrl);
});

registerRouter.get('/' , (req: any, res: any, next: any) => {
  const u = url.parse(req.url, false);
  const query = qstring.parse(u.query);

  confirm_urlpath(req, res, query);
});

// 非同期処理の実行
async function exec (req, res, onetimeUrl) {
  await saveurl(req, res, onetimeUrl);
}

// 非同期関数
function saveurl (req, res, onetimeUrl) {
  const sendtime = getDate(M_MINUTE);
  const urlpath = onetimeUrl;

  const hashpass = getPhash(req.body.password);

  if (req.body.sex === 'female') {
    req.body.sex = 1;
  }else if (req.body.sex === 'male') {
    req.body.sex = 0;
  }

  const onetimeuser = new Users({
    email: req.body.email,
    uid: req.body.uid,
    hashpass: hashpass[0],
    salt: hashpass[1],
    name: req.body.name,
    birthday: req.body.birthday,
    sex: req.body.sex,
    syoukai: req.body.syoukai,
    regest: sendtime,
    url_path: urlpath,
    ac_st: false
  });

  Users.findOne({ $or: [{ email: req.body.email },{ uid: req.body.uid }] }, (err, account) => {
    if (err) return hadDbError(req, res);
    if (account == null) {
            // 検索で何も一致しないので新規で仮登録
      onetimeuser.save(() => {
        if (err) return hadDbError(req, res);
        sendmail(req, res, onetimeUrl);
      });
    }
    if (account) {
      if (account.regest < getDate() && account.ac_st === false) {
        Users.remove({ _id: account._id }, () => {
          if (err) return hadDbError(req, res);
          // 検索で同じメールアドレスまたはUSERIDが見つかったが、認証期限が過ぎているので削除して再認証
          onetimeuser.save(() => {
            if (err) return hadDbError(req, res);
            sendmail(req, res, onetimeUrl);
          });
        });
      }
      if (account.ac_st === true) {
      // Angular4に登録出来ない事を伝えるレスポンスを返す
        const match = {
          uid: false,
          email: false
        };
        if (account.email === req.body.email) {
          match.email = true;
        }
        if (account.uid === req.body.uid) {
          match.uid = true;
        }
        hadOverlapError(req, res, match);
      }
    }
  });
}

function sendmail (req: any, res: any, onetimeUrl: any) {
  const mailOptions = { // メールの送信内容
    from: 'Recommend運営<Recommed911@gmail.com>',
    to: req.body.email,
    subject: REGI_SUB,
    html:  'Recommendへようこそ！<br>URLをクリックしてください。<br>' + CONF_URL + '/api/register?url_path=' + onetimeUrl
  };
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: G_USER,
      pass: G_PASS
    }
  });
  transporter.sendMail(mailOptions, (err, resp) => { // メールの送信
    if (err) { // 送信に失敗したとき
      hadSendmailError(req, res, resp, transporter);
    }
    hadSendmailSuccess(req, res, transporter);
  });
}

function confirm_urlpath (req, res, query) {
  Users.findOne({ url_path: query.url_path }, (err, account) => {
    if (err) return hadDbError(req, res);
    if (account == null) {
            // 検索で何も一致しないので 無効な認証
      hadUrlError(req, res);
    }
    if (account) {
      if (account.regest < getDate() && account.ac_st === false) {
        Users.remove({ _id: account._id }, () => {
          if (err) return hadDbError(req, res);
             // 検索で同じurl_pathが見つかったが、認証期限が過ぎているので削除して認証の期限切れを告知
          // res.redirect(CONF_REDIRECT_URL);
          hadEntryError(req, res);
        });
      }else if (account.regest > getDate() && account.ac_st === false) {
        Users.update({ _id: account._id }, { $set: { ac_st: true } },(err) => {
          if (err) return hadDbError(req, res);
          // 認証完了
          // res.redirect(CONF_REDIRECT_URL);
          hadEntrySuccess(req, res);
        });
      }else if (account.ac_st === true) {
        // 認証済みなのにアクセス
        // res.redirect(CONF_REDIRECT_URL);
        hadEntryedError(req, res);
      }
    }
  });
}

export { registerRouter };
