package cn.edu.zju.gis.po;

public class MapLayer extends Layers{
	int mlid;
	int mapid;
	int layerid;
	boolean state;
	String style;
	int zIndex;
	public MapLayer(int mapid, int layerid)
	{
		this.mapid=mapid;
		this.layerid=layerid;
		state=true;
		style=null;
		zIndex=0;
	}
	public int getMapLayerId() {
		return this.mlid;
	}
	public void setId(int id) {
		this.mlid = id;
	}
	public int getMapid() {
		return mapid;
	}
	public void setMapid(int mapid) {
		this.mapid = mapid;
	}
	public int getLayerid() {
		return layerid;
	}
	public void setLayerid(int layerid) {
		this.layerid = layerid;
	}
	public boolean isState() {
		return state;
	}
	public void setState(boolean state) {
		this.state = state;
	}
	public String getStyle() {
		return style;
	}
	public void setStyle(String style) {
		this.style = style;
	}
	public int getzIndex() {
		return zIndex;
	}
	public void setzIndex(int zIndex) {
		this.zIndex = zIndex;
	}
	
}
