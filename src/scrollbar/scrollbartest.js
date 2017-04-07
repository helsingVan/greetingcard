
function scrollBar(option) {
	this.options = {
		scrollDir: 'y',
		contSelector: '',
		scrollSelector: '',
		barSelector: '',
		wheelStep: 30
	}
	this._init(option);
};

scrollBar.prototype = {
	constructor: scrollBar,
	_init: function(option) {
		var self = this;
		$.extend(true,self.options,option || {});
		console.log(self.options);
		this._initDomEvent();
	},
	_initDomEvent: function() {
		var opt = this.options;
		this.doc = $(document);
		this.cont = $(opt.contSelector);
		this.scroll = $(opt.scrollSelector);
		this.bar = $(opt.barSelector);
		this._initBarEvent();
	},
	_initBarEvent: function() {
		var self = this;
		var bar = this.bar;
		var doc = this.doc;
		var barEl = bar[0];
		var dragStartPagePosition,
			dragStartScrollPosition,
			dragContBarRate;
		if(barEl) {
			bar.on('mousedown',function(e) {
				dragStartPagePosition = e.pageY;
				dragStartScrollPosition = self.cont.scrollTop();
				dragContBarRate = self.getMaxScrollPosition()/self.getMaxBarPosition();
				doc.on('mousemove.scroll',function(e) {
					mousemoveHandle(e);
				}).on('mouseup.scroll',function() {
					doc.off('.scroll')
				})
			})
		}

		function mousemoveHandle(e) {
			if(!dragStartPagePosition) {
				return null;
			}
			var position = dragStartScrollPosition + (e.pageY - dragStartPagePosition)*dragContBarRate;
			self.scrollTo(position);
		}
	},
	getMaxScrollPosition: function() {
		var self = this;
		var maxScrollHeight = Math.max(self.cont.height(),
			self.cont[0].scrollHeight) - self.cont.height();
		return maxScrollHeight;
	},
	getMaxBarPosition: function() {
		return this.scroll.height() - this.bar.height();
	},
	scrollTo: function(position) {
		this.cont.scrollTop(position);
	}
}








var option = {
	contSelector: '.scroll-content',
	scrollSelector: '.scroll-bar',
	barSelector: '.bar'
}
var scroll = new scrollBar(option);

console.log(scroll);

// console.log($('.scroll-wrap')[0].scrollHeight);