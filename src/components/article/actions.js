import { CLEAR_COMMENT, CLEAR_ARTICLE, GET_ARTICLEPAGE ,SUBMIT_COMMENT ,GET_COMMENT,SUBMIT_COMMENT_COMMENT} from './type'
export default {
  action_clearArticle: function (context) {
    context.commit(CLEAR_ARTICLE)
  },
  action_clearComment: function (context) {
    context.commit(CLEAR_COMMENT)
  },
  action_getArticlePage: function (context,id) {
    context.commit(GET_ARTICLEPAGE,{id})
  },
  action_submit_comment: function (context,obj) {
    context.commit(SUBMIT_COMMENT,obj)
  },
  action_getComment: function (context,id) {
    context.commit(GET_COMMENT,id)
  },
  action_submit_comment_comment: function (context,obj) {
    context.commit(SUBMIT_COMMENT_COMMENT,obj)
  },
}