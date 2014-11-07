function Movie(){  
        this.attributes={
        title : '',
        actor : []
    }
}


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
		default: return console.log("error, attribute value must be a title or actor/s");
		} 
	},
	get:function(attr){
		switch (attr){											//this switch is used to control if the attribute to get is valid//
		case "title": return(this.attributes[attr]); break;
		case "actor": $.each(this.attributes.actor,function(index,value){
			console.log(value);
		}); break;
		default: return console.log("error, attribute value must be a title or actor/s");
		} 
	}
}

//---------------------------------------------Listener-------------------------------------------//
var MovieObserver={
	listen:function(){
		$.subscribe("playing",function(e,title){
			console.log("playing "+title);
		})
		$.subscribe("stopped",function(e,title){
			console.log("stopped "+title);
		})
	}
}

//-------------------------------------------Methods to extend class Movie----------------------------------//

var downloadableMovie={
	download:function(){
		console.log("you are trying to download "+this.get("title"));
	}
}

var social={
	share:function(name){
		console.log("shared "+this.get("title")+" with "+name);
	},
	like:function(){
		console.log("you liked "+this.get("title")+" movie!")
	}
}

$.extend(Movie.prototype,downloadableMovie);
$.extend(Movie.prototype,social);

 //--------------------------------------------------------------------------------------------------------//
 $(document).ready(function(){
 	MovieObserver.listen();		//initialize the Listener
 	first=new Movie;
 	first.set("title","terminator");
 })