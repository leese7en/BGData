package com.magus.bd.action;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResHotword;
import com.magus.bd.service.ResHotwordService;
import com.magus.bd.util.Message;
import com.magus.bd.util.ParseParameter;
import com.magus.bd.utils.DateUtils;
import com.magus.bd.utils.ResConst;

@Controller
public class ResHotwordAction extends BaseAction {
	private ResHotwordService service;

	Message message = null;

	public ResHotwordService getService() {
		return service;
	}

	@Autowired
	public void setService(ResHotwordService service) {
		this.service = service;
	}

	/**
	 * 查询 热词类型
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getHotwordType")
	public void getHotwordType(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<ResHotword> list = service.getHotwordType();
			response.getWriter().print(JSONArray.toJSON(list));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 查询 热词类型(大类)
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getBigHotwordType")
	public void getBigHotwordType(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<ResHotword> typeList = new ArrayList<ResHotword>();
			List<ResHotword> list = service.getHotwordType();
			for (ResHotword res : list) {
				if (res.getPreName().equals(res.getTypeName())) {
					typeList.add(res);
				}
			}
			response.getWriter().print(JSONArray.toJSON(typeList));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取热词类型
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getHotwordTypes")
	public void getHotwordTypes(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<ResHotword> typeList = new ArrayList<ResHotword>();
			List<ResHotword> list = service.getHotwordType();
			List<ResHotword> typeChildren = null;// 子菜单集合
			for (ResHotword res : list) {
				res.setId(res.getTypeId());
				res.setText(res.getTypeName());
				if (res.getTypeId().equals(res.getPreId())) {// 父节点
					typeChildren = new ArrayList<ResHotword>();
					for (ResHotword r : list) {// 子节点
						r.setId(r.getTypeId());
						r.setText(r.getTypeName());
						if (!r.getTypeId().equals(r.getPreId())) {
							if (res.getTypeId().equals(r.getPreId())) {
								typeChildren.add(r);
							}
						}
					}
					res.setChildren(typeChildren);
					typeList.add(res);
				}
			}
			response.getWriter().print(JSONObject.toJSON(typeList));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 查询 热词类型
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getReport")
	public void getReport(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<ResHotword> list = service.getReport();
			response.getWriter().print(JSONArray.toJSON(list));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取所有热词
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getHotwords")
	public void getHotwords(HttpServletRequest request, HttpServletResponse response) {
		ResHotword bean = new ResHotword();
		try {
			List<ResHotword> list = service.getHotwords(bean);
			response.getWriter().print(JSONArray.toJSON(list));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 查询 盟市排名
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/insertHotword")
	public void insertHotword(HttpServletRequest request, HttpServletResponse response) {
		try {
			String name = request.getParameter("name");
			String description = request.getParameter("description");
			String typeId = request.getParameter("hotwordType");
			ResHotword bean = new ResHotword();
			bean.setId(UUID.randomUUID().toString().toUpperCase());
			bean.setTypeId(typeId);
			bean.setName(name);
			bean.setCreateDate(DateUtils.format.format(new Date()));
			bean.setDescription(description);
			message = new Message();
			int flag = service.insertHotword(bean);
			if (flag == 1) {
				message.setFlag(0);
				message.setMessage(ResConst.NORMAL);
			} else {
				message.setFlag(-1);
				message.setMessage(ResConst.UNNORMAL);
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 查询 盟市排名
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/insertHotwordType")
	public void insertHotwordType(HttpServletRequest request, HttpServletResponse response) {
		try {
			String name = request.getParameter("name");
			String description = request.getParameter("description");
			String preId = request.getParameter("hotwordType");
			ResHotword bean = new ResHotword();
			bean.setId(UUID.randomUUID().toString().toUpperCase());
			bean.setPreId(preId);
			bean.setName(name);
			bean.setDescription(description);
			bean.setCreateDate(DateUtils.format.format(new Date()));
			message = new Message();
			int flag = service.insertHotwordType(bean);
			if (flag == 1) {
				message.setFlag(0);
				message.setMessage(ResConst.NORMAL);
			} else {
				message.setFlag(-1);
				message.setMessage(ResConst.UNNORMAL);
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 查询 盟市排名
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/insertHotPhrase")
	public void insertHotPhrase(HttpServletRequest request, HttpServletResponse response) {
		try {
			String name = request.getParameter("name");
			String description = request.getParameter("description");
			ResHotword bean = new ResHotword();
			bean.setId(UUID.randomUUID().toString().toUpperCase());
			bean.setName(name);
			bean.setDescription(description);
			bean.setCreateDate(DateUtils.format.format(new Date()));
			message = new Message();
			int flag = service.insertHotPhrase(bean);
			if (flag == 1) {
				message.setFlag(0);
				message.setMessage(ResConst.NORMAL);
			} else {
				message.setFlag(-1);
				message.setMessage(ResConst.UNNORMAL);
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 查询
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("blurryHotword")
	public void blurryHotword(HttpServletRequest request, HttpServletResponse response) {
		try {
			String cityId = request.getParameter("cityId");
			ParseParameter pp = ParseParameter.getParser();
			String psName = pp.parseString("psName", request);
			psName = URLDecoder.decode(psName, "UTF-8");
			String hotwordType = request.getParameter("hotwordType");
			String hotword = pp.parseString("hotword", request);
			hotword = URLDecoder.decode(hotword, "UTF-8");

			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			int pageNumber = Integer.parseInt(request.getParameter("pageNumber"));
			int pageSize = Integer.parseInt(request.getParameter("pageSize"));

			ResHotword bean = new ResHotword();
			if (!(hotwordType == null || "".equals(hotwordType) || "-1".equals(hotwordType))) {
				// 判断是不是大类
				ResHotword type = service.getHotwordTypeById(hotwordType);
				if (hotwordType.equals(type.getPreId())) {
					bean.setIsPre("yes");
				}
				bean.setTypeId(hotwordType);
			}
			if (!(cityId == null || "".equals(cityId) || "-1".equals(cityId))) {
				bean.setCityId(cityId);
			}
			bean.setName(hotword);
			bean.setPsName(psName);
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			bean.setPageNumber((pageNumber - 1) * pageSize);
			bean.setPageSize(pageSize);
			List<ResHotword> beans = service.blurryHotword(bean);
			int count = service.blurryHotwordCount(bean);
			JSONObject o = new JSONObject();
			o.put("total", count);
			o.put("rows", beans);
			response.getWriter().print(JSONArray.toJSON(o));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取热词频次最高 的几个词(根据条件模糊查找)
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/countHotwordTimesByWords")
	public void countHotwordTimesByWords(HttpServletRequest request, HttpServletResponse response) {
		try {
			String typeId = request.getParameter("typeId");
			String startTime = request.getParameter("startTime");
			String endTime = request.getParameter("endTime");
			ResHotword bean = new ResHotword();
			if (typeId != null && !typeId.equals("-1")) {
				// 判断是不是大类
				ResHotword type = service.getHotwordTypeById(typeId);
				if (typeId.equals(type.getPreId())) {
					bean.setIsPre("yes");
				}
				bean.setTypeId(typeId);
			}
			if (startTime != null && !"".equals(startTime)) {
				bean.setBeginTime(startTime);
			}
			if (endTime != null && !"".equals(endTime)) {
				bean.setEndTime(endTime);
			}
			JSONObject object = service.countHotwordTimesByWords(bean);
			response.getWriter().print(JSONArray.toJSON(object));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 查询 盟市排名
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("blurryHotPhrase")
	public void blurryHotPhrase(HttpServletRequest request, HttpServletResponse response) {
		try {
			String name = request.getParameter("name");
			String description = request.getParameter("description");
			ResHotword bean = new ResHotword();
			bean.setName(name);
			bean.setDescription(description);
			List<ResHotword> list = service.blurryHotPhrase(bean);
			response.getWriter().print(JSONArray.toJSON(list));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 查询 盟市排名
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/insertHotwordEnterprise")
	public void insertHotwordEnterprise(HttpServletRequest request, HttpServletResponse response) {
		try {
			String hotwordId = request.getParameter("hotwordId");
			String psCode = request.getParameter("psCode");
			int reportId = Integer.parseInt(request.getParameter("reportId"));
			String url = request.getParameter("url");
			String time = request.getParameter("time");
			String description = request.getParameter("description");
			String outputCode = request.getParameter("outputCode");
			ResHotword bean = new ResHotword();
			bean.setId(hotwordId);
			bean.setPsCode(psCode);
			bean.setReportId(reportId);
			bean.setUrl(url);
			bean.setOutputCode(outputCode);
			bean.setTime(time);
			bean.setDescription(description);
			bean.setCreateDate(DateUtils.format.format(new Date()));
			message = new Message();
			int flag = service.insertHotwordEnterprise(bean);
			if (flag == 1) {
				message.setFlag(0);
				message.setMessage(ResConst.NORMAL);
			} else {
				message.setFlag(-1);
				message.setMessage(ResConst.UNNORMAL);
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 热词分析查询
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getHotwordFrequencyYear")
	public void getHotwordFrequencyYear(HttpServletRequest request, HttpServletResponse response) {
		try {
			String year = request.getParameter("year");
			String cityId = request.getParameter("cityId");
			ResHotword bean = new ResHotword();
			bean.setDate(year);
			bean.setCityId(cityId);
			JSONObject object = service.getHotwordFrequencyYear(bean);
			message = new Message();
			if (object == null) {
				message.setFlag(-1);
				message.setMessage("没有满足条件的数据");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
			message.setFlag(0);
			message.setData(object);
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取热词频次最高 的几个词
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/countHotwordTimes")
	public void countHotwordTimes(HttpServletRequest request, HttpServletResponse response) {
		try {
			ResHotword bean = new ResHotword();
			JSONObject object = service.countHotwordTimes(bean);
			response.getWriter().print(JSONArray.toJSON(object));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 根据热词类型 统计热词信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/countHotwordByType")
	public void countHotwordByType(HttpServletRequest request, HttpServletResponse response) {
		try {
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			ResHotword bean = new ResHotword();
			bean.setTypeId("1");
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			JSONObject object = service.countHotwordByType(bean);
			bean.setFlag("0");
			JSONObject objectCity = service.countHotwordCityInfoByType(bean);
			JSONObject oo = new JSONObject();
			oo.put("type", object);
			oo.put("city", objectCity);
			response.getWriter().print(JSONArray.toJSON(oo));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 根据热词类型 统计热词信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/countHotwordCityInfoByType")
	public void countHotwordCityInfoByType(HttpServletRequest request, HttpServletResponse response) {
		try {
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			String typeId = request.getParameter("typeId");
			String flag = request.getParameter("flag");
			ResHotword bean = new ResHotword();
			bean.setTypeId(typeId);
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			bean.setFlag(flag);
			JSONObject object = service.countHotwordCityInfoByType(bean);
			response.getWriter().print(JSONArray.toJSON(object));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 根据热词类型 统计热词信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/countHotwordPSCodeInfoByType")
	public void countHotwordPSCodeInfoByType(HttpServletRequest request, HttpServletResponse response) {
		try {
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			String typeId = request.getParameter("typeId");
			String cityId = request.getParameter("cityId");
			String flag = request.getParameter("flag");
			ResHotword bean = new ResHotword();
			bean.setTypeId(typeId);
			bean.setCityId(cityId);
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			bean.setFlag(flag);
			JSONObject object = service.countHotwordPSCodeInfoByTypeDetail(bean);
			response.getWriter().print(JSONArray.toJSON(object));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 编辑电厂里面的热词绑定
	 */
	@RequestMapping("/getAllHotWord")
	public void getAllHotWord(HttpServletRequest request, HttpServletResponse response) {

	}
}
