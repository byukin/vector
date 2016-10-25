$(document).ready(function() {
 	$(".slider").owlCarousel({
		navigation : true, // Show next and prev buttons
		slideSpeed : 400,
		paginationSpeed : 400,
		singleItem:true,
		navigationText:["",""],
		autoHeight : true,
	});

	function hidemenuitem() {
		var w = $( window ).width();
			if (w < 1150) {
				$('.link_hide').html('Печати');
			} else {
				$('.link_hide').html('Печати и штампы');
			}
	}

	hidemenuitem();

	$(window).resize(function(){
		hidemenuitem();
	});


});
