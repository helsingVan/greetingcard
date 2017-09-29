/*
 *@Class loading 
 *@by fanguang 2017-09-29
 *@param imgUrl  图片地址
 *@return null
 */

 function Loading(imgUrl) {
 	this.imgUrl = imgUrl;
 	this.init();
 }
 Loading.prototype.init = function() {
 	var htmlTpl = document.createElement('div');
 	htmlTpl.className = 'loading';
 	htmlTpl.id = 'loadingEl'
 	document.onreadystatechange = function() {
 		console.log(document.readyState);
 		if(document.readyState === 'interactive') {
 			document.body.appendChild(htmlTpl);
 		}else if(document.readyState === 'complete') {
 			document.body.removeChild(document.getElementById('loadingEl'))
 		}
 	}
 }

 var loading = new Loading('');
 