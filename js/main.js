var mainModule = (function() {

		var init = function() {
			setUpListeners();
			$('.clickTabs li').addClass('notActiveClick');
			$('.showLi').addClass('notActive');
			$('.showLi:first').addClass('active');
			$('.clickTabs li:first').removeClass('notActiveClick');
			$('.clickTabs li:first').addClass('activeClick');
		};

		var setUpListeners = function() {
			$('.clickTabs li').on('click', addClass);
		};

		var addClass = function() {
			$('.clickTabs li').addClass('notActiveClick');
			$(this).removeClass('notActiveClick');
			$(this).addClass('activeClick');
			var numberOfShowTab = Number($(this).attr('src'));
			$('.showLi').removeClass('active');
			$('.showLi[src='+numberOfShowTab+']').addClass('active')
		};

		return {
			init: init
		};
})();

mainModule.init();