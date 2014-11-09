function Movie(){  
        this.attributes={
        title : '',
        actor : []
    }
}


Movie.prototype = {
	play:function(){
		$.publish("playing",[this.get("title")]);
	},
	stop:function(){
		$.publish("stopped",[this.get("title")]);
	},
	set:function(attr,value){
		switch (attr){											//this switch is used to control if the attribute to set is valid//
		case "title": this.attributes[attr]=value; break;
		case "actor": this.attributes[attr].push(value.getname());break;
		default: return console.log("error, attribute value must be a title or actor/s");
		} 
	},
	get:function(attr){
		switch (attr){											//this switch is used to control if the attribute to get is valid//
		case "title": return(this.attributes[attr]); break;
		case "actor": $.each(this.attributes.actor,function(index,value){
			console.log(++index, value);
		}); break;
		default: return console.log("error, attribute value must be a title or actor/s");
		} 
	}
}
//-----------------------------class Movie defined as a Module------------------------
MovieModule=(function(){  
        this.title = '';
        this.actor = [];
	return{
	play:function(){
		$.publish("playing",[this.get("title")]);
	},
	stop:function(){
		$.publish("stopped",[this.get("title")]);
	},
	set:function(attr,value){
		switch (attr){											//this switch is used to control if the attribute to set is valid//
		case "title": this[attr]=value; break;
		case "actor": this[attr].push(value); break;
		default: return console.log("error, attribute value must be a title or actor/s");
		} 
	},
	get:function(attr){
		switch (attr){											//this switch is used to control if the attribute to get is valid//
		case "title": return(this[attr]); break;
		case "actor": $.each(this[attr],function(index,value){
			console.log(value);
		}); break;
		default: return console.log("error, attribute value must be a title or actor/s");
		} 
	}
}
})();


//---------------------------------------------Listener-------------------------------------------//
MovieObserver=function(){
	$.subscribe("playing",function(e,title){
		console.log("playing "+title);
	})
	$.subscribe("stopped",function(e,title){
		console.log("stopped "+title);
	})
}

//-------------------------------------------Methods to extend class Movie----------------------------------//

downloadableMovie =function(){
	Movie.call;
},
downloadableMovie.prototype=new Movie;
downloadableMovie.prototype.download=function(){
		console.log("you are trying to download "+this.get("title"));
}
//---------------------------MIXIN-----------------------------------------
var social={
	share:function(name){
		console.log("shared "+this.get("title")+" with "+name);
	},
	like:function(){
		console.log("you liked "+this.get("title")+" movie!")
	}
}
$.extend(Movie.prototype,social);

//--------------------------Actor Class definition--------------------------
Actor=function(){
	this.name= "";
};
Actor.prototype={
	setname:function(value){
		this.name=value;
	},
	getname:function(){
		return(this.name)
	}
};
 //--------------------------------------------------------------------------------------------------------//
new MovieObserver;		//initialize the Listener
terminator=new Movie;
terminator.set("title","terminator");
terminator.play();
terminator.stop();
actor1=new Actor;
actor1.setname("Arnold Schwarzenegger");
actor2=new Actor;
actor2.setname("Linda Hamilton");
terminator.set("actor",actor1);
terminator.set("actor",actor2);
terminator.get("actor");
terminator.share("thomas");
terminator.like();
alien=new downloadableMovie;
alien.set("title","alien");
alien.play();
alien.download();
//terminator.download(); //is not a downloadable movie, so this sentence would cause an error
