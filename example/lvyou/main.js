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

var fullpage = {

};
fullpage.afterRender = function(anchorLink,index) {
	$('#pageOne').find('.animate_l').addClass('bounceInLeft');
	$('#pageOne').find('.animate_r').addClass('bounceInRight');
};
fullpage.onLeave = function(index,nextIndex,direction) {
	switch(nextIndex) {
		case 2:
			$('#pageTwo > header,#pageTwoSlide_1').find('.animate_l').addClass('bounceInLeft');
			$('#pageTwo > header,#pageTwoSlide_1').find('.animate_r').addClass('bounceInRight');
			$('#pageTwoSlide_1').find('.animate_top').addClass('bounceInDown');
			break;
		case 3:
			$('#pageThree').find('.animate_l').addClass('bounceInLeft');
			$('#pageThree').find('.animate_r').addClass('bounceInRight');
			$('#pageThree').find('.animate_bottom').addClass('fadeInUpBig');
			break;
		case 4:
			$('#pageFour').find('.animate_l').addClass('bounceInLeft');
			$('#pageFour').find('.animate_r').addClass('bounceInRight');
			break;
		case 5:
			$('#pageFive').find('.animate_l').addClass('bounceInLeft');
			$('#pageFive').find('.animate_r').addClass('bounceInRight');
			break;
	}
};
fullpage.onSlideLeave = function(anchorLink,index,slideIndex) {
	console.log(slideIndex);
	switch (slideIndex) {
		case 0:
			$('#pageTwoSlide_2').find('.animate_top').addClass('bounceInDown');
			$('#pageTwoSlide_2').find('.animate_l').addClass('bounceInLeft');
			$('#pageTwoSlide_2').find('.animate_r').addClass('bounceInRight');
			break;
		case 1:
			$('#pageTwoSlide_3').find('.animate_top').addClass('bounceInDown');
			$('#pageTwoSlide_3').find('.animate_l').addClass('bounceInLeft');
			$('#pageTwoSlide_3').find('.animate_r').addClass('bounceInRight');
			break;
	}
}