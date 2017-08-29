package cn.edu.zju.gis.mapper;

import java.util.List;

import cn.edu.zju.gis.po.Users;
import cn.edu.zju.gis.po.email_checkcode;

public interface UsersMapper {
	// 根据id查询用户信息
	public Users findUsersById(int id) throws Exception;
	// 根据账号密码查询用户
	public Users findUser(Users user) throws Exception;
	
	public Users findUserByName(String name) throws Exception;
	
	public List<Users>findUsers(String str) throws Exception;
	
	public int checklogin() throws Exception;
	public Users login(Users user) throws Exception;
	public int register(Users user) throws Exception;
	public Users userExists(Users user);	
	
	public int insert_emailcheckcode(email_checkcode ec);
	public int checkcodeemail_deleteduplicate(email_checkcode ec);
	public int checkcodeemail_iscorrect(email_checkcode ec);
	public String findEmailByUsername(String username);
	public Users emailExists(String email);
	
	public int pwdOld(Users user);
	public int UpdatePasswordByEmail(Users user);
}
