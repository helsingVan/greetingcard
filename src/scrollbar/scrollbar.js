
function ScrollBar(options) {
	this._init(options);
}

$.extend(ScrollBar.prototype,{
	_init: function(options) {
		var self = this;
		self.options = {
			scrollDir: 'y',
			contSelector: '',
			scrollSelector: '',
			barSelector: '',
			wheelStep: 30,
			tabItemSelector: '',
			tabActiveClass: ''
		};
		$.extend(true,self.options,options||{}); 
		this._initDomEvent();
	},
	_initDomEvent: function() {
		var opt = this.options;
		this.cont = $(opt.contSelector);
		this.scroll = $(opt.scrollSelector);
		this.bar = $(opt.barSelector);
		this.doc = $(document);
		this._initBarEvent()._bindContScroll()._bindMouseWheel();
	},
	_initBarEvent: function() {
		var self = this;
		var bar = this.bar;
		var barEl = bar[0];
		var doc = this.doc;
		var dragStartPagePosition,
			dragStartScrollPosition,
			dragContBarRate;
		if(barEl) {
			bar.on('mousedown',function(e) {
				
				dragStartPagePosition = e.pageY;
				dragStartScrollPosition	= self.cont[0].scrollTop;
				dragContBarRate	 = self.getMaxScrollPosition()/
								self.getMaxBarPosition();		


				doc.on('mousemove.scroll',function(e) {
					mouseMoveHandler(e);
				}).on('mouseup.scroll',function(e) {
					console.log('mouseup');
					doc.off('.scroll');
				})
			})
		}


		function mouseMoveHandler(e) {
			if(!dragStartPagePosition) {
				return null;
			}
			var position = dragStartScrollPosition + (e.pageY - dragStartPagePosition)
							*dragContBarRate;
			self.scrollTo(position);
		}

		return self;
	},
	// 内容可滚动高度
	getMaxScrollPosition: function() {
		var self = this;
		var scrollHeight = Math.max(self.cont.height(),
			self.cont[0].scrollHeight) - self.cont.height();
		return scrollHeight;
	},
	// 滑块可移动距离
	getMaxBarPosition: function() {
		var self = this;
		return self.scroll.height() - self.bar.height();
	},
	scrollTo: function(position) {
		var self = this;
		self.cont.scrollTop(position);
	},
	// 滑块当前位置
	getBarPosition: function() {
		var self = this;
		var maxBarPosition = self.getMaxBarPosition();
		return Math.min(maxBarPosition,maxBarPosition*self.cont[0].scrollTop
			/self.getMaxScrollPosition());
	},
	// 监听内容滚动，同步滑块位置
	_bindContScroll: function() {
		var self = this;
		self.cont.on('scroll',function() {
			var barEl = self.bar && self.bar[0];
			if(barEl) {
				barEl.style.top = self.getBarPosition() +'px';
			}
		});
		return self;
	},
	// 鼠标滚轮事件
	_bindMouseWheel: function() {
		var self = this;
		self.cont.on('mousewheel DOMMouseScroll',function(e) {
			var oEv = e.originalEvent;
			var wheelRange = oEv.wheelDelta? - oEv.wheelDelta/120:(oEv.detail||0)/3;
			self.scrollTo(self.cont[0].scrollTop+wheelRange*self.options.wheelStep);
		});
		return self;
	},
	// 点击导航滚动到指定位置
	_initArticleHeight: function() {
		var self = this;
		var lastArticle = self.article.last();
		var lastArticleHeight = lastArticle.height();
		var contHeight = self.cont.height();
		if(lastArticleHeight < contHeight) {
			self.correct[0].style.height = contHeight - lastArticleHeight
									-self.anchor.outerHeight() + 'px';
		}
	}
}); 


var scroll = new ScrollBar({
	contSelector: '.scroll-content',
	scrollSelector: '.scroll-bar',
	barSelector: '.bar',
	tabItemSelector: '.tab-item',
	tabActiveClass: '.active'
});