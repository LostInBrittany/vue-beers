<template>
  <div class="container">
      <div class="row">
          <div class="sidebar col-md-3">
              <div>Search:</div> 
              <div>
                  <input id="searchInput" 
                      class="searchInput" 
                      v-model="filterText">
              </div>
              <div>  
              Sort by: 
              <select v-model="criterium">
                  <option 
                          v-for="item in criteria"  
                          v-bind:value="item.name">
                      {{item.label}}
                  </option>
              </select>
              <div>
                  <input 
                      type="checkbox" 
                      v-model="descendingSort" 
                      name="sortingOrder"> 
                  Descending sort
              </div>
          </div>
          </div>
          <div class="col-md-9">
              <div class="beers">
                  <div class="beer" 
                          v-for="beer in filteredAndSorted(beers,filterText,criterium,descendingSort)">
                      <beer-list-item 
                          v-bind:id='beer.id'
                          v-bind:img='beer.img'
                          v-bind:name='beer.name'
                          v-bind:alcohol='beer.alcohol'
                          v-bind:description='beer.description'>
                      </beer-list-item>
                  </div>
              </div>
          </div>
      </div>
  </div> 
</template>

<style>
</style>

<script>
module.exports = {
  data: function() {
    return {
      criteria: [
        { name: "name", label: "Alphabetical" },
        { name: "alcohol", label: "Alcohol content" }
      ],
      criterium: "",
      descendingSort: false,
      filterText: "",
      beers: [],
    };
  },
  methods: {
    filteredAndSorted: function(beers, filterText, criterium, descendingSort) {
      let coef = descendingSort ? -1 : 1;
      return this.filteredList(beers, filterText).sort((a, b) => {
        if (a[this.criterium] === b[this.criterium]) return 0;
        if (a[this.criterium] < b[this.criterium]) return -1 * coef;
        if (a[this.criterium] > b[this.criterium]) return 1 * coef;
      });
    },
    filteredList: function(beers, filterText) {
      if (!filterText) {
        return [...beers];
      }
      return beers.filter(beer => {
        return beer.name.match(new RegExp(filterText, "i"));
      });
    }
  },
  created: async function() {
    let fetchResult;
    fetchResult = await fetch("../../data/beers/beers.json");
    if (fetchResult.status == 200) {
      this.beers = await fetchResult.json();
    }
  },
  mounted: function() {
    this.criterium = this.criteria[0].name;
  }
};
</script>