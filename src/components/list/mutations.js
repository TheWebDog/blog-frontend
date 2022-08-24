import axios from 'axios'
import { GET_ARTICLELIST, SET_INPUT_VALUE ,CHANGE_LIST} from './type'

export default {
  [SET_INPUT_VALUE]: function (state, value) {
    state.loading = true
    state.searchInputValue = value
    // console.log(value)
    axios
    .post('/page/search', { value })
      .then((res) => {
      // console.log(res.data)
        state.articleList = res.data.slice(0,5)
        state.allArticleList = res.data
        state.loading = false
        // var arr =state.articleList
        // for (let i = 0; i < arr.length; i++){
        //   var coverRequirePath = arr[i].coverRequirePath
        //   axios
        //     .get(coverRequirePath)
        //     .then((res) => {
        //       state.articleList[i].coverRequirePath = res.data
        //     })
        //     .catch((err) => {
        //      console.log(err)
        //     })
        // }
    })
    .catch((err) => {
      console.log(err)
    })
  },
  [GET_ARTICLELIST]: function (state, data) {
    var value = ''
    if (data == '/' || data == '/list' || data == '/articleClassify') {
      value = ''
    } else if (data.indexOf('/articleClassify') !== -1) {
      value = data.slice(17)
    }
    axios
    .post('/page/getList', { value })
    .then((res) => {
      state.articleList = res.data.slice(0,5)
      state.allArticleList = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  },
  [CHANGE_LIST]: function (state, data) {
    var {value ,pageSize} =data
    if (value + pageSize <= state.allArticleList.length) {
      state.articleList = state.allArticleList.slice(value,value+pageSize)
    } else {
      state.articleList = state.allArticleList.slice(value,state.allArticleList.length)
    }
  },
}
