/*
$(function(){
    $(".wrapper2").scroll(function(){
        $(".wrapper2").scrollLeft();
    });
});*/
$(document).ready(function() {

    let $item = $('div.card'), //Cache your DOM selector
        visible = 4, //Set the number of items that will be visible
        index = 0, //Starting index
        endIndex = ($item.length / visible) - 1; //End index

    $('div#arrowR').click(function(){
        if(index < endIndex ){
            index++;
            $item.animate({'left':'-=1278'});
        }
    });

    $('div#arrowL').click(function(){
        if(index > 0){
            index--;
            $item.animate({'left':'+=1278'});
        }
    });

});
