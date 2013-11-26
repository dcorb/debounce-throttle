$(document).ready(function(){

  var allEvents = $('#allEvents'),
     divDebounce_true = $('#debounce_true'),
     divDebouncejtrue = $('#debouncejtrue'),
     divDebounce_false = $('#debounce_false'),
     divDebouncejfalse = $('#debouncejfalse'),
     divThrottle_true = $('#throttle_true'),
     divThrottlejtrue = $('#throttlejtrue'),
     divThrottlejfalse = $('#throttlejfalse'),
	  divDelayed = $('#delayedEvents'),
	  divSequenced = $('#sequencedEvents'),
     sidebar_mousemove = $('#sidebar-free'),
     counter = 0,
     next_color = 0,
     drawing,
     drawing_automated,
     lazy_Debounce_Events,
     lazyDebounce_true,
     lazyDebouncejtrue,
     lazyDebounce_false,
     lazyDebouncejfalse,
     lazyThrottle_true,
     lazyThrottlejtrue,
     lazyThrottlejfalse,
	  delayedUpdate,
	  sequencedUpdate;


  function update(div, color){
    div[0].lastChild.className = 'color' + color;
    div[0].lastChild.innerHTML = color;
  }


  function setup_lazy_functions(_){
    lazy_Debounce_Events = $.throttle(50, false, updateEvents);

    lazyDebounce_true = _.debounce(update, 200, true);
    lazyDebouncejtrue = $.debounce(200, true, update);

    lazyDebounce_false = _.debounce(update, 200, false);
    lazyDebouncejfalse = $.debounce(200, false, update);

    lazyThrottle_true = _.throttle(update, 200);
    lazyThrottlejtrue = $.throttle(200, true, update);
    lazyThrottlejfalse = $.throttle(200, false, update);

	 delayedUpdate = delayed(update, 200);
	 sequencedUpdate = sequenced(update, 200);
  }

  function updateEvents(){
    update(allEvents, next_color);
    lazyDebounce_true(divDebounce_true, next_color);
    lazyDebouncejtrue(divDebouncejtrue, next_color);
    lazyDebounce_false(divDebounce_false, next_color);
    lazyDebouncejfalse(divDebouncejfalse, next_color);
    lazyThrottle_true(divThrottle_true, next_color);
    lazyThrottlejtrue(divThrottlejtrue, next_color);
    lazyThrottlejfalse(divThrottlejfalse, next_color);
	 delayedUpdate(divDelayed, next_color);
	 sequencedUpdate(divSequenced, next_color);
    next_color++;
    if (next_color > 9){
      next_color = 0;
    }
  }

  // Initially demo it with underscore.js
  setup_lazy_functions(_);

  function reset(){
    allEvents.html('<span></span>');
    divDebounce_true.html('<span></span>');
    divDebouncejtrue.html('<span></span>');
    divDebounce_false.html('<span></span>');
    divDebouncejfalse.html('<span></span>');
    divThrottle_true.html('<span></span>');
    divThrottlejtrue.html('<span></span>');
    divThrottlejfalse.html('<span></span>');
	 divDelayed.html('<span></span>');
	 divSequenced.html('<span></span>');
    next_color = 0;
    counter = 0;
    clearInterval(drawing_automated);
    clearInterval(drawing);
  }

  sidebar_mousemove.on('mousemove', function (){
    lazy_Debounce_Events();
  });

  sidebar_mousemove.on('mouseenter', function(){
    reset();
    draw();
  });

  $('#every100').on('click', function(e){
    e.preventDefault();
    reset();
    draw();
    drawing_automated = setInterval(function(){
      sidebar_mousemove.trigger('mousemove');
    }, 100);
  });


  $('#every300').on('click', function(e){
    e.preventDefault();
    reset();
    draw();
    drawing_automated = setInterval(function(){
      sidebar_mousemove.trigger('mousemove');
      sidebar_mousemove.trigger('mousemove');
    }, 300);
   });


  $('#use-lodash').on('click', function(e){
    e.preventDefault();
    if ($(this).data('lodash')){
      setup_lazy_functions(_);
      $(this).data('lodash', false)
             .html('Using <strong>underscore.js</strong> | <del>lodash.js</del>')
    } else {
      setup_lazy_functions(lo);
      $(this).data('lodash', true)
             .html('Using <del>underscore.js</del> | <strong>lodash.js</strong>')
    }
  });

  var draw = function(){
    drawing = setInterval(function(){
      counter++;
      allEvents[0].appendChild(document.createElement('span'));
      divDebounce_true[0].appendChild(document.createElement('span'));
      divDebouncejtrue[0].appendChild(document.createElement('span'));
      divDebounce_false[0].appendChild(document.createElement('span'));
      divDebouncejfalse[0].appendChild(document.createElement('span'));
      divThrottlejtrue[0].appendChild(document.createElement('span'));
      divThrottlejfalse[0].appendChild(document.createElement('span'));
      divThrottle_true[0].appendChild(document.createElement('span'));
		divDelayed[0].appendChild(document.createElement('span'));
		divSequenced[0].appendChild(document.createElement('span'));

      if (counter > 95){
        clearInterval(drawing);
        clearInterval(drawing_automated);
      }
    }, 30);
  };

});
