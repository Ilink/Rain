/*
Allocator
Allocates chunks out of a main pool. Keeps track of which chunks are used.

The pool is divided up into equal chunks of a given size.
As chunks are allocated, they are removed from the free list.

Chunks are indexed and referenced by integers.

	[****][****][****]
   	   1     2     3

So we have another array that stores the indexes of free chunks.
Returns indexes that mark the start and end of each chunk. 

The pool size should never increase. At least, this doesn't account for that behavior.


Todo:
Revamp this to use a hash instead?
Keep track of both allocated and unallocated values
*/

function Allocator(pool, chunkSize){
	var self = this;
	var freeChunks = [];

	// var chunks = {
	// 	1: {"free": true}
	// }

	/*
	Overkill?
	i suppose i would profile at some point
	*/
	var freeIndex = {
		1: true
	};
	var allocatedIndex = {

	};

	function setupFreeChunks(){
		// i will just assume for now that there is no remainder here
		var numChunks = pool.length / chunkSize;

		for(var i = 0; i < numChunks; i++){
			freeChunks.push(i);
		}
	}

	function makeChunk(i){
		var chunk = {};
		chunk.start = i * chunkSize;
		chunk.end = chunk.start + chunkSize;
		chunk.free = function(){
			free(i);
		};
		chunk.data = pool;
		return chunk;
	}

	function free(i){
		freeChunks.push(i);
	}

	function getChunk(i){
		var start = i * chunkSize;
		var end = start + chunkSize;
		return {
			start: start,
			end: end
		};
	}

	setupFreeChunks();

	/*
	Return a chunk and remove it from the free list
	*/
	this.get = function(){
		if(freeChunks.length > 0){
			var i = _.last(freeChunks);
			// var i = freeChunks[0];
			freeChunks = freeChunks.slice(1);
			return makeChunk(i);
		} else {
			// inconsistent return value, yes. But it's a performance hit to make a new array
			return false;
		}
	}
}
