var movies,main,single,actors,page,totalPage,lastPage,offset,top;
var source   = $("#movie-template").html();
var template = Handlebars.compile(source);
var sourceTwo   = $("#single-template").html();
var templateTwo = Handlebars.compile(sourceTwo);
var sourceOne   = $("#upcoming-template").html();
var templateOne = Handlebars.compile(sourceOne);
var sourceThree   = $("#actor-template").html();
var templateThree = Handlebars.compile(sourceThree);
var sourceFour   = $("#act-template").html();
var templateFour = Handlebars.compile(sourceFour);

var showMovie = function(that) {
  var id = that.attr('id');
  $.get('https://api.themoviedb.org/3/movie/'+id+'?api_key=63d71f931a7e1218ac9b741b2f5cfcba',function(data){
    single = data;
    single.release_date = single.release_date.slice(0,4);
    $.get('https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=63d71f931a7e1218ac9b741b2f5cfcba',function(video){
      if (video.results != '') {
        single.key = video.results[0].key;
      }
      html = templateTwo(single);
      $('.main').empty();
      $('.main').append(html);
      if ($('.single-handlerbars').last().find('img').attr('src') === 'http://image.tmdb.org/t/p/w500') {
        $('.single-handlerbars').last().find('img').attr('src','jasdofiajoejaojg.png');
      }
      $('.single-handlerbars').append('<input class=back type=submit value=back>');
      $('.back').click(function(e){
        $('.main').children().remove();
        lastPage(page);
      });
    });
  });
};

var showActor = function(that) {
  var id = that.attr('id');
  $.get('https://api.themoviedb.org/3/person/'+id+'?api_key=63d71f931a7e1218ac9b741b2f5cfcba',function(data){
    single = data;
    html = templateFour(single);
    $('.main').empty();
    $('.main').append(html);
    if ($('.single-handlerbars').last().find('img').attr('src') === 'http://image.tmdb.org/t/p/w500') {
      $('.single-handlerbars').last().find('img').attr('src','jasdofiajoejaojg.png');
    }
    $('.single-handlerbars').append('<input class=back type=submit value=back to list>');
    $('.back').click(function(e){
      $('.main').children().remove();
      actor(page);
    });
  });
};

var start = function(num) {
  $('.main').children().remove();
  $.get('https://api.themoviedb.org/3/movie/now_playing?api_key=63d71f931a7e1218ac9b741b2f5cfcba&page='+num+'',function(data){
    movies = data;
    totalPage = data.total_pages;
    page = data.page;
    for (var i=0;i<movies.results.length;i++) {
      html = template(movies.results[i]);
      $('.main').append('<div class=small-3 columns>'+html+'</div>');
      if ($('.movie-handlerbars').last().find('img').attr('src') === 'http://image.tmdb.org/t/p/w500') {
        $('.movie-handlerbars').last().find('img').attr('src','jasdofiajoejaojg.png');
      }
    };
    $('img','.main').click(function(){
      $_this = $(this);
      showMovie($_this);
    });
    if (num === 1) {
      $('.main').append('<div class=small-3 columns><img class=next src=cooltext1731650583.png></div>');
    } else if (num === totalPage) {
      $('.main').append('<div class=small-3 columns><img class=pre src=cooltext1731650795.png></div>');
    } else {
      $('.main').append('<div class=small-3 columns><img class=next src=cooltext1731650583.png><img class=pre src=cooltext1731650795.png></div>');
    }
    $('.next').click(function(e){
      page++;
      start(page);
    });
    $('.pre').click(function(e){
      page--;
      start(page);
    });
  });
  lastPage = start;
};

var popMovie = function(num) {
  $('.main').children().remove();
  $.get('https://api.themoviedb.org/3/movie/popular?api_key=63d71f931a7e1218ac9b741b2f5cfcba&page='+num+'',function(data){
    movies = data;
    for (var i=0;i<movies.results.length;i++) {
      html = template(movies.results[i]);
      $('.main').append('<div class=small-3 columns>'+html+'</div>');
      if ($('.movie-handlerbars').last().find('img').attr('src') === 'http://image.tmdb.org/t/p/w500') {
        $('.movie-handlerbars').last().find('img').attr('src','jasdofiajoejaojg.png');
      }
    };
    $('img','.main').click(function(){
      $_this = $(this);
      showMovie($_this);
    });
    if (num === 1) {
      $('.main').append('<div class=small-3 columns><img class=next src=cooltext1731650583.png></div>');
    } else if (num === totalPage) {
      $('.main').append('<div class=small-3 columns><img class=pre src=cooltext1731650795.png></div>');
    } else {
      $('.main').append('<div class=small-3 columns><img class=next src=cooltext1731650583.png><img class=pre src=cooltext1731650795.png></div>');
    }
    $('.next').click(function(e){
      page++;
      popMovie(page);
    });
    $('.pre').click(function(e){
      page--;
      popMovie(page);
    });
  });
  lastPage = popMovie;
};

var topRate = function(num) {
  $('.main').children().remove();
  $.get('https://api.themoviedb.org/3/movie/top_rated?api_key=63d71f931a7e1218ac9b741b2f5cfcba&page='+num+'',function(data){
    movies = data;
    for (var i=0;i<movies.results.length;i++) {
      html = template(movies.results[i]);
      $('.main').append('<div class=small-3 columns>'+html+'</div>');
      if ($('.movie-handlerbars').last().find('img').attr('src') === 'http://image.tmdb.org/t/p/w500') {
        $('.movie-handlerbars').last().find('img').attr('src','jasdofiajoejaojg.png');
      }
    };
    $('img','.main').click(function(){
      $_this = $(this);
      showMovie($_this);
    });
    if (num === 1) {
      $('.main').append('<div class=small-3 columns><img class=next src=cooltext1731650583.png></div>');
    } else if (num === totalPage) {
      $('.main').append('<div class=small-3 columns><img class=pre src=cooltext1731650795.png></div>');
    } else {
      $('.main').append('<div class=small-3 columns><img class=next src=cooltext1731650583.png><img class=pre src=cooltext1731650795.png></div>');
    }
    $('.next').click(function(e){
      page++;
      topRate(page);
    });
    $('.pre').click(function(e){
      page--;
      topRate(page);
    });
  });
  lastPage = topRate;
};

var upComing = function(num) {
  $('.main').children().remove();
  $.get('https://api.themoviedb.org/3/movie/upcoming?api_key=63d71f931a7e1218ac9b741b2f5cfcba&page='+num+'',function(data){
    movies = data;
    for (var i=0;i<movies.results.length;i++) {
      html = templateOne(movies.results[i]);
      $('.main').append('<div class=small-3 columns>'+html+'</div>');
      if ($('.upcoming-handlerbars').last().find('img').attr('src') === 'http://image.tmdb.org/t/p/w500') {
        $('.upcoming-handlerbars').last().find('img').attr('src','jasdofiajoejaojg.png');
      }
    };
    $('img','.main').click(function(){
      $_this = $(this);
      showMovie($_this);
    });
    if (num === 1) {
      $('.main').append('<div class=small-3 columns><img class=next src=cooltext1731650583.png></div>');
    } else if (num === totalPage) {
      $('.main').append('<div class=small-3 columns><img class=pre src=cooltext1731650795.png></div>');
    } else {
      $('.main').append('<div class=small-3 columns><img class=next src=cooltext1731650583.png><img class=pre src=cooltext1731650795.png></div>');
    }
    $('.next').click(function(e){
      page++;
      upComing(page);
    });
    $('.pre').click(function(e){
      page--;
      upComing(page);
    });
  });
  lastPage = upComing;
};


var actor = function(num) {
  $('.main').children().remove();
  $.get('https://api.themoviedb.org/3/people/popular?api_key=63d71f931a7e1218ac9b741b2f5cfcba&page='+num+'',function(data){
    actors = data;
    for (var i=0;i<actors.results.length;i++) {
      html = templateThree(actors.results[i]);
      $('.main').append('<div class=small-3 columns>'+html+'</div>');
      if ($('.upcoming-handlerbars').last().find('img').attr('src') === 'http://image.tmdb.org/t/p/w500') {
        $('.upcoming-handlerbars').last().find('img').attr('src','jasdofiajoejaojg.png');
      }
    };
    $('img','.main').click(function(){
      $_this = $(this);
      $(this).parent();
      showActor($_this);
    });
    if (num === 1) {
      $('.main').append('<div class=small-3 columns><img class=next src=cooltext1731650583.png></div>');
    } else if (num === totalPage) {
      $('.main').append('<div class=small-3 columns><img class=pre src=cooltext1731650795.png></div>');
    } else {
      $('.main').append('<div class=small-3 columns><img class=next src=cooltext1731650583.png><img class=pre src=cooltext1731650795.png></div>');
    }
    $('.next').click(function(e){
      page++;
      actor(page);
    });
    $('.pre').click(function(e){
      page--;
      actor(page);
    });
  });
};

$(document).on('search',function(){
  var keyWord = $('.input').val();
  $('.main').children().remove();
  $.get('https://api.themoviedb.org/3/search/movie?api_key=63d71f931a7e1218ac9b741b2f5cfcba&query='+keyWord+'',function(data){
    movies = data;
    for (var i=0;i<movies.results.length;i++) {
      html = template(movies.results[i]);
      $('.main').append('<div class=small-3 columns>'+html+'</div>');
      if ($('.movie-handlerbars').last().find('img').attr('src') === 'http://image.tmdb.org/t/p/w500') {
        $('.movie-handlerbars').last().find('img').attr('src','jasdofiajoejaojg.png');
      }
    };
    $('img','.main').click(function(){
      _this = $(this);
      showMovie(_this);
    });
  });
});

$(document).ready(function(){
  $('.search').click(function(){
    event.preventDefault();
    $(document).trigger('search');
  });
  start(1);
  $('.main').prepend('<h3>New Movies</h3>');
  $('.input').keypress(function(e){
    var key = e.which;
    if (key === 13) {
      $(document).trigger('search');
    }
  });
  $('.movie-list').hover(function(){
    $('ul','.movie-list').show();      
  });
  $('.movie-list').mouseleave(function(){
    $('ul','.movie-list').hide();      
  });
  $('.now').click(function(e){
    event.preventDefault();
    start(1);
    $('.main').prepend('<h3>New Movies</h3>');
  });
  $('.pop').click(function(e){
    event.preventDefault();
    popMovie(1);
    $('.main').prepend('<h3>Popular Movies</h3>');
  });
  $('.top').click(function(e){
    event.preventDefault();
    topRate(1);
    $('.main').prepend('<h3>Top Rated Movies</h3>');
  });
  $('.coming').click(function(e){
    event.preventDefault();
    upComing(1);
    $('.main').prepend('<h3>Upcoming Movies</h3>');
  });
  $('.actor').click(function(e){
    event.preventDefault();
    actor(1);
  });
});