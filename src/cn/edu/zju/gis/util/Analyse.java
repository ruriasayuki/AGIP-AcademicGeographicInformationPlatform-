package cn.edu.zju.gis.util;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.aspectj.weaver.Lint;

import com.google.code.geocoder.Geocoder;
import com.google.code.geocoder.GeocoderRequestBuilder;
import com.google.code.geocoder.model.GeocodeResponse;
import com.google.code.geocoder.model.GeocoderRequest;
import com.google.code.geocoder.model.GeocoderResult;

import cn.edu.zju.gis.po.Place;
import javafx.scene.chart.XYChart;

public class Analyse {
	public static String AnalyseCSV(BufferedReader bufferedReader,int type,boolean hasXY,String[] titles) throws IOException {
		String content = null;
		switch (type) {//根据图层选择处理方法
			case 0://
				content = AnalyseCSV0(bufferedReader, hasXY, titles);
				break;
			case 1://�ȼ�����ͼ
				content = AnalyseCSV0(bufferedReader, hasXY, titles);
				break;
			case 2://��ͼ
				content = AnalyseCSV0(bufferedReader, hasXY , titles);
				break;
			//�켣ͼ�Ļ���������
//			case 3://�켣ͼ
//				content = AnalyseCSV3(bufferedReader, hasXY);
//				break;
			default:
				break;
		}		
		bufferedReader.close();
		return content;
	}
	
	//解析CSV并且构造Gson字符串写入数据库，这里可以用Gson插件进行重构……emmm 这个代码好像也不是不能用（噗
	public static String AnalyseCSV0(BufferedReader bufferedReader,boolean hasXY, String[] titles) throws NumberFormatException, FileNotFoundException, IOException {
		String content = "[";
		String line = null;//
		int i;	
		while((line=bufferedReader.readLine())!=null) {
			i = 0;
			line = line.trim();
			if(line.length() > 0) {
				String items[] = line.split(",");
				content += "{";
				if(hasXY) {//判断是否有XY列
					for(String item : items) {//直接开始解析
		            	if(i != 0) {
		            		content += ",";
		            	}
		            	content += "\"" + titles[i] + "\":" + "\"" +item +"\"";
		            	i++;
		            }
		            content += "},";	
				}
				else {//没有XY坐标 则需要进行地理匹配
					//��������ƥ�����γ��
			        
			        BgeoCoder bg = new BgeoCoder();  
			        
					for(i=0 ; i < items.length ; i++) {//�˴���ȫ���ӽ�ȥ�û��ǽ���Ҫ����ֶΣ�
		            	if(i != 0) {
		            		content += ",";
		            	}
		            	if(i == 1) {//���Ӿ�γ��
		            		double[] latlng = null;
		            		latlng = bg.getLatlng(items[0]);
					       				
		            		if(latlng!=null) {//ƥ�䵽�� ����뾭γ��
		            			content += "\"X\":" + latlng[1] + 
			            				"," + "\"Y\":" +latlng[0] + ",";
		            		}else {//δƥ�䵽�� �����""
		            			content += "\"X\":" + "\"\"" + 
			            				"," + "\"Y\":" + "\"\"" + ",";
		            		}
		            		content += "\"" + titles[i] +"\":" + "\""+ items[i] + "\"";
		            	}
		            	else {
		            		content += "\"" + titles[i] +"\":" + "\""+ items[i] + "\"";
		            	}		       
		            }
		            content += "},";	
				}
						
			}
		}
		content = content.substring(0, content.length()-1);
		content += "]";
		
		return content;
		
	}
	
	public static String AnalyseCSV3(BufferedReader bufferedReader,String titles[]) throws IOException {
		String content = "[";
		String line = null;//读取bufferedReader的每一行		
		int i;	
		//判断是直接解析the_geom还是地理位置匹配
		boolean isGeom = true;
		int geom_index = -1;
		for(int k=0;k<titles.length;k++) {
			if(titles[k].equals("地名")) {
				isGeom = false;
				geom_index = k;
				break;
			}
			if(titles[k].equals("the_geom")) {
				geom_index = k;
				break;
			}
		}

		BgeoCoder bg = new BgeoCoder(); //为解析做准备
		while((line = bufferedReader.readLine())!=null) {
			i = 0;
			line = line.trim();
			if(line.length() > 0) {
				String items[] = line.split(",");
				content += "{";
				for(String item : items) {
	            	if(i != 0) {
	            		content += ",";
	            	}
	            	if(isGeom && (i == geom_index)) {//直接解析the_geom
	            		String[] geomItems = item.split(":");
	            		content += "\"coords\":"+"[[";
	            		int p = 0;
	            		for(String geomItem:geomItems) {
	            			if(p!=0) {
	            				content += ",[";
	            			}
	            			geomItem = geomItem.trim();
	            			geomItem = geomItem.replace(" ", ",");
	            			System.out.println("坐标："+geomItem);
	            			content += geomItem;
	            			content += "]";	   
	            			p++;
	            		}
	            		content += "]";
	            	}
	            	else if(!isGeom&&(i == geom_index)) {//地名解析
	            		String[] geomItems = item.split(":");
	            		content += "\"coordinates\":"+"[[";
	            		int p = 0;
	            		for(String geomItem:geomItems) {
	            			if(p!=0) {
	            				content += ",[";
	            			}
	            			geomItem = geomItem.trim();
	            			double[] latlng = null;
		            		latlng = bg.getLatlng(geomItem);
					        //获取地址经纬度信息  	
		            		if(latlng!=null) {//匹配到点 则加入经纬度
		            			content +=  latlng[1]+ 
			            				"," + latlng[0];;
		            		}else {//未匹配到点 则加入""
		            			content +=  "" + 
			            				"," + "";
		            		}
		            		content += "]";
		            		p++;
	            		}
	            		content += "]";
	            	}
	            	else {
	            		content +="\""+ titles[i] + "\":\"" +item + "\"";
	            	}  	
	            	i++;
	            }
	            content += "},";	
			}
		}
		content = content.substring(0, content.length()-1);
		content += "]";
		System.out.println(content);
		return content;
	}
}
