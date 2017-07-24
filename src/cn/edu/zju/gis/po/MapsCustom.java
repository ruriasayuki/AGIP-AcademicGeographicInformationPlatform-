package cn.edu.zju.gis.po;

import java.util.List;

public class MapsCustom extends Maps {
	List<MapLayer> maplayer;
	public MapsCustom(Maps map)
	{
		super(map);
		maplayer=null;
	}
	public MapsCustom(String mapname, int userid, int accessibility, float centerx, float centery, int zoomlevel,
			int basemapid) {
		super(mapname, userid, accessibility, centerx, centery, zoomlevel, basemapid);
		maplayer=null;
	}
	public MapsCustom(int id,String mapname, int userid, int accessibility, float centerx, float centery, int zoomlevel,
			int basemapid) {
		super(id,mapname, userid, accessibility, centerx, centery, zoomlevel, basemapid);

	}
	public List<MapLayer> getMaplayer() {
		return maplayer;
	}
	public void setMaplayer(List<MapLayer> maplayer) {
		this.maplayer = maplayer;
	}
	
}
