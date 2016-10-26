$(document).ready(function() {
 	appSite.init();
});


var appSite = {
	init: function() {
		appSite.sliderBind($(".slider"));
		appSite.hideMenuItemBind();
	},
	hideMenuItem: function () {
		var w = $( window ).width();
			if (w < 1150) {
				$('.link_hide').html('Печати');
			} else {
				$('.link_hide').html('Печати и штампы');
			}
	},
	hideMenuItemBind: function() {
		appSite.hideMenuItem();

		$(window).resize(function(){
			appSite.hideMenuItem();
		});
	},
	sliderBind: function(rElem) {
		rElem.owlCarousel({
			navigation : true, // Show next and prev buttons
			slideSpeed : 400,
			paginationSpeed : 400,
			singleItem:true,
			navigationText:["",""],
			autoHeight : true,
		});
		rElem.css('opacity','1');
	}
};
