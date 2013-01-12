function sphereSphere(aRadius, bRadius, ax, ay, az, bx, by, bz){
	var x = ax - bx,
		y = ay - by,
		z = az - bz,
		magSquared,
		distance = aRadius + bRadius;

	magSquared = x*x + y*y + z*z;

	if(magSquared < distance * distance)
		return true;
	else 
		return false;
}