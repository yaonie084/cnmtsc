$(document).ready(function() {
	
	// Scroll bar width is preserved so that elements don't shift over when they overfill the height of the page
	$('body').css({ "overflow-y" : "scroll" });
	
	$(".open_album").hover(function() {
		parent_element = $(this).parent().parent();
		
		$(".album_section").not(parent_element).animate({ // All album_sections except current one lower opacity
			"opacity" : ".5"
		}, { queue:false, duration: 300 });
		
	}, function() {
		
		$(".album_section").not(parent_element).animate({
			"opacity" : "1"
		}, { queue:false, duration:300 });
		
		return false;
	});
	
	// H3 closes current section, so hovering over it changes the cursor to a pointer
	$(".album_section h3").hover(function() {
		
		$(this).css({
			"cursor" : "pointer"
		});
		
	}, function() {
		
		$(this).css({
			"cursor" : "auto"
		});
	});
	
	$(".open_album").click(function() {
		
		// Get height of album_info to know what height to animate album_section to
		element_height = $(this).parent().parent().children(".album_info").height();
		
		$(this).hide();
		
		// currently_viewing class is added to open elements to close them when another album is opened
		$(".currently_viewing").animate({
			"height" : "100px"
		}, { queue:false, duration: 300});
		
		$(".currently_viewing").children("li").children(".open_album").show();
		
		$(".currently_viewing").removeClass("currently_viewing");
		
		$(this).parent().parent().animate({
			"height" : element_height + 120 + "px"
		}, { queue:false, duration: 300 });
		
		$(this).parent().parent().addClass("currently_viewing");
		
		return false;
	});
	
	$(".album_section h3").click(function() {
		
		$(this).parent().parent().animate({
				"height" : "100px"
			}, { queue:false, duration: 300 });
			
		// Once the album is closed, the open_album element is reapplied
		$(this).parent().parent().children("li").children(".open_album").show();
	});
});