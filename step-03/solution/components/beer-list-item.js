if (!window.VueBeers) {
    window.VueBeers = {};
}

window.VueBeers.beerListItem = {
    data: function() {
        return {   
        };
    },
    props: [ 'name', 'description' ],
    template: `
    <div class="beer">
        <span>{{ name }}</span>
        <p>{{ description }}.</p>
    </div>
    `,
};