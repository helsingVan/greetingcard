import 'babel-polyfill';
import Base from './lottery/base.js';
import Timer from './lottery/timer.js';
import Calculate from'./lottery/calculate.js';
import Interface from './lottery/interface.js';
import $ from 'jquery';

const copyProperties = function(target,source) {
	for(let key of Reflect.ownKeys(source)) {
		if(key!=='contructor' && key!=='prototype' && key!=='name') {
			let desc = Object.getOwnPropertyDescriptor(source,key);
			Object.defineProperty(target,key,desc);
		}
	}
};

const mix = function(...mixins) {
	class Mix {}
	for(let mixin of mixins) {
		copyProperties(Mix,mixin);
		copyProperties(Mix.prototype,mixin.prototype);
	}
	return Mix;
};

class Lottery extends mix(Base,Calculate,Interface,Timer) {
	constructor(name='syy',cname='11选5',issue='**',state='*') {
		super();
		this.name = name;
		this.cname = name;
		this.issue = issue;
		this.state = state;
		this.el = '';
		this.omit = new Map();
		this.openCode = new Set();
		this.openCodeList = new Set();
		this.playList = new Map();
		this.number = new Set();
		this.issueEl = '#curr_issue';
		this.countdownEl = '#countdown';
		this.stateEl = '.state_el';
		this.cartEl = '.codeList';
		this.omitEl = '';
		this.curPlay = 'r5';
		this.initPlayList();
		this.initNumber();
		this.updateState();
		this.initEvent();
	}

	updateState() {
		let self = this;
		this.getState().then(function(res) {
			console.log(res);
			self.issue = res.issue;
			self.endTime = res.end_time;
			self.state = res.state;
			$(self.issueEl).text(res.issue);
			self.countDown(res.end_time,function(time) {
				$(self.countdownEl).html(time);
			},function() {
				setTimeout(function() {
					self.updateState();
					self.getOmit(self.issue).then(function(res) {

					});
					self.getOpenCode(self.issue).then(function(res) {

					})
				},500)
			})
		})
	}

	/*
		初始化事件
	*/
	initEvent() {
		let self = this;
		$('#plays').on('click','li',self.changePlayNav.bind(self));
		$('.boll-list').on('click','.btn-boll',self.toggleCodeActive.bind(self));
		$('#confirm_sel_code').on('click',self.addCode.bind(self));
		$('.dxjo').on('click','li',self.assistHandle.bind(self));
		$('qkmethod').on('click','.btn-middle',self.getRandomCode.bind(self));
	}
}

export default Lottery;