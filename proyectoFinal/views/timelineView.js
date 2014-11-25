TimeLineView=Backbone.View.extend({
  el:'#tweets', 

  initialize:function(tweets){
    var parent=this;
    this.TweetViews=[],
    _.each(tweets,function(element){
      var tweetview=new TweetView({
        model:element,
        parent:parent
      })
      tweetview.parent=parent;
      var tweettext='';
      var text='';
      if (tweetview.model.has('retweeted_status')){
        tweettext=tweetview.model.get('retweeted_status').text;
        text=tweettext;      
        text=tweetview.replacelinks(tweetview.model.get('retweeted_status').entities.urls,text,tweettext,true);
        text=tweetview.replacelinks(tweetview.model.get('retweeted_status').entities.media,text,tweettext,false);
        tweetview.model.get('retweeted_status').text=text;
      }
      else{
        tweettext=tweetview.model.get('text');
        text=tweettext;
        text=tweetview.replacelinks(tweetview.model.get('entities').urls,text,tweettext,true);
        text=tweetview.replacelinks(tweetview.model.get('entities').media,text,tweettext,false);
        tweetview.model.set('text',text);
      }
    parent.TweetViews.push(tweetview);        
    delete tweettext;
    delete text;
    })
    this.render();
  },
  
  render:function(){
    $('#trends').fadeOut();
    $('#blocks').fadeOut();
    $(this.el).fadeIn();
    $('#tweets').html('');
    _.each(this.TweetViews,function(element){
      var found=undefined;
      found=blacklist.findWhere({name:element.model.attributes.user.screen_name}) 
      if (found==undefined && element.model.has('retweeted_status')){
        found=blacklist.findWhere({name:'@'+element.model.attributes.retweeted_status.user.screen_name})
      }
      if (found==undefined){
        $(element.parent.el).append(element.el); 
        element.render() 
      }        
    })    
  },
})


TweetView=Backbone.View.extend({
  className:'border container-fluid',
  tagName:'article',
  template2: _.template($('#timeline').html()),
  template3: _.template($('#detailstemplate').html()),



  render:function(){
    createdat=new Date(this.model.get('created_at'))
    createdat=createdat.toLocaleDateString()+' '+createdat.toLocaleTimeString();
    if (this.model.has('retweeted_status')){
      retweet=this.model.get('user').name+' retweeted';      
      $(this.el).html(this.template2(this.model.get('retweeted_status'),retweet,createdat));
      this.delegateEvents();
    }
    else{
      retweet='';
      $(this.el).html(this.template2(this.model.toJSON()),createdat);
      this.delegateEvents();
    }
      var value=this.model.attributes.user.screen_name;
      var follow=this.model.attributes.user.following;
      if(follow==false){
        var block=$(this.el).context.children[1]
        block.disabled=true;      
      }
    return this;
    delete retweet;
    delete createdat;
  },


  render2:function(){
    $('#tweets').html('');
    createdat=new Date(this.model.get('created_at'))
    createdat=createdat.toLocaleDateString()+' '+createdat.toLocaleTimeString();
    if (this.model.has('retweeted_status')){
      retweet=this.model.get('user').name+' retweeted';
      var workmodel=new Tweet(this.model.get('retweeted_status'))
      this.replacehash(workmodel);
      this.replaceperson(workmodel);
      $(this.parent.el).append($(this.el).html(this.template3(workmodel.toJSON(),retweet,createdat)))
    }
    else{
      retweet='';
      this.replacehash(this.model);
      this.replaceperson(this.model);;
      $(this.parent.el).append($(this.el).html(this.template3(this.model.toJSON(),retweet,createdat)))
    }
    var value=this.model.attributes.user.screen_name;
    var follow=this.model.attributes.user.following;
    if(follow==false){
      var block=$(this.el).context.children[1]
      block.disabled=true;      
    }
  },

  replacelinks:function(array,textfinal,textoriginal,flag){
    if(flag==true){
      _.each(array,function(element){
        textfinal=textfinal.replace(textoriginal.substring(element.indices[0],element.indices[1]),'<a class="link" href='+element.url+'>'+element.display_url+'</a>');
      })
    }
    else
    {
        _.each(array,function(element){
          textfinal=textfinal.replace(textoriginal.substring(element.indices[0],element.indices[1]),'<a class="link" href='+element.media_url+'>'+element.display_url+'</a>');
      })
    }
    return(textfinal);
  },

 

   events:{
  'click' : 'details',
  'click .hash' : 'trendtweets',
  'click .user' : 'usertweets',
  'click .link': 'openlink',
  'click #add' : 'addToBlacklist'
  },  
  
  details:function(){
    if (event.target.className!='link' && event.target.id!='add' && event.target.className!='hash'){
      parent=this.parent;
      tweet=new Tweet(this.model.attributes);
      var tweetview=new TweetView({
       model:tweet,
       parent:parent 
      });
      tweetview.parent=parent;
      delete parent;
      tweetview.render2(retweet);
    }
  },


  trendtweets:function(){
    $('#tweets').fadeOut();
    $('#homebtn')[0].disabled=true;
    $('#trendsbtn')[0].disabled=true;
    $('#blockedusersbtn')[0].disabled=true;
    var trendtw=new Tweet();
    trendtw.url="http://localhost:3000/search?q=%23"+event.target.name
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

  openlink:function(){
    event.preventDefault();
    window.open(event.target.href)
  },

  addToBlacklist:function(){
    var value=this.model.attributes.user.screen_name;
    var follow=this.model.attributes.user.following;
    if(follow==true){ 
      res=confirm('Are you sure you want to block @'+value+' (their tweets will not be displayed)')
      if (res==true){  
        var user=new BlackUser()
        user.set('name',value)
        blacklist.add(user);
        localStorage.blacklist=JSON.stringify(blacklist);
        timeline.render();
      }
    }
    else{
        alert('you are not following that user') 
    }
  },
 replacehash:function(tweet){
    _.each(tweet.get('entities').hashtags,function(element){
      tweet.set('text',tweet.get('text').replace('#'+element.text,'<a class="hash" name='+element.text+'>'+'#'+element.text+'</a>'))
    })
  },
    

  replaceperson:function(tweet){
    _.each(tweet.get('entities').user_mentions,function(element){
      tweet.set('text',tweet.get('text').replace('@'+element.screen_name,'<a class="user" name='+element.screen_name+'>'+'@'+element.screen_name+'</a>'))
    })
  },

  usertweets:function(){
    $('#trendsbtn')[0].disabled=true;
    $('#blockedusersbtn')[0].disabled=true;
    $('#homebtn')[0].disabled=true;
    model=this;
    $('#tweets').fadeOut();
    var usertw=new Tweet();
    usertw.url="http://localhost:3000/search?q=%40"+event.target.name;
    usertw.fetch({
      success:function(){    
        $('#homebtn')[0].disabled=false;
        $('#trendsbtn')[0].disabled=false;
        $('#blockedusersbtn')[0].disabled=false;
        usertweets = new Tweets(usertw.attributes.statuses);
        userline=new TimeLineView(usertweets.models);            
      },
      error:function(){
        $('#homebtn')[0].disabled=false;
        $('#trendsbtn')[0].disabled=false;
        $('#blockedusersbtn')[0].disabled=false;
        alert('error');
        model.render2();
      }
    })
    delete usertw;
    delete model;
  }
});



$('#homebtn').click(function(){
  var target=event.target;
  if (target.disabled!=true){
    $('#trendsbtn')[0].disabled=true;
    $('#blockedusersbtn')[0].disabled=true;
    $('#homebtn')[0].disabled=true;
    tweets= new Tweets()
    tweets.fetch({
      success:function(){
        alert('loaded')
        timeline=new TimeLineView(tweets.models);
        $('#homebtn')[0].disabled=false;
        $('#trendsbtn')[0].disabled=false;
        $('#blockedusersbtn')[0].disabled=false;
      },
      error:function(){
        alert('error');
        $('#homebtn')[0].disabled=false;
        $('#trendsbtn')[0].disabled=false;
        $('#blockedusersbtn')[0].disabled=false;
      }
    });
  }
})