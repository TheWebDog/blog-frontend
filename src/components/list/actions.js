import { GET_ARTICLELIST,SET_INPUT_VALUE ,CHANGE_LIST} from './type'
export default {
  action_getArticleList: function (context,data) {
    context.commit(GET_ARTICLELIST,data)
  },
  action_getSearchList:function (context,data) {
    context.commit(GET_ARTICLELIST,data)
  },
  action_setInputValue: function (context,value) {
    context.commit(SET_INPUT_VALUE,value)
  },
  action_CHANGE_LIST: function (context,data) {
    context.commit(CHANGE_LIST,data)
  },
}