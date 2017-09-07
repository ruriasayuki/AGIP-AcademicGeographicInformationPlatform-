package cn.edu.zju.gis.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.nio.charset.Charset;

import com.google.gson.Gson;
//TODO 这个的重写空间很大 其实以空格为分隔符可以传入大量地名进行批量解析 然后返回的json的解析这里就可以用gson了 同时构造出百度的返回结果的class就可以了
//然后返回回去的就是对应layer的专属地名匹配Map
//这样可以解决浪费百度限制的请求次数的问题
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
		String json = null;
		json = readJsonFromUrl("http://api.map.baidu.com/geocoder/v2/?address="+address+"&output=json&ak=TvAeGAobz3cbm76GQas0OhyV&ret_coordtype=gcj02ll"); 
		return json;
}
	private static String getAttribute(String json,String key)
	{

		int startIndex = json.indexOf(key);
		if(startIndex == -1 ) return null;
		startIndex = startIndex + key.length()+2;
		int endIndex = json.indexOf(",", startIndex);
		int tmp = json.indexOf("}", startIndex);
		if(tmp<endIndex) endIndex = tmp;
		return json.substring(startIndex, endIndex);
	}
	public double[] getLatlng(String address) throws IOException{
		double[] res= {0,0};
		String json = null;
		String addressTrim = address.trim().replace(" ", "");
		json = getLatlng_Geo(addressTrim);
		if(null==json) return null;
		String lat = getAttribute(json,"lat");
		String lng = getAttribute(json,"lng");
		if(null==lat || null == lng) return null;
		res[0] = Double.parseDouble(lat);
		res[1] = Double.parseDouble(lng);
		return res;
	}
}