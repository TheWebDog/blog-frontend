import axios from 'axios'
import { GET_ARTICLELIST, SET_INPUT_VALUE } from './type'

export default {
  [SET_INPUT_VALUE]: function (state,value) {
    state.searchInputValue = value
    // console.log(value)
    axios
    .post('/page/search', { value })
      .then((res) => {
      // console.log(res.data)
        state.articleList = res.data
        console.log('SET_INPUT_VALUE')

        var arr =state.articleList
        for (let i = 0; i < arr.length; i++){
          var coverRequirePath = arr[i].coverRequirePath
          axios
            .get(coverRequirePath)
            .then((res) => {
              state.articleList[i].coverRequirePath = res.data
            })
            .catch((err) => {
             console.log(err)
            })
        }



    })
    .catch((err) => {
      console.log(err)
    })
  },
  [GET_ARTICLELIST]: function (state, data) {
    var value = ''
    if (data == '/' || data == '/list' || data == '/articleClassify') {
      value = ''
      axios
        .post('/page/getList', { value })
        .then((res) => {
          state.articleList = res.data
          console.log('GET_ARTICLELIST')

          var arr =state.articleList
          for (let i = 0; i < arr.length; i++){
            var coverRequirePath = arr[i].coverRequirePath
            axios
              .get(coverRequirePath)
              .then((res) => {
                state.articleList[i].coverRequirePath = res.data
              })
              .catch((err) => {
               console.log(err)
              })
          }



        })
        .catch((err) => {
          console.log(err)
        })
    } else if (data.indexOf('/articleClassify') !== -1) {
      value = data.slice(17)
      axios
        .post('/page/getList', { value })
        .then((res) => {
          state.articleList = res.data
          console.log('else if')

          var arr =state.articleList
          for (let i = 0; i < arr.length; i++){
            var coverRequirePath = arr[i].coverRequirePath
            axios
              .get(coverRequirePath)
              .then((res) => {
                state.articleList[i].coverRequirePath = res.data
              })
              .catch((err) => {
               console.log(err)
              })
          }



        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
}
