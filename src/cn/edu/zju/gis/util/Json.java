package cn.edu.zju.gis.util;

import java.util.List;

import cn.edu.zju.gis.po.Layers;
import javafx.scene.shape.Line;

public class Json {
	public static String changeListToJson(List<Layers> list) {
		int i = 0;
		if(list.size() == 0) {
			return null;
		}
//		String json = "[";
		String json = "";
		if(list.size() > 1) {
			json += "[";
		}
		
		for(Layers layer:list) {
			if(i!=0) {
				json += ",\r\n";
			}
			json += "{";
			json += "\"layername\":\"" + layer.getLayername() + "\",";
			json += "\"userid\":\"" + layer.getUserid() + "\",";
			json += "\"accessibility\":\"" + layer.getAccessibility() + "\",";
			json += "\"type\":" + layer.getType() + ",";
			json += "\"dataContent\":" + layer.getDatacontent()+ "}";
			i++;
		}
//		json += "]";
		if(list.size() > 1) {
			json += "]";
		}
		return json;
	}
}
