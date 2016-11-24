// on document ready
(function($, _) {

 	// show/hide the mobile menu based on class added to container
	$('.menu-icon').click(function(){
		$(this).parent().toggleClass('is-tapped');
		 return false;
	});

  	// handle touch device events on drop down, first tap adds class, second navigates
 	$('.touch .sitenavigation li.nav-dropdown > a').on('touchend',
		function(e){
	    if ($('.menu-icon').is(':hidden')) {
		  	var parent = $(this).parent();
			  $(this).find('.clicked').removeClass('clicked');
	 			if (parent.hasClass('clicked')) {
					 window.location.href = $(this).attr('href');
				} else {
	 				$(this).addClass('linkclicked');

          // close other open menus at this level
	 			  $(this).parent().parent().find('.clicked').removeClass('clicked');

          parent.addClass('clicked');
					e.preventDefault();
				}
			}
	});

 	// handle the expansion of mobile menu drop down nesting
   	$('.sitenavigation li.nav-dropdown').click(
  		function(event){
  			if(event.stopPropagation) {
  				event.stopPropagation();
  			} else {
  				event.cancelBubble = true;
  			}

  			if ($('.menu-icon').is(':visible')) {
  				$(this).find('> ul').toggle();
  				$(this).toggleClass('expanded');
  			}
  		 }
  	);


  	// prevent links for propagating click/tap events that may trigger hiding/unhiding
  	$('.sitenavigation a.nav-dropdown, .sitenavigation li.nav-dropdown a').click(
  		function(event){
 			if(event.stopPropagation) {
 				event.stopPropagation();
 			} else {
 				event.cancelBubble = true;
 			}
  		}
  	);

  	// javascript fade in and out of dropdown menu
  	$('.no-touch .sitenavigation li').hover(
	  	function() {
	  		if (!$('.menu-icon').is(':visible')) {
	  		 	$(this).find('> ul').fadeIn(150);
	  		}
	  	},
	  	function() {
	  		if (!$('.menu-icon').is(':visible')) {
	  			 $(this).find('> ul').fadeOut(150);
	  		}
	  	}
  	);

// AJAX GALLERY LOADER

function injectGallery() {
	var	$btn = $('.kk');

	function selectCategory(data) {
		var $objects         = Array.prototype.slice.call(data.gallery);
		console.log($objects);

		$btn.on('click', function() {
			var $th = $(this);
			var $thCat = $th.attr('data-category');
			var $template        = _.template($('#galleryTemplate').html());
			var $wrapper          = $('#galleryAjax');
			var $fragment        = $(document.createDocumentFragment());

			$wrapper.html('');
			// console.log($objects);
			$objects.forEach(function(element) {
				var elCategory = element.category
				console.log(elCategory);
				if ($thCat == elCategory) {
					$fragment.append($template({
						name: element.name,
						category: element.category,
						src: element.images[0]
					}));
				}
			});
			$wrapper.append($fragment);
		})
	}
	// AJAX deprecated call
	// ==========================================================::||:>
	$.when($.ajax('data.json')).then(success, failure);

	// Callback function called when objects are successfully loaded
	// ==========================================================::||:>
	function success(success) {
		console.log('Yes! Success!');
		selectCategory(success);
	}

	function failure() {
		console.log('Whooops! Something went wrong with loading the JSON file data for S K I L L S!');
	}
}


  // ============================================================::||:>
  // ========================== LIGHTBOX ========================::||:>

  function initiateLightbox() {
    let $miniature = $('.gallery-item')
    let $lightbox = $('.dp-lightbox')
    let $lightboxImage = $lightbox.find('.image')
    let $nav = $('.dp-lightbox .nav .nav-btn')
    let $dim = $('.dim')
    let inactive = {'opacity': 0, 'pointer-events': 'none'}
    let active = {'opacity': 1, 'pointer-events': 'all'}
    let visible = {'opacity': 1}
    let dimmed = {'opacity': 0.8, 'pointer-events': 'all'}


    $miniature.on('click', function() {
      let $th = $(this)
      let imageSrc = $th.find('img').attr('src')
      let container = $lightboxImage

      appendImage(imageSrc, container)
      $dim.css(dimmed)
      $lightbox.css(visible)
      $lightboxImage.css(active)
      $nav.css(active)
      initiateNav($th)
    })

    $dim.on('click', function() {
      $dim.css(inactive)
      $lightbox.css(inactive)
      $lightboxImage.css(inactive)
      $nav.css(inactive)
    })

    function appendImage(imageSrc, container) {
      container.html('<img src="' + imageSrc + '" alt="" />');
    }

    function initiateNav(focus) {
      let $prevBtn = $('.nav-btn--left')
      let $nextBtn = $('.nav-btn--right')
      let container = $lightboxImage

      // console.log(nextImageSrc);

      $prevBtn.on('click', function() {
        let prev = focus.prev()
        let prevImageSrc = prev.find('img').attr('src')
        if (prev.length !== 0) {
          appendImage(prevImageSrc, container)
          focus = prev
        }
      })

      $nextBtn.on('click', function() {
        let next = focus.next()
        let nextImageSrc = next.find('img').attr('src')
        if (next.length !== 0) {
          appendImage(nextImageSrc, container)
          focus = next
        }
      })

    }

  }

  // ======================== END LIGHTBOX ======================::||:>
  // ============================================================::||:>
// function render(data) {
// 	var $template        = _.template($('#galleryTemplate').html());
// 	var $wrapper          = $('#galleryAjax');
// 	var $objects         = Array.prototype.slice.call(data.gallery);
// 	var $fragment        = $(document.createDocumentFragment());
//
//
// 	// console.log($objects);
// 	$objects.forEach(function(element) {
// 			$fragment.append($template({
// 				name: element.name,
// 				category: element.category,
// 				src: element.images[0]
// 			}));
// 	});
//
// 	$wrapper.append($fragment);
// };



// Callback function called when objects fail to be loaded
// ==========================================================::||:>


injectGallery();
initiateLightbox()



	})(window.$, window._);
