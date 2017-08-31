package cn.edu.zju.gis.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import cn.edu.zju.gis.mapper.LayersMapper;
import cn.edu.zju.gis.po.Layers;
import cn.edu.zju.gis.po.LayersExample;
import cn.edu.zju.gis.po.LayersVo;
import cn.edu.zju.gis.service.LayersService;

public class LayersServiceImpl implements LayersService {

	@Autowired
	private LayersMapper layersMapper;
	
	@Override
	public boolean addLayers(Layers layer) throws Exception {
		
		int i = layersMapper.myinsert(layer);
		if(i>0)
			return true;
		else
			return false;
	}

	@Override
	public List<Layers> searchLayers(String keyword, int type) throws Exception {
		LayersExample layersExample = new LayersExample();
		//ͨ��criteria�����ѯ����
		LayersExample.Criteria criteria = layersExample.createCriteria();
		//�������ö�������
//		criteria.andNameEqualTo(condition);
//		criteria.and
		//���ܷ��ض�����¼
		if(keyword != "") {
			System.out.println("������ͼ������ѯ����������������������");
			criteria.andLayernameLike("%"+keyword+"%");
		}
		if(type != 4) {
			System.out.println("������ͼ�����Ͳ�ѯ����������������������");
			criteria.andTypeEqualTo(type);
		}
		List<Layers> list = layersMapper.selectByExample(layersExample);
		return list;
	}

	@Override
	public List<Layers> getLayerList(LayersVo queryLayer) throws Exception{
		
		return layersMapper.findLayers(queryLayer);
	}

	@Override
	public int countLayers(LayersVo queryLayer) throws Exception{
		
		return layersMapper.countLayers(queryLayer);
	}
}
