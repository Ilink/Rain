function Logger(){
	this.level = 'info';

}

Logger.prototype.log = function(){
	if(this.level[0].match(/d|w|e/) === null){
		window.console.log();
	} else return false;
}

console.log('a');
var logger = new Logger();
logger.log('a');