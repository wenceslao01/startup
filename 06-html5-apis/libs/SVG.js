$(document).ready(function(){
  element=document.getElementById('SVG');
  aux=1;
  $('#btn').click(function(){
    if (aux==1){
      aux=5; 
      element.currentScale=aux
    }
    else{
      aux=1;
      element.currentScale=aux
    }
      
  })
})