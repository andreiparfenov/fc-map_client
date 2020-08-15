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
        :key="marker.id"
      />
    </yandex-map>
  </div>
</template>

<script>

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

  &-map {
    height: 100%;
    width: 100%;
  }
}
</style>
