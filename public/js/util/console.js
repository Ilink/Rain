function Logger(){
	this.level = 'info';

}

Logger.prototype.evalIsEvil = function(){

}

Logger.prototype.log = function(){
	if(this.level[0].match(/d|w|e/) === null){
		var evalStr = 'console.log(';
		var args = Array.prototype.slice.call(arguments);
		for(var i = 0; i < args.length; i++){
			var str = arguments[i];
			if(typeof str === 'string') str = "'"+str+"'";
			evalStr += str+',';
		}
		evalStr = evalStr.slice(0, evalStr.length-1) + ');';
		console.log(evalStr);
		eval(evalStr);

	} else return false;
}

console.log('a');
var logger = new Logger();
logger.log('a', {a:1},2,3);