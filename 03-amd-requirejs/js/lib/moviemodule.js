define(["Directormodule"],
	function(Directormodule){
		Movie= function(){  
        this.attributes={
        title : '',
        actor : [],
        director : new Director //generates a new Object of class Director
   		}
	},
Movie.prototype = {
	constructor:Movie,
	play:function(){
		$.publish("playing",[this.get("title")]);
	},
	stop:function(){
		$.publish("stopped",[this.get("title")]);
	},
	set:function(attr,value){
		switch (attr){											//this switch is used to control if the attribute to set is valid//
		case "title": this.attributes[attr]=value; break;
		case "actor": this.attributes[attr].push(value); break;
		case "director": this.attributes[attr].set("name",value.name); //copy every attribute of the objects
						 this.attributes[attr].set("quotes",value.quotes);
						 break;
		default: return console.log("error, attribute value must be a title or actor/s");
		} 
	},
	get:function(attr){
		switch (attr){											//this switch is used to control if the attribute to get is valid//
		case "title": return(this.attributes[attr]); break;
		case "actor": $.each(this.attributes.actor,function(index,value){ //copy every value of the array
			console.log(value);}); break;	
		case "director": return(this.attributes[attr]); break;
		default: return console.log("error, attribute value must be a title or actor/s");
		} 
	}
}
return Movie;
}
)	