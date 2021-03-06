var topOffset = 200;

//dom ready functions
$(function(){
  insert_left();
  insert_top();
  $('ul[id^="accordion-"]').dcAccordion();
  // $("#insert-left").on('click', '#search-by-category-button', search_by_category_qtip);
  // $('.select-this-category').on('click', show_category_list_qtip);
  // $('.category-select-list a').on('click', show_category_options_qtip);
  $('.menu-list-search').on('keyup', menu_live_search);

  Draggable.create(".scrollable", {type:"scroll", edgeResistance:0.5, bounds:".bounds", throwProps:true});


  $('#menu').multilevelpushmenu({
    collapsed: true,
    fullCollapse: true,
    backItemClass: 'backItemClass',
    backText: '',
    backItemIcon: 'fa fa-angle-left',
    preventItemClick: true,
    groupIcon: 'fa fa-angle-right',
    mode: 'overlap',
    direction: 'ltr'
  });

  $('.menu-options.add-client').on('click', insert_addclient_form);
  $('.menu-options.add-job').on('click', insert_addjob_form);

  $('#menu ul > li:not(:has(ul)) a').addClass('bottombranch');

});

function show_menu_panel () {
  $('#menu').removeClass('hidden');
  $('#menu').multilevelpushmenu('expand');
}

function uncheck_all_others() {
  $('.category-checkbox input[type="checkbox"]').removeAttr('checked');
  $(this).attr('checked', 'checked');
}

function map_navbar() {
  $('.icon-map').removeClass('hidden');
  $('.icon-form').addClass('hidden');
  $('#bookmark_nav li a').addClass('hidden');
  $('.oval-text').addClass('hidden');
  $('.detail-icon').removeClass('hidden');
  $('.map-icon').addClass('hidden');
}

// add current class to image pages-icons class on click
function show_active_tab() {
  $(this).children('img').addClass("current");
  event.stopPropagation();
  show_form();
}

function search_by_category_qtip() {
  $(this).qtip({
      content: {
        text: $('#search-by-category'),
        button: 'Close'
      },
      show: {
          modal: {
              on: true,
              solo: true
          },

          ready: true,
          event: 'click',
          effect: function (offset) {
              $(this).slideDown(300);
          }
      },
      style: {
          classes: 'qtip-search-category qtip-rounded qtip-shadow qtip-light',
          tip: {
            corner: 'center left',
            width: 50,
            height: 30,
            target: $('#search-by-category-button')
        }
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
          }
      },
      overwrite: false,
      position: {
          my: 'center left',
          at: 'center right',
          target: $('#search-by-category-button')
      }
  });
  $('#address-search-panel').removeClass('invisible');
}

function show_category_list_qtip() {
  $(this).qtip({
      content: {
        text: $('#category-select-list'),
        button: 'Close'
      },
      show: {
          modal: {
              on: true,
              solo: true
          },
          ready: true,
          event: 'click',
          effect: function (offset) {
              $(this).slideDown(300);
          }
      },
      style: {
          classes: 'qtip-category-select-list qtip-rounded qtip-shadow qtip-light',
          tip: {
            width: 25,
            height: 15
        }
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
              $('.select-this-category.selected').removeClass('selected');
          }
      },
      overwrite: false,
      position: {
          my: 'center left',
          at: 'center right',
          target: $('#search-by-category'),
          adjust: {
            x: -30
          }
      }
  });
  $('#category-select-list').removeClass('invisible');
  $(this).addClass('selected');
}

function show_category_options_qtip() {
  $(this).qtip({
      content: {
        text: $('#category-select-options').clone(),
        button: 'Close'
      },
      show: {
          modal: {
              on: true,
              solo: true
          },
          ready: true,
          event: 'click',
          effect: function (offset) {
              $(this).slideDown(300);
              $('.category-select-icons').removeClass('hidden');
          }
      },
      style: {
          classes: 'qtip-category-select-options qtip-rounded qtip-shadow qtip-light',
          tip: {
            width: 25,
            height: 15,
        }
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
              $('.category-select-list li.category-active').removeClass('category-active');
              $('.category-select-icons').addClass('hidden');
          }
      },
      overwrite: false,
      position: {
          my: 'top center',
          at: 'bottom center',
          target: $(this).parent('li')
      },
  });
  $('#category-select-options').removeClass('invisible');
  $(this).parent('li').addClass('category-active');
}

function menu_live_search() {
  // Retrieve the input field text and reset the count to zero
  var filter = $(this).val(), count = 0;

  // Loop through the comment list
  $(this).parent('ul').children('.scrollable').children('li').each(function(){
    // If the list item does not contain the text phrase fade it out
    if ($(this).text().search(new RegExp(filter, "i")) < 0) {
        $(this).fadeOut();

      // Show the list item if the phrase matches and increase the count by 1
      } else {
        $(this).show();
        count++;
      }
  });
}

// change content on tab click
function change_tab_content() {
  $('.pages-icons').removeClass("current");
  $(this).addClass('current');
}

function insert_left() {
  $('#insert-left').empty();
  $.get('left_bar.html', function(data) {
    $('#insert-left').html(data);
  });
}

function insert_top() {
  $.get('top_bar.html', function(data) {
    $('#insert-top').html(data);
  });
}
