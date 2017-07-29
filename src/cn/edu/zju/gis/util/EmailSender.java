package cn.edu.zju.gis.util;

import java.util.*;
import java.io.IOException;
import javax.servlet.http.*;
import javax.servlet.ServletException;

import javax.mail.Session;
import javax.mail.Message;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.InternetAddress;
import javax.mail.Transport;
import org.apache.commons.mail.*;

public class EmailSender {
	
	String myaddress="";
	public EmailSender(String myaddress){
		this.myaddress=myaddress;
		System.out.println(this.myaddress);
	}
	public String toString() {
		return myaddress;
	}
	
	
	
	public void sendemail2address(String addrees2send,String checkcode) {
		
		SimpleEmail email = new SimpleEmail();
		email.setHostName("smtp.163.com");
		email.setAuthentication(myaddress, "");
		try{
			email.setCharset("UTF-8");
			email.addTo(addrees2send);
			email.setFrom(myaddress+"@163.com");
			email.setSubject("上古地图-验证码");
			
			
			email.setMsg("验证码："+checkcode);//4位验证码
			email.send();
		} 
		catch (EmailException e) {
			e.printStackTrace();
			//request.setAttribute("sendmail.message", "邮件发送不成功！");
		}		
	}
}
