define (["moviemodule","pubsub"], function(moviemodule,jquery,pubsub){
	var alien=new Movie;
	var ridleyScott=new Director("ridleyScott");
	quotesarr=new Quotes;												//initialization
	ridleyScott.set('quotes', ['Cast is everything.', 'Do what ...']);
	alien.set("director",ridleyScott);
	alien.get("director").speak();
	console.log("Movie class, alien var:",alien);						//shows alien object (class Movie)
	console.log("Director class, ridleyscott:",ridleyScott);			//shows rudketScott object (class director)
	console.log("empty class Quotes:",quotesarr)						//shows quotesarr object (class quote, it's empty)
	ridleyScott.set("quotes",["no no no"]);								//changes ridletScott attributes
	console.log("Movie alien unaffected after ridleyScott change:",alien) //but it does not change the attributes of alien movie.
});