$(document).ready(function() {

  $('#fullpage').fullpage({
  	navigation: true,
  	verticalCentered: false,
  	loopHorizontal: false,
  	afterRender: fullpage.afterRender,
  	onLeave: fullpage.onLeave,
  	onSlideLeave: fullpage.onSlideLeave
  });
});

/*
 *	@method fullpage回调函数
 *	@afterRender 初始化后
 *  @onLeave 离开page
 *  @onslideleave 离开slide
 *
 */
var fullpage = {
};
fullpage.afterRender = function(anchorLink,index) {
	var pageOne = $('#pageOne');
	pageOne.find('.animate_l').addClass('bounceInLeft');
	pageOne.find('.animate_r').addClass('bounceInRight');
};
fullpage.onLeave = function(index,nextIndex,direction) {
	var pageTwos = $('#pageTwo > header,#pageTwoSlide_1');
	var pageTwoSlide_1 = $('#pageTwoSlide_1');
	var pgaeThree = $('#pageThree');
	var pageFour = $('#pageFour');
	var pageFive = $('#pageFive');
	switch(nextIndex) {
		case 2:
			pageTwos.find('.animate_l').addClass('bounceInLeft');
			pageTwos.find('.animate_r').addClass('bounceInRight');
			pageTwoSlide_1.find('.animate_top').addClass('bounceInDown');
			break;
		case 3:
			pgaeThree.find('.animate_l').addClass('bounceInLeft');
			pgaeThree.find('.animate_r').addClass('bounceInRight');
			pgaeThree.find('.animate_bottom').addClass('fadeInUpBig');
			accordion.init('#accordion');
			break;
		case 4:
			pageFour.find('.animate_l').addClass('bounceInLeft');
			pageFour.find('.animate_r').addClass('bounceInRight');
			break;
		case 5:
			pageFive.find('.animate_l').addClass('bounceInLeft');
			pageFive.find('.animate_r').addClass('bounceInRight');
			break;
	}
};
fullpage.onSlideLeave = function(anchorLink,index,slideIndex) {
	var pageTwoSlide_2 = $('#pageTwoSlide_2');
	var pageTwoSlide_3 = $('#pageTwoSlide_3');
	switch (slideIndex) {
		case 0:
			pageTwoSlide_2.find('.animate_top').addClass('bounceInDown');
			pageTwoSlide_2.find('.animate_l').addClass('bounceInLeft');
			pageTwoSlide_2.find('.animate_r').addClass('bounceInRight');
			break;
		case 1:
			pageTwoSlide_3.find('.animate_top').addClass('bounceInDown');
			pageTwoSlide_3.find('.animate_l').addClass('bounceInLeft');
			pageTwoSlide_3.find('.animate_r').addClass('bounceInRight');
			break;
	}
}
fullpage.handleAccordion = function() {
	$(this).addClass('active').siblings().removeClass('active');
}
// 手风琴
var accordion = function() {
	var defaultOpt = {
		autoPlay: true
	};
	var init = function(el,opt) {
		opt = $.extend({},defaultOpt,opt);
		new Accordion(el,opt);
	}

	function Accordion(el,opt) {
		this.el = el;
		this.opt = opt;
		this.autoPlayIndex = 0;
		this.init();
	}
	Accordion.prototype.init = function() {
		this.bindEvent();
		this.autoPlay();
	};
	Accordion.prototype.bindEvent = function() {
		var self = this;
		$(this.el).on('click','figure',function() {
			var index = $(this).index();
			self.autoPlayIndex = index;
			$(this).addClass('active').siblings().removeClass('active');
		});
	}
	Accordion.prototype.autoPlay = function() {
		var self = this;
		var figures = $(this.el).children('figure');
		function loop() {
			if(self.autoPlayIndex >= figures.length) {
				self.autoPlayIndex = 0;
			}
			$(figures[self.autoPlayIndex]).addClass('active').siblings().removeClass('active');
			self.autoPlayIndex++;
			setTimeout(loop,3000);
		}
		loop();
	}

	return {init: init}
}();