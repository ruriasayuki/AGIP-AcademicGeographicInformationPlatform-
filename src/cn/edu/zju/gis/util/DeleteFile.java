package cn.edu.zju.gis.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;

public class DeleteFile {
	public static void delete(BufferedReader bufferedReader,String storeLocation) {
		try {
			bufferedReader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		//É¾³ý´æ´¢µÄcsvÊý¾Ý
		File file = new File(storeLocation);
		file.delete();				
	}
}
