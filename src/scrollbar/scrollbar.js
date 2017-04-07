
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
			tabActiveClass: '',
			anchor: '',
			correctSelector: '.correct-bot',
			articleSelector: '.content'
		};
		$.extend(true,self.options,options||{}); 
		this._initDomEvent();
	},
	_initDomEvent: function() {
		var opt = this.options;
		this.cont = $(opt.contSelector);
		this.scroll = $(opt.scrollSelector);
		this.bar = $(opt.barSelector);
		this.tabItem = $(opt.tabItemSelector);
		this.tabActive = $(opt.tabActiveClass);
		this.anchor = $(opt.anchor);
		this.article = $(opt.articleSelector);
		this.correct = $(opt.correctSelector);
		this.doc = $(document);
		this._initBarEvent()._bindContScroll()._bindMouseWheel()._initTabEvent()
			._initArticleHeight();
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
		var posArr = self.getAllAnchorPosition();
		if(posArr.length === self.tabItem.length) {
			self.changeTabSelect(getIndex(position));
		}


		self.cont.scrollTop(position);

		function getIndex(position) {
			for(var i=posArr.length-1; i>=0 ;i--) {
				if(position >= posArr[i]) {
					return i;
				}else {
					continue;
				}
			}
		}
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
		return self;
	},
	// 点击标签
	_initTabEvent: function() {
		var self = this;
		self.tabItem.on('click',function() {
			var index = $(this).index();
			self.changeTabSelect(index);

			self.scrollTo(self.cont[0].scrollTop + self.getAnchorPosition(index));
		});
		return self;
	},
	// 切换标签的选中
	changeTabSelect: function(index) {
		var self = this;
		var active = self.options.tabActiveClass;
		return self.tabItem.eq(index).addClass(active)
			.siblings().removeClass(active);
	},
	// 获取指定锚点到上边界的像素
	getAnchorPosition: function(index) {
		return this.anchor.eq(index).position().top;
	},
	// 获取每个锚点位置信息的数组
	getAllAnchorPosition: function() {
		var self = this;
		var allPositionArr = [];
		for(var i=0;i < self.anchor.length; i++) {
			allPositionArr.push(self.cont[0].scorllTop + self.getAnchorPosition(i));
		}
		return allPositionArr;
	}
}); 


var scroll = new ScrollBar({
	contSelector: '.scroll-content',
	scrollSelector: '.scroll-bar',
	barSelector: '.bar',
	tabItemSelector: '.tab-item',
	tabActiveClass: 'active',
	anchor: '.anchor'
});