rec=document.getElementById('rectangle');
recctx=rec.getContext('2d');



$(document).ready(function(){
var c = document.getElementById('dibujo');
ctx = c.getContext('2d');
//rectangulo
val=Math.floor((Math.random()*10000)+1);
ctx.fillStyle ='#FF'+val;
ctx.fillRect(0,0,150,75);

//circulo
val=Math.floor((Math.random()*10000)+1);
ctx.strokeStyle='#FF'+val;
ctx.fillStyle='#FF'+val;
ctx.arc(250,50,40,0,2*Math.PI);
ctx.stroke();
ctx.fill();

//triangulo
val=Math.floor((Math.random()*10000)+1);
ctx.strokeStyle='#FF'+val;
ctx.moveTo(100,100);
ctx.lineTo(150,100);
ctx.lineTo(100,150);
ctx.lineTo(100,100);
ctx.stroke();

//rectangulo animado
recctx.fillRect(0,0,25,50);
});

function render(time){
  recctx.clearRect(0,0,25,50);
  if(i== 275){
    i=0;
    currentpos*=-1
    k++
  }
  recctx.translate(currentpos,0);
  recctx.fillRect(0,0,25,50);
  i++
};

$('#animacion').click(function(){
  currentpos=1;
  i=0;
  k=0;
  (function animationLoop(){
    render();
    if (k==2){
      return;
    }
    window.requestAnimationFrame(animationLoop)
  })();
})