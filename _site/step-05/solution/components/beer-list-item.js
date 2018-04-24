if (!window.VueBeers) {
    window.VueBeers = {};
}

window.VueBeers.beerListItem = {
    data: function() {
        return {   
        };
    },
    props: [ 'name', 'description', 'alcohol' ],
    template: `
    <div class="beer">
        <div class="alcohol">{{ alcohol }}°</div>
        <div class="name">{{ name }}</div>
        <div class="description">{{ description }}</div>
    </div>
    `,
};