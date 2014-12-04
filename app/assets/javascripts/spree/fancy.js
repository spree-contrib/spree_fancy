//= require spree/frontend
//= require jquery.hoverIntent
//= require jquery-ui
//= require jquery.bxslider
//= require jquery.dotdotdot-1.5.2
//= require matchMedia
//= require enquire


$(function(){

  // Hide flash messages after timeout
  setTimeout('$(".flash").fadeOut(1000)', 5000);

  // Home sliders
  if($('#home-slider').length > 0) {

    var cached_carousel_1 = $('#featured-products .carousel').html();
    var cached_carousel_2 = $('#latest-products .carousel').html();

    $('#home-slider > ul').bxSlider({
      adaptiveHeight: true,
      auto: true,
      autoHover: true,
      useCSS: true,
      controls: false,
      pagerSelector: '.slider-pager',
      touchEnabled: true
    });

    $('.carousel').bxSlider({
      minSlides: 1,
      maxSlides: 4,
      useCSS: true,
      slideWidth: 230,
      slideMargin: 10,
      auto: true,
      autoHover: true,
      controls: false,
      touchEnabled: true
    });

    $("#home-slider .product-description").dotdotdot({
      watch: true,
      height: 250
    });

  }

  // Make buttons from radio inoputs
  $( "#product-variants .variants-buttons" ).buttonset();
  $( ".payment-method-selector").buttonset();

  // Search hover
  var searchHoverConfig = {
    over: function(){
      $("#search-bar").find('form').fadeIn('300');
    },
    timeout: 300, // number = milliseconds delay before onMouseOut
    out: function(){
      $("#search-bar").find("form").fadeOut('300');
    }
  };

  $("#search-bar").hoverIntent(searchHoverConfig);

  // Cart table responsive fixes
  var cart_description_header = $('[data-hook="cart_items_headers"]').find('.cart-item-description-header');
  var cart_adjustment_header = $('[data-hook="cart_items"]').find('.cart-adjustment-header');

  // Media
  enquire.register("screen and (max-width: 767px)", {
      match : function() {
        if(cart_description_header.length > 0 || cart_adjustment_header.length > 0) {
          cart_description_header.attr('colspan', '0');
          cart_adjustment_header.attr('colspan', '5');
        }
      },
      unmatch : function() {
        if(cart_description_header.length > 0 || cart_adjustment_header.length > 0) {
          cart_description_header.attr('colspan', '2');
          cart_adjustment_header.attr('colspan', '6');
        }
      }
  }).listen();

});

(function() {
  Spree.ready(function($) {
    var fillStates, getCountryId, updateState;
    if (($('#checkout_form_address')).is('*')) {
      ($('#checkout_form_address')).validate();
      getCountryId = function(region) {
        return $('#' + region + 'country select').val();
      };
      updateState = function(region) {
        var countryId;
        countryId = getCountryId(region);
        if (countryId != null) {
          if (Spree.Checkout[countryId] == null) {
            return $.get(Spree.routes.states_search, {
              country_id: countryId
            }, function(data) {
              Spree.Checkout[countryId] = {
                states: data.states,
                states_required: data.states_required
              };
              return fillStates(Spree.Checkout[countryId], region);
            });
          } else {
            return fillStates(Spree.Checkout[countryId], region);
          }
        }
      };

      fillStates = function(data, region) {
        var selected, stateInput, statePara, stateSelect, stateSpanRequired, states, statesRequired, statesWithBlank;
        statesRequired = data.states_required;
        states = data.states;
        statePara = $('#' + region + 'state');
        stateSelect = statePara.find('select');
        stateInput = statePara.find('input');
        stateSpanRequired = statePara.find('state-required');
        if (states.length > 0) {
          selected = parseInt(stateSelect.val());
	  stateSelect.easyDropDown('destroy');
          stateSelect.html('');
          statesWithBlank = [
            {
              name: '',
              id: ''
            }
          ].concat(states);
          $.each(statesWithBlank, function(idx, state) {
            var opt;
            opt = ($(document.createElement('option'))).attr('value', state.id).html(state.name);
            if (selected === state.id) {
              opt.prop('selected', true);
            }
            return stateSelect.append(opt);
          });
	  var newDrop = stateSelect.easyDropDown({ cutOff: 10 });
	  newDrop.easyDropDown('enable');
          stateInput.hide().prop('disabled', true);
          statePara.show();
          stateSpanRequired.show();
          if (statesRequired) {
            stateSelect.addClass('required');
          }
	  stateSelect.removeClass('hidden');
          return stateInput.removeClass('required');
        } else {
	  stateSelect.easyDropDown('disable');
	  stateInput.show();
          if (statesRequired) {
            stateSpanRequired.show();
            stateInput.addClass('required');
          } else {
            stateInput.val('');
            stateSpanRequired.hide();
            stateInput.removeClass('required');
          }
          statePara.toggle(!!statesRequired);
          stateInput.prop('disabled', !statesRequired);
          stateInput.removeClass('hidden');
	  statePara.find('.dropdown').addClass('hidden');
          return stateSelect.removeClass('required');
        }
      };

      ($('#bcountry select')).unbind("change");
      ($('#scountry select')).unbind("change");

      ($('#bcountry select')).change(function() {
        return updateState('b');
      });
      ($('#scountry select')).change(function() {
        return updateState('s');
      });
      updateState('b');
    }
  });

}).call(this);
