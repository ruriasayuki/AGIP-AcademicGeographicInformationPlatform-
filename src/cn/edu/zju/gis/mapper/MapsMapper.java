package cn.edu.zju.gis.mapper;

import cn.edu.zju.gis.po.MapLayer;
import cn.edu.zju.gis.po.Maps;

public interface MapsMapper {
	public void createNewMap(Maps map);
	public Maps findMapById(int id);
	public void addLayerToMap(MapLayer twoid);
}
