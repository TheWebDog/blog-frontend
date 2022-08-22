import { GET_USERINFROMATION , SUBMIT_USERDATA} from './type'
export default {
  action_GET_USERINFROMATION: function (context) {
    context.commit(GET_USERINFROMATION)
  },
  action_SUBMIT_USERDATA: function (context) {
    context.commit(SUBMIT_USERDATA)
  },
}
