package cn.edu.zju.gis.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.websocket.Session;

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
	
	
	@RequestMapping("/index")
	public ModelAndView index() throws Exception{
	
		
		ModelAndView modelAndView =  new ModelAndView();
		
	
		
		modelAndView.setViewName("index");
		
		return modelAndView;
	}
	
	@RequestMapping(value = "/main")
	public ModelAndView openmain(Integer mapid,HttpSession session) throws Exception{
		String username =(String) session.getAttribute("username");
		Users nowuser = null;
		if(username==null) nowuser = new Users();
		else
			nowuser = usersService.findUserByName(username);
		MapsCustom map=null;//地图初始化为空
		if(mapid==null)
			map= new MapsCustom(0,//默认id 0
					"new map",//默认地图名
					nowuser.getId(),//当前用户id
					1,//用户自定的地图可见性
					0,//暂时还没有basemap机制 有也打算整合到图层里面 basemap作为底图服务存在即可
					"{\"centerx\":110,\"centery\":40,\"zoomlevel\":5,\"mapmode\":0}",//初始化地图显示状态（bmap接口）
					0,//addable 审核属性（相当于是管理员认定的地图可见性） 只有通过审核之后才有（总觉得这个变量一开始不是用来干这个的
					"[{\"id\": 0,\"text\": \"new map\",\"type\":\"map\"}]",//初始化的地图图层树
					0);//初始化的地图类型 综合
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
		modelAndView.addObject("map", mapjson);		
		modelAndView.setViewName("main");
		return modelAndView;
	}
	
	@RequestMapping("/about")
	public ModelAndView about() throws Exception{
		int loginflag = 0;
		
		ModelAndView modelAndView =  new ModelAndView();
		
		modelAndView.addObject("loginflag", loginflag);
		
		modelAndView.setViewName("about");
		
		return modelAndView;
	}
	
	@RequestMapping("/registerPanel")
	public ModelAndView register() throws Exception{
		ModelAndView modelAndView =  new ModelAndView();
		modelAndView.setViewName("registerPanel");
		return modelAndView;
	}
	
	@RequestMapping("/register")
	public void register(Users user,HttpServletRequest request,HttpServletResponse response) throws Exception {
		usersService.register(user,request,response);	
	}
	
	@RequestMapping("/login")
	public @ResponseBody String login(Users user,HttpSession session) throws Exception {
		//System.out.println(user.getUsername());
		//System.out.println(user.getPassword());
		return usersService.login(user,session);
	}
	
	@RequestMapping("/logout")
	public @ResponseBody String logout(HttpSession session) throws Exception{
		return usersService.logout(session);
	}
	
	@RequestMapping("/sendcode2email")
	public void sendcode2email(Users user,HttpServletRequest request,HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		//System.out.println(""+22222);
		usersService.sendcode2email(user,request,response);
		//response.getWriter().append("发送成功");

		
	    //response.getWriter().close();
	}
	
	@RequestMapping("/userExists")
	@ResponseBody
	public boolean userExists(Users user) throws Exception{
		return usersService.userExists(user);
	}
	
	@RequestMapping("/emailExists")
	@ResponseBody
	public boolean EmailExists(String email) throws Exception{
		return usersService.emailExists(email);
	}
	
	@RequestMapping("/ModifyPwd")
	public ModelAndView ModifyPwd() throws Exception{
		ModelAndView modelAndView =  new ModelAndView();
		modelAndView.setViewName("ModifyPwd");
		return modelAndView;
	}
	
	@RequestMapping("/pwdOld")
	@ResponseBody
	public String pwdOld(Users user, HttpSession session, HttpServletResponse response) throws Exception{
		return usersService.pwdOld(user, session, response);
	}
	
	@RequestMapping("/forgetPwd")
	@ResponseBody
	public String forgetPwd(Users user,HttpServletRequest request,HttpServletResponse response) throws Exception{
		response.setContentType("text/html;charset=UTF-8");
		//1.根据用户名找邮箱
		String email2send = usersService.findEmailByUsername(user.getUsername());
		if(email2send!=""&&email2send!=null) {
			//2.向邮箱发验证码
			usersService.sendcode2email2(email2send,response);
			// "验证码已发送到您的绑定邮箱"
			request.getSession().setAttribute("email", email2send);	
			return "success";
		}
		else {
			return "fail";
			//response.getWriter().print("该用户不存在");
		}		
	}
	
	
	//感觉有重构的必要 竟然吧response都往service里面传……使得controller的代码看不出返回情况
	@RequestMapping("/check")
	public void check(String checkcode,HttpServletRequest request,HttpServletResponse response) throws Exception{
		String email = request.getSession().getAttribute("email").toString();
		if(email!=""&&email!=null) {
			usersService.check(email,checkcode,response);
			//correct ? incorrect
		}else {
			System.out.println("邮箱竟然没拿到");
		}		
	}
	
	@RequestMapping("/loginResult")
	@ResponseBody
	public String loginResult(Users user) throws Exception{
		Users usersResult = null;
		
		usersResult = usersService.findUser(user);
		
		if(usersResult!=null) return "success";
		return "fail";
	}
	
	@RequestMapping("/setNewPwd")
	public void setNewPwd(String password,HttpServletRequest request,HttpServletResponse response)throws Exception{
		Users user = new Users();
		String email = request.getSession().getAttribute("email").toString();
		user.setEmail(email);
		user.setPwdNew(password);
		usersService.setNewPwd(user,response);
	}
	@RequestMapping("/getActiveUser")
	@ResponseBody
	public String getUserbySession(HttpSession session)
	{
		String userjson = "";
		String username = (String)session.getAttribute("username");
		Integer userid = (Integer)session.getAttribute("userid");
		if(username==null)
			return "{\"username\":\"游客\",\"userid\":0}";
		userjson = "{\"username\":\""+username+"\",\"userid\":"+userid+"}";
		return userjson;
	}

	@RequestMapping("/getActiveAuthority")
	@ResponseBody
	public boolean getActiveAuthority(HttpSession session)
	{
		Integer userid = (Integer)session.getAttribute("userid");
		if(userid==null) return false;
		int a = userid;
		Users res;
		try {
			res = usersService.findUserById(a);
			int authority = res.getAuthority();
			if(authority==0) return false;
			else return true;
		} catch (Exception e) {
			return false;
		}
	}
}
