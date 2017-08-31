package cn.edu.zju.gis.po;

public class MapsVo
{
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
	
	private int limit;
	private int offset;

	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public int getOffset() {
		return offset;
	}
	public void setOffset(int offset) {
		this.offset = offset;
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
