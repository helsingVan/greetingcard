class Timer {
	countDown(end,update,handle) {
		const now = new Date().getTime();
		const self = this;
		if(now > end) {
			handle.call(self);
		}else {
			let lastTime = end - now;
			const px_d = 24*60*60*1000;
			const px_h = 60*60*1000;
			const px_m = 60*1000;
			const px_s = 1000;
			let day = Math.floor(lastTime/px_d);
			let hour = Math.floor((lastTime - day*px_d)/px_h);
			let miunte = Math.floor((lastTime - day*px_d - hour*px_h)/px_m);
			let second = Math.floor((lastTime - day*px_d - hour*px_h - miunte*px_m)/px_s);
			let content = [];
			if(day > 0) {
				content.push(`<span>${day}</span>天`);
			}
			if(content.length || hour > 0) {
				content.push(`<span>${hour}</span>时`);
			}
			if(content.length || miunte > 0) {
				content.push(`<span>${miunte}</span>分`);
			}
			if(content.length || second > 0) {
				content.push(`<span>${second}</span>秒`);
			}
			self.lastTime = content.join('');
			update.call(self,content.join(''));
			setTimeout(function() {
				self.countDown(end,update,handle);
			},1000);
		}
	}
}

export default Timer;
