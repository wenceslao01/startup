define(["backbone"],function(Backbone){	
	Title=Backbone.View.extend({
	  tagName:'li',

	  template:_.template($('#title-template').html()),

	  renderTitle: function(){
	    this.$el.html(this.template(this.model.toJSON()));
	    return this;
	  }

	});
})