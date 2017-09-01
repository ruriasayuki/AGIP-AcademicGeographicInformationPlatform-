package cn.edu.zju.gis.service.impl;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.sql.Timestamp;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import cn.edu.zju.gis.mapper.UsersMapper;
import cn.edu.zju.gis.po.MapsVo;
import cn.edu.zju.gis.po.Users;
import cn.edu.zju.gis.po.UsersVo;
import cn.edu.zju.gis.po.email_checkcode;
import cn.edu.zju.gis.service.UsersService;
import cn.edu.zju.gis.util.EmailSender;

public class UsersServiceImpl implements UsersService{

	@Autowired
	private UsersMapper usersMapper;

	@Override
	public Users findUser(Users user) throws Exception {
		Users users = usersMapper.findUser(user);
		return users;
	}

	@Override
	public Users findUserById(int id) throws Exception {
		Users users = usersMapper.findUsersById(id);
		return users;
	}
	
	@Override
	public String login(Users user,HttpSession session) throws Exception {
		// TODO Auto-generated method stub
		Users finduser = null;
		finduser = usersMapper.login(user);
		if(finduser != null) {
			session.setAttribute("username", finduser.getUsername());
			session.setAttribute("userid", finduser.getId());
			return "success";
		}
		else {
			return "fail";
		}
	}
	
	@Override
	public String logout(HttpSession session) {
		// TODO Auto-generated method stub
		if(session.getAttribute("username")!=null) {
			session.removeAttribute("username");
			session.removeAttribute("userid");
			return "success";
		}else {
			return "fail";
		}
	}

	@Override
	public void register(Users user,HttpServletRequest request,HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		// TODO Auto-generated method stub
		int count=0;
		
		String checkcode=request.getParameter("checkcode");
		String email=request.getParameter("email");
		email_checkcode ec=new email_checkcode();
		ec.setEmail(email);
		ec.setCheckcode(checkcode);
		Date date = new Date();
		Timestamp timestampnow_ = new Timestamp(date.getTime());
		ec.setCreatetime(timestampnow_.getTime());
		if(usersMapper.checkcodeemail_iscorrect(ec)==1) {		
			count= usersMapper.register(user);//user三个参数应该自动获取了ajax里的情况，ajax第四个是邮箱验证码
			response.getWriter().print(count);
		}
		else {
			response.getWriter().print("验证码错误！");
		}
	}

	@Override
	public boolean userExists(Users user) throws Exception {
		// TODO Auto-generated method stub
		Users userexists = usersMapper.userExists(user);
		if(userexists!=null) {
			return true;
		}
		else {
			return false;
		}
	}
	
	Random r = new Random();//怕是要用时间当种子？初始化的时机可能也不对
	String generate_yzm(int num) {
		String yzm="";
		for(int i=0;i<num;i++) {
			char nowchar='a';
			int nn = r.nextInt(26);
			nowchar+=nn;
			yzm+=nowchar;
		}
		return yzm;
	}
	
	@Override
	public void sendcode2email(Users user, HttpServletRequest request, HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		// TODO Auto-generated method stub
		//EmailSender emailsender=new EmailSender("ab78000");
		
		String checkcode=generate_yzm(4);
		
		
		Date date = new Date();
		Timestamp timestampnow_ = new Timestamp(date.getTime());
		String email2send=request.getParameter("email");		
		long timestampnow=timestampnow_.getTime();
		//emailsender.sendemail2address(email2send,checkcode);
		
		email_checkcode ec=new email_checkcode();
		ec.setEmail(email2send);
		ec.setCheckcode(checkcode);
		ec.setCreatetime(timestampnow);
		usersMapper.checkcodeemail_deleteduplicate(ec);//如果有重复就删掉（相当于更新）
		usersMapper.insert_emailcheckcode(ec);
		
		//在此处设置邮箱发送器
		EmailSender es = new EmailSender("zjugis2014","zjugis2014");//这里是特地申请的163邮箱
		es.sendemail2address(email2send, checkcode);
		//嗯。。。个人觉得这个东西挺好玩的 以后可以搞一些自动发邮件的事情
		
		response.getWriter().append("验证码已发送至"+email2send);
	}
	
	@Override
	public boolean emailExists(String email) {
		// TODO Auto-generated method stub
		Users user = usersMapper.emailExists(email);
		if(user!=null) {
			return true;
		}
		else {
			return false;
		}		
	}
	
	@Override
	public String pwdOld(Users user, HttpSession session,HttpServletResponse response) throws Exception{
		user.setUsername(session.getAttribute("username").toString());
		Users Old = usersMapper.login(user);
		if(Old!=null) {
			//return true;
			int count = usersMapper.pwdOld(user);
			if(count==1) {
				return "success";
			
			}
			else {
				return "";
			}
		}
		else {
			return "fail";
		}
	}
	
	@Override
	public String findEmailByUsername(String username) {
		// TODO Auto-generated method stub
		String email = "";
		email = usersMapper.findEmailByUsername(username);		
		return email;
	}
	
	@Override
	public void check(String email, String checkcode,HttpServletResponse response) throws Exception {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charset=UTF-8");
		email_checkcode ec=new email_checkcode();
		ec.setEmail(email);
		ec.setCheckcode(checkcode);
		Date date = new Date();
		Timestamp timestampnow_ = new Timestamp(date.getTime());
		ec.setCreatetime(timestampnow_.getTime());
		if(usersMapper.checkcodeemail_iscorrect(ec)==1){
			response.getWriter().print("correct");
		}
		else {
			response.getWriter().print("incorrect");
		}
	}
	
	@Override
	public void setNewPwd(Users user, HttpServletResponse response) throws Exception {
		// TODO Auto-generated method stub
		int count = 0;
		count = usersMapper.UpdatePasswordByEmail(user);
		if(count==1) {
			response.getWriter().print("success");
		}
		else {
			response.getWriter().print("fail");
		}
		
	}
	
	@Override
	public void sendcode2email2(String email2send, HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");		
		//EmailSender emailsender=new EmailSender("ab78000");		
		String checkcode=generate_yzm(4);		
		
		Date date = new Date();
		Timestamp timestampnow_ = new Timestamp(date.getTime());
		long timestampnow=timestampnow_.getTime();
		//emailsender.sendemail2address(email2send,checkcode);
		
		email_checkcode ec=new email_checkcode();
		ec.setEmail(email2send);
		ec.setCheckcode(checkcode);
		ec.setCreatetime(timestampnow);
		usersMapper.checkcodeemail_deleteduplicate(ec);//如果有重复就删掉（相当于更新）
		usersMapper.insert_emailcheckcode(ec);
	}

	@Override
	public Users findUserByName(String name) throws Exception {
		Users user = usersMapper.findUserByName(name);
		return user;
	}

	@Override
	public boolean checkAdmin(HttpSession session) throws Exception {
		
		Integer userid = (Integer)session.getAttribute("userid");
		
		if(null==userid) return false;
		else 
		{
			Users user = usersMapper.findUsersById(userid);
			if (1==user.getAuthority()) return true;
			else return false;
		}
	}

	@Override
	public List<Users> findUsers(UsersVo queryuser) throws Exception {
		
		return usersMapper.findUsers(queryuser);
	}

	@Override
	public List<Users> findUsersByStr(String key) throws Exception {
		UsersVo queryuser = new UsersVo();
		queryuser.setUsername(key);
		return usersMapper.findUsers(queryuser);
	}
	
	@Override
	public int countUsers() throws Exception {
		int count = usersMapper.countUsers();
		return count;
	}
	
	@Override
	public int banUser(int id) throws Exception {
		UsersVo queryuser = new UsersVo();
		queryuser.setId(id);
		queryuser.setAuthority(-1);
		usersMapper.changeAuthority(queryuser);
		return 0;
	}


	@Override
	public int passUser(int id) throws Exception {
		UsersVo queryuser = new UsersVo();
		queryuser.setId(id);
		queryuser.setAuthority(0);
		usersMapper.changeAuthority(queryuser);
		return 0;
	}

	@Override
	public boolean checkUserAuthority(int userid) throws Exception {
		Users res = usersMapper.findUsersById(userid);
		if(res.getAuthority()<0) return false;
		else return true;
	}
}
