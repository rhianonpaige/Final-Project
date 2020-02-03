$(document).ready(function(){

  /* Collapsable sections */
  $('.bio-title').click(function(){
    $('.bio-body').slideToggle();
    $(this).find('.symbol').toggleClass('closed');
  });
  $('.article-title').click(function(){
    $('.article-body').slideToggle('slow');
    $(this).find('.symbol').toggleClass('closed');
  });
  $('.recommendations-title').click(function(){
    $('.recommendations-body').slideToggle();
    $(this).find('.symbol').toggleClass('closed');
  });
  $('.questions-title').click(function(){
    $('.questions-body').slideToggle();
    $(this).find('.symbol').toggleClass('closed');
  });
  $('.extra-title').click(function(){
    $('.extra-body').slideToggle();
    $(this).toggleClass('pulse');
    $(this).find('.symbol').toggleClass('closed');
  });
  $('.sections-title').click(function(){
    $('.sections-body').slideToggle();
    $(this).find('.symbol').toggleClass('closed');
  });
  $('.intro-title').click(function(){
    $('.intro-body').slideToggle();
    $(this).find('.symbol').toggleClass('closed');
  });
  $('.guide-title').click(function(){
    $('.guide-body').slideToggle();
    $(this).find('.symbol').toggleClass('closed');
  });
  $('.email-title').click(function(){
    $('.email-body').toggle();
    console.log('email');
  });

  /* Put recommendations in the recommendation section */
  $('#recommendation').prependTo('.recommendations-body');

  /* Read more, extra section */
  // $('.read-more').click(function(){
  //   $(this).hide();
  //   $('#extra-reading .content, #extra-reading .reading-body').show();
  //   var title_distance = $('#extra-title').offset().top
  //   $('html, body').delay(500).animate({
	//         scrollTop: title_distance - 100
	//     }, 1000);
  //   return false;
  // });

  /* Highlighting turn on off */
  if ($('.highlight, .highlight-inverse')[0]){
    $('.highlight-switch').show();
  }

  /* Highlighting switch */

  var on = true;

  $('.highlight-switch .switch').click(function(){
    if(on){
      turnOff();
      $(this).addClass('off');
      $('.highlight-switch .status').html('off');
    } else {
      turnOn();
      $(this).removeClass('off');
      $('.highlight-switch .status').html('on');
    }
  });

  function turnOff(){
    $('.highlight, .highlight-inverse').addClass('clear');
    on = !on;
  }

  function turnOn(){
    $('.highlight, .highlight-inverse').removeClass('clear');
    on = !on;
  }

  /* Language Dropdown */

  // function langFunction() {
  //     document.getElementById("langButton").classList.toggle("show");
  // }

  $('.dropbtn').click(function(){
    $(".lang-options").toggleClass('show-lang');
  });

  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

      var dropdowns = document.getElementsByClassName("lang-dropdown");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show-lang')) {
          openDropdown.classList.remove('show-lang');
        }
      }
    }
  }

  // ######### Relational Ajax #########
  $.when(
    $.getJSON('/api/approaches.json'),
    $.getJSON('/api/articles.json'),
    $.getJSON('/api/translations.json')
  ).done(function(approaches, posts, translations) {

    // Globals
    var approachesData = approaches[0].approaches;
    var postsData = posts[0].posts;
    var translationsData = translations[0].translations
    var cleanApproachesArr = [];
    var articleTitles = [];
    var articleColor = [];
    var approachesHeader = [];
    var translationsArray = [];
    var englishUrlArray = [];
    var langTitlesArray = [];
    var translationsNumber = [];

    // Loop through Translations in JSON file
    $.each(translationsData, function(i, t) {
      // If article has translation
      if (queryTitle === t.title_en) {
        // If query is current language
        if (queryLang === t.lang) {
          // console.log('equals');
          langTitlesArray.push(t.lang_title);
          englishUrlArray.push(t.url_en);
          translationsNumber.push(t.lang_title);
        // Else
        } else {
          translationsArray.push('<a href="' + t.url + '">' + t.lang_title + '</a>');
          langTitlesArray.push(t.lang_title);
          englishUrlArray.push(t.url_en);
          translationsNumber.push(t.lang_title);
        }
      }
    });

    // console.log(translationsNumber.length);
    // console.log(translationsNumber);

    if (translationsNumber < 1) {
      // console.log('does not have translations');
    } else {
      // console.log('has translations');
      $('.lang-dropdown').show();
    }

    console.log('found');

    // Append Language dropdown to HTML
    if (queryLang != 'en') {
      console.log('not english');
      $('.dropbtn').append('Reading in: ' + queryLangTitle);
      $('.lang-options').append('<a href="' + englishUrlArray[0] + '">English</a>' + translationsArray.join(''));
    } else {
      $('.dropbtn').append('Available in: ' + langTitlesArray.join(', '));
      $('.lang-options').append(translationsArray.join(''));

      console.log('found');
    }

    $.each(postsData, function(i, p) {
      // console.log(p.title);
    });


    // Loop through Approaches in JSON file
    $.each(approachesData, function(i, a) {
      // Loop through articles_in_approach in JSON file
      $.each(a.articles_in_approach, function(i, v) {
        // If this article title equals articles_in_approach title
        if(queryTitle === v.source) {
          // Push just those found Approaches into a new Array
          cleanApproachesArr.push(a);
        }
      });
    });

    // Loop each Approach in clean array
    $.each(cleanApproachesArr, function(i, a) {
        // Query all article titles for each appraoch
        $.each(a.articles_in_approach, function(i, b) {
          // Query all articles
          $.each(postsData, function(index, p) {
            // If article title in appraoch is equal to article title in articles
            if(b.source === p.title) {
              // Push the article pallete color to DOM
              articleColor.push('<div class="color" style="background-color:' + p.bg_color + ';"></div>');
            }
          });
        });


      // Fix for Elliotts 2018 year end post
      if(a.title == 'Year End: On \"year\"') {
      }
      else {
        // Append to HTML
        $('.approach-link-back').append('<a href="' + a.url + '">' + '<div class="approach-box"><div class="portraits">' + articleColor.join('') + '</div>' + '<h2>' + a.title);
        console.log('nope');
      }

      // Reset arrays before next loop
      articleTitles = [];
      articleColor = [];

    });

    if(cleanApproachesArr.length != 0) {
      $('.approach-link-back').before('<h2 id="title" class="approach">This piece is part of</h2>');
    };

  });


        $(function() {

        $.ajax({
          url: '/api/articles.json',
          dataType: 'json',
          type: 'get',
          cache: false,
          success: function(data) {

            var interviews = data.posts;
            var grouping_title = '{{ page.title | downcase }}';
            var kind = '';

            $.each(interviews, function(i, p) {
              $.each(p.groupings, function(t, a) {

                if (a.toLowerCase() == grouping_title) {

                  console.log(p.is_essay);

                  if (p.is_essay == true) {
                    kind = 'Essay';
                  } else {
                    kind = 'Interview';
                  }

                  $('.interviews').show();

                  $('.interviews-groupings').append(`
                  
                  <a href="${p.url}">
                    <div class="series-box series-interview" style="color: ${p.color}; background-color: ${p.bg_color};">
                      <div class="series-passport">
                          <img src="${p.crop_image}" />
                      </div>
                      <div class="text">
                        <div class="date">${p.date}</div>
                        <div class="label" id="label-desktop">
                          <span class="title">${p.title}</span>
                        </div>
                        <div class="label" id="label-mobile">
                          <span class="title">${p.first_name} ${p.last_name}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                  
                  `);
                }

              });
            });
          }
        });
      });

      if( $.trim( $('.grouping-items').html() ).length == 0 ) {
        $(".grouping-link-back-box").hide();
      }

});
// ######### Relational Ajax END #########
