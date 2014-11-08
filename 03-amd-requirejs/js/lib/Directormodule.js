define(function(){
	Director=function (name){
			this.name=name;
			this.quotes= []
	},

	Quotes=function(){
		this.quotes=[];
	},
	Director.prototype={
		speak:function(){
			$.each(this.quotes,function(index,value){
				console.log("quote " + ":" + value)
			})	
		},
		set:function(attr,values){
			switch (attr){											
			case "name": this.name=values; break;
			case "quotes": current=this; 
						$.each(values,function(index,value){	//copy every value of the array
							current.quotes.push(value)}); break;
			default: return console.log("error, attribute value must be a title or actor/s");
			} 
		},
		get:function(attr){
			switch (attr){											//this switch is used to control if the attribute to set is valid//
			case "name": return (this.name); break;
			default: return console.log("error, attribute value must be a name");
			} 
		}
	},	
	Quotes.prototype={
		set:function(value){
			this.quotes.push(value);
		}
	}
});