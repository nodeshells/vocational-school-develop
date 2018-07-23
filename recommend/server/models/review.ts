import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Review = new Schema({
  title: { type: String, index: true },// レビューの名前
  hostid: { type: Schema.Types.ObjectId, index: true }, // obj_idから主催者のデータを拾う
  count: Number, // アクセスされた回数
  uday: { type: Date, index: true, default: Date.now }, // アップロードした日
  star: Number, // 評価の星の数を保存
  name : String,// 引っこ抜いてきたuserの名前を入れる
  tag: [String], // この中にタグ記述してもらう(ニコ動のタグみたいなもの)
  cateans: [String],
  mainimg: [String],
  main: [String],
  recommend: String,
  improvement: String,
  category: String,
  prop: String,
  fav: [{ type: Schema.Types.ObjectId, index: true }], // ファボした人のオブジェクトIDを格納
  com: [{ type: Schema.Types.ObjectId, ref: 'ReviewCom' }]
}, { collection: 'review' });

const ReviewCom = new Schema({
    // reviewcomの_idはreviewのIDと同じになる
  mfo: { type: Schema.Types.ObjectId, ref: 'Review', index: true },
  com: { type: Schema.Types.ObjectId, index: true }, // コメンターID
  name: { type: String, index: true }, // ユーザーが決めた自由な名前
  prop: String, // プロフィールの画像？
  cuday: { type: Date, default: Date.now }, // コンテンツを上げた日
  chday: Date, // 内容を編集した日
  text: String// レビューに対してコメンターが入力(回答内容)
}, { collection: 'reviewcom' });

mongoose.Promise = global.Promise;
const Reviewmodel = mongoose.model('Review', Review);
const ReviewCommodel = mongoose.model('ReviewCom', ReviewCom);

const ReviewObj = [Reviewmodel, ReviewCommodel];

export = ReviewObj;
