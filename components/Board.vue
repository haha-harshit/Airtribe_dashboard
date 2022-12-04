
<template>
<div data-app>
    <div class="d-flex flex-column board">
    <div class="d-flex flex-row pr-6 pt-3 inn-board">
    <div v-for="list in board.lists"
        @drop="drop($event, list.id)"
        @dragover="allowDrop($event)"
        class="d-flex flex-column pt-3 mr-6 list"
        v-bind:key="list.id">
        <div class="d-flex flex-row justify-space-between list-head">
            <!-- <p v-if="$fetchState.pending">Loading....</p>
            <p v-else-if="$fetchState.error">Error while fetching mountains</p> -->
            <h4>{{ list.title }}</h4>
            <!-- <h4>{{ getListTitle }}</h4> -->
            <v-icon small @click="deleteList(list.id)">mdi-delete-outline</v-icon>
            
        </div>

        <!-- display cards -->
        <v-card 
        v-for="card in list.cards"
        :draggable="true"
        @dragover.prevent
        @dragstart="drag($event, card)"
        class="mt-5"
        @click="editCard(card)"
        v-bind:key="card.id"
        >
            <v-card-text> {{ card.title }}</v-card-text>
        </v-card>

        <v-btn
            depressed
            @click="
                dialogCard=true 
                listId = list.id
            "
            class="mt-auto"
        >Add Card</v-btn>

    </div>


    <v-dialog v-model="dialogCard" persistent max-width="600px">
        <v-card elevation="0">
            <v-card-title>
                <span class="headline"> Card Name </span>
            </v-card-title>
            
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Task" v-model="card.title" required>     
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogCard = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="createCard()">Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>



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

    <v-dialog v-model="dialogEditCard" persistent max-width="600px">
        <v-card elevation="0">
            <v-card-title>
                <span class="headline">{{ currentCard.title }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Edit Title" v-model="currentCard.title" required></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="deleteCard()">Delete</v-btn>
                <v-btn color="blue darken-1" text @click="dialogEditCardOnClose(currentCard.title)">Close</v-btn>
                <v-btn color="blue darken-1" text @click="updateCard()">Update</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

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
            boardId: '',
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
    //     // this.boardId = uuidv4()
    //     // console.log(this.boardId)
    //     console.log('ny')
    //     let boardRef = $nuxt.$fire.firestore
    //     .collection('board')
    //     .doc('YAFfoGAaFupdZhZzzZ4H')
    //     // .set(this.board)

    //     let boardData = {}

    //     await boardRef
    //         .get()
    //         .then(function(doc){
    //             if(doc.exists){
    //                 boardData = doc.data()
    //                 console.log(boardData)  
    //                 boardData.id = params.id
    //             }
    //         })
    //         .catch(function(error){console.log('error')})
    //     return {board: boardData}
    // },

    created(){
        this.boardId = 'YAFfoGAaFupdZhZzzZ4H'
        let that = this
        let tempId = this.boardId
        console.log('hppppp')
        console.log(tempId);
        let boardRef = this.$fire.firestore
            .collection('board')
            .doc(tempId)
            .onSnapshot((doc) => {
                if(doc.exists){
                    that.board = doc.data()
                    that.boardId = tempId
                }
            })
    },

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

                // console.log(that.board.id)
                await that.updateBoard()

                that.list = {}
                // console.log(that.list.cards)
                // localStorage.setItem('board', JSON.stringify(that.board.lists))
            }
        },

        async updateCardList(newListId){
            let that = this
            let tempListIndex = -1
            let tempCardIndex = -1
            let newListIndex = -1
            let tempListCount =0
            let tempCardCount =0

            for(const list of that.board.lists){
                if(list.id === newListId){
                    newListIndex = tempListCount
                }
                if(that.currentCard.listId === list.id){
                    tempListIndex = tempListCount
                    for(let card of list.cards){
                        if(card.id === that.currentCard.id){
                            tempCardIndex = tempCardCount
                        }
                        tempCardCount++
                    }
                }
                tempListCount++
            }

            // remove current card from currentlist
            that.board.lists[tempListIndex].cards.splice(tempCardIndex, 1)

            // add curr card to new list
            that.currentCard.listId = newListId
            that.board.lists[newListIndex].cards.push(that.currentCard)

            await that.updateBoard()
        },

        allowDrop(ev){
            ev.preventDefault()
        },
        drag(ev, card){
            this.currentCard = card
        },
        drop(ev, listId){
            ev.preventDefault()
            this.updateCardList(listId)
        },


        async deleteList(listId){
            let that = this
            let index =-1
            let count =0
            for(const list of that.board.lists){
                if(list.id == listId){
                    index = count
                }
                count++
            }
            if(index > -1){
                that.board.lists.splice(index, 1)
                await that.updateBoard()
            }
        },
        
        async createCard(){
            let that = this
            that.dialogCard = false
            if(that.card.title != ''){
                that.card.id = uuidv4()
                that.card.listId = that.listId
                if(that.board.lists){
                    let index =-1
                    let count =0
                    for(const list of that.board.lists){
                        if(list.id === that.listId){
                            index = count
                        }
                        count++
                    }
                    if(index != -1){
                        if(that.board.lists[index].cards){
                            that.board.lists[index].cards.push(that.card)
                        }else{
                            that.board.lists[index].cards = []
                            that.board.lists[index].cards.push(that.card)
                        }
                    }
                }

                await that.updateBoard()
                that.card = {}
                that.listId =''
            }
        },


        async updateCard(){
            let that = this
            that.dialogEditCard = false
            for(const list of that.board.lists){
                if(that.currentCard.listId === list.id){
                    for(let card of list.cards){
                        if(card.id === that.currentCard.id){
                            card = that.currentCard
                            console.log("update")
                        }
                    }
                }
            }
            await that.updateBoard()
        },

        async deleteCard(){
            let that = this
            that.dialogEditCard = false
            let i=0
            let j=0
            let index = {
                list: -1,
                card: -1,
            }
            for(const list of that.board.lists){
                if(that.currentCard.listId === list.id){
                    for(const card of list.cards){
                        if(card.id === that.currentCard.id){
                            index.list = i
                            index.card = j
                        }
                        j++
                    }
                }
                i++
            }
            if(index.list > -1){
                that.board.lists[index.list].cards.splice(index.card, 1)
                await that.updateBoard()
            }
        },

        editCard(card){
            console.log(card.title)
            this.dialogEditCard = true
            this.currentCard = card
            // const cardName = card.title
        },

        async dialogEditCardOnClose(prevTitle){
            console.log(prevTitle)
            let that = this
            that.dialogEditCard=false
            that.currentCard.title = prevTitle
            // console.log(that.currentCard.title)
            // console.log(that.card.title)

            // this.currentCard.title = cardName
        },

        async updateBoard(){
            let that = this
            // console.log('here')
            console.log(that.board.id)
            await that.$fire.firestore
                .collection('board')
                .doc('YAFfoGAaFupdZhZzzZ4H')
                // .doc('lists')
                .update(that.board, {merge: true})
        },

        async clear(){
        let that = this
        that.list.title = '',
        that.dialog = false
        },

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
