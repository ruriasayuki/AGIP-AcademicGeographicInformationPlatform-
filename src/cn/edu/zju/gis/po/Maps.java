package cn.edu.zju.gis.po;

public class Maps {
	int id;
	String mapname;
	int userid;
	int accessibility;
	float centerx;
	float centery;
	int zoomlevel;
	int basemapid;
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
		this.centerx=map.centerx;
		this.centery=map.centery;
		this.zoomlevel=map.zoomlevel;
		this.basemapid=map.basemapid;
	}
	public Maps(String mapname,int userid,int accessibility,float centerx,float centery,int zoomlevel,int basemapid)
	{
		this.id=0;
		this.mapname=mapname;
		this.userid=userid;
		this.accessibility=accessibility;
		this.centerx=centerx;
		this.centery=centery;
		this.zoomlevel=zoomlevel;
		this.basemapid=basemapid;
	}
	public Maps(int id,String mapname,int userid,int accessibility,float centerx,float centery,int zoomlevel,int basemapid)
	{
		this.id=id;
		this.mapname=mapname;
		this.userid=userid;
		this.accessibility=accessibility;
		this.centerx=centerx;
		this.centery=centery;
		this.zoomlevel=zoomlevel;
		this.basemapid=basemapid;
	}
	
	public Maps(int id,String mapname,float centerx,float centery,int zoomlevel)
	{
		this.id = id;
		this.mapname = mapname;
		this.userid=1;
		this.accessibility=1;
		this.centerx = centerx;
		this.centery = centery;
		this.zoomlevel = zoomlevel;
		this.basemapid=0;
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
	public float getCenterx() {
		return centerx;
	}
	public void setCenterx(float centerx) {
		this.centerx = centerx;
	}
	public float getCentery() {
		return centery;
	}
	public void setCentery(float centery) {
		this.centery = centery;
	}
	public int getZoomlevel() {
		return zoomlevel;
	}
	public void setZoomlevel(int zoomlevel) {
		this.zoomlevel = zoomlevel;
	}
	public int getBasemapid() {
		return basemapid;
	}
	public void setBasemapid(int basemapid) {
		this.basemapid = basemapid;
	}
	
}
