package cn.edu.zju.gis.service;

import cn.edu.zju.gis.po.Users;

public interface UsersService {
	public Users findUserById(int id) throws Exception;
	public Users findUser(Users user) throws Exception;
}
