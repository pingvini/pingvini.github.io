var siteUrl = 'http://'+(document.location.hostname||document.location.host);

/*It is better to save selectors that are used often*/
var $links = $(".nav > li > a").parent(); 
var $navbar = $(".navbar-toggle");
var $contentdiv=$('#content-div');
var $infinite=$(".infinite-image-cover, .infinite-image-inner-top");
var $infiniteimage=$('.infinite-image');

$(document).ready(function() { 
  $(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
      e.preventDefault();
      History.pushState({}, "", this.pathname);
  });
  History.Adapter.bind(window, 'statechange', function(){
      var State = History.getState();
      $.get(State.url, function(data){
          /*Get infinite image if not there yet*/
          if($infiniteimage.is(':empty'))
          {
            $infiniteimage.html($(data).filter('.infinite-image').html());   
            $infinite=$(".infinite-image-cover, .infinite-image-inner-top");         
            $infinite.hide(); 
          }          
          /*load new content*/
          document.title = $(data).filter('title').text();
          $contentdiv.html($(data).filter('#content-div'));
          /*set active menu item*/          
          $links.removeClass("active");
          var page = State.hash.
          						substring(0, Math.min(4, State.hash.length)).replace(/\//g, '');
          $(".nav > li > a[href*="+page+"]").parent().addClass("active");
          /*close navbar if open*/
          if(!$navbar.hasClass('collapsed') && $navbar.is(":visible")){
            $navbar.click(); 
          }
          /*show/hide image if neaded*/
          if(State.hash!='/'){
            $infinite.slideUp("fast"); 
          }
          else{
            $infinite.slideDown("fast"); 
          }
      });
  });
});

