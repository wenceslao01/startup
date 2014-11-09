$(document).ready(function(){
    $("#normal").fadeIn(1000,function(){
        $(".alias").focus();
    })
    $("#welcome").click(function(){
        if($(".alias").val()=="")
          $("div").css("color","red");
        $.get("http://bootcamp.aws.af.cm/welcome/"+$(".alias").val(),function(data){
            $("div").html(data.response);
            $("div").html(function(busca, reemplaza){
                return reemplaza.replace("Welcome","Welcome <span>");
            })
            $("div").html(function(busca, reemplaza){
                return reemplaza.replace("!","</span>!");
            })
        })
        .fail(function(){
            $("div").css("color","red");
        })
    })
    $("#tw").click(function(){
        $.ajax({
            url: "http://localhost:3000/search?q=html5",
            type: "get"
        })
        .success(function(data){
            $.each(data.statuses,function(index,value){
                $("#tweetsect").append("<article><br/><strong>from user</strong>:"+ value.user.name);
                $("#tweetsect").append("<strong>text:</strong>"+ value.text);
                $("#tweetsect").append("<br/>");
                $("#tweetsect").append("<strong>created at:</strong>" + value.created_at);
                $("#tweetsect").append("<br/>");
                $("#tweetsect").append("<strong>img url:</strong>" + value.user.profile_image_url + "</article>");
            })
        })
        .fail(function(){
                alert('error');
                })
    });
})