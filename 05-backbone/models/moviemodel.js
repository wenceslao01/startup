define(["backbone"],function(Backbone){	
	Movie= Backbone.Model.extend({    
	  defaults:{
	    title: "",
	    details: ""
	  }
	}),



	Movies=Backbone.Collection.extend({
	  model:Movie,

	  change:function(){
	    directory.render();
	  }

	})
})

