if (!window.VueBeers) {
    window.VueBeers = {};
}

window.VueBeers.beerListItem = {
    data: function() {
        return {   
        };
    },
    props: [ 'name', 'description', 'alcohol', 'id', 'img' ],
    computed: {
        imgUrl: function() {
            if (!this.img) {
                return;
            }
            return `../../data/beers${this.img}`;
        }
    },
    template: `
    <div v-bind:id="id" class="clearfix">
      <img class="float-right el-img" v-bind:src="imgUrl">
      <h2 class="el-name">{{name}}</h2>
      <p class="el-description">{{description}}</p>
      <p class="pull-right el-alcohol">Alcohol content: {{alcohol}}%</p>
    </div>
    `,
};