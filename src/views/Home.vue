<template>
  <div class="home">
    <yandex-map
      class="home-map"
      :coords="coords"
      :zoom="zoom"
      :controls="controls"
    >
      <ymap-marker
        v-for="marker in places"
        :markerId="marker._id" 
        :key="marker._id" 
        :coords="marker.coords" 
        :balloon-template="balloonTemplate(marker)"
        :icon="marker.type === 'Общепит' ? eatIcon : marker.type === 'Торговля' ? shopIcon : funIcon"
      />
    </yandex-map>
  </div>
</template>

<script>
import PlacesService from '@/services/PlacesService'

export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      coords: [54.817842, 58.446423],
      zoom: 15,
      controls: ["zoomControl"],
      places: [],
      eatIcon: {
        layout: 'default#image',
        imageHref: require('../assets/eat-icon.png'),
        imageSize: [50, 50]
      },
      shopIcon: {
        layout: 'default#image',
        imageHref: require('../assets/shop-icon.png'),
        imageSize: [50, 50]
      },
      funIcon: {
        layout: 'default#image',
        imageHref: require('../assets/fun-icon.png'),
        imageSize: [50, 50]
      }
    }
  },
  methods: {
    balloonTemplate(marker) {
      return `
        <h2>${marker.title}</h2>
        <p>${marker.desc}</p>
      `
    },
    async getPlaces() {
      const response = await PlacesService.fetchPlaces();
      this.places = response.data;
      console.log(this.places);
    }
  },
  mounted() {
    this.getPlaces();
  }
}
</script>

<style lang="less">

.home {
  height: 100vh;
  width: 100vw;
  position: relative;
  z-index: 0;

  &-map {
    height: 100%;
    width: 100%;
  }
}

.ymaps-2-1-77-placemark-overlay {
  animation: move 2s infinite;
}

@keyframes move {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}
</style>
