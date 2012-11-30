/*
Allocator
Allocates chunks out of a main pool. Keeps track of which chunks are used.
The getChunk function only returns free chunks. 
To free a chunk, use the ID of the chunk as it was returned to you. I think. Is there a better way of doing that?
*/

function Allocator(pool, chunkSize){
	var self = this;
	var index = [];
	var freeChunks = [];

	function makeIndex(pool){
		for(var i = 0; i < chunkSize; i++){
			index.push(pool.slice(i*chunkSize, i*chunkSize + chunkSize));
		}
	}

	function setupFreeChunks(){
		freeChunks = index;
	}

	function makeChunk(index){
		var chunk = pool.slice(start, end);
		chunk.free = function(){
			self.__free(index);
		};
		return chunk;
	}

	this.getChunk = function(){
		/*
		get first chunk in the free list
		remove chunk from free list
		*/
	}

	this.__free = function(i){
		/*
		add chunk to free list
		*/
		freeChunks.push(index[i]);
	}
}
