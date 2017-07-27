package cn.edu.zju.gis.po;

public class Maps {
	int id;
	String mapname;
	int userid;
	int accessibility;
	int basemapid;
	String mapstyle;
	public Maps()
	{
		mapname="";
	}
	public Maps(Maps map)
	{
		this.id=map.id;
		this.mapname=map.mapname;
		this.userid=map.userid;
		this.accessibility=map.accessibility;
		this.basemapid=map.basemapid;
		this.mapstyle = map.mapstyle;
	}
	public Maps(String mapname,
			int userid,
			int accessibility,
			int basemapid,
			String mapstyle)
	{
		this.id=0;
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
			String mapstyle)
	{
		this.id=id;
		this.mapname=mapname;
		this.userid=userid;
		this.accessibility=accessibility;
		this.basemapid=basemapid;
		this.mapstyle =mapstyle;
	}
	
	public Maps(int id,String mapname,String mapstyle)
	{
		this.id = id;
		this.mapname = mapname;
		this.userid=1;
		this.accessibility=1;
		this.basemapid=0;
		this.mapstyle = mapstyle;
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
	
}
