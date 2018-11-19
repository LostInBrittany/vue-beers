<template>
    <div v-bind:id="beer.id" class="detail clearfix">
      <a href="#/">
          <img class="pull-right back" src="../../img/back.png">
      </a>
      <h1 class="name">{{beer.name}}</h1>
      
      <img class="pull-right img" v-bind:src="mainImg">
      
      <p class="description">{{beer.description}}</p>

      <ul class="beer-thumbs">
          <li>
              <img v-bind:src="imgUrl" 
                  v-on:click="setImage(beer.img)">
          </li>
          <li>
              <img 
                  v-bind:src="labelUrl" 
                  v-on:click="setImage(beer.label)">
          </li>
      </ul>
      <ul class="specs">
          <li>
              <dl>
              <dt>Alcohol content</dt>
              <dd>{{beer.alcohol}}%</dd>
              </dl>
          </li>
          <li>
          <dl>
            <dt>Brewery</dt>
            <dd>{{beer.brewery}}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Availability</dt>
            <dd>{{beer.availability}}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Style</dt>
            <dd>{{beer.style}}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Serving instructions</dt>
            <dd>{{beer.serving}}</dd>
          </dl>
        </li>
      </ul>
  </div>
</template>

<style>
</style>

<script>
module.exports = {
  data: function() {
    return {
      beer: {},
      mainImg: null
    };
  },
  computed: {
    imgUrl: function() {
      if (!this.beer.img) {
        return;
      }
      return `../../data/${this.beer.img}`;
    },
    labelUrl: function() {
      if (!this.beer.label) {
        return;
      }
      return `../../data/${this.beer.label}`;
    }
  },
  mounted: function() {
    this.getBeerDetails(this.$route.params.id);
  },
  watch: {
    $route(to, from) {
      this.getBeerDetails(to.params.id);
    }
  },
  methods: {
    getBeerDetails: async function(id) {
      let fetchResult;
      fetchResult = await fetch(`../../data/beers/details/${id}.json`);
      if (fetchResult.status == 200) {
        this.beer = await fetchResult.json();
      }
      this.mainImg = `../../data/${this.beer.img}`;
    },
    setImage: function(img) {
      this.mainImg = `../../data/${img}`;
    }
  }
};
</script>

