$(document).ready(function(){
  var i, flick, count, output,timer;
  $('.fancybox').fancybox();
  function getfeed(flick,append){
    $.getJSON(flick, function(data) {
      $('a#inifiniteLoader').show('fast');
      output = '<ul class="searchresults">';
      count = i + 25;
      console.log(i,count,data);
      for( i; i < count; ++i){
        let val = data.photos.photo[i];
        let pic= "http://farm"+val.farm+".staticflickr.com/"+val.server+"/"+val.id+"_"+val.secret+".jpg";
        output += '<li><a class="fancybox" href='+ pic + ' data-fancybox-group="gallery" title="'+ val.title+'">';
        output += '<img src='+ pic + '/></a>';
        output += '</li>';
      }
      output += '</ul>';
      $('a#inifiniteLoader').hide('1000');
      if(append){
        $('#feed').append(output);
      }else{
        $('#feed').html(output);
        i = 25;
      }
    }); //get JSON
  } // end of getfeed function
  $('#keyword').keyup(function() { 
    i = 0;
    var searchField = $('#keyword').val().replace(" ","%20");
    flick = 'https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags='+searchField+'&per_page=500&jsoncallback=?';
    clearTimeout(timer);
    timer = setTimeout(function() {
      getfeed(flick);
    }, 270);
  }); 

 $(window).scroll(function(){
    if($(window).scrollTop() == $(document).height() - $(window).height()){         // console.log(flick);
      getfeed(flick,true);
    }
  }); 
});