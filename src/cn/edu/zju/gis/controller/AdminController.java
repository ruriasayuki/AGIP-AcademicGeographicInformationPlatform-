package cn.edu.zju.gis.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import cn.edu.zju.gis.po.Users;
import cn.edu.zju.gis.service.MapsService;
import cn.edu.zju.gis.service.UsersService;

@Controller
public class AdminController {
	@Autowired
	private UsersService usersService;
	@Autowired
	private MapsService mapsService;
	
	@RequestMapping(value = "/getUserList",method = RequestMethod.POST,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String getUserList(HttpSession session) throws Exception {
		if(usersService.checkAdmin(session))
		{
			String res="";
			Gson gson = new Gson();
			List<Users> users = usersService.findUsers();
			res = gson.toJson(users);
			return res;
		}
		else return "fail";
	}
}	