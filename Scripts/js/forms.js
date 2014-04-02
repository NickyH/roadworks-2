var topOffset = 140;

change_selectpicker_values();
disable_datepickers();
$('.datepicker').pickadate();

$('.input-group-addon .glyphicon-calendar').on('click', calendar_icon_click); //activate calendar on icon click
$('.input-group-addon .glyphicon-time').on('click', clock_icon_click); //activate timepicker on icon click

$('.form-horizontal').on('keyup', this, check_panel_valid);
$('.form-horizontal').on('change', this, check_panel_valid);
$( '.form-horizontal .container' ).parsley( 'validate');
$('.selectpicker').selectpicker({
    size: 'auto',
    dropupAuto: false
});
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    $('.selectpicker').selectpicker('mobile');
}
$('#bookmark-nav').on('click', 'a', check_form_location);
$('.close-form').on('click', warn_close_form);
$('.cancel-button').on('click', warn_cancel_form);
//validation bar functions
$('.form-validation-bar').slideUp(1);
$('.save-button').on('click', show_form_saved);
// $('.save-button').on('click', show_form_errors);
$('.validation-close').on('click', close_validation_bar);

$('.filename-delete').on('click', delete_selected_file);

$('.icon-history').on('click', history_qtip);
$('.icon-options').on('click', options_qtip);

$('[data-slidepanel]').slidepanel({
    orientation: 'right',
    mode: 'overlay'
});

$('.reference-history').on('keyup', get_val_table_ID);


function toggle_rw_select() {
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

function toggle_history_panel() {
  $('#history-slidepanel').slidepanel('show');
}

function prevent_disable_dropdown() {
  var select = $(this).parents('.form-group').children('.pill-select');
  if ($(select).hasClass('inactive')) {
    return false
  }
  else {
    $(this).children('.dropdown-menu').children('.dropdown-menu.inner').children('li').removeClass('disabled');
  }
}

function prevent_hover_grey() {
  var select = $(this).parents('.form-group').children('.pill-select');
  if ($(select).hasClass('inactive')) {
    return false
  }
  else {
    $(this).children('button').css('background-color', 'white');
  }
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

function close_options_qtip() {
  $('.qtip.qtip-options-dropdown').qtip('hide');
}

function insert_asset_form() {
  $('#insert-map').empty();
  $('#insert-form').empty();
  $.get('forms/form_addjob.html', function(data) {
    $('#insert-form').html(data);
    });
  var formName = 'addjob'
  show_correct_ovals(formName);
  $('html').animate({ scrollTop: 0 });
  close_options_qtip()
}

function insert_jpp_form() {
  $('#insert-form').empty();
  $.get('forms/form_jpp.html', function(data) {
    $('#insert-form').html(data);
    });
  var formName = 'jpp'
  show_correct_ovals(formName);
  $('html').animate({ scrollTop: 0 });
  close_options_qtip()
}

function insert_completion_form() {
  $('#insert-form').empty();
  $.get('forms/form_pc.html', function(data) {
    $('#insert-form').html(data);
    });
  var formName = 'pc'
  show_correct_ovals(formName);
  $('html').animate({ scrollTop: 0 });
  close_options_qtip()
}

function show_correct_ovals(formName) {
  if (formName === 'addclient') {

    $('a[data-href="#bookmark_addclient_details"]').parent('li').show();
    $('a[data-href="#bookmark_addclient_notes"]').parent('li').show();
    $('a[data-href="#bookmark_addclient_history"]').parent('li').show();

    $('a[data-href="#bookmark_addjob_details"]').parent('li').hide();
    $('a[data-href="#bookmark_addjob_notes"]').parent('li').hide();
    $('a[data-href="#bookmark_addjob_history"]').parent('li').hide();

    $('a[data-href="#bookmark_details_asset"]').parent('li').hide();

    $('a[data-href="#bookmark_details_pl"]').parent('li').hide();
    $('a[data-href="#bookmark_activities"]').parent('li').hide();
    $('a[data-href="#bookmark_planning"]').parent('li').hide();
    $('a[data-href="#bookmark_conditions"]').parent('li').hide();
    $('a[data-href="#bookmark_map"]').parent('li').hide();

    $('a[data-href="#bookmark_details_pc"]').parent('li').hide();
    $('a[data-href="#bookmark_signoff"]').parent('li').hide();
  }
  if (formName === 'addjob') {

    $('a[data-href="#bookmark_addclient_details"]').parent('li').hide();
    $('a[data-href="#bookmark_addclient_notes"]').parent('li').hide();
    $('a[data-href="#bookmark_addclient_history"]').parent('li').hide();

    $('a[data-href="#bookmark_addjob_details"]').parent('li').show();
    $('a[data-href="#bookmark_addjob_notes"]').parent('li').show();
    $('a[data-href="#bookmark_addjob_history"]').parent('li').show();

    $('a[data-href="#bookmark_details_asset"]').parent('li').hide();

    $('a[data-href="#bookmark_details_pl"]').parent('li').hide();
    $('a[data-href="#bookmark_activities"]').parent('li').hide();
    $('a[data-href="#bookmark_planning"]').parent('li').hide();
    $('a[data-href="#bookmark_conditions"]').parent('li').hide();
    $('a[data-href="#bookmark_map"]').parent('li').hide();

    $('a[data-href="#bookmark_details_pc"]').parent('li').hide();
    $('a[data-href="#bookmark_signoff"]').parent('li').hide();
  }
  if (formName === 'asset') {

    $('a[data-href="#bookmark_details_asset"]').parent('li').show();

    $('a[data-href="#bookmark_addclient_details"]').parent('li').hide();
    $('a[data-href="#bookmark_addclient_notes"]').parent('li').hide();
    $('a[data-href="#bookmark_addclient_history"]').parent('li').hide();

    $('a[data-href="#bookmark_addjob_details"]').parent('li').hide();
    $('a[data-href="#bookmark_addjob_notes"]').parent('li').hide();
    $('a[data-href="#bookmark_addjob_history"]').parent('li').hide();

    $('a[data-href="#bookmark_details_pl"]').parent('li').hide();
    $('a[data-href="#bookmark_activities"]').parent('li').hide();
    $('a[data-href="#bookmark_planning"]').parent('li').hide();
    $('a[data-href="#bookmark_conditions"]').parent('li').hide();
    $('a[data-href="#bookmark_map"]').parent('li').hide();

    $('a[data-href="#bookmark_details_pc"]').parent('li').hide();
    $('a[data-href="#bookmark_signoff"]').parent('li').hide();
  }
  if (formName === 'jpp') {
    $('a[data-href="#bookmark_details_asset"]').parent('li').hide();

    $('a[data-href="#bookmark_addclient_details"]').parent('li').hide();
    $('a[data-href="#bookmark_addclient_notes"]').parent('li').hide();
    $('a[data-href="#bookmark_addclient_history"]').parent('li').hide();

    $('a[data-href="#bookmark_addjob_details"]').parent('li').hide();
    $('a[data-href="#bookmark_addjob_notes"]').parent('li').hide();
    $('a[data-href="#bookmark_addjob_history"]').parent('li').hide();

    $('a[data-href="#bookmark_details_pl"]').parent('li').show();
    $('a[data-href="#bookmark_activities"]').parent('li').show();
    $('a[data-href="#bookmark_planning"]').parent('li').show();
    $('a[data-href="#bookmark_conditions"]').parent('li').show();
    $('a[data-href="#bookmark_map"]').parent('li').show();

    $('a[data-href="#bookmark_details_pc"]').parent('li').hide();
    $('a[data-href="#bookmark_signoff"]').parent('li').hide();
  }
  if (formName === 'pc') {

    $('a[data-href="#bookmark_addclient_details"]').parent('li').hide();
    $('a[data-href="#bookmark_addclient_notes"]').parent('li').hide();
    $('a[data-href="#bookmark_addclient_history"]').parent('li').hide();

    $('a[data-href="#bookmark_addjob_details"]').parent('li').hide();
    $('a[data-href="#bookmark_addjob_notes"]').parent('li').hide();
    $('a[data-href="#bookmark_addjob_history"]').parent('li').hide();

    $('a[data-href="#bookmark_details_pc"]').parent('li').show();
    $('a[data-href="#bookmark_signoff"]').parent('li').show();

    $('a[data-href="#bookmark_details_asset"]').parent('li').hide();

    $('a[data-href="#bookmark_details_pl"]').parent('li').hide();
    $('a[data-href="#bookmark_activities"]').parent('li').hide();
    $('a[data-href="#bookmark_planning"]').parent('li').hide();
    $('a[data-href="#bookmark_conditions"]').parent('li').hide();
    $('a[data-href="#bookmark_map"]').parent('li').hide();
  }
}

// inserts the first form into the form page on initial load of details page
function show_first_form() {
  $.get('forms/form_addjob.html', function(data) {
    $('#insert-form').html(data);
    });
  window.location = ('form.html'); //initial refresh
}

function calendar_icon_click() {
  $(this).parent().parent().children('input').trigger('click');
}

function clock_icon_click() {
  $(this).parent().parent('.input-group').children('.insert-time-picker').trigger('focus');
}

function goto_forms() {
  form_navbar();
  insert_asset_form();
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
    // add client form
    if (href === '#bookmark_addclient_details') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab20');
    }
    if (href === '#bookmark_addclient_notes') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab21');
    }
    if (href === '#bookmark_addclient_history') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab22');
    }
    // add job form
    if (href === '#bookmark_addjob_details') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab13');
    }
    if (href === '#bookmark_addjob_notes') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab21');
    }
    if (href === '#bookmark_addjob_history') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab14');
    }
    //asset form
    if (href === '#bookmark_details_asset') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab15');
    }
    // planning form
    if (href === '#bookmark_details_pl') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab1');
    }
    if (href === '#bookmark_activities') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({scrollTop: scrollAmount }, 1500);
      oval_border_highlight('#tab2');
    }
    if (href === '#bookmark_conditions') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab3');
    }
    if (href === '#bookmark_map') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab4');
    }
    if (href === '#bookmark_planning') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab5');
    }
    //practical completion form
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
  $('.icon-addclient').addClass('hidden');
  $('.icon-addjob').addClass('hidden');
  $('.side-tab-icon.history').removeClass('hidden');
  $('.side-tab-icon.asset').addClass('hidden');
}

function get_client_page_position() {
  var details = $('#bookmark_addclient_details').offset().top;
  var notes = $('#bookmark_addclient_notes').offset().top;
  var history = $('#bookmark_addclient_history').offset().top;

  if ($(window).scrollTop() >= (details - topOffset -50 ) ) {
    oval_border_highlight('#tab20');
  }
  if ($(window).scrollTop() >= (notes - topOffset -50) ) {
    oval_border_highlight('#tab21');
  }
  if ($(window).scrollTop() >= (history - topOffset -50) ) {
    oval_border_highlight('#tab22');
  }
}

function get_job_page_position() {
  var details = $('#bookmark_addjob_details').offset().top;
  var notes = $('#bookmark_addjob_notes').offset().top;
  var history = $('#bookmark_addjob_history').offset().top;

  if ($(window).scrollTop() >= (details - topOffset -50 ) ) {
    oval_border_highlight('#tab13');
  }
  if ($(window).scrollTop() >= (notes - topOffset -50) ) {
    oval_border_highlight('#tab14');
  }
  if ($(window).scrollTop() >= (history - topOffset -50) ) {
    oval_border_highlight('#tab15');
  }
}

function get_rw1_page_position() {
  var activities = $('#bookmark_activities').offset().top;
  var siteplan = $('#bookmark_conditions').offset().top;
  var planning = $('#bookmark_planning').offset().top;
  var map = $('#bookmark_map').offset().top;

  if ($(window).scrollTop() >= (activities - topOffset -50 ) ) {
    oval_border_highlight('#tab2');
  }
  if ($(window).scrollTop() >= (siteplan - topOffset -50) ) {
    oval_border_highlight('#tab3');
  }
  if ($(window).scrollTop() >= (map - topOffset -50) ) {
    oval_border_highlight('#tab4');
  }
  if ($(window).scrollTop() >= (planning - topOffset -50) ) {
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

function warn_cancel_form() {
  bootbox.confirm('This will cancel any changes you made to this form.', function (response) {
    if(response) {
      insert_addjob_form();
    }
  });
}

// datetimepicker
$('.insert-time-picker').datetimepicker({
  pickDate: false,
  language:'en'
});

// datetimepicker
// $('.insert-time-picker').datetimepicker({
//   format: 'hh:ii',
//   language: 'en',
//     autoClose: "true",
//     startView: 1,
//     minView: 0,
//     maxView: 1,
//     forceParse: 0
// });

// $('.insert-date-picker').datetimepicker({
//   format: 'dd/mm/yyyy',
//   language: 'en',
//   todayBtn: "linked",
//   startView: 3,
//     minView: 2,
//     maxView: 4,
//     autoClose: "true",
//     todayHighlight: 1,
//     startView: 2,
//     forceParse: 1
// });

// $('.insert-picker').datetimepicker({
//     language: 'en',
//     weekStart: 1,
//     todayBtn: 1,
//       autoClose: 1,
//       todayHighlight: 1,
//       startView: 2,
//       forceParse: 0,
//     showMeridian: 1
// });


function goto_map() {
  window.location = '/';
}

function map_navbar() {
  $('.icon-map').removeClass('hidden');
  $('.icon-form').addClass('hidden');
  $('#bookmark_nav li a').addClass('hidden');
  $('.oval-text').addClass('hidden');
  $('.detail-icon').removeClass('hidden');
  $('.map-icon').addClass('hidden');
  $('.side-tab-icon.history').addClass('hidden');
  $('.side-tab-icon.asset').removeClass('hidden');
}

// get filename when file is attached and display it in the next form-group
  $('input[type=file]').change(function(e){
    $in=$(this);
    var filename = $in.val().split('\\').pop();
    if (filename === "No files added" || filename === "" ) {
      filename = recentfile;
    }
    $in.parents('.form-group').next('.filename').children().find('.filename-text').html(filename);
    $in.parents('.form-group').next('.filename').children().find('.filename-delete').html('x');
    var recentfile = filename
  });

function delete_selected_file() {
  $(this).parent('.col-sm-8').children('.filename-text').html("No files added");
  $(this).parent('.col-sm-8').children('.filename-delete').html("");
}


function insert_addclient_form () {
  $('#insert-form').empty();
  $('#insert-map').empty();
  $.get('forms/form_addclient.html', function(data) {
    $('#insert-form').html(data);
  });
  var formName = 'addclient'
  show_correct_ovals(formName);
  $('html').animate({ scrollTop: 0 });
  close_options_qtip()
}

function insert_addjob_form () {
  $('#insert-form').empty();
  $('#insert-map').empty();
  $.get('forms/form_addjob.html', function(data) {
    $('#insert-form').html(data);
  });
  var formName = 'addjob'
  show_correct_ovals(formName);
  $('html').animate({ scrollTop: 0 });
  close_options_qtip()
}

function show_form_saved () {
  $(this).parents('.form-buttons').next('.form-validation-bar').children('.form-validation-text').removeClass('hidden');
  $(this).parents('.form-buttons').next('.form-validation-bar').children('.validation-errors-list').addClass('hidden');
  $(this).parents('.form-buttons').next('.form-validation-bar').addClass('saved').slideDown(500).fadeOut(100).fadeIn(200).fadeOut(100).fadeIn(200);
}

function show_form_errors () {
  $(this).parents('.form-buttons').next('.form-validation-bar').children('.validation-errors-list').removeClass('hidden');
  $(this).parents('.form-buttons').next('.form-validation-bar').children('.form-validation-text').addClass('hidden');
  $(this).parents('.form-buttons').next('.form-validation-bar').addClass('error').slideDown(500).fadeOut(100).fadeIn(200).fadeOut(100).fadeIn(200);
}

function close_validation_bar () {
  $(this).parents('.form-validation-bar').slideUp(1);
  $(this).parents('.form-buttons').next('.form-validation-bar').children('.form-validation-text').addClass('hidden');
  $(this).parents('.form-buttons').next('.form-validation-bar').children('.validation-errors-list').addClass('hidden');
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
          my: 'top right',
          at: 'bottom left',
          target: $(this)
      }
  });
  $('#process-history').removeClass('hidden');
}


function options_qtip() {
  $(this).qtip({
      content: {
        text: $('#options-dropdown')
      },
      show: {
          modal: {
              on: true,
              solo: true
          },
          ready: true,
          event: 'click'
      },
      style: {
          classes: 'qtip-options-dropdown qtip-rounded qtip-shadow qtip-light',
          tip: {
            width: 20,
            height: 20
        }
      },
      hide: {
          event: 'click'
      },
      overwrite: false,
      position: {
          my: 'top center',
          at: 'bottom center',
          target: $(this)
      }
  });
  $('#options-dropdown').removeClass('hidden');
}


function get_val_table_ID () {
  var thisObj = $(this).children('input');
  var tableID = $(this).parents('form').children('table').attr('id');
  table_search(thisObj, tableID);
}

function table_search(thisObj, tableID) {
  console.log(thisObj);
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