package cn.edu.zju.gis.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import cn.edu.zju.gis.po.MapLayer;
import cn.edu.zju.gis.po.Maps;
import cn.edu.zju.gis.po.MapsCustom;
import cn.edu.zju.gis.po.Users;
import cn.edu.zju.gis.service.MapsService;
import cn.edu.zju.gis.service.UsersService;

@Controller
public class UsersController {
	@Autowired
	private UsersService usersService;
	@Autowired
	private MapsService mapsService;
	
	@RequestMapping("/findUser")
	public ModelAndView find() throws Exception {
		Users usersResult = usersService.findUserById(1);

		//杩斿洖ModelAndView
		ModelAndView modelAndView =  new ModelAndView();
		//鐩稿綋 浜巖equest鐨剆etAttribut锛屽湪jsp椤甸潰涓�氳繃itemsList鍙栨暟鎹�
		modelAndView.addObject("user", usersResult);
		
		//鎸囧畾瑙嗗浘
		modelAndView.setViewName("user");
		
		return modelAndView;
	}
	@RequestMapping("/index")
	public ModelAndView index() throws Exception{
		int loginflag = usersService.checklogin();
		
		ModelAndView modelAndView =  new ModelAndView();
		
		modelAndView.addObject("loginflag", loginflag);
		
		modelAndView.setViewName("index");
		
		return modelAndView;
	}
	
	@RequestMapping(value = "/main")
	public ModelAndView openmain(Integer mapid) throws Exception{
		int loginflag = usersService.checklogin();//虚假的登陆情况判断，会重写的
		MapsCustom map=null;//地图初始化为空
		if(mapid==null)
			map= new MapsCustom("new map",1,1,0,"{\"centerx\":110,\"centery\":40,\"zoomlevel\":5,\"mapmode\":0}");
		else
		{
			Maps mapa = mapsService.findMapById(mapid);
			map = new MapsCustom(mapa);
			List<MapLayer> maplayerlist = mapsService.findMapLayerByMapId(mapid);
			map.setMaplayer(maplayerlist);
		}
		Gson gson = new Gson();
		String mapjson = gson.toJson(map);
		ModelAndView modelAndView =  new ModelAndView();//构造model
		modelAndView.addObject("loginflag", loginflag);
		modelAndView.addObject("map", mapjson);		
		modelAndView.setViewName("main");
		return modelAndView;
	}
	@RequestMapping("/about")
	public ModelAndView about() throws Exception{
		int loginflag = usersService.checklogin();
		
		ModelAndView modelAndView =  new ModelAndView();
		
		modelAndView.addObject("loginflag", loginflag);
		
		modelAndView.setViewName("about");
		
		return modelAndView;
	}
	
	@RequestMapping("/login")
	public String virtuallogin(String page) throws Exception{
		usersService.virtuallogin();
		
		return "redirect:/"+page+".action";
	}
	
	@RequestMapping("/logout")
	public String virtuallogout(String page) throws Exception{
		usersService.virtuallogout();
		
		return "redirect:/"+page+".action";
	}
	
	@RequestMapping("/loginResult")
	@ResponseBody
	public String loginResult(Users user) throws Exception{
		Users usersResult = null;
		
		usersResult = usersService.findUser(user);
		
		if(usersResult!=null) return "success";
		return "fail";
	}
}
