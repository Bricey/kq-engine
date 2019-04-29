export default {
    WIDTH: 900,
    HEIGHT: 600,

    GRAVITY: 200
};

export class Dimensions {

  constructor(max_w = 940,max_h = 600) {
	  // let max_w = 940;
	  // let max_h = 520;	
	  //get both w and h of the screen (some devices/browser measure this differntly, so you dont know for sure which one is which)
	  let w = window.screen.availWidth * window.devicePixelRatio;
	  let h = window.screen.availHeight * window.devicePixelRatio;
	  
	  //get the actual w and h. in landscape we'll define w as the longest one
	  let landW = Math.max(w, h);
	  let landH = Math.min(w, h);
	  
	  //do we need to scale to fit in width
	  if(landW > max_w) {
	    let ratioW = max_w / landW;
	    landW *= ratioW;
	    landH *= ratioW;
	  }
	  
	  //do we need to scale to fit in height
	  if(landH > max_h) {
	    let ratioH = max_w / landW;
	    landW *= ratioH;
	    landH *= ratioH;
		}

	  
		 if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				return { // return full screen dimensions if on mobile device
					w: landW,
					h: landH
				}	
		} else {
			return { // return desktop dimensions if not on mobile device
				w: max_w,
				h: max_h
			}
		}

  }

}