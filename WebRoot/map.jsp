<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>学术地图发布平台 图层上传</title>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <link href="plugin/bootstrap-3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/animate.css" rel="stylesheet">
    <link href="css/zzsc.css" rel="stylesheet">
    <link href="css/map.css" rel="stylesheet">
</head>
<body>
    <div id="head">
        <p class="declare">学术地图发布平台 得力科研助手</p>
    </div>
    <!--上传数据表单-->
    <div id="dataDiv0" style="display: none">
    <form id="dataForm" onsubmit="return false">
        <div id="dataTitle">上传您的数据</div>
        <div class="dataEach" style="margin-top: 10px;">
            <div style="margin-top: 7px;">
                <span class="dataEach_name">图层名:</span>
                <input type="text" name="layername" id="layername">
            </div>
        </div>
        <div class="dataEach" style="margin-top: 5px;">
            <div style="margin-top: 7px;">
                <span class="dataEach_name">是否公开:</span>
                <input type="radio" name="accessibility" value="T">是
                &nbsp;&nbsp;
                <input type="radio" name="accessibility" value="F">否
            </div>
        </div>
        <!-- 需要隐藏 -->
		<div class="dataEach" style="margin-top: 5px;display:none">
		   <div style="margin-top: 7px;">
		        <span class="dataEach_name">userid:</span>
		        <input type="text" id="userid" name="userid" value='${session.getAttribute("userid").toString()}'>
		    </div>
		</div>
        
        <div class="dataEach" style="margin-top: 5px;">
            <div style="margin-top: 7px;">
                <span class="dataEach_name">图层类型:</span>
                <input type="radio" class="layertype" name="type" value="0" checked=checked>分层设色图&nbsp;&nbsp;
                </div>
        </div>
        <div class="dataEach" style="margin-top: 5px;display:block" id="dynastyChoose0">
            <div style="margin-top: 7px;">
                <span class="dataEach_name">选择底图:</span>
				<select>
					<option  class="appendDataSrc" name="geoJson/new_qing_prov.json">
						清朝省份图
					</option>
					<option  class="appendDataSrc" name="geoJson/china.json">
						中国省份图
					</option>
					<option  class="appendDataSrc" name="geoJson/world.json">
						世界地图
					</option>
				</select>
            </div>
        </div>
        <div class="dataEach" style="margin-top: 5px;">
            <div style="margin-top: 7px;">
                <span class="dataEach_name">选择数据:</span>
                <input type="file" id="file" name="file" style="display: inline-block">
            </div>
        </div>
        <div style="text-align: center;margin-top: 10px;">
            <button id="submitBtn" onclick="submitData()">上传</button>
            <button id="closeBtn" onclick="closeData0()">取消</button>
        </div>
	</form>
    </div>
    <!--上传数据表单-->
    <div id="dataDiv" style="display: none">
    <form id="dataForm" onsubmit="return false">
        <div id="dataTitle">上传您的数据</div>
        <div class="dataEach" style="margin-top: 10px;">
            <div style="margin-top: 7px;">
                <span class="dataEach_name">图层名:</span>
                <input type="text" name="layername" id="layername1">
            </div>
        </div>
        <div class="dataEach" style="margin-top: 5px;">
            <div style="margin-top: 7px;">
                <span class="dataEach_name">是否公开:</span>
                <input type="radio" name="accessibility1" value="T">是
                &nbsp;&nbsp;
                <input type="radio" name="accessibility1" value="F">否
            </div>
        </div>
        <!-- 需要隐藏 -->
		<div class="dataEach" style="margin-top: 5px;display:none">
		   <div style="margin-top: 7px;">
		        <span class="dataEach_name">userid:</span>
		        <input type="text" id="userid" name="userid" value='${session.getAttribute("userid").toString()}'>
		    </div>
		</div>
        
        <div class="dataEach" style="margin-top: 5px;">
            <div style="margin-top: 7px;">
                <span class="dataEach_name">图层类型:</span>
                <input type="radio" class="layertype" name="type1" value="1" >等级符号图&nbsp;&nbsp;
                <input type="radio" class="layertype" name="type1" value="2" >点图&nbsp;&nbsp;
                <input type="radio" class="layertype" name="type1" value="3" >轨迹图&nbsp;&nbsp;
            </div>
        </div>
        <div class="dataEach" style="margin-top: 5px;display:block" id="dynastyChoose1">
            <div style="margin-top: 7px;">
                <span class="dataEach_name">选择坐标表:</span>
				<select>
					<option  class="appendDataSrc1" name="null">
						无
					</option>
					<option  class="appendDataSrc1" name="csv/place.csv">
						清朝
					</option>
				</select>
            </div>
        </div>
        <div class="dataEach" style="margin-top: 5px;">
            <div style="margin-top: 7px;">
                <span class="dataEach_name">选择数据:</span>
                <input type="file" id="file1" name="file" style="display: inline-block">
            </div>
        </div>
        <div style="text-align: center;margin-top: 10px;">
            <button id="submitBtn" onclick="submitData1()">上传</button>
            <button id="closeBtn" onclick="closeData()">取消</button>
        </div>
	</form>
    </div>
    <div id="index" class="fadeIn">
        <h1 class="animated bounceInLeft" id="h01">跟随我们</h1>
        <h1 class="animated bounceInRight" id="h02">一起</h1>
        <h1 class="animated fadeInUp" id="h03">开启制图之旅</h1>
        <span id="skip"></span>
    </div>
    <div id="content">
        <form id="msform" onsubmit="return false">
            <!-- progressbar -->
            <ul id="progressbar">
                <li class="active">模板</li>
                <li>数据</li>
                <li>图层</li>
            </ul>
            <!-- fieldsets -->
            <fieldset>
                <h2 class="fs-title rubberBand">第一步 请选择地图模板</h2>
                <div class="bubble_map" style="left:280px">
                    <img class="mapImg" src="img/template_range_china.png" />
                    <div class="introduce">
                        <strong style="font-size:14px">概念释义</strong>
                        <p style="font-size:12px">
                            将数据中的一列值，根据数值的大小，绘制不同等级的圆形符号（气泡），生成一幅专题地图。
                        </p>
                        <strong style="font-size:14px">支持地区</strong>
                        <p style="font-size:12px">
                            世界&nbsp;|&nbsp;中国&nbsp;|&nbsp;省市&nbsp;|&nbsp;区县
                        </p>
                    </div>
                    <p class="mapName">分层设色图</p>
                </div>
                <div class="bubble_map" style="left:280px">
                    <img class="mapImg" src="img/template_bubble_china.png" />
                    <div class="introduce">
                        <strong style="font-size:14px">概念释义</strong>
                        <p style="font-size:12px">
                            将数据中的一列值，按照某种方法，划分为多个范围段，并赋予不同的颜色，生成一幅专题地图。
                        </p>
                        <strong style="font-size:14px">支持地区</strong>
                        <p style="font-size:12px">
                            世界&nbsp;|&nbsp;中国&nbsp;|&nbsp;省市&nbsp;|&nbsp;区县
                        </p>
                    </div>
                    <p class="mapName">等级符号图</p>
                </div>
                <div class="bubble_map" style="left:280px">
                    <img class="mapImg" src="img/点图.jpg" />
                    <div class="introduce">
                        <strong style="font-size:14px">概念释义</strong>
                        <p style="font-size:12px">
                            将数据中的一列值，根据数值的大小，绘制不同等级的圆形符号（气泡），生成一幅专题地图。
                        </p>
                        <strong style="font-size:14px">支持地区</strong>
                        <p style="font-size:12px">
                            世界&nbsp;|&nbsp;中国&nbsp;|&nbsp;省市&nbsp;|&nbsp;区县
                        </p>
                    </div>
                    <p class="mapName">点图</p>
                </div>
                <div class="bubble_map" style="left:280px">
                    <img class="mapImg" src="img/轨迹图.jpg" />
                    <div class="introduce">
                        <strong style="font-size:14px">概念释义</strong>
                        <p style="font-size:12px">
                            将数据中的一列值，根据数值的大小，绘制不同等级的圆形符号（气泡），生成一幅专题地图。
                        </p>
                        <strong style="font-size:14px">支持地区</strong>
                        <p style="font-size:12px">
                            世界&nbsp;|&nbsp;中国&nbsp;|&nbsp;省市&nbsp;|&nbsp;区县
                        </p>
                    </div>
                    <p class="mapName">轨迹图</p>
                </div>
                <input type="button" name="next" class="next1 action-button" value="下一步" />
            </fieldset>
            <!--分层设色图-->
            <fieldset>
                <h2 class="fs-title rubberBand">上传你的数据</h2>
                <div class="map">
                    <img src="img/template_range_china.png" width="100%" height="80%">
                    <p class="mapName">分层设色图</p>
                </div>
                <div class="introduce1">
                    <h3>分层设色模板</h3>
                    <p style="font-size:16px">
                        将数据中的一列值，根据数值的大小，绘制不同等级的圆形符号（气泡），生成一幅专题地图。
                    </p>
                    <strong style="font-size:18px;">支持地区:</strong>
                    <br>
                    <br>
                    世界（
                    <span class="dth">以国家和地区为单位</span>&nbsp;&nbsp;
                    <a href="csv/分段设色(世界版)示例数据.xlsx" title="点我下载吧" class="example">示例数据</a>
                    )
                    <br>
                    中国（<span class="dth">以省为单位</span>&nbsp;&nbsp;
                    <a href="csv/分段设色(中国版-省份)示例数据.xls" title="点我下载吧" class="example">示例数据</a>
                    ）
                    <br>
                    省市（<span class="dth">以地市为单位</span>&nbsp;&nbsp;
                    <a href="csv/分段设色(省市版-地市)示例数据.xls" title="点我下载吧" class="example">示例数据</a>
                    ）
                    <p style="font-size:12px">
                    </p>
                </div>
                <div class="upload">
                    <button class="uploadbtn" onclick="showData0()">上传数据</button>
                	<div class="uploadInfo"></div>
                </div>
                <div class="upload"><strong>上传数据须知：</strong>数据格式请参见/下载左侧示例数据，支持CSV文件</div>
                <hr style="margin-top: 20px;width: 90%;margin-left: 5%">
                <div class="dataIntroduce">
                    <img src="img/分层设色图.png" style="width: 70%;">
                    <div style="text-align: left;margin-top: 20px;margin-left: 15%">
                        <span class="span">1.地名列(必填)</span>，所填地区必须为同一行政级别<br>
                        <span class="span">2.数值列(必填)</span>，至少包含一列数值<br>
                        <span class="span">3.自定义列</span>，可包含多列与地图相关的数值或描述信息<br><br>
                        <a href="csv/分层设色图.csv" style="color: #ff8601;text-decoration: none">下载示例数据>></a>
                    </div>
                </div>
                <input type="button" name="previous" class="previous1 action-button1" value="上一步" />
                <input type="button" name="next" class="next2 action-button2" value="下一步" />
            </fieldset>
            <!--等级符号图-->
            <fieldset>
                <h2 class="fs-title rubberBand">上传你的数据</h2>
                <div class="map">
                    <img src="img/template_bubble_china.png" width="100%" height="80%">
                    <p class="mapName">等级符号图</p>
                </div>
                <div class="introduce1">
                    <h3>等级符号模板</h3>
                    <p style="font-size:16px">
                        将数据中的一列值，根据数值的大小，绘制不同等级的圆形符号（气泡），生成一幅专题地图。
                    </p>
                    <strong style="font-size:18px;">支持地区:</strong>
                    <br>
                    <br>
                    世界（
                    <span class="dth">以国家和地区为单位</span>&nbsp;&nbsp;
                    <a href="csv/分段设色(世界版)示例数据.xlsx" title="点我下载吧" class="example">示例数据</a>
                    )
                    <br>
                    中国（<span class="dth">以省为单位</span>&nbsp;&nbsp;
                    <a href="csv/分段设色(中国版-省份)示例数据.xls" title="点我下载吧" class="example">示例数据</a>
                    ）
                    <br>
                    省市（<span class="dth">以地市为单位</span>&nbsp;&nbsp;
                    <a href="csv/分段设色(省市版-地市)示例数据.xls" title="点我下载吧" class="example">示例数据</a>
                    ）
                    <p style="font-size:12px">
                    </p>
                </div>
                <div class="upload"> 
                	<button class="uploadbtn" onclick="showData()">上传数据</button>
                	<div class="uploadInfo1"></div>
                </div>
                <div class="upload"><strong>上传数据须知：</strong>数据格式请参见/下载左侧示例数据，支持CSV文件</div>
                <hr style="margin-top: 20px;width: 90%;margin-left: 5%">
                <div class="dataIntroduce">
                    <img src="img/等级符号图.png" style="width: 70%;">
                    <div style="text-align: left;margin-top: 20px;margin-left: 15%">
                        <span class="span">1.地名列(必填)</span>，所填地区必须为同一行政级别<br>
                        <span class="span">2.X(经度)列和Y(维度)列(可选)</span>，地理位置的经纬度，没有可不填<br>
                        <span class="span">3.数值列(必填)</span>，至少包含一列数值<br>
                        <span class="span">4.自定义列</span>，可包含多列与地图相关的数值或描述信息<br><br>
                        <a href="csv/等级符号图.csv" style="color: #ff8601;text-decoration: none">下载示例数据>></a>
                    </div>
                </div>
                <input type="button" name="previous1" class="previous1 action-button1" value="上一步" />
                <input type="button" name="next2" class="next2 action-button2" value="下一步" />
            </fieldset>
            <!--点图-->
            <fieldset>
                <h2 class="fs-title rubberBand">上传你的数据</h2>
                <div class="map">
                    <img src="img/点图.jpg" width="100%" height="80%">
                    <p class="mapName">点图</p>
                </div>
                <div class="introduce1">
                    <h3>点图模板</h3>
                    <p style="font-size:16px">
                        将数据中的一列值，根据数值的大小，绘制不同等级的圆形符号（气泡），生成一幅专题地图。
                    </p>
                    <strong style="font-size:18px;">支持地区:</strong>
                    <br>
                    <br>
                    世界（
                    <span class="dth">以国家和地区为单位</span>&nbsp;&nbsp;
                    <a href="csv/分段设色(世界版)示例数据.xlsx" title="点我下载吧" class="example">示例数据</a>
                    )
                    <br>
                    中国（<span class="dth">以省为单位</span>&nbsp;&nbsp;
                    <a href="csv/分段设色(中国版-省份)示例数据.xls" title="点我下载吧" class="example">示例数据</a>
                    ）
                    <br>
                    省市（<span class="dth">以地市为单位</span>&nbsp;&nbsp;
                    <a href="csv/分段设色(省市版-地市)示例数据.xls" title="点我下载吧" class="example">示例数据</a>
                    ）
                    <p style="font-size:12px">
                    </p>
                </div>
                <div class="upload">
                    <button class="uploadbtn" onclick="showData()">上传数据</button>
                    <div class="uploadInfo1"></div>
                </div>
                <div class="upload"><strong>上传数据须知：</strong>数据格式请参见/下载左侧示例数据，支持CSV文件</div>
                <hr style="margin-top: 20px;width: 90%;margin-left: 5%">
                <div class="dataIntroduce">
                    <img src="img/点图.png" style="width: 70%;">
                    <div style="text-align: left;margin-top: 20px;margin-left: 15%">
                        <span class="span">1.地名列(必填)</span>，所填地区必须为同一行政级别<br>
                        <span class="span">2.X(经度)列和Y(维度)列(可选)</span>，地理位置的经纬度，没有可不填<br>
                        <span class="span">3.自定义列</span>，可包含多列与地图相关的数值或描述信息<br><br>
                        <a href="csv/点图.csv" style="color: #ff8601;text-decoration: none">下载示例数据>></a>
                    </div>
                </div>
                <input type="button" name="previous" class="previous1 action-button1" value="上一步" />
                <input type="button" name="next" class="next2 action-button2" value="下一步" />
            </fieldset>
            <!--轨迹图-->
            <fieldset>
                <h2 class="fs-title rubberBand">上传你的数据</h2>
                <div class="map">
                    <img src="img/轨迹图.jpg" width="100%" height="80%">
                    <p class="mapName">轨迹图</p>
                </div>
                <div class="introduce1">
                    <h3>轨迹图模板</h3>
                    <p style="font-size:16px">
                        将数据中的一系列坐标值，根据坐标值的顺序，绘制路线轨迹，生成一幅专题地图。
                    </p>
                    <strong style="font-size:18px;">支持地区:</strong>
                    <br>
                    <br>
                    世界（
                    <span class="dth">以国家和地区为单位</span>&nbsp;&nbsp;
                    <a href="csv/分段设色(世界版)示例数据.xlsx" title="点我下载吧" class="example">示例数据</a>
                    )
                    <br>
                    中国（<span class="dth">以省为单位</span>&nbsp;&nbsp;
                    <a href="csv/分段设色(中国版-省份)示例数据.xls" title="点我下载吧" class="example">示例数据</a>
                    ）
                    <br>
                    省市（<span class="dth">以地市为单位</span>&nbsp;&nbsp;
                    <a href="csv/分段设色(省市版-地市)示例数据.xls" title="点我下载吧" class="example">示例数据</a>
                    ）
                    <p style="font-size:12px">
                    </p>
                </div>
                <div class="upload"> <button class="uploadbtn" onclick="showData()">上传数据</button></div>
                <div class="uploadInfo1"></div>
                <div class="upload"><strong>上传数据须知：</strong>数据格式请参见/下载左侧示例数据，支持CSV文件</div>
                <hr style="margin-top: 20px;width: 90%;margin-left: 5%">
                <div class="dataIntroduce">
                    <img src="img/轨迹图1.png" style="width: 48%;">
                    <img src="img/轨迹图2.png" style="width: 48%;">
                    <div style="text-align: left;margin-top: 20px;margin-left: 1%">
                        <span class="span">1.ID列(必填)</span>，所填地区必须为同一行政级别<br>
                        <span class="span">2.the_geom列(必填)</span>，至少包含一组经纬度坐标(地名)，若为多组，中间以:分隔<br>
                        <span class="span">3.自定义列</span>，可包含多列与地图相关的数值或描述信息<br><br>
                        <a href="csv/轨迹图.csv" style="color: #ff8601;text-decoration: none">下载示例数据>></a>
                    </div>
                </div>
                <input type="button" name="previous" class="previous1 action-button1" value="上一步" />
                <input type="button" name="next" class="next2 action-button2" value="下一步" />
            </fieldset>
            <fieldset>
                <h2 class="congratulation rubberBand">恭喜您制作图层成功</h2>
                    <img src="img/对号.png" alt="duihao" style="width: 350px;height: 180px">
            </fieldset>
        </form>
    </div>
    <div id="last1">
        <h3>Do you like this Ancient Map?</h3>
        <a class="btn btn-default slider-btn animated fadeIn" href="#">Join us</a>
    </div>
    <div id="last2">
            <div class="tail1">
                <ul>
                    <li class="item">
                        <div class="inner">
                            <img src="img/安全.png" alt="icon1" width="60px" height="60px"><p class="text">浙大品质保证</p>
                        </div>
                    </li>
                    <li class="item">
                        <div class="inner">
                            <img src="img/gis.png" alt="icon2" width="60px" height="60px"><p class="text">地信倾力之作</p>
                        </div>
                    </li>
                    <li class="item">
                        <div class="inner">
                        <img src="img/book.png" alt="icon3" width="60px" height="60px"><p class="text">交叉学术研究</p>
                        </div>
                    </li>
                </ul>
            </div>
        <hr>
            <div class="tail2">
                <p class="copyright">Copyright © 2017, GIS.ZJU. All Rights Reserved.</p>
            </div>
    </div>


    <script src="plugin/jquery-3.2.1.min.js"></script>
    <script src="js/jquery.easing.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="bootstrap-3.3.7/js/bootstrap.min.js"></script>
    <script src="js/zzsc.js"></script>
    <script src="js/myjs.js"></script>
    <script src="js/map_1.js"></script>
</body>
</html>