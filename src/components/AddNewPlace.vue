<template>
  <div class="add">
    <h1 class="add-h">Добавить новое место</h1>
    <b-form @submit="onSubmit">
      <b-form-group
        id="title-group"
        label="Название"
        label-for="title"
      >
        <b-form-input
          id="title"
          v-model="form.title"
          required
          placeholder="Введите название места"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="desc-group"
        label="Описание"
        label-for="desc"
      >
        <b-form-textarea
          id="desc"
          v-model="form.desc"
          placeholder="Введите описание места"
          rows="3"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        id="coords-group"
        label="Координаты на карте"
        label-for="coords"
      >
        {{coordinates[0]}}, {{coordinates[1]}}
      </b-form-group>

      <b-form-group id="type-group" label="Тип места" label-for="type">
        <b-form-select
          id="type"
          v-model="form.type"
          :options="placeTypes"
          required
        ></b-form-select>
      </b-form-group>
      <b-button type="submit" variant="primary">Добавить место</b-button>
    </b-form>
  </div>
</template>

<script>
import PlacesService from '@/services/PlacesService'

export default {
  props: {
    coordinates: Array
  },
  data() {
    return {
      form: {
        title: '',
        desc: '',
        type: '',
        coords: []
      },
      placeTypes: ['Общепит', 'Торговля', 'Развлечения']
    }
  },
  methods: {
    onSubmit(evt) {
      this.form.coords = this.coordinates;
      //console.log(this.coordinates);
      evt.preventDefault();
      console.log(JSON.stringify(this.form));
      this.addPlace();
    },
    async addPlace() {
      await PlacesService.addPlace({
        place: this.form
      });
      this.$router.push({name: 'Home'});
    }
  }
}
</script>

<style lang="less">
.add {
  max-width: 680px;
  margin: 0 auto;

  &-h {
    padding: 20px 0;
    font-size: 22px;
  }
}
</style>