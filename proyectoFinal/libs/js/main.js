
$(document).ready(function(){
  $('#blacklist').fadeOut()
  if (localStorage.blacklist!=undefined){
    blacklist= new BlackList (JSON.parse(localStorage.blacklist))
  }
  else
  	blacklist=new BlackList();
    $('#homebtn').trigger('click')
  posicion='';
  navigator.geolocation.getCurrentPosition(getposition);
  function getposition(position){
    posicion=position;
  }
})