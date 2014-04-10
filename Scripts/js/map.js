var owlLayersHtml;

//dom ready functions
$(function(){
  create_layers_carousel();
  $("#insert-left").on('click', '#search-by-category-button', search_by_category_qtip);
  $("#insert-left").on('click', '#layers-button', layers_qtip);
  $('.select-this-category').on('click', show_category_list_qtip);
  $('.category-select-list a').on('click', show_category_options_qtip);
  $('#category-search').on('keyup', category_live_search);

  $('.layer').on('click', checkbox_when_clicked);
  $('.make-active').on('click', layer_active_clicked);

});

function layers_qtip() {
  $(this).qtip({
      content: {
        text: $('.layers-owl-wrapper'),
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
          classes: 'qtip-layers-panel qtip-rounded qtip-shadow qtip-light',
          tip: {
            corner: 'center left',
            width: 50,
            height: 30
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
          target: $(this),
          adjust: {
            scroll: true // Can be ommited (e.g. default behaviour)
        }
      }
  });
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

function create_layers_carousel() {
  owlLayersHtml = $("#owl-example").owlCarousel({

    // Most important owl features
    items : 3,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [980,3],
    itemsTablet: [800,3],
    itemsTabletSmall: [400,2],
    itemsMobile : [479,1],
    singleItem : false,
    itemsScaleUp : false,

    //Basic Speeds
    slideSpeed : 200,
    paginationSpeed : 800,
    rewindSpeed : 1000,

    //Autoplay
    autoPlay : false,
    stopOnHover : false,

    // Navigation
    navigation : true,
    navigationText : false,
    rewindNav : true,
    scrollPerPage : false,

    //Pagination
    pagination : true,
    paginationNumbers: true,

    // Responsive
    responsive: true,
    responsiveRefreshRate : 100,
    responsiveBaseWidth: window,

    // CSS Styles
    baseClass : "owl-carousel",

    //Auto height
    autoHeight : false,

    //Transitions
    transitionStyle : false,
    })
  $('.owl-prev').addClass('arrow-left');
  $('.owl-next').addClass('arrow-right');
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

function category_live_search() {
  // Retrieve the input field text and reset the count to zero
  var filter = $(this).val(), count = 0;

  // Loop through the comment list
  $("#category-list li").each(function(){
    console.log($(this));
    // If the list item does not contain the text phrase fade it out
    if ($(this).text().search(new RegExp(filter, "i")) < 0) {
        $(this).fadeOut();

      // Show the list item if the phrase matches and increase the count by 1
      } else {
        $(this).show();
        count++;
      }
  });

  //if search field is empty then hide all results
  // if (filter.length === 0 ) {
  //   $('#invisible-category-list li').removeClass('show').addClass('hide');
  // }
}


function checkbox_when_clicked() {
  var checkbox = $(this).children().first().children().first();
  if ($(checkbox).parent().hasClass('no-deselect')) {
    return false;
  }
  $(checkbox).prop('checked', !checkbox.prop("checked"));
}

function layer_active_clicked() {
  var activate = $(this);
  if ($(activate).hasClass('active')) {
    return false;
  }
  else {
    $('.make-active').removeClass('active');
    $('.input-group').removeClass('no-deselect');
    $(activate).toggleClass('active');
    $(this).parent().children().first().addClass('no-deselect');
    var checkbox = $(this).parent().children().first().children().first();
    $(checkbox).prop('checked', true);
  }
}

