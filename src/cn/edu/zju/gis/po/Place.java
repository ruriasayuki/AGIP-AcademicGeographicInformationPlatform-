package cn.edu.zju.gis.po;

public class Place {
	private float longitude;//����
	private float latitude;//ά��
	
	public Place(float longitude, float latitude) {
		this.longitude = longitude;
		this.latitude = latitude;
	}
	
	public float getLongitude() {
		return longitude;
	}
	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}
	public float getLatitude() {
		return latitude;
	}
	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}
	
	
}
