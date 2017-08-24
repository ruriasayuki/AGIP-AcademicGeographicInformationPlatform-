package cn.edu.zju.gis.po;

public class Users {
	private int id; // 用户ID
	private String username;// 用户姓名
	private String password;// 用户密码
	private String pwdNew;
	private String email;//邮箱
	private String realname;//真实姓名
	private String comp;//所在单位
	private String cretificate;//证件号码
	private int cretifitype;//证件类型 0身份证  1护照  2校园卡
	private int authority;//账户权限 0用户 1管理员
	
	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getComp() {
		return comp;
	}

	public void setComp(String comp) {
		this.comp = comp;
	}

	public String getCretificate() {
		return cretificate;
	}

	public void setCretificate(String cretificate) {
		this.cretificate = cretificate;
	}

	public int getCretifitype() {
		return cretifitype;
	}

	public void setCretifitype(int cretifitype) {
		this.cretifitype = cretifitype;
	}

	public int getAuthority() {
		return authority;
	}

	public void setAuthority(int authority) {
		this.authority = authority;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPwdNew() {
		return pwdNew;
	}

	public void setPwdNew(String pwdNew) {
		this.pwdNew = pwdNew;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
