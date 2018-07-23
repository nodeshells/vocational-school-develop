import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as connect from 'connect';
import * as mongoose from 'mongoose';
import * as mongo from 'connect-mongo';
import * as cors from 'cors';

import { getPhash, getHash, getRand, API_URL, MONGO_URL_REVIEW, MONGO_URL_USER, MONGO_URL_SESSION } from './config';
import { LOGIN_F_REDIRECT_URL } from './redirect_config';
import { error } from './error_config';

const MongoStore = mongo(session);
const store = new MongoStore({ // セッション管理用DB接続設定
  url: MONGO_URL_SESSION,
  ttl: 60 * 60 // 1hour
});

import * as passport from 'passport';

import * as Users from './models/user';

import { registerRouter } from './routes/register/register';
import { loginRouter } from './routes/login/login';
import { logoutRouter } from './routes/logout/logout';
import { checksessionRouter } from './routes/check_session/check_session';
import { mypageRouter } from './routes/mypage/mypage';
import { reviewtopRouter } from './routes/review/review_top';
import { reviewdetailRouter } from './routes/review/review_detail';
import { reviewuploadRouter } from './routes/review/review_upload';
import { reviewphotouploadRouter } from './routes/review/review_photoup';
import { searchkeywordRouter } from './routes/reviewsearch/search_keyword';
import { searchtagRouter } from './routes/reviewsearch/search_tag';
import { searchcateRouter } from './routes/reviewsearch/search_cate';
import { reviewfavst } from './routes/review/fav_wanted/review_favst';
import { reviewfavadd } from './routes/review/fav_wanted/review_favadd';
import { reviewfavdel } from './routes/review/fav_wanted/review_favdel';
import { comupload } from './routes/review/comment/com_upload';
import { comdetails } from './routes/review/comment/com_details';
import { updateIcon } from './routes/mypage/editprof';
class App {
  public express: express.Application;

  constructor () {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware (): void {
    // プロキシで通信をする
    // this.express.set('trust proxy', 1);

    // 接続する MongoDB の設定
    mongoose.connect(process.env.MONGO_URL_USER || MONGO_URL_USER || MONGO_URL_REVIEW, {
      useMongoClient: true
    });
    process.on('SIGINT', () => {
      mongoose.disconnect();
    });

    this.express.use(logger('dev')); // ログ用
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(session({
      secret: 'ioukitty',
      store: store,
      resave: true,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 60 * 60 * 1000
      }
    }));
    this.express.use(passport.initialize());
    this.express.use(passport.session());
  }

  private routes (): void {
    /*
    * CORSを許可.
    */
    const options: cors.CorsOptions = {
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: API_URL,
      preflightContinue: false
    };

    // 静的資産へのルーティング
    this.express.use(cors(options));
    this.express.use('/api/register', registerRouter);
    this.express.use('/api/login', loginRouter);
    this.express.use('/api/logout', logoutRouter);
    this.express.use('/api/checksession', checksessionRouter);
    this.express.use('/api/mypage', mypageRouter);
    this.express.use('/api/reviewtop', reviewtopRouter);
    this.express.use('/api/reviewdetail', reviewdetailRouter);
    this.express.use('/api/reviewupload', reviewuploadRouter);
    this.express.use('/api/reviewphotoupload', reviewphotouploadRouter);
    this.express.use('/api/searchkeyword', searchkeywordRouter);
    this.express.use('/api/searchtag', searchtagRouter);
    this.express.use('/api/searchcate', searchcateRouter);
    this.express.use('/api/favdel', reviewfavdel);
    this.express.use('/api/favst', reviewfavst);
    this.express.use('/api/favadd', reviewfavadd);
    this.express.use('/api/comup', comupload);
    this.express.use('/api/comdetails', comdetails);
    this.express.use('/api/updateIcon', updateIcon);
    this.express.use(express.static(path.join(__dirname, 'public')));
    this.express.use('/static', express.static(path.join(__dirname, 'public')));
    this.express.use('/*', (req, res) => {
      res.sendfile(__dirname + '/public/index.html');
    });

    // ここからずらさないで
    this.express.options('*', cors(options));

    // ミドルウェアを使いつくしたので404を生成
    this.express.use((err, req, res, next) => {
      // var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

      // error handlers
    // development error handler
    // will print stacktrace
    if (this.express.get('env') === 'development') {
      this.express.use((err, req, res, next) => {
        res.status(err.status || 500);
      });
    }

    // production error handler
    // no stacktraces leaked to user
    this.express.use((err, req, res, next) => {
      res.status(err.status || 500);
    });
  }
}

export default new App().express;
