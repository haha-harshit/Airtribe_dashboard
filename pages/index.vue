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
  </div>
</template>
  


<script>
export default {
  name: 'IndexPage',
  head(){
    return {
      title: "Airtribe | Dashboard"
    }
  },
  data(){
    return {
      list: {
        title: '',
        cards: [{
          cards_title: ''
        }]
      },
      // email: '',
      dialog: false,

    }
  },
  methods: {
    async createList(){
      const newListInp = document.getElementById("inp").value
      // console.log(newListInp)
      if(newListInp){
        // console.log("ok")
        console.log(newListInp);
        this.list.title = ''
        this.dialog = false
      }
    },

    async clear(){
      this.list.title = '',
      this.dialog = false
    }
  }
}
</script>
