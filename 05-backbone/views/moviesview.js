define(['detailsview','titleview','moviemodel'],function(detailsview,titleview,model,jquery,backbone){
  moviesViewer=Backbone.View.extend({

    el:'#wrapper',

    initialize:function(){
      this.render();
    },

    render:function(){
      var self=this;
      $('#listing').empty();
      _.each(movies.models,function(models){
        self.renderMovie(models);
      },this);
    },

    renderMovie:function(movie){
      var newtitle=new Title({
        model:movie
      });
      var newdetails=new Details({
        model:movie
      });
      $('#listing').append(newtitle.renderTitle().el);//view del title
      $('#listing').append(newdetails.renderDetails().el);//view de los detalles
    },

    events: {
        'click .add'   : 'add',
        'click .edit' : 'edit',
        'click .remove': 'remove'
      },

    add:function(){
      if ($('#title').val().trim()=='')//se comprueba que el titulo no sea solo espacios en blanco
        alert('Title needs a value');
      else{            
        exist=movies.findWhere({title: $('#title').val()})//se comprueba que exista el modelo con ese titulo
        if (exist!=undefined)   
          alert('The Movie you tried to add is already in the database');
        else{
          newmovie=new Movie;
          newmovie.set({"title":$("#title").val(),"details":$("#details").val()});
          movies.push(newmovie);
          localStorage.movies=JSON.stringify(movies);//se pasa a string la coleccion movies
          movies.change();                           //(quedando asi solo los atributos de los modelos guardados)       
        }
      }    
    },

    remove:function(){
      if ($('#title').val().trim()=='')
        alert('Title needs a value');
      else{
        exist=movies.findWhere({title: $('#title').val()})
        if (exist==undefined)
          alert('The Movie you tried to remove has not been found');
        else
        {
          movies.remove(exist);
          localStorage.movies=JSON.stringify(movies);
          movies.change();
        }
      }  
    },

    edit:function(){
      if ($('#title').val().trim()=='')
        alert('Title needs a value');
      else{
        exist=movies.findWhere({title: $('#title').val()})
        if (exist==undefined)
        alert('The Movie you tried to edit has been not found');
        else
        {
        exist.set({"details":$("#details").val()})
        localStorage.movies=JSON.stringify(movies);
        movies.change();
        }
      }  
    }
  })
})