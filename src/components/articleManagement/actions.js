import { GET_ARTICLEMANAGEDATA,REMOVE_DATA } from './type'
export default {
  action_getArticleManageData: function (context) {
    context.commit(GET_ARTICLEMANAGEDATA)
  },
  action_REMOVE_DATA: function (context , obj) {
    context.commit(REMOVE_DATA , obj)
  },
}