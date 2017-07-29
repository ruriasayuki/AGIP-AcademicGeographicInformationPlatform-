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
import cn.edu.zju.gis.util.Json;

@Controller
public class LayersController {
	@Autowired
	private LayersService layersService;
	
	@RequestMapping(value = "/addLayers", method = RequestMethod.POST,   
	        produces = "text/html;charset=UTF-8")
	//如果将来想返回json，则produce="text/json'charset=UTF-8"
	@ResponseBody
	public String addLayers(
			@RequestParam(value="layername") String layername,  
			@RequestParam(value="accessibility") String accessibility,
			@RequestParam(value="type") String type,
			@RequestParam(value="file") MultipartFile file,
			@RequestParam(value="appendDataSrc") String appendDataSrc,
			HttpSession session) throws Exception {
		
		String filename = file.getOriginalFilename();
		//获取文件的大小
		int length = (int) file.getSize();
		//获取文件的输入流
		InputStream inputStream= file.getInputStream();
		//构造合适的字节数组长度用于读取输入流中的字节
		byte b[]=new byte[(int) file.getSize()];
		//读取输入流中的字节到字节数组b中
		inputStream.read(b);
		//关闭输入流，释放资源 
		inputStream.close();
		//创建文件夹
		File file2 = new File("e:\\layers");
		if(!file2.exists()) {
			file2.mkdirs();
		}
		//构造文件的存储路径
		String storeLocation = "e:\\layers\\" + filename;
		//构造输出流，流向该文件
		FileOutputStream fileOutputStream = new FileOutputStream(storeLocation);
		//将字节数组中的数据写入到文件中
		fileOutputStream.write(b);
		//关闭输出流，释放资源
		fileOutputStream.close();
		//解析编码格式
		File filet = new File(storeLocation);
        InputStream in= new java.io.FileInputStream(filet);
        byte[] test = new byte[3];
        in.read(test);
        in.close();
        String encode="gbk";
        if (test[0] == -17 && b[1] == -69 && b[2] == -65) encode="utf-8";

		//解析存储在服务器端的csv数据
		
        InputStreamReader isr = new InputStreamReader(new FileInputStream(filet),encode);
		BufferedReader bufferedReader = new BufferedReader(isr);
		
		String line = null;
		String content = null;
		line = bufferedReader.readLine();//��һ����Ϣ��Ϊ������Ϣ�����ã������Ҫ��ע�͵�
		String title[] = line.split(",");
		//��ȡ��һ�ж��ֶ����ͺ���Ŀ��Ҫ�����жϣ��Ƿ����Ҫ��
		int count = title.length;//�õ��ֶ���
		int hasXY = 0;//�Ƿ�ӵ�о�γ��  hasXY=2����ӵ�о�γ��
		boolean  seniorCondition = false;//�߼��������ж��Ƿ�ӵ�С���ֵ���ֶ�
		switch(Integer.parseInt(type)) {
			case 0://�ֲ���ɫͼ
				//�����ֶ�Ҫ��ӵ�е����ֶβ����ֶ�������Ϊ2
				if(!title[0].equals("地名") && count<2) {
					bufferedReader.close();
					//ɾ���洢��csv����
					File file3 = new File(storeLocation);
					file3.delete();				
					return "您上传的数据不符合规范";
				}
				else {
					title[0]="name";
					for(int i = 1; i< count; i++) {
						if(title[i].equals("数值")) {
							title[1]="value";
							seniorCondition = true;
						}
						if("x".equalsIgnoreCase(title[i])) {
							hasXY++;
						}
						if("y".equalsIgnoreCase(title[i])) {
							hasXY++;
						}
					}
					//�߼��ֶ�Ҫ��ӵ�С���ֵ���ֶΣ������ж��Ƿ�ӵ�о�γ��
					if(seniorCondition) {
						if(hasXY == 2)
							content = Analyse.AnalyseCSV(bufferedReader, 0 , true,title);
						else
							content = Analyse.AnalyseCSV(bufferedReader, 0 , false,title);
						break;
					}
					else {
						bufferedReader.close();
						//ɾ���洢��csv����
						File file3 = new File(storeLocation);
						file3.delete();				
						return "您上传的数据不符合规范";
					}
				}
			case 1://�ȼ�����ͼ
				//�����ֶ�Ҫ��ӵ�е����ֶβ����ֶ�������Ϊ2
				if(!title[0].equals("地名") && count<2) {
					bufferedReader.close();
					//ɾ���洢��csv����
					File file3 = new File(storeLocation);
					file3.delete();				
					return "您上传的数据不符合规范";
				}
				else {
					title[0]="name";
					for(int i = 1; i< count; i++) {
						if(title[i].equals("数值")) {
							title[1]="value";
							seniorCondition = true;
						}
						if("x".equalsIgnoreCase(title[i])) {
							hasXY++;
						}
						if("y".equalsIgnoreCase(title[i])) {
							hasXY++;
						}
					}
					//�߼��ֶ�Ҫ��ӵ�С���ֵ���ֶΣ������ж��Ƿ�ӵ�о�γ��
					if(seniorCondition) {
						if(hasXY == 2)
							content = Analyse.AnalyseCSV(bufferedReader, 1 , true, title);
						else
							content = Analyse.AnalyseCSV(bufferedReader, 1 , false,title);
						break;
					}
					else {
						bufferedReader.close();
						//ɾ���洢��csv����
						File file3 = new File(storeLocation);
						file3.delete();				
						return "您上传的数据不符合规范";
					}
				}
			case 2://��ͼ
				//�����ֶ�Ҫ��ӵ�е����ֶβ����ֶ�������Ϊ1
				if(!title[0].equals("地名") && count<1) {
					bufferedReader.close();
					//ɾ���洢��csv����
					File file3 = new File(storeLocation);
					file3.delete();				
					return "您上传的数据不符合规范";
				}
				else {
					title[0]="name";
					for(int i = 1; i< count; i++) {
						title[1]="value";
						if("x".equalsIgnoreCase(title[i])) {
							hasXY++;
						}
						if("y".equalsIgnoreCase(title[i])) {
							hasXY++;
						}
					}	
					if(hasXY == 2)
						content = Analyse.AnalyseCSV(bufferedReader, 2 , true, title);
					else
						content = Analyse.AnalyseCSV(bufferedReader, 2 , false, title);
					break;					
				}
			case 3://�켣ͼ
				//�ֶ�Ҫ��ӵ�е����ֶβ����ֶ�������Ϊ2:��һ���ֶ�Ϊid���ڶ����ֶ�Ϊthe_geom
				if(!title[0].equalsIgnoreCase("id") && !title[1].equals("the_geom") && count<2) {
					bufferedReader.close();
					//ɾ���洢��csv����
					File file3 = new File(storeLocation);
					file3.delete();				
					return "您上传的数据不符合规范";
				}
				else {
					//有必要再做调整 或许会改成新版本的代码吧 = = 
					content = Analyse.AnalyseCSV3(bufferedReader, title);
					break;					
				}
			default:
				break;
		}
				
		Layers layer = new Layers();
		if(accessibility.equals("T"))
		{
		layer.setAccessibility(true);
		} 
		else
		{
			layer.setAccessibility(false);
		}
		layer.setLayername(layername);
		layer.setType(Integer.parseInt(type));
		layer.setStorelocation(storeLocation);
		layer.setUserid((Integer)session.getAttribute("userid"));
		layer.setDatacontent(content);
		layer.setAppendDataSrc(appendDataSrc);
		boolean bool = layersService.addLayers(layer);
		if(bool)
			return "success";
		else
			return "fail";
	}
	
	@RequestMapping(value = "/addLayers2", method = RequestMethod.POST,   
	        produces = "text/html;charset=UTF-8")
	//如果将来想返回json，则produce="text/json'charset=UTF-8"
	@ResponseBody
	public String addLayers2(
			@RequestParam(value="layername") String layername,  
			@RequestParam(value="accessibility") String accessibility,
			@RequestParam(value="type") String type,
			@RequestParam(value="file") MultipartFile file) throws Exception {
		
		String filename = file.getOriginalFilename();
		
		//获取文件的大小
		int length = (int) file.getSize();
		//获取文件的输入流
		InputStream inputStream= file.getInputStream();
		//构造合适的字节数组长度用于读取输入流中的字节
		byte b[]=new byte[(int) file.getSize()];
		//读取输入流中的字节到字节数组b中
		inputStream.read(b);
		//关闭输入流，释放资源 
		inputStream.close();
		//创建文件夹
		File file2 = new File("e:\\layers");
		if(!file2.exists()) {
			file2.mkdirs();
		}
		//构造文件的存储路径
		String storeLocation = "e:\\layers\\" + filename;
		//构造输出流，流向该文件
		FileOutputStream fileOutputStream = new FileOutputStream(storeLocation);
		//将字节数组中的数据写入到文件中
		fileOutputStream.write(b);
		//关闭输出流，释放资源
		fileOutputStream.close();
		//解析编码格式
		File filet = new File(storeLocation);
        InputStream in= new java.io.FileInputStream(filet);
        byte[] test = new byte[3];
        in.read(test);
        in.close();
        String encode="gbk";
        if (test[0] == -17 && b[1] == -69 && b[2] == -65) encode="utf-8";

		//解析存储在服务器端的csv数据
		
        InputStreamReader isr = new InputStreamReader(new FileInputStream(filet),encode);
		BufferedReader bufferedReader = new BufferedReader(isr);
		
		String line = null;
		String content = null;
		line = bufferedReader.readLine();//��һ����Ϣ��Ϊ������Ϣ�����ã������Ҫ��ע�͵�
		String title[] = line.split(",");
		//��ȡ��һ�ж��ֶ����ͺ���Ŀ��Ҫ�����жϣ��Ƿ����Ҫ��
		int count = title.length;//�õ��ֶ���
		int hasXY = 0;//�Ƿ�ӵ�о�γ��  hasXY=2����ӵ�о�γ��
		boolean  seniorCondition = false;//�߼��������ж��Ƿ�ӵ�С���ֵ���ֶ�
		switch(Integer.parseInt(type)) {
			case 0://�ֲ���ɫͼ
				//�����ֶ�Ҫ��ӵ�е����ֶβ����ֶ�������Ϊ2
				if(!title[0].equals("地名") && count<2) {
					bufferedReader.close();
					//ɾ���洢��csv����
					File file3 = new File(storeLocation);
					file3.delete();				
					return "您上传的数据不符合规范";
				}
				else {
					for(int i = 1; i< count; i++) {
						if(title[i].equals("数值")) {
							seniorCondition = true;
						}
						if("x".equalsIgnoreCase(title[i])) {
							hasXY++;
						}
						if("y".equalsIgnoreCase(title[i])) {
							hasXY++;
						}
					}
					//�߼��ֶ�Ҫ��ӵ�С���ֵ���ֶΣ������ж��Ƿ�ӵ�о�γ��
					if(seniorCondition) {
						if(hasXY == 2)
							content = Analyse.AnalyseCSV(bufferedReader, 0 , true,title);
						else
							content = Analyse.AnalyseCSV(bufferedReader, 0 , false,title);
						break;
					}
					else {
						bufferedReader.close();
						//ɾ���洢��csv����
						File file3 = new File(storeLocation);
						file3.delete();				
						return "您上传的数据不符合规范";
					}
				}
			case 1://�ȼ�����ͼ
				//�����ֶ�Ҫ��ӵ�е����ֶβ����ֶ�������Ϊ2
				if(!title[0].equals("地名") && count<2) {
					bufferedReader.close();
					//ɾ���洢��csv����
					File file3 = new File(storeLocation);
					file3.delete();				
					return "您上传的数据不符合规范";
				}
				else {
					for(int i = 1; i< count; i++) {
						if(title[i].equals("数值")) {
							seniorCondition = true;
						}
						if("x".equalsIgnoreCase(title[i])) {
							hasXY++;
						}
						if("y".equalsIgnoreCase(title[i])) {
							hasXY++;
						}
					}
					//�߼��ֶ�Ҫ��ӵ�С���ֵ���ֶΣ������ж��Ƿ�ӵ�о�γ��
					if(seniorCondition) {
						if(hasXY == 2)
							content = Analyse.AnalyseCSV(bufferedReader, 1 , true, title);
						else
							content = Analyse.AnalyseCSV(bufferedReader, 1 , false,title);
						break;
					}
					else {
						bufferedReader.close();
						//ɾ���洢��csv����
						File file3 = new File(storeLocation);
						file3.delete();				
						return "您上传的数据不符合规范";
					}
				}
			case 2://��ͼ
				//�����ֶ�Ҫ��ӵ�е����ֶβ����ֶ�������Ϊ1
				if(!title[0].equals("地名") && count<1) {
					bufferedReader.close();
					//ɾ���洢��csv����
					File file3 = new File(storeLocation);
					file3.delete();				
					return "您上传的数据不符合规范";
				}
				else {
					for(int i = 1; i< count; i++) {
						if("x".equalsIgnoreCase(title[i])) {
							hasXY++;
						}
						if("y".equalsIgnoreCase(title[i])) {
							hasXY++;
						}
					}	
					if(hasXY == 2)
						content = Analyse.AnalyseCSV(bufferedReader, 2 , true, title);
					else
						content = Analyse.AnalyseCSV(bufferedReader, 2 , false, title);
					break;					
				}
			case 3://�켣ͼ
				//�ֶ�Ҫ��ӵ�е����ֶβ����ֶ�������Ϊ2:��һ���ֶ�Ϊid���ڶ����ֶ�Ϊthe_geom
				if(!title[0].equalsIgnoreCase("id") && !title[1].equals("the_geom") && count<2) {
					bufferedReader.close();
					//ɾ���洢��csv����
					File file3 = new File(storeLocation);
					file3.delete();				
					return "您上传的数据不符合规范";
				}
				else {
					content = Analyse.AnalyseCSV3(bufferedReader, title);
					break;					
				}
			default:
				break;
		}
				
		Layers layer = new Layers();
		if(accessibility.equals("T"))
		{
		layer.setAccessibility(true);
		} 
		else
		{
			layer.setAccessibility(false);
		}
		layer.setLayername(layername);
		layer.setType(Integer.parseInt(type));
		layer.setStorelocation(storeLocation);
		layer.setUserid(1);
		layer.setDatacontent(content);
		boolean bool = layersService.addLayers(layer);
		if(bool)
			return "上传成功";
		else
			return "失败";
	}
	
	@RequestMapping(value = "/searchLayers",method = RequestMethod.POST,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String searchLayers(String keyword,String type,HttpSession session) throws Exception {
		List<Layers> list = layersService.searchLayers(keyword,Integer.parseInt(type));
		int userid = (Integer)session.getAttribute("userid");
		List<Layers> result = new ArrayList<Layers>();
		for(Layers layer:list)
		{
			if(layer.getAccessibility() || layer.getUserid()==userid)
				result.add(layer);
		}
		Gson gson = new Gson();
		return gson.toJson(result);
	}
}
