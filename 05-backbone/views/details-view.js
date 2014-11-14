Details=Backbone.View.extend({

  template2:_.template($('#details-template').html()),

  renderDetails: function(){
    this.$el.html(this.template2(this.model.toJSON()));
    return this;
  },

});
