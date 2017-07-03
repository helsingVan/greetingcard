import $ from 'jquery';

class InterFace {
	/*
		获取当前期号

	*/
	getOmit(issue) {
		let self = this;
		return new Promise((resolve,reject)=> {
			$.ajax({
				type: 'get',
				url: '/get/omit',
				data: {
					issue:issue
				},
				success: function(data) {
					self.setOmit(data.data);
					resolve.call(self,data);
				},
				error: function(err) {
					reject.call(self,err);
				}
			});
		});
	}

	/*
		获取开奖号码
	*/
	getOpenCode(issue) {
		let self = this;
		return new Promise((resolve,reject)=> {
			$.ajax({
				type: 'get',
				url: '/get/opencode',
				data: {issue:issue},
				success: function(data) {
					self.setOpenCode(data.data);
					resolve.call(self,data);
				},
				error: function(err) {
					reject.call(self,err);
				}
			});
		});
	}

	/*
		获取当前状态
	*/
	getState(issue) {
		let self = this;
		return new Promise((resolve,reject)=> {
			$.ajax({
				type: 'get',
				url: '/get/state',
				data: {issue:issue},
				success: function(data) {
					resolve.call(self,data);
				},
				error: function(err) {
					reject.call(self,err);
				}
			});
		});
	}
}

export default InterFace;