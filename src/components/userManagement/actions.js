import { GET_USERMANAGEDATA,REMOVE_USERDATA ,CHANGE_USERDATA} from './type'
export default {
  action_getUserManageData: function (context) {
    context.commit(GET_USERMANAGEDATA)
  },
  action_REMOVE_USERDATA: function (context , obj) {
    context.commit(REMOVE_USERDATA , obj)
  },
  action_CHANGE_USERDATA: function (context , idandvalue) {
    context.commit(CHANGE_USERDATA , idandvalue)
  },
}