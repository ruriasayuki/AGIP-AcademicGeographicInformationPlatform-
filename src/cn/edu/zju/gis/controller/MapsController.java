package cn.edu.zju.gis.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import cn.edu.zju.gis.po.MapLayer;
import cn.edu.zju.gis.po.Maps;
import cn.edu.zju.gis.po.MapsCustom;
import cn.edu.zju.gis.po.Users;
import cn.edu.zju.gis.service.MapsService;
import cn.edu.zju.gis.service.UsersService;

@Controller
public class MapsController 
{
	@Autowired
	private MapsService mapsService;
	@Autowired
	private UsersService usersService;
	@RequestMapping("/createNewMap") //将会和viewMap合并重构 这个作为传空白参数的viewMap存在
	public ModelAndView find() throws Exception 
	{
		MapsCustom map = new MapsCustom("new map",1,1,100,40,7,0);
		mapsService.createnewmap(map);
		int loginflag = usersService.checklogin();
		System.out.println(map.getId());
		//杩斿洖ModelAndView
		ModelAndView modelAndView =  new ModelAndView();

		modelAndView.addObject("map", map);
		modelAndView.addObject("loginflag", loginflag);
		//鎸囧畾瑙嗗浘
		modelAndView.setViewName("main");
		
		return modelAndView;
	}
	@RequestMapping("/addLayerToMap")
	public ModelAndView addLayerToMap(int mapid,int layerid) throws Exception
	{
		System.out.println(mapid+":2333:"+layerid);
		ModelAndView modelAndView = new ModelAndView();
		return modelAndView;
	}
	@RequestMapping(value = "/savemap", method = RequestMethod.POST,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String savemap(String map,String maplayer) throws Exception
	{
		Gson gson = new Gson();
		Maps mapObj = gson.fromJson(map, Maps.class);
		
        ArrayList<JsonElement> jsonObjects = gson.fromJson(maplayer, new TypeToken<ArrayList<JsonElement>>()
        {}.getType());

        ArrayList<MapLayer> maplayerArr = new ArrayList<>();
        for (JsonElement jsonObject : jsonObjects)
        {
        	maplayerArr.add(gson.fromJson(jsonObject, MapLayer.class));
        }
        //TODO 暂时前端只提供这些参数 用户模块的userid和权限模块的accessibility不提供，地图模块待定（毕竟我们其实没有特别精致的历史地图资料）
        Maps mapForSave = new Maps(mapObj.getId(),
        		mapObj.getMapname(),
        		mapObj.getCenterx(),
        		mapObj.getCentery(),
        		mapObj.getZoomlevel()
        		);
        if(mapForSave.getId()==0)
        {
        	int insertMap = mapsService.insertMap(mapForSave);
        }
        else
        {
        	int updateMap = mapsService.updateMap(mapForSave);
        }
        int mapid= mapForSave.getId();
        for (MapLayer layer : maplayerArr)
        {
        	layer.setMapid(mapid);
        	if(layer.getMlid()==0)
            {
            	int insertmaplayer = mapsService.insertMapLayer(layer);
            }
            else
            {
            	int updatemaplayer = mapsService.updateMapLayer(layer);
            }    
        }
		return "success";
	}
}
