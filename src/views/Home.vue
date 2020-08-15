<template>
  <div class="home">
    <div class="home-nav">
      <p :class="{ active: placesType === 'all' }" @click="placesType = 'all'">Все места</p>
      <p :class="{ active: placesType === 'Общепит' }" @click="placesType = 'Общепит'">Общепит</p>
      <p :class="{ active: placesType === 'Торговля' }" @click="placesType = 'Торговля'">Торговля</p>
      <p :class="{ active: placesType === 'Развлечения' }" @click="placesType = 'Развлечения'">Развлечения</p>
    </div>
    <yandex-map
      class="home-map"
      :coords="coords"
      :zoom="zoom"
      :controls="controls"
      @click="onClick"
    >
      <ymap-marker
        v-for="marker in sortedPlaces"
        :markerId="marker._id" 
        :key="marker._id"
        :hint-content="marker.title" 
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
      placesType: 'all',
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
        <p><b>Координаты:</b> ${marker.coords[0]}, ${marker.coords[1]}</p>
      `
    },
    async getPlaces() {
      const response = await PlacesService.fetchPlaces();
      this.places = response.data;
      console.log(this.places);
    },
    onClick(e) {
      this.$router.push({ name: 'AddNewPlace', params: { coordinates: e.get('coords') } });
    }
  },
  mounted() {
    this.getPlaces();
  },
  computed: {
    sortedPlaces: function() {
      if (this.placesType === 'all') {
        return this.places
      } else {
        return this.places.filter((place) => { return place.type === this.placesType })
      }
    }
  }
}
</script>

<style lang="less">

.home {
  height: 100vh;
  width: 100vw;
  position: relative;
  z-index: 0;

  &-nav {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background: #FFFFFF;
    height: 70px;
    display: flex;
    align-items: center;

    p {
      margin: 20px;
      text-decoration: underline;

      &:hover {
        cursor: pointer;
        color: green;
      }

      &.active {
        color: green;
      }
    }
  }

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
