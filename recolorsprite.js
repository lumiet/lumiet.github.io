/*
gonna try converting this to js, wish me luck OwO
*/
function hsvcolor(h,s,v,a) {
 this.h = h;
 this.s = s;
 this.v = v;
 this.a = a;
}

function rgbcolor(r,g,b,a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
}

var color = new hsvcolor(230,149,230,255);

  function fminf(a,b) {
    if(a>b) return b;
    if(b>=a) return a;
  }
  function fmaxf(a,b) {
    if(a>b) return a;
    if(b>=a) return b;
  }


function main() {
  alert(color.h + " " + color.s + " " + color.l);
  }

HSVcolor rgb2hsv(rgbcolor) {
	var convert = new hsvcolor(0,0,0,0); 

	var r = rgbcolor.r / 255.0f;
	var g = rgbcolor.g / 255.0f;
	var b = rgbcolor.b / 255.0f;

	var h, s, v; // h:0-360.0, s:0.0-1.0, v:0.0-1.0

	var min = fminf(r, fminf(g, b));
	var max = fmaxf(r, fmaxf(g, b));

	v = max;

	if (max == 0.0f) {
		s = 0;
		h = 0;
	}
	else if (max - min == 0.0f) {
		s = 0;
		h = 0;
	}
	else {
		s = (max - min) / max;

		if (max == r) {
			h = 60 * ((g - b) / (max - min)) + 0;
		}
		else if (max == g) {
			h = 60 * ((b - r) / (max - min)) + 120;
		}
		else {
			h = 60 * ((r - g) / (max - min)) + 240;
		}
	}

	if (h < 0) h += 360.0f;

	convert.h = (int)(h);   // dst_h : 0-360
	convert.s = (int)(s * 100); // dst_s : 0-100
	convert.v = (int)(v * 100); // dst_v : 0-100
  convert.a = rgbcolor.a;

	return convert;
}

Color hsv2rgb(hsvcolor)
{
	var h = hsvcolor.h; // 0-360
	var s = hsvcolor.s / 100.0f; // 0.0-1.0
	var v = hsvcolor.v / 100.0f; // 0.0-1.0
  var a = hsvcolor.a;
  
	var r, g, b; // 0.0-1.0

	var   hi = (int)(h / 60.0f) % 6;
	var f = (h / 60.0f) - hi;
	var p = v * (1.0f - s);
	var q = v * (1.0f - s * f);
	var t = v * (1.0f - s * (1.0f - f));

	switch (hi) {
	case 0: r = v, g = t, b = p; break;
	case 1: r = q, g = v, b = p; break;
	case 2: r = p, g = v, b = t; break;
	case 3: r = p, g = q, b = v; break;
	case 4: r = t, g = p, b = v; break;
	case 5: r = v, g = p, b = q; break;
	}

	var convert = new rgbcolor(0,0,0,0);

	convert.r = (int)(r * 255); // dst_r : 0-255
	convert.g = (int)(g *255); // dst_r : 0-255
	convert.b = (int)(b *255) ; // dst_r : 0-255
  convert.a = a;
	return convert;
}
