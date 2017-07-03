class Calculate {
	/*
		计算注数  active:当前选中的号码   playName当前的玩法标识
	*/
	computeCount(active,playName) {
		let count = 0;
		const exsit = this.playList.has(playName);
		const arr = new Array(active).fill('0');
		if(exsit && playName.at(0) === 'r') {
			count = Calculate.combine(arr,playName.split('')[1]);
		}
		return count;
	}

	/*
		奖金范围预测  active playName return arr 奖金范围
	*/
	computeBonus(active,playName) {
		const play = playName.split('');
		const self = this;
		let arr = new Array(play[1]*1).fill(0);
		let min,max;
		if(play[0] === 'r') {
			let minActive = 5-(11-active);

			if(minActive > 0) {

				if(minActive - play[1] >= 0) {
					arr = new Array(minActive).fill(0);
					min = Calculate.combine(arr,play[1]).length;
				}else {
					if(play[1] - 5>0 && active-play[1] >=0) {
						arr = new Array(active-5).fill(0);
						min = Calculate.combine(arr,play[1]-5).length;
					}else {
						min = active-play[1]>-1?1:0;
					}
				}
			}else {
				min = active-play[1]>-1?1:0;
			}

			let maxActive = Math.min(active,5);
			if(play[1]-5) {
				if(active-play[1]>=0) {
					arr = new Array(active-5).fill(0);
					max = Calculate.combine(arr,play[1]-5).length;
				}else {
					max = 0;
				}
			}else if(play[1]-5<0) {
				arr = new Array(Math.min(active,5)).fill(0);
				max = Calculate.combine(arr,play[1]).length;
			}else {
				max = 1;
			}
		}
		return [min,max].map(item=>item*self.playList.get(playName).bonus);
	}

	/*
		组合运算   arr参与运算的数组  size组合运算的基数 return 计算注数
	*/
	static combine(arr,size) {
		let allResult = [];
		(function f(arr,size,result){
			let arrLen = arr.length;
			if(size > arrLen) {
				return null;
			}
			if(size === arrLen) {
				allResult.push([].concat(result,arr));
			}else {
				for(let i=0;i<arrLen;i++) {
					let newResult = [].concat(result);
					newResult.push(arr[i]);
					if(size === 1) {
						allResult.push(newResult);
					}else {
						let newArr = [].concat(arr);
						newArr.splice(0,i+1);
						f(newArr,size-1,newResult);
					}
				}
			}
		})(arr,size,[]);
		return allResult;
	}

}

export default Calculate;