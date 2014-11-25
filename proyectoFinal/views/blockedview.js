BlackListView=Backbone.View.extend({
  el:'#blocks',
  
  initialize: function(blacklist){
    $('#blocks').html('');
    var parent=this
    this.blackviews=[]
    _.each(blacklist.models,function(element){
      blackitem = new BlackItem({
        parent:parent,
        model:element
      })
      blackitem.parent=parent
      parent.blackviews.push(blackitem)
    })
    this.render();
    $('#tweets').fadeOut();
    $('#trends').fadeOut();
    $('#blocks').fadeIn();
  },

  render:function(){
    _.each(this.blackviews,function(element){
      element.render();
    }) 
  }
});



BlackItem=Backbone.View.extend({
  tagName:'li',
  template:_.template($('#blockedtemplate').html()),

  render:function(){
    $(this.parent.el).append($(this.el).html(this.template(this.model.toJSON())));
  },

  events:{
    'click #removebtn':'removeitem'
  },

  removeitem:function(){
    blacklist.remove(blacklist.findWhere({name:this.model.attributes.name}))
    localStorage.blacklist=JSON.stringify(blacklist);
    blacklistview=new BlackListView(blacklist);
  }
});

$('#blockedusersbtn').click(function(){
  blacklistview=new BlackListView(blacklist)
  $('#tweets').fadeOut();
  $('#trends').fadeOut();
  $('#blocks').fadeIn();
});
