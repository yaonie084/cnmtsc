jQuery(document).ready(function(){
	
	jQuery(".tab:not(:first)").hide();
	jQuery(".tabsec:not(:first)").hide();

	//to fix u know who
	jQuery(".tab:first").show();
	jQuery(".tabsec:first").show();
	
	
	jQuery(".htabs a").click(function(){
		stringref = jQuery(this).attr("href").split('#')[1];

                jQuery('.htabs li a').removeClass('selected');
                jQuery(this).addClass('selected');

		jQuery('.tab:not(#'+stringref+')').hide()

		if (jQuery.browser.msie && jQuery.browser.version.substr(0,3) == "6.0") {
			jQuery('.tab#' + stringref).show();
		}
		else 
			jQuery('.tab#' + stringref).fadeIn();
		
		return false;
	});
	
	jQuery(".htabssec a").click(function(){
		stringref = jQuery(this).attr("href").split('#')[1];
		
				jQuery('.htabssec li a').removeClass('selected');
                jQuery(this).addClass('selected');

		jQuery('.tabsec:not(#'+stringref+')').hide();

		if (jQuery.browser.msie && jQuery.browser.version.substr(0,3) == "6.0") {
			jQuery('.tabsec#' + stringref).show();
		}
		else 
			jQuery('.tabsec#' + stringref).fadeIn();
		
		return false;
	});
	
});