define(["moviesview"],function(moviesview){

if (localStorage.movies != undefined)//se comprueba que haya guardados modelos en local storage
	movies=new Movies(JSON.parse(localStorage.movies))//se genera la coleccion con los modelos guardados en local storage
else                                                //haciendo un JSON.parse para pasar el string a valores
	movies=new Movies;
directory=new moviesViewer();
})