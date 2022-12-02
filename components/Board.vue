<template>
<div data-app>
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
                    Save
                    </v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>

    </div>
</div>
</template>

<script>
const board = []
import { v4 as uuidv4, v4 } from 'uuid'
export default {
    
    name: "Board",
    data(){
        return {
            // board: [{
            //     list: {
            //         list_id: '',
            //         title: '',
            //         cards: [{
            //             cards_id: '',
            //             cards_title: '',
            //         }]
            //     }
            // }],
            board: {},
            list_id: '',
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
    methods: {
        async createList(){
            // console.log(board)
            let that = this
            that.dialog = false
            const newListInp = document.getElementById("inp").value
            // console.log(newListInp)
            if( that.list.title != '' ){
                that.list.id = uuidv4()
                that.list.cards = []
                if(that.board.lists){
                    that.board.lists.push(that.list)
                }else{
                    that.board.lists = []
                    that.board.lists.push(that.list)
                }
                that.list = {}
                // console.log(that.list.cards)
                localStorage.setItem('board', JSON.stringify(that.board))
                // console.log(newListInp);
                // that.dialog = false
                console.log(that.board)
            }
        },

        async clear(){
        let that = this
        that.list.title = '',
        that.dialog = false
        }
    }
}
</script>

<style>

</style>