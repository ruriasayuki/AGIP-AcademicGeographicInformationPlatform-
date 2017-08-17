package cn.edu.zju.gis.mapper;

import java.util.List;

import cn.edu.zju.gis.po.MapLayer;
import cn.edu.zju.gis.po.Maps;

public interface MapsMapper {
	public void createNewMap(Maps map);
	
	public Maps findMapById(int id);
	
	public int insertMap(Maps map);
	
	public int insertMapLayer(MapLayer layer);
	
	public int updateMap(Maps map);
	
	public int updateMapLayer(MapLayer layer);
	
	public List<MapLayer> findMapLayerByMapId(int mapid);
	
	public List<Maps> findMaps();
	
	public int deleteMaps(MapLayer layer);
}
