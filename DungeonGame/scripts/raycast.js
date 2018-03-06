function RayCast(startx, starty, endx, endy, collisionData /*array  of { x, y, width, height }*/, accuracy=10, incEnd=false){

	let dist = Math.sqrt((endx - startx) ** 2 + (endy - starty) ** 2);
	let angle = Math.atan((endy - starty) / (endx - startx));

	let x = startx;
	let y = starty;



	for(let i = 0; i < dist; i += 1 / accuracy){

		for(let j = 0; j < collisionData.length; j++){
			let c = collisionData[j];

			if(x <= c.x + c.width && x >= c.x){
				if(y <= c.y + c.height && y >= c.y){
					
					if(!incEnd) {
						if(c.x == endx && c.y == endy){
							x = startx + (endx - startx) * i / dist;
		                    y = starty + (endy - starty) * i / dist;
							continue;
						}
					}

					return collisionData[j];
				}
			}


		}

		x = startx + (endx - startx) * i / dist;
		y = starty + (endy - starty) * i / dist;

	}

	return false;
}