<template>
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
                        <v-text-field label="To do" v-model="list.title" id="inp" required>
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
</template>

<script>
import { v4 as uuidv4, v4 } from 'uuid'
export default {
    name: "Board",
    data(){
        return {
            list: {
                list_id: '',
                title: '',
                cards: [{
                    cards_id: '',
                    cards_title: '',
                }]
            },
            dialog: false,
        }
    },
    methods: {
        async createList(){
            let that = this
            const newListInp = document.getElementById("inp").value
            // console.log(newListInp)
            if(that.list.title !=''){
                // this.list.list_id = Math.floor((Math.random()*10000) + 1);
                that.list.list_id = uuidv4()
                console.log(that.list.list_id)
                // that.list.title = ''
                that.list = {},
                that.list.cards = [],
                console.log(newListInp);
                that.dialog = false
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