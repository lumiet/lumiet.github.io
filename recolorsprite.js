/*
gonna try converting this to js, wish me luck OwO
*/
function hsvcolor(h,s,v,a) {
 this.h = h; //0-360
 this.s = s; //0-100
 this.v = v; //0-100
 this.a = a; //0-255
}

function rgbcolor(r,g,b,a) {
  this.r = r; //0-255
  this.g = g; //0-255
  this.b = b; //0-255
  this.a = a; //0-255
}

var color = new hsvcolor(230,80,90,255);
//rgb: r 46 g 76 b 230


function main() {
alert("js works at least? sigh");
  alert(color.h + " " + color.s + " " + color.v);
var newcolor = hsv2rgb(color);
	alert(newcolor.r + " " + newcolor.g + " " + newcolor.b + " " + newcolor.a);
  }

function rgb2hsv(rgbcolor) {
	var convert = new hsvcolor(0,0,0,0); 

	var r = rgbcolor.r / 255;
	var g = rgbcolor.g / 255;
	var b = rgbcolor.b / 255;

	var h, s, v; // h:0-360.0, s:0.0-1.0, v:0.0-1.0

	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);

	v = max;

	var d = max - min;
  	s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

	if (h < 0) h += 360;

	convert.h = h;   // dst_h : 0-360
	convert.s = s * 100; // dst_s : 0-100
	convert.v = v * 100; // dst_v : 0-100
  	convert.a = rgbcolor.a;

	return convert;
}

function hsv2rgb(hsvcolor)
{
	var h = hsvcolor.h; // 0-360
	var s = hsvcolor.s / 100; // 0.0-1.0
	var v = hsvcolor.v / 100; // 0.0-1.0
  	var a = hsvcolor.a;
  
	var r, g, b; // 0.0-1.0

	var   hi = Math.round(h / 60.0) % 6;
	var f = (h / 60) - hi;
	var p = v * (1.0 - s);
	var q = v * (1.0 - s * f);
	var t = v * (1.0 - s * (1.0-f));

	switch (hi) {
	case 0: r = v, g = t, b = p; break;
	case 1: r = q, g = v, b = p; break;
	case 2: r = p, g = v, b = t; break;
	case 3: r = p, g = q, b = v; break;
	case 4: r = t, g = p, b = v; break;
	case 5: r = v, g = p, b = q; break;
	}

	var convert = new rgbcolor(0,0,0,0);

	convert.r = r * 255; // dst_r : 0-255
	convert.g = g *255; // dst_r : 0-255
	convert.b = b *255; // dst_r : 0-255
  	convert.a = a;
	return convert;
}
