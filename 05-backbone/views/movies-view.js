moviesViewer=Backbone.View.extend({

  el:'#wrapper',
  url:'/movies/',


  initialize:function(){
    moviesViewer.render;
  },

  render:function(){
    var self=this;
    console.log (self)
    $('#listing').empty();
    _.each(movies.objetos,function(models){
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
    $('#listing').append(newtitle.renderTitle().el);
    $('#listing').append(newdetails.renderDetails().el);
  },

  events: {
      "click .add"   : 'add',
      "click .edit" : 'edit',
      "click .remove": 'remove'
    },

  add:function(){
    if ($('#title').val()=='')
      alert('Title needs a value');
    else{
      var flag=false;
      $.each(movies.objetos,function(){
        if (this.get('title')==$('#title').val()){
          flag=true;
          return flag;      
        } 
      })
      if (flag==1)
        alert('The Movie you tried to add is already in the database');
      else{
        newmovie=new Movie;
        newmovie.set({'title':$('#title').val(),'details':$('#details').val()});
        movies.objetos.push(newmovie);
        movies.change();
      }  
    }
  },

  remove:function(){
    if ($('#title').val()=='')
      alert('Title needs a value');
    else
    {
      flag=false;
      $.each(movies.objetos,function(i){
        if (this.get('title')==$('#title').val()){
          movies.objetos.splice(i,1);
          flag=true;
          movies.change();
          return flag;      
        } 
      })
      if (flag==false)
        alert('Movie not found in the database');
    }
  },

  edit:function(){
    if ($('#title').val()=='')
      alert('Title needs a value');
    else{
      flag=false;
      $.each(movies.objetos,function(i){
        if (this.get('title')==$('#title').val()){
          this.set('details',$('#details').val());
          flag=true;
          movies.change();
          return flag;
        } 
      })
      if (flag==false)
        alert('The Movie you tried to edit is not in the database');
    }
  }
})