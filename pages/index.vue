
<template>
  <div class="d-flex flex-row">
    <v-btn depressed @click="dialog=true" class="create-list">
      New list
    </v-btn>
<!-- 
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card elevation="0"></v-card>
    </v-dialog> -->

  </div>
</template>

<script>
export default {
  layout: 'default',
  name: 'IndexPage',
  head(){
    return {
      title: "Airtribe | Dashboard"
    }
  }
}
</script>
