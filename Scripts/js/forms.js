var topOffset = 170;

add_cross_to_required_forms();
change_selectpicker_values();
disable_datepickers();
$('.form-horizontal').on('keyup', this, check_panel_valid);
$('.form-horizontal').on('change', this, check_panel_valid);
$( '.form-horizontal .container' ).parsley( 'validate');
$('.selectpicker').selectpicker({ size: 5 });
$('#bookmark-nav').on('click', 'a', check_form_location);
$('.referral-icon').on('click', toggle_referral);
$('.reference-history tr').on('click', open_current_contact_row);
$('.icon-history').on('click', history_qtip);
$('.close-form').on('click', warn_close_form);
$('.cancel-button').on('click', warn_cancel_form);
$('span.lookup').on('click', open_address_book);
$('.input-group-addon').on('click', calendar_icon_click); //activate calendar on icon click
$('.history-button .button').on('click', toggle_history_button);

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

function calendar_icon_click() {
  $(this).parent().children('.form-control').datetimepicker('show');
}

function toggle_history_button() {
  if ($(this).hasClass('active')) {
    $('.button').toggleClass('active');
    if ($('.button').hasClass('show-closed')) {
      // attach show closed functionality here
    }
    if ($('.button').hasClass('hide-closed')) {
      // attach hide closed functionality here
    }
  }
  else {
    return false
  }

}

$('.select-all').on('click', function() {
  $(this).parent('.col-sm-8').children('.selectpicker').selectpicker('selectAll');
});

$('.select-none').on('click', function() {
  $(this).parent('.col-sm-8').children('.selectpicker').selectpicker('deselectAll');
});

function select_all() {
  $(this).parent().children('.selectpicker').selectpicker('selectAll');
}

function select_none() {
  $(this).parent().children('.selectpicker').selectpicker('deselectAll');
}

$("input[type='text']").on("click", function () {
  $(this).select();
});



$(".checkbox label input").change(function() {
    var boxes = $(".action-checkbox").click(function(){
      boxes.not(this).attr('checked', false);
    });
    if(this.checked) {
      $('#referralNotesCR').parent('div').parent('div').removeClass('hidden');
      $('#referral-to').parent('.form-group').removeClass('hidden');
      $(this).attr('checked', 'checked');
    }
    else if($(this).prop('checked', 'false')) {
      $('#referralNotesCR').parent('div').parent('div').addClass('hidden');
      $('#referral-to').parent('.form-group').addClass('hidden');
      $(this).removeAttr('checked');
    }
});

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

function check_form_location() {
  if (!$('#bookmark-nav ul').hasClass('disabled')) {
    var href = $(this).attr('data-href');
    if (href === '#bookmark_location') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab1');
    }
    if (href === '#bookmark_details') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({scrollTop: scrollAmount }, 1500);
      oval_border_highlight('#tab2');
    }
    if (href === '#bookmark_contact') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab3');
    }
    if (href === '#bookmark_condition') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab3');
    }
    if (href === '#bookmark_notes') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab4');
    }
    if (href === '#bookmark_closeout') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab5');
    }
    //timesheet form
    if (href === '#bookmark_start') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab20');
    }
    if (href === '#bookmark_work') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab21');
    }
    if (href === '#bookmark_breaks') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab22');
    }
    if (href === '#bookmark_end') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab23');
    }
    if (href === '#bookmark_review') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab24');
    }
  }
}

function oval_border_highlight(tab_id) {
  $('.oval').removeClass('current');
  $(tab_id).addClass('current');
}

function toggle_panel_num_colour( thisObj, className) {
  $(thisObj).parent().find('.text-circle').removeClass('incomplete complete').addClass(className);
}

function toggle_oval_colour( thisObj, className) {
  $(thisObj).parent().find('.text-circle').removeClass('incomplete complete').addClass(className);
  ovalName = '#' + $(thisObj).parents("div[id^='bookmark_']" ).attr('id');
  change_oval_colour = $("[data-href=" + ovalName + "]");
  if ($(change_oval_colour).attr('data-href') === ovalName ) {
    $(change_oval_colour).children('div').removeClass('incomplete complete').addClass(className);
  }
}

function toggle_referral() {
  $('.row').toggleClass('hidden');
  $('html body').animate({ scrollTop: 0 });
  $('#bookmark_closeout').toggleClass('hidden');
  oval_border_highlight('#tab1');
  $('.referral-icon').toggleClass('current');
}

function change_selectpicker_values() {
  $('.selectpicker').each(function() {
    var selectValue = $(this).attr('value');
    $(this).next().children('.btn').children('.filter-option').html(selectValue);
  });
}

function disable_datepickers() {
  $('.input-group-addon').each( function() {
    var disabled = $(this).parents('.input-group').children('.insert-date-picker').attr('disabled');
    if (disabled === 'disabled') {
      $(this).parents('.input-group').children('.input-group-addon').css('pointer-events', 'none');
    }
  });
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

function history_qtip() {
  $(this).qtip({
      content: {
        text: $('#process-history'),
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
          classes: 'qtip-process-history qtip-rounded qtip-shadow qtip-light',
          tip: {
            width: 50,
            height: 30
        }
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
              $('#process-history').addClass('hidden');
          }
      },
      overwrite: false,
      position: {
          my: 'top left',
          at: 'bottom right',
          target: $(this)
      }
  });
  $('#process-history').removeClass('hidden');
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

function skip_to_details() {
  var details = $('#bookmark_details').offset().top;
  $(window).scrollTop((details - 200));
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

function get_CR_page_position() {
  var location = $('#bookmark_location').offset().top;
  var details = $('#bookmark_details').offset().top;
  var contact = $('#bookmark_contact').offset().top;
  var notes = $('#bookmark_notes').offset().top;
  var closeout = $('#bookmark_closeout').offset().top;

  if ($(window).scrollTop() >= (location - topOffset -50) ) {
    oval_border_highlight('#tab1');
  }
  if ($(window).scrollTop() >= (details - topOffset -50 ) ) {
    oval_border_highlight('#tab2');
  }
  if ($(window).scrollTop() >= (contact - topOffset -50) ) {
    oval_border_highlight('#tab3');
  }
  if ($(window).scrollTop() >= (notes - topOffset -50) ) {
    oval_border_highlight('#tab4');
  }
  if ($(window).scrollTop() >= (closeout - topOffset -50) ) {
    oval_border_highlight('#tab5');
  }
}

function get_defect_page_position() {
  var location = $('#bookmark_location').offset().top;
  var details = $('#bookmark_details').offset().top;
  var condition = $('#bookmark_condition').offset().top;
  var notes = $('#bookmark_notes').offset().top;
  var referral = $('#bookmark_referral').offset().top;

  if ($(window).scrollTop() >= (location - topOffset -50) ) {
    oval_border_highlight('#tab1');
  }
  if ($(window).scrollTop() >= (details - topOffset -50 ) ) {
    oval_border_highlight('#tab2');
  }
  if ($(window).scrollTop() >= (condition - topOffset -50) ) {
    oval_border_highlight('#tab3');
  }
  if ($(window).scrollTop() >= (notes - topOffset -50) ) {
    oval_border_highlight('#tab4');
  }
  if ($(window).scrollTop() >= (referral - topOffset -50) ) {
    oval_border_highlight('#tab5');
  }
}

function get_inspection_page_position() {
  var location = $('#bookmark_location').offset().top;
  var details = $('#bookmark_details').offset().top;
  var contact = $('#bookmark_contact').offset().top;
  var notes = $('#bookmark_notes').offset().top;
  var closeout = $('#bookmark_closeout').offset().top;

  if ($(window).scrollTop() >= (location - topOffset -50) ) {
    oval_border_highlight('#tab1');
  }
  if ($(window).scrollTop() >= (details - topOffset -50 ) ) {
    oval_border_highlight('#tab2');
  }
  if ($(window).scrollTop() >= (contact - topOffset -50) ) {
    oval_border_highlight('#tab3');
  }
  if ($(window).scrollTop() >= (notes - topOffset -50) ) {
    oval_border_highlight('#tab4');
  }
  if ($(window).scrollTop() >= (closeout - topOffset -50) ) {
    oval_border_highlight('#tab5');
  }
}

function get_task_page_position() {
  var taskdetails = $('#bookmark_taskdetails').offset().top;
  var extdetails = $('#bookmark_extdetails').offset().top;
  var loe = $('#bookmark_loe').offset().top;
  var wip = $('#bookmark_wip').offset().top;
  var traffic = $('#bookmark_traffic').offset().top;
  var tasknotes = $('#bookmark_tasknotes').offset().top;

  if ($(window).scrollTop() >= (taskdetails - topOffset -50) ) {
    oval_border_highlight('#tab10');
  }
  if ($(window).scrollTop() >= (extdetails - topOffset -50 ) ) {
    oval_border_highlight('#tab11');
  }
  if ($(window).scrollTop() >= (loe - topOffset -50) ) {
    oval_border_highlight('#tab12');
  }
  if ($(window).scrollTop() >= (wip - topOffset -50) ) {
    oval_border_highlight('#tab13');
  }
  if ($(window).scrollTop() >= (traffic - topOffset -50) ) {
    oval_border_highlight('#tab14');
  }
  if ($(window).scrollTop() >= (tasknotes - topOffset -50) ) {
    oval_border_highlight('#tab15');
  }
}

function get_timesheet_page_position() {
  var start = $('#bookmark_start').offset().top;
  var work = $('#bookmark_work').offset().top;
  var breaks = $('#bookmark_breaks').offset().top;
  var end = $('#bookmark_end').offset().top;
  var review = $('#bookmark_review').offset().top;

  if ($(window).scrollTop() >= (start - topOffset -50 ) ) {
    oval_border_highlight('#tab20');
  }
  if ($(window).scrollTop() >= (work - topOffset -50) ) {
    oval_border_highlight('#tab21');
  }
  if ($(window).scrollTop() >= (breaks - topOffset -50) ) {
    oval_border_highlight('#tab22');
  }
  if ($(window).scrollTop() >= (end - topOffset -50) ) {
    oval_border_highlight('#tab23');
  }
  if ($(window).scrollTop() >= (review - topOffset -50) ) {
    oval_border_highlight('#tab24');
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


// datetimepicker
$('.insert-time-picker').datetimepicker({
  format: 'hh:ii',
  language: 'en',
    autoClose: "true",
    startView: 1,
    minView: 0,
    maxView: 1,
    forceParse: 0
});

$('.insert-date-picker').datetimepicker({
  format: 'dd/mm/yyyy',
  language: 'en',
  todayBtn: "linked",
  startView: 3,
    minView: 2,
    maxView: 4,
    autoClose: "true",
    todayHighlight: 1,
    startView: 2,
    forceParse: 1
});

$('.insert-picker').datetimepicker({
    language: 'en',
    weekStart: 1,
    todayBtn: 1,
      autoClose: 1,
      todayHighlight: 1,
      startView: 2,
      forceParse: 0,
    showMeridian: 1
});


//task form functions

$('td a span.glyphicon-play').on('click', highlight_current_task);
$('td a span.glyphicon-play.breaks').on('click', highlight_current_break);
$('.glyphicon-picture').on('click', show_task_map);
$('.member-timesheet-row').on('click', show_member_timesheet);

function highlight_current_break() {
  // event.preventDefault();
  $('.breaks-row.current-break').removeClass('current-break');
  console.log($(this).parents());
  $(this).parents('.breaks-row').addClass('current-break');
}

function highlight_current_task() {
  // event.preventDefault();
  $('.task-row.current-task').removeClass('current-task');
  console.log($(this).parents());
  $(this).parents('.task-row').addClass('current-task');
}

function show_task_map() {
  bootbox.confirm('<img class="temp-task-map" src="../../Content/images/OsmMap_Feature.PNG">', function (response) {});
}

function show_member_timesheet() {
  // event.preventDefault();
  $('.member-timesheet-panel').toggleClass('hidden');
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