function $(containerId){
	return document.getElementById(containerId);
}

function $get(containerId,tagName){
	if(typeof containerId == 'string' && $(containerId)){
		return $(containerId).getElementsByTagName(tagName);
	}else if(typeof containerId == 'object'){
		return containerId.getElementsByTagName(tagName);
	}else{
		throw('你写的第一个参数不是有效ID');
	}
}

function $create(tagName,attr){
	var dom = document.createElement(tagName);
	// if(Array.isArray(attr)){
		for(var i in attr){
			dom[i] = attr[i];
		}
	// }
	return dom;
}

// var timer = null;

function Slider(containerId){
	this.$container = $(containerId);
	this.$imgLis = $get($get(this.$container,'ul')[0],'li');
	this.imgLiLen = this.$imgLis.length;
	this.$indexLis = this.createIndexLi();
	this.$leftBtn = $('ltBtn');
	this.$rightBtn = $('rtBtn');
	this.$msg = $('msg');
	this.indexA = 0;
	this.init();
	this.timer;
}

Slider.prototype.createIndexLi = function(){//创建index列表
	var liArr = [];
		$ol = $create('ol');
	for(var i=0; i<this.imgLiLen; i++){
		var $li = $create('li');
		$ol.appendChild($li);
		liArr.push($li);
	}

	var $msg = $create('div',{id: 'msg'}),
		$spanLeft = $create('span',{id: 'ltBtn'}),
		$spanRight = $create('span',{id: 'rtBtn'});
	$msg.innerText = '当前页';
	$spanLeft.innerHTML = '&lt';
	$spanRight.innerHTML = '&gt';
	this.$container.appendChild($msg);
	this.$container.appendChild($ol);
	this.$container.appendChild($spanLeft);
	this.$container.appendChild($spanRight);

	return liArr;
}

Slider.prototype.init = function(){
	this.mouseEnter();
	this.moveTo(this.indexA);
	this.autoPlay();
}

Slider.prototype.moveTo = function(index){
	for(var i=0; i<this.$imgLis.length; i++){
		this.$imgLis[i].style.display = 'none';
		this.$indexLis[i].style.backgroundColor = 'red';
	}
	this.$imgLis[index].style.display = 'block';
	this.$indexLis[index].style.backgroundColor = 'blue';
	this.$msg.innerText = '当前页'+ (index+1);

	this.indexA = index;
}

Slider.prototype.toPrev = function(){
	if(this.indexA > 0){
		this.indexA--;
	}else{
		this.indexA = (this.imgLiLen-1);
	}
	this.moveTo(this.indexA);
}

Slider.prototype.toNext = function(){
	if(this.indexA < (this.imgLiLen - 1)){
		this.indexA++;
	}else{
		this.indexA = 0;	
	}
	this.moveTo(this.indexA);
}

Slider.prototype.mouseEnter = function(){
	var that = this;
	for(var i=0; i<this.$indexLis.length; i++){
		this.$indexLis[i].index = i;
		this.$indexLis[i].onmouseenter = function(e){
			that.moveTo(this.index);
		}
		// (function(num){
		// 	that.$indexLis[num].onmouseenter = function(){
		// 		that.moveTo(num);
		// 	}
		// })(i);
	}

	this.$leftBtn.onclick = function(){
		that.toPrev();
	}

	this.$rightBtn.onclick = function(){
		that.toNext();
	}

	this.$container.onmouseenter = function(){
		clearInterval(that.timer);
		console.log(that.timer);
	}

	this.$container.onmouseleave = function(){
		that.autoPlay();
	}
}

Slider.prototype.autoPlay = function(){
	var that = this;
	that.timer = setInterval(function(){
		that.toNext();
	},2000);
}