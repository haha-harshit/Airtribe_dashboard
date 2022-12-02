<template>
  <div data-app>
      <Board/>
  </div>
</template>
  


<script>
// import { v4 as uuidv4, v4 } from 'uuid'
export default {
  name: 'IndexPage',
  head(){
    return {
      title: "Airtribe | Dashboard"
    }
  },
  // data(){
  //   return {
  //     list: {
  //       list_id: '',
  //       title: '',
  //       cards: [{
  //         cards_id: '',
  //         cards_title: '',
  //       }]
  //     },
  //     dialog: false,

  //   }
  // },
  // methods: {
    // async createList(){
    //   let that = this
    //   const newListInp = document.getElementById("inp").value
    //   // console.log(newListInp)
    //   if(that.list.title !=''){
    //     // this.list.list_id = Math.floor((Math.random()*10000) + 1);
    //     that.list.list_id = uuidv4()
    //     console.log(that.list.list_id)
    //     // that.list.title = ''
    //     that.list = {},
    //     that.list.cards = [],
    //     console.log(newListInp);
    //     that.dialog = false
    //   }
    // },

    // async clear(){
    //   let that = this
    //   that.list.title = '',
    //   that.dialog = false
    // }
  // }
}
</script>
