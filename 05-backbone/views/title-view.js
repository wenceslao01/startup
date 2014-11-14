Title=Backbone.View.extend({
  tagName:'li',

  template:_.template($('#title-template').html()),

  renderTitle: function(){
  	console.log(this)
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});