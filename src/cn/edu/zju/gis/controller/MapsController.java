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
	
	@RequestMapping("/addLayerToMap")
	public ModelAndView addLayerToMap(int mapid,int layerid) throws Exception
	{
		System.out.println(mapid+":2333:"+layerid);
		ModelAndView modelAndView = new ModelAndView();
		return modelAndView;
	}
	
	@RequestMapping(value = "/getMapList", method = RequestMethod.POST,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String getMapList(int userid) throws Exception
	{
		List<Maps> mapName = mapsService.getMapList();
		Gson gson = new Gson();
		return gson.toJson(mapName);
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
        		mapObj.getUserid(),
        		mapObj.getMapstyle()
        		);
        List<MapLayer> oldLayerlist = new ArrayList<MapLayer>();
        if(mapForSave.getId()==0)
        {
        	int insertMap = mapsService.insertMap(mapForSave);
        }
        else
        {
        	int updateMap = mapsService.updateMap(mapForSave);
        	oldLayerlist = mapsService.findMapLayerByMapId(mapForSave.getId());
        	
        	for (MapLayer i : oldLayerlist)
            {
        		boolean flag=true;
        	for(MapLayer layer : maplayerArr)
        	{
        		if( layer.getMlid() == i.getMlid())
        		{
        		flag=false;
        		break;
        		}
        	}    
        	if(flag){
        		int deletemaplayer = mapsService.deleteMapLayer(i);
        	}
            }
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
            	boolean flag=true;
            	int updatemaplayer = mapsService.updateMapLayer(layer);
            	
            }
        }
		return "success";
	}
}
