package cn.edu.zju.gis.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import cn.edu.zju.gis.po.Users;
import cn.edu.zju.gis.service.MapsService;
import cn.edu.zju.gis.service.UsersService;

@Controller
public class PagesController {
	@Autowired
	private UsersService usersService;
	@Autowired
	private MapsService mapsService;
	
	@RequestMapping("/admin")
	public ModelAndView openAdminPanel(HttpSession session) throws Exception{
		ModelAndView modelAndView =  new ModelAndView();
		if(usersService.checkAdmin(session))
		{
			modelAndView.setViewName("adminPanel");
			return modelAndView;
		}
		else
		{
			modelAndView.setViewName("blank");
			return modelAndView;
		}
	}
	@RequestMapping("/openUpLayerPage")
	public ModelAndView openUpLayerPage() throws Exception{
		ModelAndView modelAndView =  new ModelAndView();
		modelAndView.setViewName("uplayer");
		return modelAndView;
	}
	@RequestMapping("/openSearchMapPage")
	public ModelAndView openSearchMapPage() throws Exception{
		ModelAndView modelAndView =  new ModelAndView();
		modelAndView.setViewName("searchMaps");
		return modelAndView;
	}
}