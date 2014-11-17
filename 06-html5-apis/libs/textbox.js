$(document).ready(function() {
  var bd;
  var ini = indexedDB.open("mibase",2);
  ini.onsuccess = function (e){
    bd=e.target.result;
  };
  websocket= new WebSocket("wss://echo.websocket.org");
  ini.onupgradeneeded = function (e){
  bd=e.target.result;
  bd.createObjectStore ("texto", {keyPath: "id"}); 
  }

  $('#texto').on('dragenter',function(e){e.preventDefault()})

  $('#texto').on('dragover',function(e){e.preventDefault()})

  $('#texto').on('drop',function(e){
    e.preventDefault();
    event=e.originalEvent;
    var dataTransfer=event.dataTransfer;
    var archivos=dataTransfer.files;
    archivo=archivos[0];
    var reader=new FileReader();
    reader.onload=function(e){
       $('#texto').val(e.target.result)
    }
    reader.readAsText(archivo)
  })

  
websocket.onmessage=function(evt) {
    writeToScreen('RESPONSE: ' + evt.data+'\n')
  }


websocket.onerror=function(evt) {
 writeToScreen('ERROR: ' + evt.data); 
}  

function writeToScreen(message) {
  $('#texto').val($('#texto').val()+message)
}  

  $('#save').click(function(){
   if ($('#texto').val().trim()!=''){
    var val = $('#texto').val();
    $('#texto').val('');
    var id=$.now();
    var tran = bd.transaction(["texto"], "readwrite");
    var store = tran.objectStore("texto");
    var addit=store.add({id:id, texto : val});
    localStorage.setItem(id,val);
    alert('texto guardado')
    }
  });

  $('#delete').click(function(){
    val= $('#texto').val();
    localStorage.clear();
    var tran = bd.transaction(["texto"], "readwrite");
    var store = tran.objectStore("texto");
    var request=store.clear();
    alert('textos borrados')
  });

  $('#send').click(function(){ 
    val=$('#texto').val();
    $('#texto').val('')
    writeToScreen('SENT:'+val+'\n');
    websocket.send(val);

  });

});



            




 







