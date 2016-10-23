$(document).ready(function() {
 		$(".mainslider").owlCarousel({
			navigation : true, // Show next and prev buttons
			slideSpeed : 400,
			paginationSpeed : 400,
			singleItem:true,
			navigationText:["",""],
			autoHeight : true,
				  // "singleItem:true" is a shortcut for:
				  // items : 1,
				  // itemsDesktop : false,
				  // itemsDesktopSmall : false,
				  // itemsTablet: false,
				  // itemsMobile : false
		});

});
