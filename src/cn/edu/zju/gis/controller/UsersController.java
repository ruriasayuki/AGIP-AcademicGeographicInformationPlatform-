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
import com.google.gson.reflect.TypeToken;

import cn.edu.zju.gis.po.Layers;
import cn.edu.zju.gis.po.LayersVo;
import cn.edu.zju.gis.po.MapLayer;
import cn.edu.zju.gis.po.Maps;
import cn.edu.zju.gis.po.MapsCustom;
import cn.edu.zju.gis.po.MapsVo;
import cn.edu.zju.gis.po.Users;
import cn.edu.zju.gis.service.LayersService;
import cn.edu.zju.gis.service.MapsService;
import cn.edu.zju.gis.service.UsersService;

@Controller
public class UsersController {
	@Autowired
	private UsersService usersService;
	@Autowired
	private MapsService mapsService;
	@Autowired
	private LayersService layersService;
	
	/*
	 * 这里的action是用户相关操作的
	 * 以下的请求是配合bootstrap的table插件写的
	 * getLayerList 获取图层列表 (理论上应该实装图层的删除功能,但是暂时可能会因此产生一系列问题,所以还未实装但是留下了接口 deleteLayer
	 * getMapList3(其实应该改名叫getMapListForAdmin的) 配合open和closeMap来由用户来设定地图的可见性(是否公开)
	 *  
	*/

	//注册页面(应该移到PagesController中)
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
	
	@RequestMapping(value = "/openMap", method = RequestMethod.POST,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String passMap(String mapList,HttpSession session) throws Exception
	{
		Integer userid = (Integer)session.getAttribute("userid");
			Gson gson = new Gson();
			ArrayList<Integer> idList= gson.fromJson(mapList,new TypeToken<ArrayList<Integer>>(){}.getType());
			for(Integer id : idList)
			{
				MapsVo querymap = new MapsVo();
				querymap.setId(id);
				querymap.setUserid(userid);
				mapsService.openMap(querymap);
			}
			return "success";

	}
	@RequestMapping(value = "/closeMap", method = RequestMethod.POST,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String banMap(String mapList,HttpSession session) throws Exception
	{
		Integer userid = (Integer)session.getAttribute("userid");
			Gson gson = new Gson();
			ArrayList<Integer> idList= gson.fromJson(mapList,new TypeToken<ArrayList<Integer>>(){}.getType());
			for(Integer id : idList)
			{
				MapsVo querymap = new MapsVo();
				querymap.setId(id);
				querymap.setUserid(userid);
				mapsService.closeMap(querymap);
			}
			return "success";

	}
	@RequestMapping(value = "/getMapList3", method = RequestMethod.GET,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String getMapList3(MapsVo querymap,HttpSession session) throws Exception
	{
		Integer userid = (Integer)session.getAttribute("userid");
		querymap.setUserid(userid);
		List<Maps> maps = mapsService.getMapList2(querymap);
		Gson gson = new Gson();
		String rows = gson.toJson(maps);
		int count = mapsService.countMaps(querymap);
		return "{\"total\":"+count+",\"rows\":"+rows+"}";	
	}
	@RequestMapping(value = "/getLayerList", method = RequestMethod.GET,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String getLayerList(LayersVo queryLayer,HttpSession session) throws Exception
	{
		Integer userid = (Integer)session.getAttribute("userid");
		queryLayer.setUserid(userid);
		List<Layers> layers = layersService.getLayerList(queryLayer);
		Gson gson = new Gson();
		String rows = gson.toJson(layers);
		int count = layersService.countLayers(queryLayer);
		return "{\"total\":"+count+",\"rows\":"+rows+"}";	
	}
	
	@RequestMapping(value = "/deleteLayer", method = RequestMethod.POST,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String deleteLayer(String layerList,HttpSession session) throws Exception
	{
		Integer userid = (Integer)session.getAttribute("userid");
		Gson gson = new Gson();
		ArrayList<Integer> idList= gson.fromJson(layerList,new TypeToken<ArrayList<Integer>>(){}.getType());
		for(Integer id : idList)
		{
			LayersVo querylayer = new LayersVo();
			querylayer.setId(id);
			querylayer.setUserid(userid);
			//layersService.deleteLayer(querymap);
		}
		return "success";

	}
	@RequestMapping(value = "/deleteMap", method = RequestMethod.POST,   
	        produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String deleteMap(String mapList,HttpSession session) throws Exception
	{
		Integer userid = (Integer)session.getAttribute("userid");
		Gson gson = new Gson();
		ArrayList<Integer> idList= gson.fromJson(mapList,new TypeToken<ArrayList<Integer>>(){}.getType());
		for(Integer id : idList)
		{
			Maps map = mapsService.findMapById(id);
			if(map.getUserid()==userid){
				List<MapLayer> maplayers = mapsService.findMapLayerByMapId(map.getId());
				for(MapLayer maplayer:maplayers)
				{
					mapsService.deleteMapLayer(maplayer);
				}
				mapsService.deleteMapById(id);
			}
		}
		return "success";

	}
}
