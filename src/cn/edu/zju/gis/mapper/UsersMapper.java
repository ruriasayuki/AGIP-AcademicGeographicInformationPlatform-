package cn.edu.zju.gis.mapper;

import cn.edu.zju.gis.po.Users;

public interface UsersMapper {
	// 根据id查询用户信息
	public Users findUsersById(int id) throws Exception;
	// 根据账号密码查询用户
	public Users findUser(Users user) throws Exception;
	
	public int checklogin() throws Exception;
	
	public void virtuallogin() throws Exception;
	
	public void virtuallogout() throws Exception;
}
