import Api from '@/services/Api'

export default {
  fetchPlaces () {
    return Api().get('places')
  },

  addPlace (params) {
    console.log(params);
    return Api().post('places', params)
  }
}