$(document).ready(function(){
	$('#fullPage').fullpage({
		verticalCentered: false,
		// navigation: true,
		anchors: ['home','about','blog','concat'],
		// 循环滚动
		// continuousVertical: true,
		menu: '#menu',
		afterLoad: fullpage.afterLoad,
		onLeave: fullpage.onLeave
	});
	bannerLoop();
	initEchart();
});

var fullpage = {};
fullpage.afterLoad = function(anchorLink,index) {
	// console.log(index);
};
fullpage.onLeave = function(index,nextIndex,direction) {
	console.log(nextIndex);
};
fullpage.afterRender = function () {

};
fullpage.afterResize = function() {

};
fullpage.afterSlideLoad = function(anchorLink,index,slideAnchor,slideIndex) {

};
fullpage.onSlideLeave = function(anchorLink,index,slideIndex,direction,nextSlideIndex) {

}
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
function initEchart() {
	var myChart = echarts.init(document.getElementById('echart'));
	var option = {
		tooltip: { trigger: 'item'},
		radar: {
			name: {
				textStyle: {
					color: '#ffca28',
					fontSize: 14
				}
			},
			shape: 'circle',
			indicator: [
				{name: 'HTML,CSS',max:100},
				{name: 'Javascript',max:100},
				{name: 'Vue',max:100},
				{name: 'React',max:100},
				{name: 'Node',max:100},
				{name: 'PHP',max:100},
			]
		},
		series: [
			{
				name: '技能概览',
				type: 'radar',
				lineStyle: {
					normal: {color: '#ffca28'}
				},
				areaStyle: {
					normal: {color: '#ffca28',opacity: 0.5}
				},
				data: [{value: [90,80,80,80,70,60]}]
			}
		]
	}
	myChart.setOption(option);
}