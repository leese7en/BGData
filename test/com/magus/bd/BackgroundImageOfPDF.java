package com.magus.bd;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * 使用iText生成PDF文件 在PDF文件中添加背景图片，并指定文本在PDF文件中的位置
 */
public class BackgroundImageOfPDF {

	public static void main(String[] args) {
		BackgroundImageOfPDF p001 = new BackgroundImageOfPDF();
		String filename = "P003.pdf";
		p001.createPDF(filename);
	}

	public void createPDF(String filename) {
		// step 1
		Document document = new Document(PageSize.A4.rotate(), 0, 0, 0, 0);
		// step 2
		try {
			PdfWriter pdfwriter = PdfWriter.getInstance(document, new FileOutputStream(filename));

			document.addTitle("ID.NET");
			document.addAuthor("dotuian");
			document.addSubject("This is the subject of the PDF file.");
			document.addKeywords("This is the keyword of the PDF file.");

			// step 3
			document.open();
			// step 4
			Image image = Image.getInstance("template/login.png");
			document.add(image);

			PdfContentByte pdfContentByte = pdfwriter.getDirectContent();
			pdfContentByte.beginText();
			BaseFont bf = BaseFont.createFont(BaseFont.TIMES_ROMAN, BaseFont.WINANSI, BaseFont.EMBEDDED);
			pdfContentByte.setFontAndSize(bf, 12);

			// for (int i = 0; i <= 842; i = i + 50) {
			// for (int j = 0; j <= 595; j = j + 20) {
			// pdfContentByte.setTextMatrix(i, j);
			// pdfContentByte.showText("(" + i + ":" + j + ")");
			// }
			// }

			pdfContentByte.endText();

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// step 5
			document.close();
		}
	}
}