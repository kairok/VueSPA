<template>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="text-xs-center pt-5" v-if="loading">
          <v-progress-circular
                :size="100"
                :width="4"
                color="purple"
                indeterminate
              ></v-progress-circular>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0">
              <h1 class="tex--secodary mb-3">Orders</h1>
            <v-list  subheader  two-line >

              <v-list-tile
                avatar
                v-for="order in orders"
                :key="order.id"
              >
                <v-list-tile-action>
                  <v-checkbox
                    @change="markDone(order)"
                    :input-value="order.done"
                    color="success"
                  >
                  </v-checkbox>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{order.name}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
                </v-list-tile-content>
                  <v-list-tile-action>
                      <v-btn
                        class="primary"
                        :to="'/ad/' + order.adId"
                      >Open</v-btn>
                  </v-list-tile-action>
              </v-list-tile>


            </v-list>


        </v-flex>
        <v-flex xs12 class="text-xs-center" v-else>
            <h1 class="text-xs-center">You have no orders</h1>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
    export default {
        // data() {
        //   return {
        //         orders: [
        //           {
        //             id: 'fds3',
        //             name:' Kairat',
        //             phone: '8-7056-23423-12-12',
        //             adId: '1',
        //             done: false
        //           }

        //         ]
        //     }
        //   },
          computed : {
            loading () {
              return this.$store.getters.loading
            },
            orders () {
              return this.$store.getters.orders
            }
          },
            methods: {
                markDone(order) {
                  this.$store.dispatch('markOrderDone', order.id)
                    .then(() => {
                      order.done = true
                    })
                    .catch(() => {})
                }
        },
        created () {
          this.$store.dispatch('fetchOrders')
        }
    }
</script>

<style scoped>

</style>
