package cn.edu.zju.gis.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import cn.edu.zju.gis.po.MapLayer;
import cn.edu.zju.gis.po.Maps;
import cn.edu.zju.gis.po.MapsCustom;
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
	
	@RequestMapping("/user")
	public ModelAndView openUserCenter(HttpSession session) throws Exception{
		ModelAndView modelAndView =  new ModelAndView();
		Integer userid = (Integer)session.getAttribute("userid");
		modelAndView.addObject(userid);
		modelAndView.setViewName("userCenter");
		return modelAndView;
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
	@RequestMapping("/index")
	public ModelAndView index() throws Exception{
	
		
		ModelAndView modelAndView =  new ModelAndView();
		
	
		
		modelAndView.setViewName("index");
		
		return modelAndView;
	}
	
	@RequestMapping(value = "/main")
	public ModelAndView openmain(Integer mapid,HttpSession session) throws Exception{
		boolean flag = false;
		String username =(String) session.getAttribute("username");
		Users nowuser = null;
		if(username==null) 
			{nowuser = new Users();
			nowuser.setId(0);}
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
			//开始进行权限验证
			//1.管理员
			if(usersService.checkAdmin(session)&&mapa.getAccessibility()==1) flag=true;
			//2.地图作者
			else if((Integer)session.getAttribute("userid")==mapa.getUserid()) flag=true;
			//3.普通用户
			else if(mapa.getAddable()==1&&mapa.getAccessibility()==1&&usersService.checkUserAuthority(mapa.getUserid())) flag=true;
			//4.游客
			else if(mapa.getAddable()==1&&mapa.getAccessibility()==1&&nowuser.getId()==0) flag=true;
			if(flag==false)
			{
				ModelAndView modelAndView =  new ModelAndView();//构造model
				modelAndView.setViewName("blank");
				return modelAndView;
			}
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
}