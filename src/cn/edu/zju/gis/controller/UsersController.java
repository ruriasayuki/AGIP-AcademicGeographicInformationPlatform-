package cn.edu.zju.gis.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.edu.zju.gis.po.Users;
import cn.edu.zju.gis.service.UsersService;

@Controller
public class UsersController {
	@Autowired
	private UsersService usersService;
	
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
	
	@RequestMapping("/main")
	public ModelAndView openmain() throws Exception{
		int loginflag = usersService.checklogin();
		
		ModelAndView modelAndView =  new ModelAndView();
		
		modelAndView.addObject("loginflag", loginflag);
		
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
