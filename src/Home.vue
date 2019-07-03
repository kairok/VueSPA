<template>

  <div>
    <v-container fluid>
        <v-layout row>
          <v-flex xs12>
              <v-carousel>
                <v-carousel-item
                  v-for="(item,i) in items"
                  :key="i"
                  :src="item.src"
                ></v-carousel-item>
              </v-carousel>
          </v-flex>
        </v-layout>
    </v-container>

    <v-container>
         <v-layout row>
          <v-flex xs12>
              <h1>Home</h1>
          </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
    export default {
        data() {
          return {}
        }
    }
</script>

<style scoped>

</style>
