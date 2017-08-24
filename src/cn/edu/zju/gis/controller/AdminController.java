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
public class AdminController {
	@Autowired
	private UsersService usersService;
	@Autowired
	private MapsService mapsService;
	
	@RequestMapping("/admin")
	public ModelAndView openAdminPanel(HttpSession session) throws Exception{
		ModelAndView modelAndView =  new ModelAndView();
		Integer userid = (Integer)session.getAttribute("userid");
		if(userid==null)
			{
				modelAndView.setViewName("blank");
				return modelAndView;
			}
		int a = userid;
		Users res;
		try {
			res = usersService.findUserById(a);
			int authority = res.getAuthority();
			if(authority==0) {
				modelAndView.setViewName("blank");
				return modelAndView;
			}
			else {		
				modelAndView.setViewName("adminPanel");
				
				return modelAndView;
			}
		} catch (Exception e) {
			{
				modelAndView.setViewName("blank");
				return modelAndView;
			}
		}
	}
}