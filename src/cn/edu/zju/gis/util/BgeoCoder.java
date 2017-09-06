package cn.edu.zju.gis.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.nio.charset.Charset;

import com.google.gson.Gson;

public class BgeoCoder {
	  private static String readAll(Reader rd) throws IOException {  
		    StringBuilder sb = new StringBuilder();  
		    int cp;  
		    while ((cp = rd.read()) != -1) {  
		      sb.append((char) cp);  
		    }  
		    return sb.toString();  
		  }  
	  private static String readJsonFromUrl(String url) throws IOException {  
		    InputStream is = new URL(url).openStream();  
		    Gson gson = new Gson();
		    try {  
		      BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));  
		      String jsonText = readAll(rd);    
		      return jsonText;  
		    } finally {  
		      is.close();  
		     }  
		  }  
	private static String getLatlng_Geo(String address) throws IOException{
		if (address==null || address.equals(""))  return null;
		//每日对单个开发者有请求上限
		//返回的坐标系为gcj02ll
		  	String json = readJsonFromUrl("http://api.map.baidu.com/geocoder/v2/?address="+address+"&output=json&ak=TvAeGAobz3cbm76GQas0OhyV&ret_coordtype=gcj02ll"); 
		return json;
}
	private static String getAttribute(String json,String key)
	{

		int startIndex = json.indexOf(key);
		startIndex = startIndex + key.length()+2;
		int endIndex = json.indexOf(",", startIndex);
		int tmp = json.indexOf("}", startIndex);
		if(tmp<endIndex) endIndex = tmp;
		return json.substring(startIndex, endIndex);
	}
	public static float[] getLatlng(String address) throws IOException{
		float[] res= {0,0};
		String json = null;
		json = getLatlng_Geo(address);
		if(null==json) return null;
		String lat = getAttribute(json,"lat");
		String lng = getAttribute(json,"lng");
		res[0] = Float.parseFloat(lat);
		res[1] = Float.parseFloat(lng);
		return res;
	}
}