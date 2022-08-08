import { GET_COMMENTMANAGEDATA,REMOVE_COMMENT ,REMOVE_CHILDREN} from './type'
export default {
  action_getCommentManageData: function (context) {
    context.commit(GET_COMMENTMANAGEDATA)
  },
  action_remove_comment: function (context , obj) {
    context.commit(REMOVE_COMMENT , obj)
  },
  action_remove_children: function (context , userCommentandid) {
    context.commit(REMOVE_CHILDREN , userCommentandid)
  },
}