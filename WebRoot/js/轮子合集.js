//
//以下是一堆自用函数
//
//别人家的代码begin 修改自http://www.zhangxinxu.com/study/js/zxx.color_exchange.js
/*RGBto16进制*/
var colorHex = function (colorS) {
    var reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    var that = colorS;
    if (/^(rgb|RGB)/.test(that)) {
        var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i = 0; i < aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = that;
        }
        return strHex;
    } else if (reg.test(that)) {
        var aNum = that.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return that;
        } else if (aNum.length === 3) {
            var numHex = "#";
            for (var i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return that;
    }
};
//-------------------------------------------------
/*16进制转RGB*/
var colorRgb = function (colorH) {
    var reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    var sColor = colorH.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //澶勭悊鍏綅鐨勯鑹插€�
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "RGB(" + sColorChange.join(",") + ")";
    } else {
        return sColor;
    }
};
//别人家的代码over
//
//yuki又造轮子啦
//
//16进制转RGB数组
function hexToColorArray(hColor) {
    var colorArray = [];
    for (var i = 1; i < 7; i += 2) {
        colorArray.push(parseInt("0x" + hColor.slice(i, i + 2)));
    }
    return { r: colorArray[0], g: colorArray[1], b: colorArray[2] }
}
//RGB数组转16进制
function ColorArrayToHex(colorArray) {
    function OctToHex(Oct) {
        var hexString = "";
        if (Oct < 0) return '00';
        if (Oct > 255) return 'ff';
        hexString = Oct.toString(16);
        if (hexString.length == 1)
            hexString = "0" + hexString;
        return hexString;
    }
    return '#' + OctToHex(colorArray.r) + OctToHex(colorArray.g) + OctToHex(colorArray.b);
}
//
////**yukiToolBegin
//雪家色彩映射器
//2017.7.25
//yukiColorMap(数值 最小值,
//数值 最大值,
//色彩字符串 最小值颜色,
//色彩字符串 最大值颜色,
//字符串 分段数,
//字符串类型 暂时只有linear)
function yukiColorMapper(min, max, minColor, maxColor, num, style) {
    var ColorMaps = new Array();
    ColorMaps = [];
    //确保格式
    var yminColor = colorHex(minColor);
    var ymaxColor = colorHex(maxColor);
    var valueColor = hexToColorArray(yminColor);
    var endColor = hexToColorArray(ymaxColor);
    //线性映射
    if (style == "linear") {
        var step = (max - min) / num;
        var rstep = (endColor.r - valueColor.r) / num;
        var gstep = (endColor.g - valueColor.g) / num;
        var bstep = (endColor.b - valueColor.b) / num;
        var nowstart = min - 1;
        var nowend = min + step;
        var nowColor = {
            r: parseInt(valueColor.r),
            g: parseInt(valueColor.g),
            b: parseInt(valueColor.b)
        };
        while (nowend < max) {
            ColorMaps.push({ start: parseInt(nowstart), end: parseInt(nowend), value: ColorArrayToHex(nowColor) });
            valueColor = {
                r: valueColor.r + rstep,
                g: valueColor.g + gstep,
                b: valueColor.b + bstep
            };
            nowstart = nowend;
            nowend = nowend + step;
            nowColor = {
                r: parseInt(valueColor.r),
                g: parseInt(valueColor.g),
                b: parseInt(valueColor.b)
            };
        }
        ColorMaps.push({ start: parseInt(nowstart), value: ColorArrayToHex(nowColor) })
    }
    else if (style == "log") {
        var offset=1;
        if(min<0) offset = -min+1;
        var step = (Math.log(max+offset) - Math.log(min+offset)) / num;
        var rstep = (endColor.r - valueColor.r) / num;
        var gstep = (endColor.g - valueColor.g) / num;
        var bstep = (endColor.b - valueColor.b) / num;
        var nowstart = min - 1;
        var nowstartLog = Math.log(min + offset);
        var nowendLog = nowstartLog+step;
        var nowend = Math.exp(nowendLog)-offset;
        var nowColor = {
            r: parseInt(valueColor.r),
            g: parseInt(valueColor.g),
            b: parseInt(valueColor.b)
        };
        while (nowend < max) {
            ColorMaps.push({ start: parseInt(nowstart), end: parseInt(nowend), value: ColorArrayToHex(nowColor) });
            valueColor = {
                r: valueColor.r + rstep,
                g: valueColor.g + gstep,
                b: valueColor.b + bstep
            };
            nowstart = nowend;
            nowendLog = nowendLog + step;
            nowend = Math.exp(nowendLog)-offset;
            nowColor = {
                r: parseInt(valueColor.r),
                g: parseInt(valueColor.g),
                b: parseInt(valueColor.b)
            };
        }
        ColorMaps.push({ start: parseInt(nowstart), value: ColorArrayToHex(nowColor) })
    }
    else if (style == "square") {
        var offset=0;
        if(min<0) offset = -min;
        var step = (max*max - min*min) / num;
        var rstep = (endColor.r - valueColor.r) / num;
        var gstep = (endColor.g - valueColor.g) / num;
        var bstep = (endColor.b - valueColor.b) / num;
        var nowstart = min - 1;
        var nowstartSquare = nowstart*nowstart;
        var nowendSquare = nowstartSquare+step;
        var nowend = Math.sqrt(nowendSquare)-offset;
        var nowColor = {
            r: parseInt(valueColor.r),
            g: parseInt(valueColor.g),
            b: parseInt(valueColor.b)
        };
        while (nowend < max) {
            ColorMaps.push({ start: parseInt(nowstart), end: parseInt(nowend), value: ColorArrayToHex(nowColor) });
            valueColor = {
                r: valueColor.r + rstep,
                g: valueColor.g + gstep,
                b: valueColor.b + bstep
            };
            nowstart = nowend;
            nowendSquare = nowendSquare + step;
            nowend = Math.sqrt(nowendSquare)-offset;
            nowColor = {
                r: parseInt(valueColor.r),
                g: parseInt(valueColor.g),
                b: parseInt(valueColor.b)
            };
        }
        ColorMaps.push({ start: parseInt(nowstart), value: ColorArrayToHex(nowColor) })
    }
    return ColorMaps;
}

////**yukiToolBegin