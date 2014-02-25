var owlLayersHtml;

//dom ready functions
$(function(){
  create_layers_carousel();
  $('#details-link').on('click', form_navbar);
  $('.layer').on('click', checkbox_when_clicked);
  $('.make-active').on('click', layer_active_clicked);
  $("#insert-left").on('click', '#layers-button', layers_qtip);
  $("#insert-left").on('click', '#search-by-category-button', search_by_category_qtip);
  $("#insert-left").on('click', '.search-icon', search_by_number_qtip);
  $("#insert-top").on('click', '#search-by-address-button', searchByAddress_qtip);
  $("#map").on('click', show_select_asset_dialog);
  $('.qtip-layers-panel li.dcjq-parent-li').on('click', mimic_anchor_click);
  $('.select-this-category').on('click', show_category_list_qtip);
  $('.category-select-list a').on('click', show_category_options_qtip);
  $('#category-search').on('keyup', category_live_search);
});


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

function search_by_number_qtip() {
  $(this).qtip({
      content: {
        text: $('#search-by-number'),
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
          classes: 'qtip-search-number qtip-rounded qtip-shadow qtip-light',
          tip: {
            corner: 'center left',
            width: 50,
            height: 30,
            target: $('.search-icon')
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
          target: $(this)
      }
  });
  $('#search-by-number').removeClass('invisible');
}

function searchByAddress_qtip() {
  $(this).qtip({
      content: {
        text: $('#search-address'),
        button: 'Close'
      },
      render: function (event, api) {
          // Grab the content
          var content = api.elements.content;
          // Now it's is rendered, we can...
          content.otherPlugin(); // ...Call our other plugins to act on its contents
          $(this, content).otherPlugin(); // ...or a subset of it's contents!
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
          classes: 'qtip-address-panel qtip-rounded qtip-shadow qtip-light',
          tip: {
            corner: 'top center',
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
          my: 'top center',
          at: 'bottom center',
          target: $('#search-by-address-button')
      }
  });
  $('#address-search').removeClass('invisible');
}

function show_select_asset_dialog() {
  bootbox.dialog({
    backdrop: false,
     animate: false,
   className: 'asset-select-dialog-container',
     message: '<div id="featureInfoGridPopup">' +
              '<a href="#"></a>' +
              '<div id="featureInfoGrid">' +
              '<table id="infoPopupTable">' +
              '<tr>' +
              '<th>Feature Type</th>' +
              '<th>Label</th>' +
              '<th>Latitude</th>' +
              '<th>Longitude</th>' +
              '</tr>' +
              '<tr onclick="openActionRow(this)">' +
              '<td>Emergency Phone</td>' +
              '<td>00120</td>' +
              '<td>-3755756.95841561</td>' +
              '<td>12895866.7461108</td>' +
              '</tr>' +
              '<tr style="display:none;">' +
              '<td colspan="5">' +
              '<div data-type="horizontal" class="button-row">' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-asset" src="../../Content/images/icons/icon-asset-white.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-request" src="../../Content/images/icons/icon-cr-white.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-inspect" src="../../Content/images/icons/icon-inspection-white.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-defects" src="../../Content/images/icons/icon-defect-white.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-task" src="i../../Content/images/icons/icon-task-white.png"></a>' +
              '</div>' +
              '</td>' +
              '</tr>' +
              '<tr onclick="openActionRow(this)">' +
              '<td>Emergency Phone</td>' +
              '<td>00120</td>' +
              '<td>-3755756.95841561</td>' +
              '<td>12895866.7461108</td>' +
              '</tr>' +
              '<tr style="display:none;">' +
              '<td colspan="5">' +
              '<div data-type="horizontal" class="button-row">' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-asset" src="../../Content/images/icons/icon-asset-white.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-request" src="../../Content/images/icons/icon-cr-white.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-inspect" src="../../Content/images/icons/icon-inspection-white.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-defects" src="../../Content/images/icons/icon-defect-white.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-task" src="i../../Content/images/icons/icon-task-white.png"></a>' +
              '</div>' +
              '</td>' +
              '</tr>' +
              '<tr onclick="openActionRow(this)">' +
              '<td>Emergency Phone</td>' +
              '<td>00120</td>' +
              '<td>-3755756.95841561</td>' +
              '<td>12895866.7461108</td>' +
              '</tr>' +
              '<tr style="display:none;">' +
              '<td colspan="5">' +
              '<div data-type="horizontal" class="button-row">' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-asset" src="../../Content/images/icons/icon-asset-white.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-request" src="../../Content/images/icons/icon-cr-white.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-inspect" src="../../Content/images/icons/icon-inspection-white.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-defects" src="../../Content/images/icons/icon-defect-white.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-task" src="i../../Content/images/icons/icon-task-white.png"></a>' +
              '</div>' +
              '</td>' +
              '</tr>' +
              '</table>' +
              '</div>' +
              '</div>',
    title: "Asset Selection"
  });
}

function mimic_anchor_click(event) {
  if( event.target !== this ) return; //prevents trigger on other targets ie bubbling
  $(this).children('a').trigger('click');
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

function open_form_from_asset() {
  $('#featureInfoGridPopup').parents('.modal').modal('hide');
  goto_forms();
}

function openActionRow(row) {
  $('#infoPopupTable tbody tr').each(function () {
    $(this).removeClass('actionRow');

    // Collapse all previous rows
    if ($(this).attr('onclick') != null) {
      if ($(this).next('tr').is(':visible')) {
        $(this).next('tr').slideRow('up');
        }
      }
    });
  // Highlight current selected row
  $(row).addClass('actionRow');

  var nextRow = $(row).next('tr');

  if ($(nextRow).is(':visible')) {
      $(nextRow).slideRow('up');
  } else {
      $(nextRow).slideRow('down');
  }
}

function goto_forms() {
  form_navbar();
  $('#insert-map').empty();
  $.get('forms/form_cr.html', function(data) {
    $('#insert-form').html(data);
    });
  $('#insert-form').trigger('create');
  var formName = 'request'
  show_correct_ovals(formName);
}

function insert_inspection_form() {
  $('#insert-form').empty();
  $.get('forms/form_inspect.html', function(data) {
    $('#insert-form').html(data);
    });
  var formName = 'inspection'
  show_correct_ovals(formName);
  $('#insert-form').on('change', skip_to_details);
  oval_border_highlight('#tab2');
}

function insert_CR_form() {
  $('#insert-form').empty();
  $.get('forms/form_cr.html', function(data) {
    $('#insert-form').html(data);
  });
  var formName = 'request'
  show_correct_ovals(formName);
  $('#insert-form').on('change', skip_to_details);
  oval_border_highlight('#tab2');
}

function insert_defect_form() {
  $('#insert-form').empty();
  $.get('forms/form_defect.html', function(data) {
    $('#insert-form').html(data);
  });
  var formName = 'defect'
  show_correct_ovals(formName);
  $('#insert-form').on('change', skip_to_details);
  oval_border_highlight('#tab2');
}

function insert_task_form() {
  $('#insert-form').empty();
  $.get('forms/form_task.html', function(data) {
    $('#insert-form').html(data);
  });
  var formName = 'task'
  show_correct_ovals(formName);
}

function insert_timesheet_form() {
  $('#insert-form').empty();
  $.get('forms/form_timesheet.html', function(data) {
    $('#insert-form').html(data);
  });
  var formName = 'timesheet'
  show_correct_ovals(formName);
  $('html body').animate({ scrollTop: 0 });
}

function show_correct_ovals(formName) {
  if (formName === 'request') {
    $('a[data-href="#bookmark_condition"]').parent('li').hide();

    $('a[data-href="#bookmark_contact"]').parent('li').show();
    $('a[data-href="#bookmark_details"]').parent('li').show();
    $('a[data-href="#bookmark_location"]').parent('li').show();
    $('a[data-href="#bookmark_notes"]').parent('li').show();
    $('a[data-href="#bookmark_closeout"]').parent('li').show();

    $('a[data-href="#bookmark_start"]').parent('li').hide();
    $('a[data-href="#bookmark_work"]').parent('li').hide();
    $('a[data-href="#bookmark_breaks"]').parent('li').hide();
    $('a[data-href="#bookmark_end"]').parent('li').hide();
    $('a[data-href="#bookmark_review"]').parent('li').hide();
    hide_timesheet_ovals();
    hide_task_ovals();
  }
  if (formName === 'defect') {
    $('a[data-href="#bookmark_contact"]').parent('li').hide();

    $('a[data-href="#bookmark_condition"]').parent('li').show();
    $('a[data-href="#bookmark_details"]').parent('li').show();
    $('a[data-href="#bookmark_location"]').parent('li').show();
    $('a[data-href="#bookmark_notes"]').parent('li').show();
    $('a[data-href="#bookmark_closeout"]').parent('li').show();

    $('a[data-href="#bookmark_start"]').parent('li').hide();
    $('a[data-href="#bookmark_work"]').parent('li').hide();
    $('a[data-href="#bookmark_breaks"]').parent('li').hide();
    $('a[data-href="#bookmark_end"]').parent('li').hide();
    $('a[data-href="#bookmark_review"]').parent('li').hide();
    hide_timesheet_ovals();
    hide_task_ovals();
  }
  if (formName === 'inspection') {
    $('a[data-href="#bookmark_condition"]').parent('li').hide();
    $('a[data-href="#bookmark_contact"]').parent('li').show();

    $('a[data-href="#bookmark_details"]').parent('li').show();
    $('a[data-href="#bookmark_location"]').parent('li').show();
    $('a[data-href="#bookmark_notes"]').parent('li').show();
    $('a[data-href="#bookmark_closeout"]').parent('li').show();

    $('a[data-href="#bookmark_start"]').parent('li').hide();
    $('a[data-href="#bookmark_work"]').parent('li').hide();
    $('a[data-href="#bookmark_breaks"]').parent('li').hide();
    $('a[data-href="#bookmark_end"]').parent('li').hide();
    $('a[data-href="#bookmark_review"]').parent('li').hide();
    hide_timesheet_ovals();
    hide_task_ovals();
  }
  if (formName === 'task') {
    $('a[data-href="#bookmark_condition"]').parent('li').hide();
    $('a[data-href="#bookmark_contact"]').parent('li').hide();
    $('a[data-href="#bookmark_location"]').parent('li').hide();
    $('a[data-href="#bookmark_details"]').parent('li').hide();
    $('a[data-href="#bookmark_notes"]').parent('li').hide();
    $('a[data-href="#bookmark_closeout"]').parent('li').hide();
    hide_timesheet_ovals();
    show_task_ovals();
  }
  if (formName === 'timesheet') {
    $('a[data-href="#bookmark_condition"]').parent('li').hide();
    $('a[data-href="#bookmark_contact"]').parent('li').hide();
    $('a[data-href="#bookmark_location"]').parent('li').hide();
    $('a[data-href="#bookmark_details"]').parent('li').hide();
    $('a[data-href="#bookmark_notes"]').parent('li').hide();
    $('a[data-href="#bookmark_closeout"]').parent('li').hide();
    show_timesheet_ovals();
    hide_task_ovals();
  }
}

function hide_task_ovals() {
  $('a[data-href="#bookmark_taskdetails"]').parent('li').hide();
  $('a[data-href="#bookmark_extdetails"]').parent('li').hide();
  $('a[data-href="#bookmark_loe"]').parent('li').hide();
  $('a[data-href="#bookmark_wip"]').parent('li').hide();
  $('a[data-href="#bookmark_traffic"]').parent('li').hide();
  $('a[data-href="#bookmark_tasknotes"]').parent('li').hide();
}

function show_task_ovals() {
  $('a[data-href="#bookmark_taskdetails"]').parent('li').show();
  $('a[data-href="#bookmark_extdetails"]').parent('li').show();
  $('a[data-href="#bookmark_loe"]').parent('li').show();
  $('a[data-href="#bookmark_wip"]').parent('li').show();
  $('a[data-href="#bookmark_traffic"]').parent('li').show();
  $('a[data-href="#bookmark_tasknotes"]').parent('li').show();
}

function show_timesheet_ovals() {
  $('a[data-href="#bookmark_start"]').parent('li').show();
  $('a[data-href="#bookmark_work"]').parent('li').show();
  $('a[data-href="#bookmark_breaks"]').parent('li').show();
  $('a[data-href="#bookmark_end"]').parent('li').show();
  $('a[data-href="#bookmark_review"]').parent('li').show();
}

function hide_timesheet_ovals() {
  $('a[data-href="#bookmark_start"]').parent('li').hide();
  $('a[data-href="#bookmark_work"]').parent('li').hide();
  $('a[data-href="#bookmark_breaks"]').parent('li').hide();
  $('a[data-href="#bookmark_end"]').parent('li').hide();
  $('a[data-href="#bookmark_review"]').parent('li').hide();
}

// add current class to image pages-icons class on click
function show_active_tab() {
  $(this).children('img').addClass("current");
  event.stopPropagation();
  show_form();
}

// change content on tab click
function change_tab_content() {
  $('.pages-icons').removeClass("current");
  $(this).addClass('current');
}