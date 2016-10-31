$(document).ready(function() {
 	appSite.init();
});


var appSite = {
	init: function() {
		appSite.sliderBind($(".slider"));
		appSite.hideMenuItemBind();
		appSite.activeMenuItemBind($(".menu"));
		appSite.activeTabItemBind($(".page-content-tabs a"));
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
	},
	activeMenuItemBind: function(mElem) {
		var path = window.location.pathname.slice(1);
		mElem.find("a[href='"+path+"']").addClass('active')
	},
	activeTabItemBind: function(mElem) {
		mElem.click(function(){
			appSite.activeTabItemBindClick($(this), mElem);
			return false;
		});
	},
	activeTabItemBindClick: function(mElem,rlElem) {
		var sUri = mElem.attr('href');

		$.get(sUri,
				function (sResult, sStatus, sHead) {
					appSite.activeTabUpdateHtml(sResult);
					rlElem.removeClass('active');
					mElem.addClass('active');
				}).error(
				function (sStatus) {
					// appSite.errorLoad(sStatus);
				}
			);

	},
	activeTabElem: function() {
		return '.page-content-text';
	},
	activeTabUpdateHtml: function (sResult) {
		var sHtml = $(appSite.activeTabElem(), sResult).html();
		$(appSite.activeTabElem()).html(sHtml);
	},
};
