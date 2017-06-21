package com.magus.bd;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfCopy;
import com.itextpdf.text.pdf.PdfImportedPage;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * 描述：TODO 【JAVA生成PDF】
 * <p>
 * 
 * @title GeneratePDF
 * @author SYJ
 * @email songyanjun_stars@126.com
 * @date 2013-4-6
 * @version V1.0
 */
public class PdfDeal {
	private static final int N = 3;

	public static void main(String[] args) {
		PdfDeal p001 = new PdfDeal();
		String[] files = { "P001V.pdf", "P001H.pdf" };
		String savepath = "P001.pdf";
		p001.createPDFV(files[0]);
		p001.createPDFH(files[1]);
		mergePdfFiles(files, savepath);
	}

	public void createPDFV(String filename) {
		// step 1
		Document document = new Document(PageSize.A4);
		// step 2
		try {
			PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(filename));
			document.addTitle("超低排放研究方案");
			document.addAuthor("dotuian");
			document.addSubject("This is the subject of the PDF file.");
			document.addKeywords("This is the keyword of the PDF file.");
			// step 3
			document.open();
			// step 4
			BaseFont titleFont = BaseFont.createFont(BaseFont.HELVETICA, "Cp1252", false);
			BaseFont baseFont = BaseFont.createFont("C:/Windows/Fonts/SIMYOU.TTF", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
			// baseFont = BaseFont.createFont("STSong-Light",
			// BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
			Font font = new Font(baseFont, 40, Font.BOLD);
			Paragraph paraGraph = new Paragraph("\n\n全区装机容量 30 万千瓦以上机组超低排放实施减排效果预测研究报告", font);
			paraGraph.setAlignment(1);
			document.add(paraGraph);
			font = new Font(baseFont, 24, Font.BOLD);
			paraGraph = new Paragraph("\n\n\n\n二零一六年七月十三日", font);
			paraGraph.setAlignment(1);
			document.add(paraGraph);
			document.newPage();
			font = new Font(baseFont, 16, Font.NORMAL);
			paraGraph = new Paragraph("一、 编制说明", font);
			document.add(paraGraph);
			paraGraph = new Paragraph(
					"\t为贯彻落实环境保护部、国家发展改革委、国家能源局《关于印发〈全面实施燃煤电厂超低排放和节能改造工作方案〉的通知》（环发〔 2015〕 164 号）要求，加快自治区燃煤电厂超低排放改造进程，有序推进改造工作，自治区环境保护厅组织制定了《内蒙古自治区实施燃煤电厂超低排放改造工作方案》。",
					font);
			paraGraph.setFirstLineIndent(35f);
			document.add(paraGraph);
			paraGraph = new Paragraph("\t为预测全区 30 万千瓦以上机组执行超低排放后，全区三项大气污染物排放总量减排的效果，预测因此置换出相应的环境容量空间， 为新建项目总量核定提供决策支持，特编制本研究报告。", font);
			paraGraph.setFirstLineIndent(35f);
			document.add(paraGraph);
			paraGraph = new Paragraph("\t编制人：杨华", font);
			paraGraph.setFirstLineIndent(35f);
			document.add(paraGraph);
			paraGraph = new Paragraph("\t编制日期：2016-07-31", font);
			paraGraph.setFirstLineIndent(35f);
			document.add(paraGraph);
			paraGraph = new Paragraph("二、 超低排放实施进度", font);
			document.add(paraGraph);
			paraGraph = new Paragraph("1、 已完成改造的机组", font);
			paraGraph.setFirstLineIndent(35f);
			document.add(paraGraph);
			paraGraph = new Paragraph("截至 2016 年 7 月 13 日， 已完成超低排放改造的机组共 2 台， 总装机容量为 2 MW，列表如下：", font);
			paraGraph.setFirstLineIndent(35f);
			document.add(paraGraph);
			font = new Font(baseFont, 16, Font.NORMAL);
			PdfPTable table = new PdfPTable(7);
			table.setWidthPercentage(288 / 3);
			table.setSpacingBefore(10f);
			table.setSpacingAfter(10f);
			PdfPCell cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("盟市", font));
			table.addCell(cell);
			table.addCell(new Phrase("集团", font));
			table.addCell(new Phrase("企业名称", font));
			table.addCell(new Phrase("机组", font));
			table.addCell(new Phrase("装机容量(MW)", font));
			table.addCell(new Phrase("改造开始时间", font));
			table.addCell(new Phrase("改造结束时间", font));
			table.addCell(new Phrase("呼和浩特", font));
			table.addCell(new Phrase("大唐", font));
			table.addCell(new Phrase("大唐托克托", font));
			table.addCell(new Phrase("1号", font));
			table.addCell(new Phrase("600", font));
			table.addCell(new Phrase("2015-12", font));
			table.addCell(new Phrase("2016-02", font));
			table.addCell(new Phrase("呼和浩特", font));
			table.addCell(new Phrase("大唐", font));
			table.addCell(new Phrase("大唐托克托", font));
			table.addCell(new Phrase("2号", font));
			table.addCell(new Phrase("600", font));
			table.addCell(new Phrase("2016-09", font));
			table.addCell(new Phrase("2016-12", font));
			document.add(table);
			paraGraph = new Paragraph("2、改造中的机组", font);
			paraGraph.setFirstLineIndent(35f);
			document.add(paraGraph);
			paraGraph = new Paragraph("截至 2016 年 7 月 13 日， 正在改造中的机组共 2 台， 总装机容量为 2 MW，列表如下：", font);
			paraGraph.setFirstLineIndent(35f);
			document.add(paraGraph);
			font = new Font(baseFont, 16, Font.NORMAL);
			table = new PdfPTable(7);
			table.setWidthPercentage(288 / 3);
			table.setSpacingBefore(10f);
			table.setSpacingAfter(10f);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("盟市", font));
			table.addCell(cell);
			table.addCell(new Phrase("集团", font));
			table.addCell(new Phrase("企业名称", font));
			table.addCell(new Phrase("机组", font));
			table.addCell(new Phrase("装机容量(MW)", font));
			table.addCell(new Phrase("改造开始时间", font));
			table.addCell(new Phrase("改造结束时间", font));
			table.addCell(new Phrase("呼和浩特", font));
			table.addCell(new Phrase("大唐", font));
			table.addCell(new Phrase("大唐托克托", font));
			table.addCell(new Phrase("1号", font));
			table.addCell(new Phrase("600", font));
			table.addCell(new Phrase("2015-12", font));
			table.addCell(new Phrase("2016-02", font));
			table.addCell(new Phrase("呼和浩特", font));
			table.addCell(new Phrase("大唐", font));
			table.addCell(new Phrase("大唐托克托", font));
			table.addCell(new Phrase("2号", font));
			table.addCell(new Phrase("600", font));
			table.addCell(new Phrase("2016-09", font));
			table.addCell(new Phrase("2016-12", font));
			document.add(table);
			paraGraph = new Paragraph("3、计划改造的机组", font);
			paraGraph.setFirstLineIndent(35f);
			document.add(paraGraph);
			paraGraph = new Paragraph("已经制定了改造计划的机组共 2 台， 总装机容量为 2 MW，列表如下：", font);
			paraGraph.setFirstLineIndent(35f);
			document.add(paraGraph);
			font = new Font(baseFont, 16, Font.NORMAL);
			table = new PdfPTable(7);
			table.setWidthPercentage(288 / 3);
			table.setSpacingBefore(10f);
			table.setSpacingAfter(10f);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("盟市", font));
			table.addCell(cell);
			table.addCell(new Phrase("集团", font));
			table.addCell(new Phrase("企业名称", font));
			table.addCell(new Phrase("机组", font));
			table.addCell(new Phrase("装机容量(MW)", font));
			table.addCell(new Phrase("改造开始时间", font));
			table.addCell(new Phrase("改造结束时间", font));
			table.addCell(new Phrase("呼和浩特", font));
			table.addCell(new Phrase("大唐", font));
			table.addCell(new Phrase("大唐托克托", font));
			table.addCell(new Phrase("1号", font));
			table.addCell(new Phrase("600", font));
			table.addCell(new Phrase("2015-12", font));
			table.addCell(new Phrase("2016-02", font));
			table.addCell(new Phrase("呼和浩特", font));
			table.addCell(new Phrase("大唐", font));
			table.addCell(new Phrase("大唐托克托", font));
			table.addCell(new Phrase("2号", font));
			table.addCell(new Phrase("600", font));
			table.addCell(new Phrase("2016-09", font));
			table.addCell(new Phrase("2016-12", font));
			document.add(table);
			paraGraph = new Paragraph("4、 已完成改造的机组", font);
			paraGraph.setFirstLineIndent(35f);
			document.add(paraGraph);
			paraGraph = new Paragraph("规划新建的机组共 2 台， 总装机容量为 2 MW，列表如下：", font);
			paraGraph.setFirstLineIndent(35f);
			document.add(paraGraph);
			font = new Font(baseFont, 16, Font.NORMAL);
			table = new PdfPTable(7);
			table.setWidthPercentage(288 / 3);
			table.setSpacingBefore(10f);
			table.setSpacingAfter(10f);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("盟市", font));
			table.addCell(cell);
			table.addCell(new Phrase("集团", font));
			table.addCell(new Phrase("企业名称", font));
			table.addCell(new Phrase("机组", font));
			table.addCell(new Phrase("装机容量(MW)", font));
			table.addCell(new Phrase("改造开始时间", font));
			table.addCell(new Phrase("改造结束时间", font));
			table.addCell(new Phrase("呼和浩特", font));
			table.addCell(new Phrase("大唐", font));
			table.addCell(new Phrase("大唐托克托", font));
			table.addCell(new Phrase("1号", font));
			table.addCell(new Phrase("600", font));
			table.addCell(new Phrase("2015-12", font));
			table.addCell(new Phrase("2016-02", font));
			table.addCell(new Phrase("呼和浩特", font));
			table.addCell(new Phrase("大唐", font));
			table.addCell(new Phrase("大唐托克托", font));
			table.addCell(new Phrase("2号", font));
			table.addCell(new Phrase("600", font));
			table.addCell(new Phrase("2016-09", font));
			table.addCell(new Phrase("2016-12", font));
			document.add(table);

			paraGraph = new Paragraph("三、 预测结果", font);
			document.add(paraGraph);
			paraGraph = new Paragraph("预测结果如下表:", font);
			paraGraph.setFirstLineIndent(35f);
			document.add(paraGraph);
			font = new Font(baseFont, 16, Font.NORMAL);
			table = new PdfPTable(7);
			table.setWidthPercentage(288 / 3);
			table.setSpacingBefore(10f);
			table.setSpacingAfter(10f);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("年份", font));
			table.addCell(cell);
			table.addCell(new Phrase("预测排放量(t)", font));
			table.addCell(new Phrase("预计消减量(t)", font));
			table.addCell(new Phrase("装机容量", font));
			table.addCell(new Phrase("装机容量(MW)", font));
			cell.setPhrase(new Phrase("2016", font));
			table.addCell(cell);
			table.addCell(new Phrase("预测排放量(t)", font));
			table.addCell(new Phrase("预计消减量(t)", font));
			table.addCell(new Phrase("装机容量", font));
			table.addCell(new Phrase("装机容量(MW)", font));
			cell.setPhrase(new Phrase("2017", font));
			table.addCell(cell);
			table.addCell(new Phrase("预测排放量(t)", font));
			table.addCell(new Phrase("预计消减量(t)", font));
			table.addCell(new Phrase("装机容量", font));
			table.addCell(new Phrase("装机容量(MW)", font));
			cell.setPhrase(new Phrase("2018", font));
			table.addCell(cell);
			table.addCell(new Phrase("预测排放量(t)", font));
			table.addCell(new Phrase("预计消减量(t)", font));
			table.addCell(new Phrase("装机容量", font));
			table.addCell(new Phrase("装机容量(MW)", font));
			cell.setPhrase(new Phrase("2019", font));
			table.addCell(cell);
			table.addCell(new Phrase("预测排放量(t)", font));
			table.addCell(new Phrase("预计消减量(t)", font));
			table.addCell(new Phrase("装机容量", font));
			table.addCell(new Phrase("装机容量(MW)", font));
			cell.setPhrase(new Phrase("2020", font));
			table.addCell(cell);
			table.addCell(new Phrase("预测排放量(t)", font));
			table.addCell(new Phrase("预计消减量(t)", font));
			table.addCell(new Phrase("装机容量", font));
			table.addCell(new Phrase("装机容量(MW)", font));
			document.add(table);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		} finally {
			// step 5
			document.close();
			System.err.println("the end!");
		}
	}

	public void createPDFH(String filename) {
		// step 1
		Document document = new Document(PageSize.A4.rotate());
		// step 2
		try {
			PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(filename));
			document.addTitle("超低排放研究方案");
			document.addAuthor("dotuian");
			document.addSubject("This is the subject of the PDF file.");
			document.addKeywords("This is the keyword of the PDF file.");
			// step 3
			document.open();
			// step 4
			BaseFont titleFont = BaseFont.createFont(BaseFont.HELVETICA, "Cp1252", false);
			BaseFont baseFont = BaseFont.createFont("C:/Windows/Fonts/SIMYOU.TTF", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
			// baseFont = BaseFont.createFont("STSong-Light",
			// BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
			Font font = new Font(baseFont, 16, Font.NORMAL);
			Paragraph paraGraph = new Paragraph("火电厂污染物预计减排量明细表", font);
			paraGraph.setAlignment(1);
			document.add(paraGraph);
			paraGraph = new Paragraph("预测年份： 2016 年\t 预测污染物： 二氧化硫 编制日期： 2016.7.12", font);
			paraGraph.setAlignment(1);
			document.add(paraGraph);
			font = new Font(baseFont, 12, Font.NORMAL);
			PdfPTable table = new PdfPTable(22);
			PdfPCell cell = new PdfPCell();
			table = new PdfPTable(22);
			table.setWidthPercentage(288 / 3);
			table.setSpacingBefore(10f);
			table.setSpacingAfter(10f);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("盟市", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("集团", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("企业名称", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("机组", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("装机容量(MW)", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("改造时间", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("完成时间", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("指标", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("1月", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("2月", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("3月", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("4月", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("5月", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("6月", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("7月", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("8月", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("9月", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("10月", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("11月", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("12月", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("合计/平均", font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase("预计消减量", font));
			table.addCell(cell);
			document.add(table);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		} finally {
			// step 5
			document.close();
			System.err.println("the end!");
		}
	}

	public static void mergePdfFiles(String[] files, String savepath) {
		try {
			Document document = new Document(new PdfReader(files[0]).getPageSize(1));
			PdfCopy copy = new PdfCopy(document, new FileOutputStream(savepath));
			document.open();
			for (int i = 0; i < files.length; i++) {
				PdfReader reader = new PdfReader(files[i]);

				int n = reader.getNumberOfPages();

				for (int j = 1; j <= n; j++) {
					document.newPage();
					PdfImportedPage page = copy.getImportedPage(reader, j);
					copy.addPage(page);
				}
			}

			document.close();

		} catch (IOException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		}
	}

	public static void partitionPdfFile(String filepath) {
		Document document = null;
		PdfCopy copy = null;

		try {
			PdfReader reader = new PdfReader(filepath);

			int n = reader.getNumberOfPages();

			if (n < N) {
				System.out.println("The document does not have " + N + " pages to partition !");
				return;
			}

			int size = n / N;
			String staticpath = filepath.substring(0, filepath.lastIndexOf("\\") + 1);
			String savepath = null;
			ArrayList<String> savepaths = new ArrayList<String>();
			for (int i = 1; i <= N; i++) {
				if (i < 10) {
					savepath = filepath.substring(filepath.lastIndexOf("\\") + 1, filepath.length() - 4);
					savepath = staticpath + savepath + "0" + i + ".pdf";
					savepaths.add(savepath);
				} else {
					savepath = filepath.substring(filepath.lastIndexOf("\\") + 1, filepath.length() - 4);
					savepath = staticpath + savepath + i + ".pdf";
					savepaths.add(savepath);
				}
			}

			for (int i = 0; i < N - 1; i++) {
				document = new Document(reader.getPageSize(1));
				copy = new PdfCopy(document, new FileOutputStream(savepaths.get(i)));
				document.open();
				for (int j = size * i + 1; j <= size * (i + 1); j++) {
					document.newPage();
					PdfImportedPage page = copy.getImportedPage(reader, j);
					copy.addPage(page);
				}
				document.close();
			}

			document = new Document(reader.getPageSize(1));
			copy = new PdfCopy(document, new FileOutputStream(savepaths.get(N - 1)));
			document.open();
			for (int j = size * (N - 1) + 1; j <= n; j++) {
				document.newPage();
				PdfImportedPage page = copy.getImportedPage(reader, j);
				copy.addPage(page);
			}
			document.close();

		} catch (IOException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		}
	}
}
