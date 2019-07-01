export default {
  state: {
    ads: [
              {title: 'First ad', description: 'Hello', promo: true,
                imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                id: '1'},
              {title: 'Second ad', description: 'Hello', promo: true,
                imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                id: '2'},
              {title: 'Third ad', description: 'Hello', promo: true,
                imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                id: '3'},

            ]
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    }
  },
  actions: {
    createAd ({commit}, payload) {
      payload.id =  Math.floor(Math.random() * 10 +1).toString()
      commit('createAd', payload)
    }
  },
  getters: {
    ads(state) {
      return state.ads
    },
    promoAds(state) {
      return state.ads.filter(ad => {
        return ad.promo == true
      })
    },
    myAds (state) {
      return state.ads
    },
    adsById (state) {
      return adId => {
        return state.ads.find( ad => ad.id === adId)
      }
    }
  }
}
