import { SEND_REDIRECT_URL, FAIL_REDIRECT_URL } from './redirect_config';

export let error = {
  status: [
    {
      code: 0,
      response: '処理が正常に完了しました。'
    },
    {
      code: 1,
      response: '入力された情報が間違っています。'
    },
    {
      code: 2,
      response: '入力されたIDまたはアドレスは登録済みです。',
      match: { uid: '', email: '' }
    },
    {
      code: 3,
      response: 'このアカウントは承認済みです。'
    },
    {
      code: 4,
      response: 'メールの送信に失敗しました。'
    },
    {
      code: 5,
      response: '不正なアクセスです。'
    },
    {
      code: 6,
      response: 'DBのエラーが発生しました。'
    },
    {
      code: 7,
      response: 'パスワードリセットが要求済みです。'
    },
    {
      code: 8,
      response: 'セッションのエラーが発生しました。'
    },
    {
      code: 9,
      response: 'アカウントが本登録が済んでいません。'
    },
    {
      code: 10,
      response: 'ログインされていません。'
    },
    {
      code: 11,
      response: '既にログアウトされています。'
    },
    {
      code: 12,
      response: '問い合わせ画面からのリダイレクト'
    },
    {
      code: 13,
      response: '異常な回数のアクセスが検知されたので速度を制限します。'
    },
    {
      code: 14,
      response: '投稿いただきありがとうございました。'
    },
    {
      code: 15,
      response: '投稿されたレビューは存在しません。'
    },
    {
      code: 16,
      response: '質問は解決済みです。'
    },
    {
      code: 17,
      response: 'このアカウントは登録済みです。'
    },
    {
      code: 18,
      response: 'レビューに高評価をつけました。'
    },
    {
      code: 19,
      response: 'あなたは既にレビューに高評価を付けています。'
    },
    {
      code: 20,
      response: 'あなたはこの質問の投稿者ではありません。'
    },
    {
      code: 21,
      response: '変更が完了しました。'
    },
    {
      code: 22,
      response: 'ログアウトできませんでした。'
    },
    {
      code: 23,
      response: 'ログインに成功しました。'
    },
    {
      code: 24,
      response: 'ログインに失敗しました。'
    },
    {
      code: 25,
      response: 'ログアウトに成功しました。'
    },
    {
      code: 26,
      response: '認証の期限が切れました。再登録してください。'
    },
    {
      code: 27,
      response: '認証が完了しました。'
    },
    {
      code: 28,
      response: '入力されたアドレス宛てにメールを送信しました。'
    },
    {
      code: 29,
      response: 'レビューにいいねをつけました。'
    },
    {
      code: 30,
      response: 'レビュからいいねを削除しました。'
    },
    {
      code: 31,
      response: 'いいねの現在の状態を返します。'
    },
    {
      code: 32,
      response: 'コメントの投稿に成功しました。'
    }
  ]
};

// エラーハンドル
export function hadInputdataError (req, res) {
  res.send(error.status[1]);
}

export function hadOverlapError (req, res, matches) {
  const change = {
    code: error.status[2].code,
    response: error.status[2].response,
    match: matches
  };
  res.send(change);
}

export function hadSendmailError (req, res, resp, transporter) {
  res.send(error.status[4]);
  transporter.close();
}

export function hadUrlError (req, res) {
  res.send(error.status[5]);
}

export function hadDbError (req, res) {
  // const error = { status: 6 , err: err };
  res.send(error.status[6]);
}

export function hadDbError2 (req, res, err) {
  const error = { status: 6 , err: err };
  res.send(error);
}

export function hadLoginError (req, res) {
  res.send(error.status[10]);
}

export function hadLogoutedError (req, res) {
  res.send(error.status[11]);
}

export function hadRateoverError (req, res) {
  // const error = { status: 13, err: err };
  res.send(error.status[13]);
}

export function hadUpload (req, res) {
  // const error = { status: 13, err: err };
  res.send(error.status[14]);
}

export function hadEntryedError (req, res) {
  res.redirect(SEND_REDIRECT_URL + '?status=entryed');
  // res.send(error.status[17]);
}

export function hadLogoutError (req, res) {
  res.send(error.status[22]);
}

export function hadLoginSuccess (req, res) {
  res.send(error.status[23]);
}

export function hadLogintfaildError (req, res) {
  res.send(error.status[24]);
}

export function hadLogoutSuccess (req, res) {
  res.send(error.status[25]);
}

export function hadEntryError (req, res) {
  res.redirect(FAIL_REDIRECT_URL + '?status=faild');
  // res.send(error.status[26]);
}

export function hadEntrySuccess (req, res) {
  res.redirect(SEND_REDIRECT_URL + '?status=success');
  // res.send(error.status[27]);
}

export function hadSendmailSuccess (req, res, transporter) {
  transporter.close();
  res.send(error.status[28]);
}

export function hadFavoriteaddSuccess (req, res) {
  res.send(error.status[29]);
}

export function hadFavoritedelSuccess (req, res) {
  res.send(error.status[30]);
}

export function hadFavoriteStatus (req, res, status, params) {
  const backparams = {
    code: error.status[31].code,
    response: error.status[31].response,
    status: status,
    params: params
  };
  res.send(backparams);
}

export function hadComSuccess (req, res) {
  res.send(error.status[32]);
}
