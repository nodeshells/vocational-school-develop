import * as http from 'http';
import { Router } from 'express';

import { error, hadLoginError, hadDbError, hadUpload } from '../../error_config';

import * as mongoose from 'mongoose';
import * as Review from '../../models/review';
import { getDate } from '../../config';

const reviewuploadRouter: Router = Router();
reviewuploadRouter.post('/' , (req: any, res, next) => {
  if (!req.session.user) return hadLoginError(req, res);

  const tag = JSON.parse(req.body.tag);
  let tags = [];

  if (req.body.tag !== undefined && req.body.tag.length !== 0) {
    tags = tag.map(x => {
      return x.value;
    });
  }

  const maindata = {
    title: req.body.mainTitle,
    star: req.body.star,
    category: req.body.category,
    recommend: req.body.recommend,
    improvement: req.body.improvement,
    cateans: req.body.cateAnswer,
    main: req.body.selfContents,
    tag: tags,
    mainimg: ''
  };

  save_review(req, res, maindata);
});

function save_review (req, res, data) {
  const reviewsave = new Review[0]({
    hostid: req.session.user, // obj_idから主催者のデータを拾う
    count: null, // アクセスされた回数
    uday: getDate(), // アップロードした日
    star: data.star, // 評価の星の数を保存
    tag: data.tag, // この中にタグ記述してもらう(ニコ動のタグみたいなもの)
    title: data.title,
    recommend: data.recommend,
    improvement: data.improvement,
    cateans: data.cateans,
    mainimg: data.mainimg,
    main: data.main,
    category: data.category,
    fav: [] // ファボした人のオブジェクトIDを格納
  });
  reviewsave.save((err) => {
    if (err) return hadDbError(req, res);
    if (!err) return hadUpload(req, res);
    // const conid = mongoose.Types.ObjectId();
    // const reviewcom = new Review[1]({
    //   _id: reviewsave._id,
    //   _conid: conid // コンテンツID
    // });
    // reviewcom.save((err) => {
    //   if (err) return hadDbError(req, res);
    //   if (!err) return hadUpload(req, res);
    // });
  });
}

export { reviewuploadRouter };
