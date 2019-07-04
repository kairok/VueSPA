import * as fb from 'firebase'

class Ad {
  constructor (title,description,ownerId, imageSrc='', promo=false, id=null ) {
      this.title = title
      this.description = description
      this.ownerId = ownerId
      this.imageSrc = imageSrc
      this.promo = promo
      this.id = id

  }

}


export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadsAds (state, payload) {
      state.ads = payload
    },
    updateAd (state, {title, description, id}) {
      const ad = state.ads.find(a => {
        return a.id === id
      })
      ad.title = title
      ad.description = description

    }
  },
  actions: {

    async createAd ({commit, getters}, payload) {
     // payload.id =  Math.floor(Math.random() * 10 +1).toString()
      commit('clearError')
      commit('setLoading', true)
      //commit('createAd', payload)
     // console.log(getters.user)
   //   const image = payload.image
      console.log(payload)
      try {
          const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          payload.imageSrc,
          payload.promo
          )

        const ad = await fb.database().ref('ads').push(newAd)
        //console.log(ad)
      //  const imageExt = image.name.slice(image.name.lastIndexof('.'))
     //   console.log(imageExt)
//        const filedata = await fb.storage().ref('ads/${ad.key}.${imageExt}').put(image)
//        const imageSrc = fileData.metadata.downloadURLs[0]
//        //console.log(ad)
//
//        await fb.database().ref('ads').child(ad.key).update({
//          imageSrc
//        })
        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key
        })

      } catch (error) {
          commit('setError', error.message)
          commit('setLoading', false)
          throw error
      }


    },

    async fetchAds ({commit}) {
      commit('clearError')
      commit('setLoading', true)

      const resultAds = []

      try{
        const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()
        //console.log(ads)
        Object.keys(ads).forEach(key => {
            const ad = ads[key]
            resultAds.push(
              new Ad(ad.title,ad.description,ad.ownerId, ad.imageSrc, ad.promo, key)
            )
        })
        commit('loadsAds', resultAds)

        commit('setLoading', false)

      } catch (error){
          commit('setError', error.message)
          commit('setLoading', false)
          throw error
      }
    },
    async updateAd ({commit, getters}, {title, description, id}) {
        commit('clearError')
        commit('setLoading', true)

        try{
            await fb.database().ref('ads').child(id).update({
              title, description
            })
            commit('updateAd', {
              title, description, id
            })
            commit('setLoading', false)
        }catch (error) {
          commit('setError', error.message)
          commit('setLoading', false)
          throw error
        }


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
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.id
      })
    },
    adsById (state) {
      return adId => {
        return state.ads.find( ad => ad.id === adId)
      }
    }
  }
}
