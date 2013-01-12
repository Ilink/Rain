var Octree(verts, tris){
	/*
	make data structure
	traverse tree to find a cell
	at cell, perform collision detection amongst the cell
	*/
}

/*
cell data:
	list of verts or faces or both
		more natural to use faces since we care about intersections with triangles
	if we needed it, a face could list verts and also have a reference to the original (before the split)
*/