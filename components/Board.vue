
<template>
<div data-app>
    <div class="d-flex flex-column board">
    <div class="d-flex flex-row pr-6 pt-3 inn-board">
    <div v-for="list in board.lists" class="d-flex flex-column pt-3 mr-6 list" v-bind:key="list.id">
        <div class="d-flex flex-row justify-space-between list-head">
            <!-- <p v-if="$fetchState.pending">Loading....</p>
            <p v-else-if="$fetchState.error">Error while fetching mountains</p> -->
            <h4>{{ list.title }}</h4>
            <!-- <h4>{{ getListTitle }}</h4> -->
            <v-icon small @click="deleteList(list.id)">mdi-delete-outline</v-icon>
            
        </div>

        <v-btn
            depressed
            @click="
                dialogCard=true 
                listId = list.id
            "
            class="mt-auto"
        >Add Card</v-btn>

    </div>
    <div class="d-flex flex-row">
        <v-btn depressed @click="dialog=true" class="create-list">
            New list
        </v-btn>
        
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card elevation="0">
        
                <v-card-title>
                    <span class="headline">List name</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                    <v-row>
                        <v-col cols="12">
                        <v-text-field label="Title" v-model="list.title" id="inp" required>
                        </v-text-field>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card-text>
            
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="clear()">
                    Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="createList()">
                    Create List
                    </v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>

    </div>
    </div>
    </div>
</div>
</template>

<script>
// const board2 = JSON.parse(localStorage.getItem('board'))

import { v4 as uuidv4, v4 } from 'uuid'

export default {
    name: "Board",
    data(){
        return {
            board: {},
            listId: '',
            list: {
                title: ''
            },
            card: {
                title: ''
            },
            currentCard: {},
            cardDraggedId: '',
            cardDraggedListId: '',
            dialog: false,
            dialogCard: false,
            dialogEditCard: false,
            drawer: false,
        }
    },

    // async asyncData({ params }){
    //     let boardRef = this.$fire.firestore
    //     .collection('board')
    //     .doc(params.id)

    //     let boardData = {}

    //     await boardRef
    //         .get()
    //         .then(function(doc){
    //             if(doc.exists){
    //                 boardData = doc.data()
    //                 boardData.id = params.id
    //             }
    //         })
    //         .catch(function(error){})
    //     return {board: boardData}
    // },

    // created(){
    //     let that = this
    //     let tempId = this.board.id
    //     let boardRef = $fire.firestore
    //         .collection('boards')
    //         .doc(tempId)
    //         .onSnapShot((doc) => {
    //             if(doc.exists){
    //                 that.board = doc.data()
    //                 that.board.id = tempId
    //             }
    //         })
    // },

    // fetch data from fake api
    // async fetch(){
    //     this.board.lists = await fetch('https://my-json-server.typicode.com/haha-harshit/fake-api/list')
    //     .then(res => res.json())
    // },
    
    methods: {
        async createList(){
            // console.log(this.board)
            let that = this
            that.dialog = false
            // const newListInp = document.getElementById("inp").value
            // // console.log(newListInp)
            if( that.list.title != '' ){
                that.list.id = uuidv4()
                that.list.cards = []
                if(that.board.lists){
                    that.board.lists.push(that.list)
                }else{
                    that.board.lists = []
                    that.board.lists.push(that.list)
                }

                await that.updateBoard()

                that.list = {}
                // console.log(that.list.cards)
                // localStorage.setItem('board', JSON.stringify(that.board.lists))
                // console.log(that.board)
            }
        },
        
        async updateBoard(){
            let that = this
            await that.$fire.firestore
                .collection('board')
                .doc(that.board.id)
                .update(that.board, {merge: true})
        },

        async clear(){
        let that = this
        that.list.title = '',
        that.dialog = false
        },

    //     async update(){
    //         console.log(this.board.lists[1])
    //     this.board.lists[1] = await fetch('https://my-json-server.typicode.com/haha-harshit/fake-api/list?id=2', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             id: 1000,
    //             title: "no list",
    //             cards: []
    //         }),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8'
    //         },
    //     })
    //     .then(res => res.json())
    //     .then((json) => console.log(json))
    // },
    }
}
</script>

<style lang="scss" scoped>
.board {
  padding: 12px;
  height: 75vh;
  overflow:auto;

  .inn-board{
    display: flex;
  }
  
  .list {
    min-width: 260px;
    width: 260px;
    background-color: rgb(228 228 228 / 35%);
    padding: 25px;
    border-radius: 12px;
    min-height: 60vh;
    margin: 0px 15px 0px 15px;
    // padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .list-head{
        display: flex;
        justify-content: space-between;
    }

  }
  .create-list {
    background-color: rgb(228 228 228 / 35%);
    // padding: 15px;
  }
  a {
    text-decoration: none;
  }
  .menu-items a {
    // color: $text-color;
    padding: 10px 0px 10px 3px;
    font-size: 24px;
  }
}
</style>
