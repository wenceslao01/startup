Movie= Backbone.Model.extend({
      
  defaults:{
    title: '',
    details: ''
  }
}),




Database=function(data){
	this.objetos=[]
},

Database.prototype={

	change:function(){
      directory.render();
	}
}