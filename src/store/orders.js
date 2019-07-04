import { rejects } from "assert";

export default {
    state: {
        orders: []
    },
    mutations: {
        CreateOrder (state, payload) {
            state.orders.push(payload)
        }
    },
    actions: {
        async CreateOrder () {
             await new   Promise((resolve, reject) => {
                 setTimeout(() => {
                     resolve()
                 }, 4000);
             }) 
        }
    },
    getters: {}
}