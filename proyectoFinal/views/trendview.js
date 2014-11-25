TrendListView=Backbone.View.extend({
  el:'#trends',

  initialize:function(trendsv){   
   $(this.el).empty();
   $(this.el).fadeIn();
    var parent=this;
    this.trendviews=[];
    _.each(trendsv.attributes[0].trends,function(trend){
      var trendview=new TrendView({
        parent:parent,
        model:trend
      })
      trendview.model=trend;  
      trendview.parent=parent;
      parent.trendviews.push(trendview);
      $(parent.el).append(trendview.el);
    })
    this.render()
  },

  render:function(){
    _.each(this.trendviews,function(trend){
      trend.render();
    })
  }
});


TrendView=Backbone.View.extend({
  tagName:'li',
  class:'trenditem',
  template:_.template($('#trendstemplate').html()),
  
  render:function(){
    $(this.el).html(this.template(this.model));
    return(this);
  },

  events:{
    'click':'trendtweets'
  },

trendtweets:function(){
    $('#tweets').fadeOut();
    $('#homebtn')[0].disabled=true;
    $('#trendsbtn')[0].disabled=true;
    $('#blockedusersbtn')[0].disabled=true;
    console.log(this);
    var trendtw=new Tweet();
    trendtw.url=this.model.url.replace('http://twitter.com','http://localhost:3000');
    trendtw.fetch({
      success:function(){    
        $('#homebtn')[0].disabled=false;
        $('#trendsbtn')[0].disabled=false;
        $('#blockedusersbtn')[0].disabled=false;
        trendtweets = new Tweets(trendtw.attributes.statuses);
        trendline=new TimeLineView(trendtweets.models);            
      },
      error:function(){
        $('#homebtn')[0].disabled=false;
        $('#trendsbtn')[0].disabled=false;
        $('#blockedusersbtn')[0].disabled=false;
        alert('error')
      }
    })
    delete trendtw;
  },

}),

$('#trendsbtn').click(function(){
  var target=event.target;
  if(target.disabled==false){  
    if (posicion==''){
      alert('geolocation disabled, pls enable it to use this feature')
      return;
    }
    $('#trendsbtn')[0].disabled=true;
    $('#blockedusersbtn')[0].disabled=true;
    $('#homebtn')[0].disabled=true;
    tweets2=new Tweet();
    $('#tweets').fadeOut();
    $('#blocks').fadeOut();
    var id='';
    tweets2.url="http://localhost:3000/myplace?lat="+posicion.coords.latitude+"&long="+posicion.coords.longitude;
    tweets2.fetch({
      success:function(){
        id=tweets2.attributes[0].parentid;
        tweets2=new Tweet;
        tweets2.url="http://localhost:3000/trends?id="+id
        tweets2.fetch({
        success:function(){
          trendlist=new TrendListView(tweets2);
          $('#trendsbtn')[0].disabled=false;
          $('#blockedusersbtn')[0].disabled=false;
          $('#homebtn')[0].disabled=false;
          },
          error:function(){
            alert('error loading the trends');
            $('#trendsbtn')[0].disabled=false;
            $('#blockedusersbtn')[0].disabled=false;
            $('#homebtn')[0].disabled=false;
          }
        })       
      },
      error:function(){
        alert('error loading your location');
        $('#trendsbtn')[0].disabled=true;
        $('#blockedusersbtn')[0].disabled=true;
        $('#homebtn')[0].disabled=true;
        }
      })
  }

})