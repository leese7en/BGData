package com.magus.bd.servlet;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.magus.bd.util.ParseParameter;

public class FileDownloadServlet extends BaseServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response) {
		InputStream in = null;
		OutputStream out = null;
		try {
			String filePath = request.getParameter("filePath");
			ParseParameter pp = ParseParameter.getParser();
			String fileName = pp.parseString("fileName", request);
			fileName = URLDecoder.decode(fileName, "UTF-8");
			// 设置文件MIME类型
			response.setContentType(getServletContext().getMimeType(fileName));
			// System.out.println(filename+"==");
			// 设置Content-Disposition
			response.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes("utf-8"), "ISO_8859_1"));
			// 读取目标文件，通过response将目标文件写到客户端
			// 获取目标文件的绝对路径
			String fullFileName = getServletContext().getRealPath("/" + filePath + "/" + fileName);
			// System.out.println(fullFileName);
			// 读取文件
			in = new FileInputStream(fullFileName);
			out = response.getOutputStream();

			// 写文件
			int b;
			while ((b = in.read()) != -1) {
				out.write(b);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				in.close();
				out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		doGet(request, response);
	}
}
