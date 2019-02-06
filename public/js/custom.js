jQuery.noConflict();
jQuery(document).ready(function($){
	
	"use strict";
	
	var currentWidth = window.innerWidth || document.documentElement.clientWidth;	
	
	Pace.on("done", function(){
		$("#loader-wrapper").fadeOut(500);
		$(".pace").remove();
	});
	
	//STICKY MENU...
	$(".dt-sticky-menu").sticky({ topSpacing: 0 });	
	
	//ONE PAGE NAV...
	$('#main-menu').onePageNav({
		currentClass : 'current_page_item',
		filter		 : ':not(.external)',
		scrollSpeed  : 750,
		scrollOffset : 0
	});
	
	$('.main-menu').onePageNav({
		currentClass : 'current_page_item',
		filter		 : ':not(.external)',
		scrollSpeed  : 750,
		scrollOffset : 0
	});
	
	//Mobile Menu
	$("#dt-menu-toggle").click(function( event ){
		event.preventDefault();
		var $menu;
		$menu = $("nav#main-menu").find("ul#menu:first");
		$menu.slideToggle(function(){
			$menu.css('overflow' , 'visible');
			$menu.toggleClass('menu-toggle-open');
		});
	});
	
	$("#dt-menu-toggle").click(function( event ){
		event.preventDefault();
		var $menu;
		$menu = $("nav.main-menu").find("ul#menu:first");
		$menu.slideToggle(function(){
			$menu.css('overflow' , 'visible');
			$menu.toggleClass('menu-toggle-open');
		});
	});
	
	/*To Top*/
  	$().UItoTop({ easingType: 'easeOutQuart' });
	
	//Parallax Sections...
	$('.dt-sc-parallax-section').each(function(){
		$(this).bind('inview', function (event, visible) {
			if(visible === true) {
				$(this).parallax("50%", 0.3, true);
			} else {
				$(this).css('background-position', '');
			}
		});
	});
	
   //Scroll Down...
   
   $('#scrolldown a').click(function(){
		$.scrollTo('#about', 1400, { offset: { top: -73 }});
		return false;
   });
   
	$('.full-height #scrolldown a').click(function(){
		$.scrollTo('#about', 1400, { offset: { top: 0 }});
		return false;
   });
	
	//Twitter Tweets...
	if($('.tweets_container').length > 0) {	
		$(".tweets_container").tweet({
			modpath: 'js/twitter/',
			username: "envato",
			count: 3,
			loading_text: "loading tweets...",
			template: "{text} {time}"
		});
	}

	//Tweets CarouFred...
	if($('.tweets_container').length > 0) {
		$('.tweets_container .tweet_list').carouFredSel({
			auto: true,
			width: 'auto',
			height: 'auto',
			scroll: {
				fx: "cover-fade",
				pauseOnHover: true,
				duration: 500,
			},
			direction: 'up',
			pauseOnHover: 'true',
			items: {
				height: 'auto',
				visible: {
					min: 1,
					max: 1
				}
			}
		});
	}
	
	//PRETTYPHOTO...
	var $pphoto = $('a[data-gal^="prettyPhoto[gallery]"]');
	if($pphoto.length){
		$("a[data-gal^='prettyPhoto[gallery]']").prettyPhoto({
			hook:'data-gal',
			overlay_gallery: false,
			social_tools: false,
			deeplinking: false
		});
	}
	
	$(window).load(function() {
		//Testimonial Carousel
		  if( $('.dt-sc-carousel').length ) {
			  $('.dt-sc-carousel').each(function(){
				  var pagger = $(this).parents(".dt-sc-carousel-wrapper").find("div.carousel-arrows"),
					  next = pagger.find("a.testimonial-next"),
					  prev = pagger.find("a.testimonial-prev") ;
						
				  $(this).carouFredSel({
					  responsive:true,
					  auto:false,
					  width: "100%",
					  height: "auto",
					  pagination: "#pager",
					  scroll:1,
					  items:{ 
						visible: {min: 1,max: 1} 
					  },
					  prev:prev,
					  next:next
				  });
			  });
		 }
		 
		//Testimonial Carousel
		if( $('.dt-sc-testimonial-carousel').length ) {
			  $('.dt-sc-testimonial-carousel').each(function(){
				  var pagger = $(this).parents(".dt-sc-testimonial-carousel-wrapper").find("div.carousel-arrows"),
					  next = pagger.find("a.testimonial-next"),
					  prev = pagger.find("a.testimonial-prev") ;
						
				  $(this).carouFredSel({
					  responsive:true,
					  auto:false,
					  width:'100%',
					  height: 'variable',
					  pagination: "#testimonial-pager",
					  scroll:1,
					  items:{
						visible: {min: 1,max: 1} 
					  },
					  swipe:{
						  onTouch: true,
						  onMouse: true
					  },
					  prev:prev,
					  next:next
				  });
			  });
		}
		
		//Client Carousel
		if( $('.dt-sc-client-carousel').length ) {
			  $('.dt-sc-client-carousel').each(function(){
				  var pagger = $(this).parents(".dt-sc-client-carousel-wrapper").find("div.carousel-arrows"),
					  next = pagger.find("a.testimonial-next"),
					  prev = pagger.find("a.testimonial-prev") ;
						
				  $(this).carouFredSel({
					  responsive:true,
					  auto: true,
					  width:'100%',
					  height: 'variable',
					  scroll:1,
					  items:{ 
						height: 'variable',
						visible: {min: 1,max: 5} 
					  },
					  swipe:{
						  onTouch: true,
						  onMouse: true
					  },
				  });
			  });
		 }
		 	
		//Google Map...
		$('.dt-marker').bind('click', function(e) {
			e.preventDefault();
			// Generate map with timeout		
			setTimeout(function() {
				$("#dt-contact-map").gMap({
					scrollwheel: false,
					markers: [
						{
							latitude: 11.026838304649052,  // http://ctrlq.org/maps/address/
							longitude: 76.99592760740961,
							html: "Iamdesigning",						
						}
					],
					zoom: 16
				});
			}, 400);
	
			if($(".view-map").hasClass('active')){
				$('.view-map').removeClass(' active');
			}else{
				$('.view-map').addClass(' active');
			}
			$('#dt-contact-map, #dt-contact-content').toggle();
		});
	
		 // Tabs Shortcodes
		if($('ul.dt-sc-tabs').length > 0) {
		  $('ul.dt-sc-tabs').tabs('> .dt-sc-tabs-content', {
			  effect: 'fade'
		  });
		}
		
		if($('ul.dt-sc-tabs-frame').length > 0){
		  $('ul.dt-sc-tabs-frame').tabs('> .dt-sc-tabs-frame-content', {
			  effect: 'fade'
		  });
		}
		
		if($('.dt-sc-tabs-vertical-frame').length > 0){
		  
		  $('.dt-sc-tabs-vertical-frame').tabs('> .dt-sc-tabs-vertical-frame-content', {
			  effect: 'fade'
		  });
		  
		  $('.dt-sc-tabs-vertical-frame').each(function(){
			$(this).find("li:first").addClass('first').addClass('current');
			$(this).find("li:last").addClass('last');
		  });
		  
		  $('.dt-sc-tabs-vertical-frame li').click(function(){
			$(this).parent().children().removeClass('current');
			$(this).addClass('current');
		  });
		  
		}/*Tabs Shortcode Ends*/
		
		//ISOTOPE CATEGORY...
		var $container = $('.dt-sc-portfolio-container');
		var $ctr = $('.container').width();
	
		$('.dt-sc-sorting-container a').click(function(){ 
			$('.dt-sc-sorting-container').find('a').removeClass('active-sort');
			$(this).addClass('active-sort');
			
			var selector = $(this).attr('data-filter');
			
			if($ctr < 710)	{
				var opt = {
					filter: selector,
					itemSelector: $('.dt-sc-portfolio-container .dt-sc-portfolio'),
					masonry: {
						columnWidth: 20
					}			
				};
			}
			else {
				var opt = {
					filter: selector,
					layoutMode: 'perfectMasonry',
					perfectMasonry: {
						layout: 'vertical',
						liquid: true
					}
				};
			}
			$container.isotope(opt);
			return false;
		});
		
		if($ctr < 710)	{
			var opt = {
				itemSelector: $('.dt-sc-portfolio-container .dt-sc-portfolio'),
				masonry: {
					columnWidth: 20
				}
			};
		}
		else {
			var opt = {
				layoutMode: 'perfectMasonry',
				perfectMasonry: {
					layout: 'vertical',
					liquid: true
				}
			};
		}	
		$container.isotope(opt);
	});

	//Recent gallery slider...
	if( $(".recent-gallery").find("li").length > 1 ) {
		$(".recent-gallery").bxSlider({ auto: true, useCSS:false, pagerCustom: '#bx-pager', autoHover:true, adaptiveHeight:true });
	}
	 
	//Animate Number...
	$('.dt-sc-num-count').each(function(){
	  $(this).one('inview', function (event, visible) {

		  if(visible === true) {
			  var val = $(this).attr('data-value');
			  $(this).animateNumber({ number: val }, 2000);
		  }
	  });
	});
	
	$("#toggle-panel").click(function(e){
		if($('#toggle i').hasClass('fa-plus')) {
			$('#toggle i').removeClass('fa-plus');
			$('#toggle i').addClass('fa-minus');
		} else {
			$('#toggle i').removeClass('fa-minus');
			$('#toggle i').addClass('fa-plus');
		}
		$("#panel").slideToggle("slow");
		e.preventDefault();
		return false;
	});	
	
	//Accordion & Toggle
	$('.dt-sc-toggle').toggle(function(){ $(this).addClass('active'); },function(){ $(this).removeClass('active'); });
	$('.dt-sc-toggle').click(function(){ $(this).next('.dt-sc-toggle-content').slideToggle(); });
	
	$('.dt-sc-toggle-frame-set').each(function(){
		var $this = $(this),
		    $toggle = $this.find('.dt-sc-toggle-accordion');
			
			$toggle.click(function(){
				if( $(this).next().is(':hidden') ) {
					$this.find('.dt-sc-toggle-accordion').removeClass('active').next().slideUp();
					$(this).toggleClass('active').next().slideDown();
				}
				return false;
			});			
			//Activate First Item always
			$this.find('.dt-sc-toggle-accordion:first').addClass("active");
			$this.find('.dt-sc-toggle-accordion:first').next().slideDown();
  	});//Accordion & Toggle
	
	// ANIMATE CSS + JQUERY INVIEW CONFIGURATION
	(function ($) {
		"use strict";
		$(".animate").each(function () {
			$(this).one('inview', function (event, visible) {
				var $delay = "";
				var $this = $(this),
					$animation = ($this.data("animation") !== undefined) ? $this.data("animation") : "slideUp";
				var $delay = ($this.data("delay") !== undefined) ? $this.data("delay") : 300;
	
				if (visible === true) {
					setTimeout(function () {
						$this.addClass($animation);
					}, $delay);
				} else {
					setTimeout(function () {
						$this.removeClass($animation);
					}, $delay);
				}
			});
		});
	})(jQuery);
	
	//Progress Bars...
	(function($){
		$(".dt-sc-progress").one('inview', function (event, visible) {
			var $this = $(this),
			pvalue = $this.find('.dt-sc-bar').attr('data-value');
			
			if (visible == true) {
				$this.find('.dt-sc-bar').animate({width: pvalue + "%"},600,function(){ $this.find('.dt-sc-bar-text').fadeIn(400); });
			}
		});
	})(jQuery);
	
	//Contact Form
	
	$('form[name="enqform"]').submit(function () {
		
		var This = $(this);
		
		if($(This).valid()) {
			var action = $(This).attr('action');

			var data_value = unescape($(This).serialize());
			$.ajax({
				 type: "POST",
				 url:action,
				 data: data_value,
				 error: function (xhr, status, error) {
					 confirm('The page save failed.');
				   },
				  success: function (response) {
					$('#ajax_contact_msg').html(response);
					$('#ajax_contact_msg').slideDown('slow');
					if (response.match('success') != null) $(This).slideUp('slow');
				 }
			});
		}
		return false;
    });
	$('form[name="enqform"]').validate({
		rules: { 
			txtname: { required: true },
			txtemail: { required: true, email: true },
			txtmessage: { required: true }
		},
		errorPlacement: function(error, element) { }
	});

});