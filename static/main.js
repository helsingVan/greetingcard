$(document).ready(function(){
	location.hash = '';
	$('#fullPage').fullpage({
		verticalCentered: false,
		// navigation: true,
		anchors: ['home','about','blog','concat'],
		// 循环滚动
		// continuousVertical: true,
		menu: '#menu',
		afterLoad: fullpage.afterLoad,
		onLeave: fullpage.onLeave,
		afterRender: fullpage.afterRender
	});
	// console.log(fullpage);
	main.init();
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
fullpage.afterRender = function() {
	$.fn.fullpage.setAllowScrolling(false,'down');
}

var main = {
	echartEl: 'echart',
	startEl: '#starting',
	init: function() {
		this.bannerLoop();
		this.initEchart();
		$(this.startEl).on('click',this._handelStart);
	},
	bannerLoop: function() {
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
	},
	initEchart: function() {
		var myChart = echarts.init(document.getElementById(this.echartEl));
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
	},
	_handelStart: function() {
		$.fn.fullpage.setAllowScrolling(true,'down');
		var menu = document.getElementById('menu');
		var startBegin = document.getElementById('startBegin');
		var main = document.getElementById('page_1_main');
		startBegin.classList.add('bounceOut');
		menu.classList.add('bounceInRight');
		menu.classList.remove('none');
		main.classList.add('flipInX');
		main.classList.remove('none');
	}
};
