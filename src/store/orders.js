//import { rejects } from "assert";
import * as fb from 'firebase'

class Order {
    constructor (name, phone, adId, done =false, id = null) {
        this.name= name
        this.phone= phone
        this.adId= adId
        this.done= done
        this.id= id
        
    }
}

export default {
    state: {
        orders: []
    },
    mutations: {
        loadorders (state, payload) {
            state.orders = payload
        }
    },
    actions: {
        async CreateOrder ({commit} , {name, phone, adId, ownerId}) {
            const order = new Order(name, phone, adId)
            var str = "/users/{ownerId}/orders".replace("{ownerId}", ownerId);
            //var res = str.
            console.log(str)
            try {
                await fb.database().ref(str).push(order)
            } catch (error) {
                commit('setError', error.message)
                throw error
            }

            //  await new   Promise((resolve, reject) => {
            //      setTimeout(() => {
            //          resolve()
            //      }, 4000);
            //  }) 
        },
        async fetchOrders ({commit, getters}) {
            commit('setLoading', true)
            commit('clearError')

            const resultOrders = []
            try {
                var str = "/users/{getters.user.id}/orders".replace("{getters.user.id}", getters.user.id);
                const fbVal = await fb.database().ref(str).once('value')
                const orders = fbVal.val()
                
                Object.keys(orders).forEach(key => {
                    const o = orders[key]
                    resultOrders.push(
                        new Order(o.name, o.phone, o.adid, o.done, key)
                    )
                })
                //console.log(resultOrders)
                commit('loadorders', resultOrders)
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        async markOrderDone ({commit, getters}, payload) {
            try {
                var str = "/users/{getters.user.id}/orders".replace("{getters.user.id}", getters.user.id);
                console.log(str)
                commit('clearError')
                await fb.datebase().ref(`/users/${getters.user.id}/orders`).child(payload).update({
                    done: true
                })
            } catch (error) {
                commit('setError', error.message)
                throw error
            }
        }
    },
    getters: {
        doneOrders (state){
            return state.orders.filter(o => o.done)
        },
        undoneOrders (state) {
            return state.orders.filter(o => !o.done)
        }, 
        orders (state, getters) {
            return  getters.undoneOrders.concat(getters.doneOrders)
        }
    }
}