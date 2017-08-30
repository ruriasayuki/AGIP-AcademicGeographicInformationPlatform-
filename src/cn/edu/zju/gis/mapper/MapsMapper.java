package cn.edu.zju.gis.mapper;

import java.util.List;

import cn.edu.zju.gis.po.MapLayer;
import cn.edu.zju.gis.po.Maps;
import cn.edu.zju.gis.po.MapsVo;

public interface MapsMapper {
	public Maps findMapById(int id);
	
	public int deleteMapById(int id);
	
	public int insertMap(Maps map);
	
	public int insertMapLayer(MapLayer layer);
	
	public int updateMap(Maps map);
	
	public int updateMapLayer(MapLayer layer);
	
	public List<MapLayer> findMapLayerByMapId(int mapid);
	
	public List<Maps> findMaps();
	
	public List<Maps> findMaps2(MapsVo maps);
	
	public int deleteMaps(MapLayer layer);//这个是在地图的图层更新的时候删除地图里面已经没有了的图层

	public int countMaps();
}
