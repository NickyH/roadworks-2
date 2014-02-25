var owlLayersHtml;
var topOffset = 170;

//dom ready functions
$(function(){
  insert_map();
  insert_left();
  insert_top();
  create_layers_carousel();
  $('.layer').on('click', checkbox_when_clicked);
  $('.make-active').on('click', layer_active_clicked);
  $('ul[id^="accordion-"]').dcAccordion();
  $("#insert-left").on('click', '#layers-button', layers_qtip);
  $("#insert-left").on('click', '#search-by-category-button', search_by_category_qtip);
  $("#insert-left").on('click', '.search-icon', search_by_number_qtip);
  $("#insert-top").on('click', '#search-by-address-button', searchByAddress_qtip);
  $("#map").on('click', showAssets_qtip);
  $('#details-link').on('click', form_navbar);
  $('li.dcjq-parent-li').on('click', mimic_anchor_click);
  $('.category-checkbox').on('click', uncheck_all_others);
});

function toggle_rw_select() {
    console.log('hello');
  $(this).toggleClass('inactive');

  if($(this).hasClass('inactive')) {
    $(this).children('.pull-right').html('&#10008');
    disable_fields($(this));
  }

  else {
    $(this).children('.pull-right').html('&#10004');
    enable_fields($(this));
  }
  return false;
}

function enable_fields(group) {
  var row = $(group).parents('.form-group');
  $(row).children().find('.form-control').removeAttr('disabled');
  $(row).children().find('.selectpicker').removeClass('disabled');
}

function disable_fields(group) {
  var row = $(group).parents('.form-group');
  $(row).children().find('.form-control').attr('disabled', 'disabled');
  $(row).children().find('.selectpicker').addClass('disabled');
}

function select_cert() {
  $('.cert').removeAttr('disabled');
  $('.notice').attr('disabled', 'disabled');
  $('#select-notice').addClass('inactive');
  $('#select-notice .pull-right').html('&#10008');
  $('.cert .selectpicker').removeClass('disabled');
  $('.cert .selectpicker li').removeClass('disabled');

  $('#select-cert-date').removeAttr('disabled');
  $('#select-cert-date').datepicker("option", { disabled: false } );
}

function select_notice() {
  $('.notice').removeAttr('disabled');
  $('.cert').attr('disabled', 'disabled');
  $('#select-cert').addClass('inactive');
  $('#select-cert .pull-right').html('&#10008');
  $('.notice .selectpicker').removeClass('disabled');
  $('.notice .selectpicker li').removeClass('disabled');

  $('#select-notice-date').removeAttr('disabled');
  $('#select-notice-date').datepicker("option", { disabled: false } );
}

function deselect_cert() {
  $('.cert').attr('disabled', 'disabled');
  $('#select-cert-date').attr('disabled', 'disabled');
  $('#select-cert-date').datepicker("option", { disabled: true } );
}

function deselect_notice() {
  $('.notice').attr('disabled', 'disabled');
  $('#select-notice-date').attr('disabled', 'disabled');
  $('#select-notice-date').datepicker("option", { disabled: true } );
  console.log($('#select-notice-date').datepicker('isDisabled'));
}

function refresh_history_accordion() {
  event.preventDefault();
  $('.history-tree-wrapper').removeClass('invisible');
}

function uncheck_all_others() {
  $('.category-checkbox input[type="checkbox"]').removeAttr('checked');
  $(this).attr('checked', 'checked');
}

function show_member_timesheet() {
  event.preventDefault();
  $('.member-timesheet-panel').toggleClass('hidden');
}

function show_task_map() {
  bootbox.confirm('<img class="temp-task-map" src="../../Content/images/OsmMap_Feature.PNG">', function (response) {});
}

function highlight_current_break() {
  event.preventDefault();
  $('.breaks-row.current-break').removeClass('current-break');
  console.log($(this).parents());
  $(this).parents('.breaks-row').addClass('current-break');
}

function highlight_current_task() {
  event.preventDefault();
  $('.task-row.current-task').removeClass('current-task');
  console.log($(this).parents());
  $(this).parents('.task-row').addClass('current-task');
}

function open_address_book() {
  bootbox.dialog({
    message: "Search for contacts...",
    title: "Contact Address Book",
    buttons: {
      success: {
        label: "Search",
        className: "btn-success",
        callback: function() {
          Example.show("great success");
        }
      },
      danger: {
        label: "Cancel",
        className: "btn-danger",
        callback: function() {
          Example.show("uh oh, look out!");
        }
      },
      main: {
        label: "Done",
        className: "btn-primary",
        callback: function() {
          Example.show("Primary button");
        }
      }
    }
  });
}

function open_current_contact_row() {
  if ($(this).hasClass('row-open')) {
    $(this).removeClass('row-open');
    $(this).next('tr').remove();
  } else if (!$(this).hasClass('row-open')) {
    $(this).addClass('row-open');
    $(this).after("<tr class='reference-details'><td colspan='8'><span>Vivamus ut arcu" +
      "posuere, molestie quam et, rhoncus diam. Nunc suscipit porta urna, tincidunt" +
      "vehicula libero elementum sed. Aliquam vestibulum blandit tortor. Curabitur" +
      "dolor eget odio ultricies adipiscing et vel ante.</span></td></tr>");
  }
}

function skip_to_details() {
  var details = $('#bookmark_details').offset().top;
  $(window).scrollTop((details - 200));
}

function warn_cancel_form() {
  bootbox.confirm('Are you sure you want to cancel all changes made to this form?', function (response) {
    if(response) {
      window.location = '/';
    }
  });
}

function warn_close_form() {
  bootbox.confirm('This will permanently close off this issue', function (response) {
    if(response) {
      window.location = '/';
    }
  });
}

function disable_datepickers() {
  $('.input-group-addon').each( function() {
    var disabled = $(this).parents('.input-group').children('.hasDatepicker').attr('disabled');
    if (disabled === 'disabled') {
      $(this).parents('.input-group').children('.hasDatepicker').datepicker('disable');
    }
  });
}

function table_search(thisObj, tableID) {
  var $rows = $("#"+tableID+" tr");
  var val = '^(?=.*\\b' + $.trim($(thisObj).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
      reg = RegExp(val, 'i'),
      text;

  $rows.show().filter(function() {
      text = $(this).text().replace(/\s+/g, ' ');
      return !reg.test(text);
  }).hide();
  $('thead tr').show();
}

function calendar_icon_click() {
  $(this).parent().children('.form-control').datetimepicker('show');
}

function change_selectpicker_values() {
  $('.selectpicker').each(function() {
    var selectValue = $(this).attr('value');
    $(this).next().children('.btn').children('.filter-option').html(selectValue);
  });
}

function mimic_anchor_click(event) {
  if( event.target !== this ) return; //prevents trigger on other targets ie bubbling
  $(this).children('a').trigger('click');
}

function select_all() {
  $(this).parent().children('.selectpicker').selectpicker('selectAll');
}

function select_none() {
  $(this).parent().children('.selectpicker').selectpicker('deselectAll');
}

function oval_border_highlight(tab_id) {
  $('.oval').removeClass('current');
  $(tab_id).addClass('current');
}

function get_rw1_page_position() {
  var details = $('#bookmark_details_pl').offset().top;
  var activities = $('#bookmark_activities').offset().top;
  var planning = $('#bookmark_planning').offset().top;
  var siteplan = $('#bookmark_siteplan').offset().top;
  var map = $('#bookmark_map').offset().top;

  if ($(window).scrollTop() >= (details - topOffset -50) ) {
    oval_border_highlight('#tab1');
  }
  if ($(window).scrollTop() >= (activities - topOffset -50 ) ) {
    oval_border_highlight('#tab2');
  }
  if ($(window).scrollTop() >= (planning - topOffset -50) ) {
    oval_border_highlight('#tab3');
  }
  if ($(window).scrollTop() >= (siteplan - topOffset -50) ) {
    oval_border_highlight('#tab4');
  }
  if ($(window).scrollTop() >= (map - topOffset -50) ) {
    oval_border_highlight('#tab5');
  }
}

function get_rw2_page_position() {
  var details = $('#bookmark_details_pc').offset().top;
  var signoff = $('#bookmark_signoff').offset().top;

  if ($(window).scrollTop() >= (details - topOffset -50) ) {
    oval_border_highlight('#tab10');
  }
  if ($(window).scrollTop() >= (signoff - topOffset -50 ) ) {
    oval_border_highlight('#tab11');
  }
}

function add_cross_to_required_forms() {
  var required;
  var ovalName;
  var change_oval_colour;
  var allPanels = $('.form-horizontal');
  $(allPanels).each(function() {
    required = false
      $(this).find('.form-control').each(function() {
        if ($(this).attr('data-required')) {
          required = true
        }
      });
    if (required) {
      $(this).find('.insert-cross-icon').addClass('glyphicon-remove panel-cross');
      toggle_oval_colour( $(this), 'incomplete' );
      toggle_panel_num_colour( $(this), 'incomplete' );
    }
  });
}

function toggle_oval_colour( thisObj, className) {
  $(thisObj).parent().find('.text-circle').removeClass('incomplete complete').addClass(className);
  ovalName = '#' + $(thisObj).parents("div[id^='bookmark_']" ).attr('id');
  change_oval_colour = $("[data-href=" + ovalName + "]");
  if ($(change_oval_colour).attr('data-href') === ovalName ) {
    $(change_oval_colour).children('div').removeClass('incomplete complete').addClass(className);
  }
}

function toggle_panel_num_colour( thisObj, className) {
  $(thisObj).parent().find('.text-circle').removeClass('incomplete complete').addClass(className);
}

function check_panel_valid() {
  if ($(this).children('.form-group').find('.search')) {
    var tableID = $(this).children('.form-group').find('.search').parents('.form-horizontal').children('table').attr('id');
    var thisObj = $(this).children('.form-group').find('.search');
    table_search(thisObj, tableID);
  }
  var icon = $(this).children().last();
  var rowValid = false;
  var panelValid = $(this).parsley( 'isValid' );
  var required = check_this_panel_required( $(this) );
  if (panelValid && required ) {
    $(icon).removeClass('glyphicon-remove panel-remove glyphicon-ok panel-ok').addClass('glyphicon-ok panel-ok');
    toggle_panel_num_colour( (this), 'complete' );
    $(this).parent().parent().parent().find('.form-panel').each(function() {
      if (!$(this).children('form').parsley('isValid')) {
        rowValid = false;
        return rowValid
      }
      else {
        rowValid = true;
      }
    });

    if (rowValid) {
      toggle_oval_colour( (this), 'complete' );
    }
  }

  if (panelValid === false) {
    $(icon).removeClass('glyphicon-remove panel-remove glyphicon-ok panel-ok').addClass('glyphicon-remove panel-remove');
    toggle_panel_num_colour( $(this), 'incomplete' );
  }
}

function check_this_panel_required(thisObj) {
  var thisPanel = $(thisObj);
  var required = false
  $(thisPanel).each(function() {
    $(this).find('.form-control').each(function() {
      if ($(this).attr('data-required')) {
        required = true
        }
      });
    });
  return required;
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

function goto_forms() {
  form_navbar();
  $('#insert-map').empty();
  $.get('forms/form_rw1.html', function(data) {
    $('#insert-form').html(data);
    });
  $('#insert-form').trigger('create');
  var formName = 'rw1'
  show_correct_ovals(formName);
}

function insert_rw1_form() {
  $('#insert-form').empty();
  $.get('forms/form_rw1.html', function(data) {
    $('#insert-form').html(data);
    });
  var formName = 'rw1'
  show_correct_ovals(formName);
  $('html body').animate({ scrollTop: 0 });
}

function insert_rw2_form() {
  $('#insert-form').empty();
  $.get('forms/form_rw2.html', function(data) {
    $('#insert-form').html(data);
    });
  var formName = 'rw2'
  show_correct_ovals(formName);
  $('html body').animate({ scrollTop: 0 });
}

function goto_map() {
  map_navbar();
  $('#insert-form').empty();
  $.get('MapLayer.html', function(data) {
    $('#insert-map').html(data);
    });
  $('#insert-map').trigger('create');
  insert_left();
}

function map_navbar() {
  $('.icon-map').removeClass('hidden');
  $('.icon-form').addClass('hidden');
  $('#bookmark_nav li a').addClass('hidden');
  $('.oval-text').addClass('hidden');
  $('.detail-icon').removeClass('hidden');
  $('.map-icon').addClass('hidden');
}

function form_navbar() {
  $('.icon-map').addClass('hidden');
  $('.icon-form').removeClass('hidden');
  $('.left-bar-icons').addClass('hidden');
  $('#bookmark_nav li a').removeClass('hidden');
  $('.oval-text').removeClass('hidden');
  $('.map-icon').removeClass('hidden');
  $('.detail-icon').addClass('hidden');
}

function show_correct_ovals(formName) {
  if (formName === 'rw1') {
    $('a[data-href="#bookmark_details_pl"]').parent('li').show();
    $('a[data-href="#bookmark_activities"]').parent('li').show();
    $('a[data-href="#bookmark_planning"]').parent('li').show();
    $('a[data-href="#bookmark_siteplan"]').parent('li').show();
    $('a[data-href="#bookmark_map"]').parent('li').show();

    $('a[data-href="#bookmark_details_pc"]').parent('li').hide();
    $('a[data-href="#bookmark_signoff"]').parent('li').hide();
  }
  if (formName === 'rw2') {
    $('a[data-href="#bookmark_details_pc"]').parent('li').show();
    $('a[data-href="#bookmark_signoff"]').parent('li').show();

    $('a[data-href="#bookmark_details_pl"]').parent('li').hide();
    $('a[data-href="#bookmark_activities"]').parent('li').hide();
    $('a[data-href="#bookmark_planning"]').parent('li').hide();
    $('a[data-href="#bookmark_siteplan"]').parent('li').hide();
    $('a[data-href="#bookmark_map"]').parent('li').hide();
  }
}


function show_fake_map() {
  $('#mapstatic').attr('src', "Content/images/OsmMap_Feature.png")
  $('.qtip-layers-panel').qtip('api').hide();
}

function check_form_location() {
  if (!$('#bookmark-nav ul').hasClass('disabled')) {
    var href = $(this).attr('data-href');

    if (href === '#bookmark_details_pl') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab1');
    }
    if (href === '#bookmark_activities') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab2');
    }
    if (href === '#bookmark_planning') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab3');
    }
    if (href === '#bookmark_siteplan') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab4');
    }
    if (href === '#bookmark_map') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab5');
    }
    //rw2 form
    if (href === '#bookmark_details_pc') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab10');
    }
    if (href === '#bookmark_signoff') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab11');
    }
  }
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
      events: {
        show: function(event, api) {
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
      },
      api: {
          onContentLoaded: $('.item').each(function () {
              $(this).attr('style', 'width: 200px; height: 300px;');
          })
      }
  });
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
      events: {
        show: function(event, api) {
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

function showAssets_qtip() {
  $(this).qtip({
      content: {
        text: '<div id="featureInfoGridPopup">' +
              '<a href="#" data-rel="back" data-role="button" data-icon="delete" data-iconpos="notext" class="ui-btn-right"></a>' +
              '<div id="featureInfoGrid">' +
              '<table id="infoPopupTable" data-role="table" data-mode="reflow" class="ui-responsive table-stroke" style="border-style: none;">' +
              '<tr>' +
              '<th></th>' +
              '<th>Feature Type</th>' +
              '<th>Feature Label</th>' +
              '<th>Latitude</th>' +
              '<th>Longitude</th>' +
              '</tr>' +
              '<tr onclick="openActionRow(this)">' +
              '<td>' +
              '<input type="checkbox" data-role="none" /></td>' +
              '<td>Emergency Phone</td>' +
              '<td>00120</td>' +
              '<td>-3755756.95841561</td>' +
              '<td>12895866.7461108</td>' +
              '</tr>' +
              '<tr style="display:none;">' +
              '<td colspan="5">' +
              '<div data-role="controlgroup" data-type="horizontal" class="button-row">' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-settings" src="images/icons/icon_settings_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-tasks" src="images/icons/icon_task_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-defects" src="images/icons/icon_defect_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-request" src="images/icons/icon_request_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-assets" src="images/icons/icon-search-by-number.png"></a>' +
              '</div>' +
              '</td>' +
              '</tr>' +
              '<tr onclick="openActionRow(this)">' +
              '<td>' +
              '<input type="checkbox" data-role="none" /></td>' +
              '<td>Emergency Phone</td>' +
              '<td>00120</td>' +
              '<td>-3755756.95841561</td>' +
              '<td>12895866.7461108</td>' +
              '</tr>' +
              '<tr style="display:none;">' +
              '<td colspan="5">' +
              '<div data-role="controlgroup" data-type="horizontal" class="button-row">' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-settings" src="images/icons/icon_settings_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-tasks" src="images/icons/icon_task_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-defects" src="images/icons/icon_defect_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-request" src="images/icons/icon_request_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-assets" src="images/icons/icon-search-by-number.png"></a>' +
              '</div>' +
              '</td>' +
              '</tr>' +
              '<tr onclick="openActionRow(this)">' +
              '<td>' +
              '<input type="checkbox" data-role="none" /></td>' +
              '<td>Emergency Phone</td>' +
              '<td>00120</td>' +
              '<td>-3755756.95841561</td>' +
              '<td>12895866.7461108</td>' +
              '</tr>' +
              '<tr style="display:none;">' +
              '<td colspan="5">' +
              '<div data-role="controlgroup" data-type="horizontal" class="button-row">' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-settings" src="images/icons/icon_settings_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-tasks" src="images/icons/icon_task_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-defects" src="images/icons/icon_defect_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-request" src="images/icons/icon_request_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-assets" src="images/icons/icon-search-by-number.png"></a>' +
              '</div>' +
              '</td>' +
              '</tr>' +
              '</table>' +
              '</div>' +
              '</div>',
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
      events: {
        show: function(event, api) {
        }
      },
      style: {
          classes: 'qtip-assets-select qtip-rounded qtip-shadow qtip-light',
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
          at: 'center right'
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
      events: {
        show: function(event, api) {
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
          target: $(this)
      },
      api: {
          onContentLoaded: $('.item').each(function () {
              $(this).attr('style', 'width: 250px; height: 250px;');
          })
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
      events: {
        show: function(event, api) {
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
      },
      api: {
          onContentLoaded: $('.item').each(function () {
              $(this).attr('style', 'width: 250px; height: 150px;');
          })
      }
  });
  $('#search-by-number').removeClass('invisible');
}

$(function() {
  $("#map-link").on('click', refresh_map);
});

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

function insert_map() {
  $.get('MapLayer.html', function(data) {
    $('#insert-map').html(data);
    });
  $('#insert-map').trigger('create');
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
  $('#insert-top').trigger('create');
}

// inserts the first form into the form page on initial load of details page
function show_first_form() {
  $.get('forms/form_jpp.html', function(data) {
    $('#insert-form').html(data);
    });
  $('#insert-form').trigger('create');
  window.location = ('form.html'); //initial refresh
}

function refresh_map()
{
  window.location = ('index.html');
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

/* Custom animation for a table row to slide up or down */
(function ($) {
    var sR = {
        defaults: {
            slideSpeed: 400,
            easing: false,
            callback: false
        },
        thisCallArgs: {
            slideSpeed: 400,
            easing: false,
            callback: false
        },
        methods: {
            up: function (arg1, arg2, arg3) {
                if (typeof arg1 == 'object') {
                    for (p in arg1) {
                        sR.thisCallArgs.eval(p) = arg1[p];
                    }
                } else if (typeof arg1 != 'undefined' && (typeof arg1 == 'number' || arg1 == 'slow' || arg1 == 'fast')) {
                    sR.thisCallArgs.slideSpeed = arg1;
                } else {
                    sR.thisCallArgs.slideSpeed = sR.defaults.slideSpeed;
                }
                if (typeof arg2 == 'string') {
                    sR.thisCallArgs.easing = arg2;
                } else if (typeof arg2 == 'function') {
                    sR.thisCallArgs.callback = arg2;
                } else if (typeof arg2 == 'undefined') {
                    sR.thisCallArgs.easing = sR.defaults.easing;
                }
                if (typeof arg3 == 'function') {
                    sR.thisCallArgs.callback = arg3;
                } else if (typeof arg3 == 'undefined' && typeof arg2 != 'function') {
                    sR.thisCallArgs.callback = sR.defaults.callback;
                }
                var $cells = $(this).find('td');
                $cells.wrapInner('<div class="slideRowUp" />');
                var currentPadding = $cells.css('padding');
                $cellContentWrappers = $(this).find('.slideRowUp');
                $cellContentWrappers.slideUp(sR.thisCallArgs.slideSpeed, sR.thisCallArgs.easing).parent().animate({
                    paddingTop: '0px',
                    paddingBottom: '0px'
                }, {
                    complete: function () {
                        $(this).children('.slideRowUp').replaceWith($(this).children('.slideRowUp').contents());
                        $(this).parent().css({ 'display': 'none' });
                        $(this).css({ 'padding': currentPadding });
                    }
                });
                var wait = setInterval(function () {
                    if ($cellContentWrappers.is(':animated') === false) {
                        clearInterval(wait);
                        if (typeof sR.thisCallArgs.callback == 'function') {
                            sR.thisCallArgs.callback.call(this);
                        }
                    }
                }, 100);
                return $(this);
            },
            down: function (arg1, arg2, arg3) {
                if (typeof arg1 == 'object') {
                    for (p in arg1) {
                        sR.thisCallArgs.eval(p) = arg1[p];
                    }
                } else if (typeof arg1 != 'undefined' && (typeof arg1 == 'number' || arg1 == 'slow' || arg1 == 'fast')) {
                    sR.thisCallArgs.slideSpeed = arg1;
                } else {
                    sR.thisCallArgs.slideSpeed = sR.defaults.slideSpeed;
                }
                if (typeof arg2 == 'string') {
                    sR.thisCallArgs.easing = arg2;
                } else if (typeof arg2 == 'function') {
                    sR.thisCallArgs.callback = arg2;
                } else if (typeof arg2 == 'undefined') {
                    sR.thisCallArgs.easing = sR.defaults.easing;
                }
                if (typeof arg3 == 'function') {
                    sR.thisCallArgs.callback = arg3;
                } else if (typeof arg3 == 'undefined' && typeof arg2 != 'function') {
                    sR.thisCallArgs.callback = sR.defaults.callback;
                }
                var $cells = $(this).find('td');
                $cells.wrapInner('<div class="slideRowDown" style="display:none;" />');
                $cellContentWrappers = $cells.find('.slideRowDown');
                $(this).show();
                $cellContentWrappers.slideDown(sR.thisCallArgs.slideSpeed, sR.thisCallArgs.easing, function () { $(this).replaceWith($(this).contents()); });
                var wait = setInterval(function () {
                    if ($cellContentWrappers.is(':animated') === false) {
                        clearInterval(wait);
                        if (typeof sR.thisCallArgs.callback == 'function') {
                            sR.thisCallArgs.callback.call(this);
                        }
                    }
                }, 100);
                return $(this);
            }
        }
    };
    $.fn.slideRow = function (method, arg1, arg2, arg3) {
        if (typeof method != 'undefined') {
            if (sR.methods[method]) {
                return sR.methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }
    };
})(jQuery);

function open_form_from_asset()
{
  goto_forms();
}