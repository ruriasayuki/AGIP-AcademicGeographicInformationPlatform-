package cn.edu.zju.gis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import cn.edu.zju.gis.po.Maps;
import cn.edu.zju.gis.po.MapsCustom;
import cn.edu.zju.gis.po.Users;
import cn.edu.zju.gis.service.MapsService;
import cn.edu.zju.gis.service.UsersService;

@Controller
public class MapsController {
	@Autowired
	private MapsService mapsService;
	@Autowired
	private UsersService usersService;
	@RequestMapping("/createNewMap") //将会和viewMap合并重构 这个作为传空白参数的viewMap存在
	public ModelAndView find() throws Exception {
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
	public ModelAndView addLayerToMap(int mapid,int layerid) throws Exception{
		System.out.println(mapid+":2333:"+layerid);
		ModelAndView modelAndView = new ModelAndView();
		return modelAndView;
	}
}
