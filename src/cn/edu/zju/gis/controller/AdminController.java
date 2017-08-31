package cn.edu.zju.gis.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.reflect.TypeToken;

import cn.edu.zju.gis.po.Maps;
import cn.edu.zju.gis.po.MapsVo;
import cn.edu.zju.gis.po.Users;
import cn.edu.zju.gis.po.UsersVo;
import cn.edu.zju.gis.service.MapsService;
import cn.edu.zju.gis.service.UsersService;

@Controller
public class AdminController {
	@Autowired
	private UsersService usersService;
	@Autowired
	private MapsService mapsService;
	
	@RequestMapping(value = "/getUserList",method = RequestMethod.GET,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String getUserList(UsersVo user,HttpSession session) throws Exception {
		if(usersService.checkAdmin(session))
		{
			String res="";
			Gson gson = new Gson();
			List<Users> users = usersService.findUsers(user);
			res = gson.toJson(users);
			int total = usersService.countUsers();
			
			return "{\"total\":"+total+",\"rows\":"+res+"}";
		}
		else return "fail";
	}
	
	@RequestMapping(value = "/getMapList2", method = RequestMethod.GET,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String getMapList2(MapsVo querymap,HttpSession session) throws Exception
	{
		if(usersService.checkAdmin(session)){
			List<Maps> maps = mapsService.getMapList2(querymap);
			Gson gson = new Gson();
			String rows = gson.toJson(maps);
			int count = mapsService.countMaps(querymap);
			return "{\"total\":"+count+",\"rows\":"+rows+"}";
		}
		else return "fail";
	}
	@RequestMapping(value = "/passMap", method = RequestMethod.POST,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String passMap(String mapList,HttpSession session) throws Exception
	{
		if(usersService.checkAdmin(session)){
			Gson gson = new Gson();
			ArrayList<Integer> idList= gson.fromJson(mapList,new TypeToken<ArrayList<Integer>>(){}.getType());
			for(Integer id : idList)
			{
				mapsService.passMap(id);
			}
			return "success";
		}
		else return "fail";
	}
	@RequestMapping(value = "/banMap", method = RequestMethod.POST,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String banMap(String mapList,HttpSession session) throws Exception
	{
		if(usersService.checkAdmin(session)){
			Gson gson = new Gson();
			ArrayList<Integer> idList= gson.fromJson(mapList,new TypeToken<ArrayList<Integer>>(){}.getType());
			for(Integer id : idList)
			{
				mapsService.banMap(id);
			}
			return "success";
		}
		else return "fail";
	}
}	