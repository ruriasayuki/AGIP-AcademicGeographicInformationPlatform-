package cn.edu.zju.gis.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Case;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import cn.edu.zju.gis.po.Layers;
import cn.edu.zju.gis.po.Place;
import cn.edu.zju.gis.service.LayersService;
import cn.edu.zju.gis.util.Analyse;
import cn.edu.zju.gis.util.DeleteFile;


@Controller
public class LayersController {
	@Autowired
	private LayersService layersService;
	
	
	@RequestMapping(value = "/addLayers", method = RequestMethod.POST,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String addLayers(
			@RequestParam("layername") String layername,  
			@RequestParam("appendDataSrc") String appendDataSrc,
			@RequestParam("file") MultipartFile file,
			@RequestParam("course") String course,
			HttpSession session) throws Exception {
		//获取文件名
		String filename = file.getOriginalFilename();
		//获取文件的大小
		int length = (int) file.getSize();
		//获取文件的输入流
		InputStream inputStream = file.getInputStream();
		//构造合适的字节数组长度用于读取输入流中的字节
		byte b[]=new byte[(int) file.getSize()];
		//读取输入流中的字节到字节数组b中
		inputStream.read(b);
		//关闭输入流，释放资源
		inputStream.close();
		//创建文件夹
		//后面无需创造文件夹 在服务器上会配置好相关环境
		//这样子的目录写法最终的绝对路径源于系统设置的工作目录 windows会在C盘的用户的文档文件夹内（你也可以看见 很多游戏存档也是放在那里的 说明很多程序的默认写法就是如此
		File file2 = new File("layers/");
		if(!file2.exists()) {
			file2.mkdirs();
		}
		//构造文件的存储路径
		String storeLocation = "layers/" + filename;
		//构造输出流，流向该文件
		FileOutputStream fileOutputStream = new FileOutputStream(storeLocation);
		
		//将字节数组中的数据写入到文件中
		fileOutputStream.write(b);
		//关闭输出流，释放资源
		fileOutputStream.close();
		
		//解析编码格式
				File filet = new File(storeLocation);
				System.out.println(filet.getAbsolutePath());
		        InputStream in= new java.io.FileInputStream(filet);
		        byte[] test = new byte[3];
		        in.read(test);
		        in.close();
		        String encode="GBK";
		        if (test[0] == -17 && b[1] == -69 && b[2] == -65) encode="UTF-8";
		
		//解析存储在服务器端的csv数据
		InputStreamReader isr = new InputStreamReader(new FileInputStream(filet),encode);
		BufferedReader bufferedReader = new BufferedReader(isr);
		String line = null;
		String content = null;
		line = bufferedReader.readLine();//第一行信息，为标题信息，不用，如果需要，注释掉
		if(encode.equals("UTF-8")){
			line = line.substring(1);
		}
		String title[] = line.split(",");
		//读取第一行对字段类型和数目需要进行判断，是否符合要求
		int count = title.length;//得到字段数
		int hasXY = 0;//是否拥有经纬度  hasXY=2才算拥有经纬度
		boolean valueCondition = false;//判断是否拥有“value”字段
		boolean placeCondition = false;//判断是否拥有“name”字段
		//获取图层类型
		Integer type =null;
		System.out.println(title[0].toString().equals("name"));
		type = (Integer)session.getAttribute("LayerType");
		if(null==type) return "未选择类型";
		switch(type) {
			case 0:
				/**
				 * 分层设色图
				 * 数据要求：必须要有“name”和“value”字段，其他字段不检查，但要导入数据库
				 * */
				for(int i=0;i<count;i++) {
					if(title[i].toString().equals("value")) {
						valueCondition = true;
					}
					if(title[i].toString().equals("name")) {
						placeCondition = true;
					}
					if("x".equalsIgnoreCase(title[i])) {
						hasXY++;
					}
					if("y".equalsIgnoreCase(title[i])) {
						hasXY++;
					}
				}
				//拥有value和name字段
				if(valueCondition && placeCondition) {
					if(hasXY == 2)
						
						content = Analyse.AnalyseCSV(bufferedReader, 0 , true,title);
					else
						content = Analyse.AnalyseCSV(bufferedReader, 0 , false,title);
					break;
				}
				//没有name字段
				else if(!placeCondition) {					
					//删除存储在服务器端的csv文件
					DeleteFile.delete(bufferedReader, storeLocation);
					return "您上传的数据缺少\"name\"字段";
				}
				//没有value字段
				else if(!valueCondition) {
					//删除存储在服务器端的csv文件
					DeleteFile.delete(bufferedReader, storeLocation);
					return "您上传的数据缺少\"value\"字段";
				}
			case 1:
				/**
				 * 等级符号图
				 * 数据要求：必须要有“name”和“value”字段，需要检查XY字段(可有可无)，
				 * 其他字段不检查，但要导入数据库
				 * */
				for(int i=0;i<count;i++) {
					if(title[i].equals("value")) {
						valueCondition = true;
					}
					if(title[i].equals("name")) {
						placeCondition = true;
					}
					if("x".equalsIgnoreCase(title[i])) {
						hasXY++;
					}
					if("y".equalsIgnoreCase(title[i])) {
						hasXY++;
					}
				}
				//拥有value和name字段
				if(valueCondition && placeCondition) {
					if(hasXY == 2)
						content = Analyse.AnalyseCSV(bufferedReader, 1 , true,title);
					else
						content = Analyse.AnalyseCSV(bufferedReader, 1 , false,title);
					break;
				}
				//没有name字段
				else if(!placeCondition) {					
					//删除存储在服务器端的csv文件
					DeleteFile.delete(bufferedReader, storeLocation);
					return "您上传的数据缺少\"name\"字段";
				}
				//没有value字段
				else if(!valueCondition) {
					//删除存储在服务器端的csv文件
					DeleteFile.delete(bufferedReader, storeLocation);
					return "您上传的数据缺少\"value\"字段";
				}								
			case 2:
				/**
				 * 点图
				 * 数据要求：必须要有“地名”字段，需要检查XY字段(可有可无)，
				 * 其他字段不检查，但要导入数据库
				 * */
				for(int i=0;i<count;i++) {					
					if(title[i].equals("name")) {
						placeCondition = true;
					}
					if("x".equalsIgnoreCase(title[i])) {
						hasXY++;
					}
					if("y".equalsIgnoreCase(title[i])) {
						hasXY++;
					}
				}
				//拥有name字段
				if(placeCondition) {
					if(hasXY == 2)
						content = Analyse.AnalyseCSV(bufferedReader, 1 , true,title);
					else
						content = Analyse.AnalyseCSV(bufferedReader, 1 , false,title);
					break;
				}
				//没有name字段
				else if(!placeCondition) {					
					//删除存储在服务器端的csv文件
					DeleteFile.delete(bufferedReader, storeLocation);
					return "您上传的数据缺少\"name\"字段";
				}				
			case 3:
				/**
				 * 轨迹图
				 * 数据要求：必须要有“ID”和“the_geom”字段，其他字段不检查，但要导入数据库
				 * */
				for(int i=0;i<count;i++) {					
					if(title[i].equalsIgnoreCase("id")) {
						valueCondition = true;
					}
					if(title[i].equals("the_geom")||title[i].equals("地名")) {
						placeCondition = true;
					}
				}
				//拥有“id”和“the_geom”字段
				if(placeCondition && valueCondition) {
					content = Analyse.AnalyseCSV3(bufferedReader, title);
					break;					
				}
				//没有the_geom字段
				else if(!placeCondition) {
					//删除存储在服务器端的csv文件
					DeleteFile.delete(bufferedReader, storeLocation);
					return "您上传的数据缺少\"the_geom\"字段";
				}
				//没有"id"字段
				else if(!placeCondition) {
					//删除存储在服务器端的csv文件
					DeleteFile.delete(bufferedReader, storeLocation);
					return "您上传的数据缺少\"id\"字段";
				}
			default:
				break;
		}
		Layers layer = new Layers();
		
		layer.setAccessibility(true);
		 
		
		layer.setLayername(layername);
		layer.setType(type);
		layer.setStorelocation(storeLocation);
		layer.setUserid((Integer)session.getAttribute("userid"));
		layer.setDatacontent(content);
		layer.setAppenddatasrc(appendDataSrc);
		layer.setCourse(course);
		boolean bool = layersService.addLayers(layer);
		if(bool)
			return "success";
		else
			return "fail";
	}
	
	//emmm 等着被重写吧
	@RequestMapping(value = "/searchLayers",method = RequestMethod.POST,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String searchLayers(String keyword,String type,HttpSession session) throws Exception {
		List<Layers> list = layersService.searchLayers(keyword,Integer.parseInt(type));
		Integer userid = (Integer)session.getAttribute("userid");
		if(userid==null) userid=0;
		List<Layers> result = new ArrayList<Layers>();
		for(Layers layer:list)
		{
			if(layer.getAccessibility() || layer.getUserid()==userid)
				result.add(layer);
		}
		Gson gson = new Gson();
		return gson.toJson(result);
	}
	
	@RequestMapping(value = "/setLayerType",method = RequestMethod.POST,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String setLayerType(int LayerType,HttpSession session) throws Exception {
		session.setAttribute("LayerType", LayerType);	
		return "success";
	}
}
