package cn.edu.zju.gis.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import cn.edu.zju.gis.mapper.MapsMapper;
import cn.edu.zju.gis.po.MapLayer;
import cn.edu.zju.gis.po.Maps;
import cn.edu.zju.gis.service.MapsService;

public class MapsServiceImpl implements MapsService{

	@Autowired
	private MapsMapper mapsMapper;
	
	@Override
	public void createnewmap(Maps map) throws Exception {
		mapsMapper.createNewMap(map);
	}

	@Override
	public Maps findMapById(int id) throws Exception {
		Maps map = mapsMapper.findMapById(id);
		return map;
	}

	@Override
	public void addLayerToMap(MapLayer twoid) throws Exception {
		mapsMapper.addLayerToMap(twoid);
	}
	
}
