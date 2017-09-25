$(document).ready(function(){
	$('#fullPage').fullpage({
		verticalCentered: false,
		navigation: true
	});
	bannerLoop();

});


function bannerLoop() {
		var loopNum = 0;
		var loopTime = 6000;
		var imgNum = 21;
		var imgHtml = '';
		var imgUrl = '';
		var imgIndex = 1;
		for(var i=1;i<imgNum;i++) {
			if(i < 10) {
				imgIndex = '0'+ i;
			}else {
				imgIndex = i;
			}
			imgUrl = '/static/image/bg_' + imgIndex + '.jpg';
			imgHtml += '<img data-url="' + imgUrl + '"'
						+ ' class="main-bg">';
		}
		$('.banner').html(imgHtml);
		var imgs = $('.main-bg');
		var imgsLength = imgs.length;
		(function loop() {
			if(loopNum >= imgsLength) {
				loopNum = 0;
			}
			var currentImg = imgs[loopNum];
			var nextImg = null;
			$(currentImg).addClass('active').siblings().removeClass('active');
			if($(currentImg).hasClass('active')) {
				currentImg.src = currentImg.dataset.url;
				if(loopNum !== imgsLength-1) {
					nextImg = imgs[loopNum + 1];
					nextImg.src = nextImg.dataset.url;
				}
			}
			loopNum++;
			setTimeout(arguments.callee,loopTime);
		})();	
}