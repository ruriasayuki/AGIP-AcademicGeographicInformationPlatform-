package cn.edu.zju.gis.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import cn.edu.zju.gis.po.Users;

public interface UsersService {
	public Users findUserById(int id) throws Exception;
	public Users findUser(Users user) throws Exception;
	public Users findUserByName(String user) throws Exception;
	
	public List<Users> findUsers() throws Exception;
	public List<Users> findUsersByStr(String key) throws Exception;
	
	public boolean checkAdmin(HttpSession session) throws Exception;
	
	public String login(Users user,HttpSession session) throws Exception;
	public String logout(HttpSession session);
	public void register(Users user,HttpServletRequest request,HttpServletResponse response) throws Exception;
	public boolean userExists(Users user) throws Exception;
	public void sendcode2email(Users user, HttpServletRequest request, HttpServletResponse response) throws Exception;
	public boolean emailExists(String email);
	public String pwdOld(Users user, HttpSession session, HttpServletResponse response) throws Exception;
	public String findEmailByUsername(String username);
	public void setNewPwd(Users user, HttpServletResponse response) throws Exception;
	public void sendcode2email2(String email2send, HttpServletResponse response) throws Exception;
	public void check(String email, String checkcode,HttpServletResponse response) throws Exception;
}
