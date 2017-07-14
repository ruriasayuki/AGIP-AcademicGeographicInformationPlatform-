package cn.edu.zju.gis.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import cn.edu.zju.gis.mapper.UsersMapper;
import cn.edu.zju.gis.po.Users;
import cn.edu.zju.gis.service.UsersService;

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
	public int checklogin() throws Exception {
		int userid = usersMapper.checklogin();
		return userid;
	}

	@Override
	public void virtuallogin() throws Exception {
		usersMapper.virtuallogin();
	}
	@Override
	public void virtuallogout() throws Exception {
		usersMapper.virtuallogout();
	}
}
