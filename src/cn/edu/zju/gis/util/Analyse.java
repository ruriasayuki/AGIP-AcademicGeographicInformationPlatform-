package cn.edu.zju.gis.util;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.aspectj.weaver.Lint;

import cn.edu.zju.gis.po.Place;
import javafx.scene.chart.XYChart;

public class Analyse {
	public static String AnalyseCSV(BufferedReader bufferedReader,int type,boolean hasXY,String[] titles) throws IOException {
		String content = null;
		switch (type) {
			case 0://�ֲ���ɫͼ
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
	
	//�����ֲ���ɫͼ
	public static String AnalyseCSV0(BufferedReader bufferedReader,boolean hasXY, String[] titles) throws NumberFormatException, FileNotFoundException, IOException {
		String content = "[";
		String line = null;//��ȡbufferedReader��ÿһ��
		int i;	
		while((line=bufferedReader.readLine())!=null) {
			i = 0;
			line = line.trim();
			if(line.length() > 0) {
				String items[] = line.split(",");
				content += "{";
				if(hasXY) {//ӵ�о�γ��
					for(String item : items) {//�˴���ȫ���ӽ�ȥ�û��ǽ���Ҫ����ֶΣ�
		            	if(i != 0) {
		            		content += ",";
		            	}
		            	content += "\"" + titles[i] + "\":" + "\"" +item +"\"";
		            	i++;
		            }
		            content += "},";	
				}
				else {//û�о�γ��,ƥ�侭γ��
					//��������ƥ�����γ��
					Map<String, Place> places = new HashMap<String,Place>();
					//��ȡ������csv��
					BufferedReader bufferedReader2 = new BufferedReader(new FileReader("e:\\layers\\place.csv"));
					String line2 = null;
					line2 = bufferedReader2.readLine();
					while((line2 = bufferedReader2.readLine())!=null) {
						String items2[] = line2.split(",");
						//������ƥ�����ݼ��ص�map��
						places.put(items2[0], new Place(Float.parseFloat(items2[1]), Float.parseFloat(items2[2])));
					}
					for(i=0 ; i < items.length ; i++) {//�˴���ȫ���ӽ�ȥ�û��ǽ���Ҫ����ֶΣ�
		            	if(i != 0) {
		            		content += ",";
		            	}
		            	if(i == 1) {//���Ӿ�γ��
		            		Place place = null;
		            		place =	places.get(items[0]);
		            		if(place!=null) {//ƥ�䵽�� ����뾭γ��
		            			content += "\"X\":" + place.getLongitude() + 
			            				"," + "\"Y\":" +place.getLatitude() + ",";
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
		System.out.println(content);
		return content;
		
	}
	
	//�켣ͼ
	public static String AnalyseCSV3(BufferedReader bufferedReader,String titles[]) throws IOException {
		String content = "[";
		String line = null;//��ȡbufferedReader��ÿһ��
		int i;	
		while((line = bufferedReader.readLine())!=null) {
			i = 0;
			line = line.trim();
			if(line.length() > 0) {
				String items[] = line.split(",");
				content += "{";
				for(String item : items) {//�˴���ȫ���ӽ�ȥ�û��ǽ���Ҫ����ֶΣ�
	            	if(i != 0) {
	            		content += ",";
	            	}
	            	if(i == 1) {//����the_geom
	            		content += "\"coords\":"+"[[";
	            		String the_geom = item.substring(item.indexOf('(')+2);
	            		the_geom = the_geom.trim();
	            		the_geom = the_geom.replace(" ", ",");
	            		System.out.println("��һ�����꣺"+the_geom);
	            		content += the_geom;
	            		content += "]";	          	            		
	            	}
	            	else if(i == 2) {
	            		content += "[";
	            		item = item.trim();
	            		String the_geom = item.substring(0,item.indexOf(')'));
	            		the_geom = the_geom.replace(" ", ",");
	            		System.out.println("�ڶ������꣺"+the_geom);
	            		content += the_geom;
	            		content += "]]";	
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
