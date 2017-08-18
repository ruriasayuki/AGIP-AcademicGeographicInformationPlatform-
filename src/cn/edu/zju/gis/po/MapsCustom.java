package cn.edu.zju.gis.po;

import java.util.List;

public class MapsCustom extends Maps {
	List<MapLayer> maplayer;
	public MapsCustom(Maps map)
	{
		super(map);
		maplayer=null;
	}
	public MapsCustom(int id,String mapname, int userid, int accessibility,
			int basemapid,String mapstyle) {
		super(id,mapname, userid, accessibility, basemapid,mapstyle);

	}
	public MapsCustom(int id,String mapname, int userid, int accessibility,
			int basemapid,String mapstyle,int addable,String layertree) {
		super(id,mapname, userid, accessibility, basemapid,mapstyle,addable,layertree);

	}
	public List<MapLayer> getMaplayer() {
		return maplayer;
	}
	public void setMaplayer(List<MapLayer> maplayer) {
		this.maplayer = maplayer;
	}
	
}
