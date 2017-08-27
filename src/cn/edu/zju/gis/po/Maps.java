package cn.edu.zju.gis.po;

public class Maps {
	int id;
	String mapname;
	int userid;
	int accessibility;
	int basemapid;
	String mapstyle;
	int addable;//审核用变量
	String layertree;
	int maptype;
	/* maptype
	 * 测试阶段
	 * 0   综合
	 * 1  文学
	 * 2  历史
	 * 3  经济
	 * 4  政治
	 */
	
	public Maps()
	{
		mapname="";
		layertree="";
	}
	public Maps(Maps map)
	{
		this.id=map.id;
		this.mapname=map.mapname;
		this.userid=map.userid;
		this.accessibility=map.accessibility;
		this.basemapid=map.basemapid;
		this.mapstyle = map.mapstyle;
		this.addable = map.addable;
		this.layertree = map.layertree;
		this.maptype = map.maptype;
	}
	
	//突然有点蒙 这个函数是啥？
	public Maps(int id,
			String mapname,
			int userid,
			int accessibility,
			int basemapid,
			String mapstyle)
	{
		this.id=id;
		this.mapname=mapname;
		this.userid=userid;
		this.accessibility=accessibility;
		this.basemapid=basemapid;
		this.mapstyle =mapstyle;
	}
	
	public Maps(int id,
			String mapname,
			int userid,
			int accessibility,
			int basemapid,
			String mapstyle,
			int addable,
			String layertree,
			int maptype)
	{
		this.id=id;
		this.mapname=mapname;
		this.userid=userid;
		this.accessibility=accessibility;
		this.basemapid=basemapid;
		this.mapstyle =mapstyle;
		this.addable =addable;
		this.layertree = layertree;
		this.maptype = maptype;
	}

	public int getMaptype() {
		return maptype;
	}
	public void setMaptype(int maptype) {
		this.maptype = maptype;
	}
	public String getMapstyle() {
		return mapstyle;
	}
	public void setMapstyle(String mapstyle) {
		this.mapstyle = mapstyle;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMapname() {
		return mapname;
	}
	public void setMapname(String mapname) {
		this.mapname = mapname;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public int getAccessibility() {
		return accessibility;
	}
	public void setAccessibility(int accessibility) {
		this.accessibility = accessibility;
	}
	
	public int getBasemapid() {
		return basemapid;
	}
	public void setBasemapid(int basemapid) {
		this.basemapid = basemapid;
	}
	public int getAddable() {
		return addable;
	}
	public void setAddable(int addable) {
		this.addable = addable;
	}
	public String getLayertree() {
		return layertree;
	}
	public void setLayertree(String layertree) {
		this.layertree = layertree;
	}
}
