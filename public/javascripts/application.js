$(document).ready(function() {

	var pageWidth = $('.footer').width();
	var fw = 230;
	var m = (pageWidth-3*fw)/2;
	$('.footer .widget_holder').each(function(i, el) {
		if(i%3 == 0 || (i+1)%3 == 0)
		{
			$(el).css('margin-left', 0).css('margin-right', 0);
			if(i%3 == 0)
			{
				$(el).css('clear', 'left');
			}
		}
		else
		{
			$(el).css('margin-left', m).css('margin-right', m);
		}
	});
});