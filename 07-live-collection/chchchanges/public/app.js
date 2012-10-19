var Update = Backbone.Model.extend({});

var UpdateView = Backbone.View.extend({
    tagName: 'li',
    template: _.template("<%= text %>"),
    render: function () {
        this.el.innerHTML = this.template(this.model.toJSON());
        return this;
    }
});

var Updates = Backbone.Collection.extend({
    model: Update,
    url: '/updates',
    update: function () {
        this.fetch({
            add:true
        });
    }
});

var UpdatesView = Backbone.View.extend({
    tagName: "ul",
    template: _.template("<h2> Updates </h2>"),
    initialize: function () {
        this.collection.on('add', this.addUpdate, this);
        this.collection.on('reset', this.add, this);
        this.collection.fetch();
        setInterval(this.collection.update.bind(this.collection), 5000);
    },
    render: function () {
        this.el.innerHTML = this.template();
        return this;
    },
    add: function () {
        this.collection.each(this.addUpdate, this);
    },
    addUpdate: function (model) {
        this.$el.append(new UpdateView({ model: model }).render().el);
    }
});

var updatesView = new UpdatesView({ collection: new Updates });

$("#main").html(updatesView.render().el);
