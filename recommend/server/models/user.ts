import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
let Users = new Schema({
  email: { type: String, required: true, index: true, unique: true }, // Email(被りなし変更化)
  uid: { type: String, index: true, unique: true }, // uid(被りなし)
  name: { type: String, index: true }, // ユーザーネーム（被りok!）(あとで変更可能)
  age: { type: String, index: true }, // 年齢
  birthday: { type: Date, default: Date.now },
  sex: { type: Number, min: 0, max: 1 }, // 0男性 1女性
  work: { type: String, index: true }, // 職業
  syoukai: { type: String, index: true },
  res: [{ type: Schema.Types.ObjectId, index: true }], // リスペクト（Twitterでいうフォロー）のIDを格納
  resp: [{ type: Schema.Types.ObjectId, index: true }], // リスペクター(Twitternでいうフォロワー)のID格納
  place: String, // 自分の住んでいる場所
  hashpass: { type: String, index: true }, // ハッシュ化されたパスワード
  salt: { type: String, index: true }, // お塩
  prop: { type: String, index: true, default: './assets/prof/user13.png' }, // プロフィール用画像のURL
  url_path: { type: String, index: true }, // 認証用の一時url(regiser)
  url_path2: { type: String, index: true }, // 認証用の一時url(passreset)
  url_path3: { type: String, index: true }, // 認証用の一時url(email_change)
  regest: { type: Date, default: Date.now }, // 新規登録した時間の3時間後
  regent: { type: Date, default: Date.now }, // パスワードリセットを申請した時間の12時間後
  ect: { type: Date, default: Date.now }, // メールアドレス変更を申請した3時間後
  ac_st: { type: Boolean, default: false }, // accountstatus falseなら仮登録中(送られてきたメールのリンクを踏んだ後にtrue)
  ac_use: { type: Boolean, default: false }, // 現在accountが使用中か確認
  ac_reset: { type: Boolean, default: false }, // 現在accountのパスワードがリセット状態にあるか
  ac_ec: { type: Boolean, default: false }, // 現在accountのemailが変更されようとしているか
  ac_gr: { type: Boolean, default: false }, // 現在accountがグループに所属しているか
  mypage_st: { type: Boolean, default: true }, // 現在マイページを他人に公開しているか（デフォルトはtrue）(公開)
  cemail: String// 変更時に一時的にEメールアドレスを保存
}, { collection: 'user' });

mongoose.Promise = global.Promise;
Users = mongoose.model('Users', Users);

export = Users ;
