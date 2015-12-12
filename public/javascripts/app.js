// CLOUSER FOR STOPWACTH SCRIPTS //
$(function(){

  var count = 0;
  var milsec = 0;
  var sec = 0;
  var fullSec = 0;
  var singleMin = 0;
  var doubleMin = 0;

  var pulseAnimate = function(counter){
     $('.start').on('click', function(){
          if ( counter === 0 ){
            $( '.pulse' ).addClass( 'startPulse' );
            $( '.pulse' ).addClass( 'startColor' );
            $( '.pulse' ).removeClass( 'stopColor' );
            $( '.pulse' ).removeClass( 'stopPulse' );
            $( '.shut' ).removeClass( 'shutoff' );
            $( '.shut' ).removeClass( 'shutDown' );
            counter = 1;
      }
      $('.para').on('click', function(){
          if ( counter === 1 ){
            $( '.pulse' ).addClass( 'stopColor' );
            $( '.pulse' ).addClass( 'stopPulse' );
            $( '.pulse' ).removeClass( 'startPulse' );
            $( '.pulse' ).removeClass( 'startColor' );
            $( '.shut' ).removeClass( 'shutoff' );
            $( '.shut' ).removeClass( 'shutDown' );
            counter = 0;
          }
      });
      $('.reset').on('click', function(){
            $( '.pulse' ).removeClass( 'stopColor' );
            $( '.pulse' ).removeClass( 'stopPulse' );
            $( '.pulse' ).removeClass( 'startPulse' );
            $( '.pulse' ).removeClass( 'startColor' );
            $( '.shut' ).addClass( 'shutoff' );
            $( '.shut' ).addClass( 'shutDown' );
            counter = 0;
      });
    });
  };
  pulseAnimate(0);

  var display = function(){
    $( "span" ).first().text( doubleMin );
    $( "span:nth-child(2)" ).text( singleMin );
    $( "span:nth-child(3)" ).text( fullSec );
    $( "span:nth-child(4)" ).text( sec );
    $( "span:nth-child(5)" ).text( milsec );
    $( "span" ).last().text( count );
  };

  var countUp = function(){
    count = count + 1
    if ( count == 10 ) { count = 0; milsec += 1; }
    if ( milsec == 10 ) { milsec = 0; sec += 1; }
    if ( sec == 10 ) { sec = 0; fullSec += 1; }
    if ( fullSec == 6 ) { fullSec = 0; singleMin += 1 }
    if ( singleMin == 10 ) { singleMin = 0; doubleMin += 1; }
    display();
  };

  $.fn.startWatcth = function(){
    var go;
    var counter = 0;
      $('.start').on('click', function(e){
        if (counter === 0){ go = setInterval(countUp, 9); counter = 1; }
      });
      $('.para').on('click', function(){
        clearInterval(go);
        counter = 0;
      });
      $('.reset').on('click', function(){
        clearInterval(go);
        count = 0;
        milsec = 0;
        sec = 0;
        fullSec = 0;
        singleMin = 0;
        doubleMin = 0;
        display();
        counter = 0;
      });
  };

  var windowResize = function( target1,target2 ){
    $(window).resize(function(){
      var parentH = $(window).height();
      var parentW = $(window).width();
        $(target1).css({
          top: parentH / 2 - 150 + "px",
          left: parentW / 2 - 200 + "px"
        });
        $(target2).css({
          top: parentH / 2 - 300 + "px",
          left: parentW / 2 - 300 + "px"
        });
    });
  };

  $.fn.centerItems = function( target1,target2 ){
    var parentH = $(window).height();
    var parentW = $(window).width();
       $(target1).css({
         top: parentH / 2 - 150 + "px",
         left: parentW / 2 - 200 + "px"
       });
       $(target2).css({
         top: parentH / 2 - 300 + "px",
         left: parentW / 2 - 300 + "px"
       });
    windowResize( target1,target2 );
  };

}());

// RUN SCRIPTS ON DOM //
$(document).ready(function(){

  var centerWatch = $.fn.centerItems( $('#stopWatch'),$('.pulse') );
  var oneWatch = $.fn.startWatcth();

});
