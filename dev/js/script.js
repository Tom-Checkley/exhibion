var screenHeight = window.innerHeight;

$(document).ready(function() {

	$('body, #gallery').css('height', screenHeight);




	// =================================
	// =================================
	// HEADER CONTROLS
	// =================================	
	// =================================

	function setWidthAndHeights() {
		function setHeaderHeight() {
			var headHeight = $('.logo-holder').height();
			$('header, .logo-holder').css('height', headHeight);
			$('.home-content').css({
				'position' : 'absolute',
				'top' : headHeight
			});
		}
		function setGalleryWidth() {
			var screenWidth = window.innerWidth;
			if (screenWidth < 780) {
				$('.thumb-slides').css({
					'width' : screenWidth
				});
			} else {
				$('.thumb-slides').css({
					'width' : '20%'
				});
			}
		}
	}

	$(window).load(function(){
		setWidthAndHeights();
	});

	var timer;
	var adjustFrame = function() {
		clearTimeout(timer);
		$('.logo-holder').css('height', 'auto');
		timer = setTimeout(setWidthAndHeights, 1);
	}

	$(window).on('resize', function(){
		adjustFrame();
	});

	// =================================
	// LAUNCH CONTROLS
	// =================================
	

	// =======================================
	// 
	// TO HIDE ANY ELEMENTS YOU WANT TO FADE IN AFTER
	// THE HEADER SLIDES IN ON THE HOME PAGE.
	// 
	// SEPERATE WITH A COMMA INSIDE THE APOSTROPHES
	// 
	// MAKE SURE IT STARTS WITH -
	// 
	// #home 
	// 
	// THEN A SPACE FOLLOWED BY THE TYPE OF ELEMENT 
	// OR CLASS NAME, BASICALLY THE SAME AS YOU WOULD
	// WITH STANDARD CSS SELECTORS.
	// 
	// =======================================
	$('#home p, #home nav').hide();

	$('.logo-holder').css({
		'position': 'relative',
		'left': '-100%'
	});
	$('.sheep').css({
		'position': 'relative',
		'right': '-100%'
	});

	$(window).load(function(){
		$('.logo-holder').delay(300).animate({'left': 0},1000);
		$('.sheep').delay(300).animate({'right': 0},1000);
		// =======================================
		// 
		// ADD HOME ELEMENTS TO FADE IN BELOW,
		// THE SAME AS YOU DID ABOVE TO HIDE THEM
		// 
		// =======================================
		$('#home p, #home nav').delay(800).fadeIn(1000);
	});


	// =================================
	// =================================
	// CONTACT
	// =================================	
	// =================================



	// =================================
	// =================================
	// GALLERY
	// =================================	
	// =================================

	// set scrolling thumbs horizontally or vertically

	var slideDown = $('.scroll-down .icon-circle-down');
	var slideUp = $('.scroll-down .icon-circle-up');
	var slideLeft = $('.scroll-across .icon-circle-right');
	var slideRight = $('.scroll-across .icon-circle-left');
	var thumb = $('.thumb-holder ul');
	var thumbs = $('.thumb-holder li');
	var thumbsLen = thumbs.length;
	var thumbWidth = 0;
	var y = 0;
	var x = 0;
	var colLeftHeight = 0;
	var colRightHeight = 0;
	var thumbHeight = 0;


	// vertical sliding thumbs
	slideUp.on('click', function() {
		x -= 250;
		for (var i = 0; i < thumbsLen; i += 2) {
			colLeftHeight -= thumbs.eq(i).height();
		};
		for (var i = 1; i < thumbsLen; i += 2) {
			colRightHeight -= thumbs.eq(i).height();
		};
		if (colLeftHeight < colRightHeight) {
			thumbHeight = colLeftHeight;
			console.log(thumbHeight)
		} else {
			thumbHeight = colRightHeight;
			console.log(thumbHeight)
		}

		colLeftHeight = 0;
		colRightHeight = 0;

		if (x <= thumbHeight) {
			x = thumbHeight;
			thumb.animate({
				'bottom': x
			}, 250);
		} else {
			thumb.animate({
				'top' : x
			}, 250);
		}
		thumbHeight = 0;
	});

	slideDown.on('click', function() {
		x += 250;
			if (x >= 0) {
			x = 0;
			thumb.css({'top' : x}, 250);
		} else {
			thumb.animate({
				'top' : x
			}, 250);
		}
	});

	// horizontally sliding thumbs
	slideLeft.on('click', function() {
		y -= 200;
		// find width for all thumbs together, $('thumb-holder').width() only retrieves screenWidth
		for (var i = 0; i < thumbsLen; i++) {
			thumbWidth -= thumbs.eq(i).width();
		};
		// check if it's scrolled across further than the width of the .thumb-holder
		if (y <= thumbWidth) {
			y = thumbWidth;
			$('.thumb-holder').animate({
				'right' : y
			}, 250);
		} else {
			$('.thumb-holder').animate({
				'left' : y
			}, 250);
		}
		// reset thumbWidth
		thumbWidth = 0;
	});

	slideRight.on('click', function() {
		y += 200;
		if (y >= 0) {
			y = 0;
			$('.thumb-holder').animate({
				'left' : y
			}, 250);
		} else {
			$('.thumb-holder').animate({
				'left' : y
			}, 250);
		}
		
	});
	// =================================
	// SLIDES
	// =================================
	
	var slides = $('.head-scroll li');
	var count = slides.length;
	var i = 0;

	slides.not(':first').hide();

	function slideShow() {
		var slide = slides.eq(i);
		slides.fadeOut(300);
		slide.delay(300).fadeIn(300);
	}

	function startSlides() {
		var loop = setInterval(function() {
			i++;
			if(i >= count) {
				i = 0;
			}
			slideShow();
		}, 4000);
	}

	startSlides();


	// =================================
	// PICTURE DATA
	// =================================

	// =================================
	// IMPORTANT----------
	// 
	// ALL NEW IMAGES MUST HAVE THEIR 
	// DATA STORED IN THIS FORMAT
	// 
	// CHECK HTML FOR CLASS NAME OF IMAGE
	// 
	// &pound;  IS THE CODE YOU NEED TO USE FOR A POUND SYMBOL
	//  
	// 
	// =================================

	$('.pic1').data('info', {
						name: '&pound;10/kg',
						medium: 'Oil on canvas',
						dimensions: '30" x 36"',
						price: '&pound;175'
	});
	
	$('.pic2').data('info', {
						name: '&pound;16/kg',
						medium: 'Oil on canvas',
						dimensions: '30" x 36"',
						price: '&pound;175'
	});

	$('.pic3').data('info', {
						name: '&pound;6.67/kg',
						medium: 'Oil on canvas',
						dimensions: '36" x 30"',
						price: '&pound;175'
	});

	$('.pic4').data('info', {
						name: 'Exhibion',
						medium: 'Oil on canvas',
						dimensions: '24" x 28"',
						price: '&pound;100'
	});

	$('.pic5').data('info', {
						name: 'Peru',
						medium: 'Oil on canvas',
						dimensions: '24" x 28"',
						price: '&pound;100'
	});

	$('.pic6').data('info', {
						name: 'The Dee',
						medium: 'Oil on canvas',
						dimensions: '24" x 28"',
						price: '&pound;100'
	});

	$('.pic7').data('info', {
						name: 'In Memorium',
						medium: 'Oil on canvas',
						dimensions: '30" x 36"',
						price: '&pound;175'
	});

	$('.pic8').data('info', {
						name: 'Kasane',
						medium: 'Oil on canvas',
						dimensions: '40" x 60"',
						price: 'SOLD'
	});

	$('.pic9').data('info', {
						name: 'Derpington',
						medium: 'Oil on canvas',
						dimensions: '16" x 12"',
						price: '&pound;50'
	});

	$('.pic10').data('info', {
						name: 'Dickington',
						medium: 'Oil on canvas',
						dimensions: '12" x 16"',
						price: '&pound;50'
	});

	$('.pic11').data('info', {
						name: 'Gus',
						medium: 'Oil on canvas',
						dimensions: '35" x 24"',
						price: 'SOLD'
	});

	$('.pic12').data('info', {
						name: 'Captive',
						medium: 'Oil on canvas',
						dimensions: '48" x 36"',
						price: '&pound;250'
	});

	$('.pic13').data('info', {
						name: 'Pheobechen',
						medium: 'Oil on canvas',
						dimensions: '35" x 24"',
						price: 'SOLD'
	});

	$('.pic14').data('info', {
						name: '&pound;5/kg',
						medium: 'Oil on canvas',
						dimensions: '36" x 30"',
						price: '&pound;175'
	});


	// =================================
	// OVERLAY ELEMENTS
	// =================================	

	var $thumb = $('.thumb a');
	var $overlay = $('<div class="overlay"></div>');
	var $holder = $('<div class="holder"></div>');
	var $spinner = $('<span class="icon-spinner3 spinner"></span>')
	var $image = $('<img>');
	var $close = $('<div class="close cf"><span class="icon-cancel-circle"></span></div>');
	var $infoHolder = $('<div class="info-holder"><span class="icon-circle-left prev"></span><span class="icon-circle-right next"></span></div>')
	var $title = $('<h3 class="title"></h3>');
	var $medium = $('<p class="medium"></p>');
	var $dimensions = $('<p class="dimensions"></p>');
	var $price = $('<p class="price"></p>');

	$('body').append($overlay);
	$overlay.append($close);
	$overlay.append($holder);
	$holder.append($spinner).append($image);
	$overlay.append($infoHolder);
	$infoHolder.append($title).append($medium).append($dimensions).append($price);

	$overlay.hide();
	$('.spinner').hide();


	// =================================
	// FIND IMAGE AND SHOW OVERLAY
	// =================================

	$('li[class^=pic], div[class^=pic]').on('click', function(event){
		// set global variable for use in next / prev functions
		current = $(this);
		event.preventDefault();
		if($(this).hasClass('port')) {
			$image.addClass('portrait');
		} else if ($(this).hasClass('sq')){
			$image.addClass('portrait');
		} else if ($(this).hasClass('portrait')) {
			$image.removeClass('portrait');
		}
		var src = $(this).find('a').attr('href');
		$image.attr('src', src);
		$title.html($(this).data('info').name);
		$medium.html($(this).data('info').medium);
		$dimensions.html($(this).data('info').dimensions);
		$price.html($(this).data('info').price);
		if($price.text().toLowerCase() === 'sold') {
			$price.css({
				'color': '#700000'
				// 'font-size': '24px'
			});
		} else {
			$price.css({
				'color': '#fff'
				// 'font-size': '16px'				
			});
		}
		var count = $('.gallery .thumb').length;
		console.log(count)
		if ($(this).hasClass('pic1')) {
			$('.prev').hide();
			$('.next').show()
		} else if ($(this).hasClass('pic'+count)) {
			$('.next').hide();
			$('.prev').show();
		} else {
			$('.next').show();
			$('.prev').show();
		}

		$overlay.fadeIn();
	});

	// =================================
	// NEXT PREV FUNCTIONS
	// =================================

	// next

	$('.next').on('click', function() {

		$image.hide();
		$('.spinner').show();

	 	var nextLink = current.next();
	 	if (nextLink.hasClass('port')) {
			$image.addClass('portrait');
		} else if (nextLink.hasClass('sq')) {
			$image.addClass('portrait');
		} else if (nextLink.hasClass('horiz')) {
			$image.removeClass('portrait');
		}
		current = nextLink;
		var nextImage = nextLink.find('a').attr('href');
		var findClass = nextLink.attr('class');
		var infoClass = findClass.substring(3, findClass.indexOf(' '));
		
		if (infoClass == $('.gallery .thumb').length) {
			$('.prev').show();
			$('.next').hide();
		} else {
			$('.prev').show();
			$('.next').show();
		}
		
		$image.attr('src', nextImage);

		
		$title.html($('.pic'+infoClass).data('info').name);
		$medium.html($('.pic'+infoClass).data('info').medium);
		$dimensions.html($('.pic'+infoClass).data('info').dimensions);
		$price.html($('.pic'+infoClass).data('info').price);
		if($price.text().toLowerCase() === 'sold') {
			$price.css({
				'color': '#700000'
			});
		} else {
			$price.css({
				'color': '#fff'
			});
		}
		$image.load(function() {
			$('.spinner').fadeOut(200);
			$image.fadeIn(400);
		});
	});

	// prev

	$('.prev').on('click', function() {

		$image.hide();
		$('.spinner').show();
	 	var nextLink = current.prev();
		if (nextLink.hasClass('port')) {
			$image.addClass('portrait');
		} else if (nextLink.hasClass('sq')) {
			$image.addClass('portrait');
		} else {
			$image.removeClass('portrait');
		}
		current = nextLink;
		var nextImage = nextLink.find('a').attr('href');
		$image.attr('src', nextImage);
		var findClass = nextLink.attr('class');
		var infoClass = findClass.substring(3, findClass.indexOf(' '));
		if (infoClass == 1) {
			$('.prev').hide();
			$('.next').show();
		} else {
			$('.prev').show();
			$('.next').show();
		}
		$image.attr('src', nextImage);
		$title.html($('.pic'+infoClass).data('info').name);
		$medium.html($('.pic'+infoClass).data('info').medium);
		$dimensions.html($('.pic'+infoClass).data('info').dimensions);
		$price.html($('.pic'+infoClass).data('info').price);
		if($price.text().toLowerCase() === 'sold') {
			$price.css({
				'color': '#700000'
			});
		} else {
			$price.css({
				'color': '#fff'
			});
		}
		$image.load(function() {
			$('.spinner').fadeOut(200);
			$image.fadeIn(400);
		});
	});


	// =================================
	// CLOSE OVERLAY
	// =================================

	$('.icon-cancel-circle').on('click', function() {
		$overlay.hide();
	});


});