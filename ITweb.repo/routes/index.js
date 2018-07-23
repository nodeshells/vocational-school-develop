var routes = {//routesディレクト内のjsファイルを参照
    contact: require('./contact'),
    contact_submit: require('./contact_submit'),
    toppage: require('./toppage'),
    mypage: require('./mypage'),
    prof_change: require('./prof_change'),
    prof_edit: require('./prof_edit'),
    outlook_mypage:require('./outlook_mypage'),
    login: require('./login'),
    login_check: require('./login_check'),
    logout: require('./logout'),
    register: require('./register'),
    register_check: require('./register_check'),
    register_submit: require('./register_submit'),
    register_confirm: require('./register_confirm'),
    password_reset: require('./password_reset'),
    password_reset_mail: require('./password_reset_mail'),
    password_reset_regene: require('./password_reset_regene'),
    password_reset_submit: require('./password_reset_submit'),
    email_change: require('./email_change'),
    email_change_mail: require('./email_change_mail'),
    email_change_task: require('./email_change_task'),
    email_change_submit: require('./email_change_submit'),
    qna_bq: require('./qna_bq'),
    qna_bq_up: require('./qna_bq_up'),
    qna_diff: require('./qna_diff'),
    qna_eq: require('./qna_eq'),
    qna_noans: require('./qna_noans'),
    question_board_top: require('./question_board_top'),
    question_board_top_cate: require('./question_board_top_cate'),
    question_board_top_search: require('./question_board_top_search'),
    question_board_input: require('./question_board_input'),
    question_board_ansinput: require('./question_board_ansinput'),
    question_board_confirem: require('./question_board_confirm'),
    question_board_ansconfirem: require('./question_board_ansconfirm'),
    question_board_submit: require('./question_board_submit'),
    question_board_anssubmit: require('./question_board_anssubmit'),
    question_board_ba: require('./question_board_ba'),
    question_board_view: require('./question_board_view')
};

module.exports = routes;