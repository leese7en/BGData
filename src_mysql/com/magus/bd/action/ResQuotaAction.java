package com.magus.bd.action;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResBaseInfo;
import com.magus.bd.entity.ResQuota;
import com.magus.bd.service.ResQuotaService;
import com.magus.bd.util.Message;
import com.magus.bd.util.ParseParameter;
import com.magus.bd.utils.ResQuotaUtils;

@Controller
public class ResQuotaAction extends BaseAction {
	private ResQuotaService service;

	Message message = null;

	public ResQuotaService getServices() {
		return service;
	}

	@Autowired
	public void setServices(ResQuotaService service) {
		this.service = service;
	}

	/**
	 * 获取 指标
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getQuotaBase")
	public void getQuotaBase(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<ResQuota> beans = service.getQuotaBase();
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取 指标
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getPSType")
	public void getPSType(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<ResQuota> beans = service.getPSType();
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取企业
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getEnterprise")
	public void getEnterprise(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<ResQuota> beans = service.getEnterprise();
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 模糊查询分析结果
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getQuotaTop")
	public void blurryBIResult(HttpServletRequest request, HttpServletResponse response) {
		try {
			String date = request.getParameter("date");
			String cityId = request.getParameter("cityId");
			ResQuota bean = new ResQuota();
			bean.setDate(date);
			if (!(cityId == null || "-1".equals(cityId) || "".equals(cityId))) {
				bean.setCityId(cityId);
			}
			JSONObject object = service.getQuotaTop(bean);
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
	 * 获取对应时间的行业得分信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getQuotaPSType")
	public void getQuotaPSType(HttpServletRequest request, HttpServletResponse response) {
		try {
			String date = request.getParameter("date");
			String cityId = request.getParameter("cityId");
			ResQuota bean = new ResQuota();
			bean.setDate(date);
			if (!(cityId == null || "-1".equals(cityId) || "".equals(cityId))) {
				bean.setCityId(cityId);
			}
			JSONObject object = service.getQuotaPSType(bean);
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
	 * 获取盟市纬度的数据 结果
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getImproveCity")
	public void getImproveCity(HttpServletRequest request, HttpServletResponse response) {
		try {
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			ResQuota bean = new ResQuota();
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			List<ResQuota> beans = service.getImproveCity(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取区间内的统计信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getImproveCityDetailSta")
	public void getImproveCityDetailSta(HttpServletRequest request, HttpServletResponse response) {
		try {
			String cityId = request.getParameter("cityId");
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			ResQuota bean = new ResQuota();
			bean.setCityId(cityId);
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			ResQuota quota = service.getImproveCityDetailSta(bean);
			JSONObject o = ResQuotaUtils.formatQuotaInfo(quota);
			response.getWriter().print(JSONArray.toJSON(o));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取区间内的统计信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getImproveCityDetailInterval")
	public void getImproveCityDetailInterval(HttpServletRequest request, HttpServletResponse response) {
		try {
			String cityId = request.getParameter("cityId");
			String year = request.getParameter("year");
			String beginMonth = request.getParameter("beginMonth");
			String endMonth = request.getParameter("endMonth");
			ResQuota bean = new ResQuota();
			bean.setCityId(cityId);
			bean.setBeginTime(beginMonth);
			bean.setEndTime(endMonth);
			bean.setDate(year);
			List<ResQuota> quota = service.getImproveCityDetailInterval(bean);
			JSONObject o = ResQuotaUtils.formatQuotasInfo(quota);
			response.getWriter().print(JSONArray.toJSON(o));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取盟市纬度的数据 结果
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getImprovePSType")
	public void getImprovePSType(HttpServletRequest request, HttpServletResponse response) {
		try {
			// ParseParameter pp = ParseParameter.getParser();
			// waterOrGas = URLDecoder.decode(waterOrGas, "UTF-8");
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			ResQuota bean = new ResQuota();
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			List<ResQuota> quota = service.getImprovePSType(bean);
			response.getWriter().print(JSONArray.toJSON(quota));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 行业类型 明细
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getImprovePSTypeDetailSta")
	public void getImprovePSTypeDetailSta(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String psType = pp.parseString("psType", request);
			psType = URLDecoder.decode(psType, "UTF-8");
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			ResQuota bean = new ResQuota();
			bean.setPsType(psType);
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			ResQuota quota = service.getImprovePSTypeDetailSta(bean);
			JSONObject o = ResQuotaUtils.formatQuotaInfo(quota);
			response.getWriter().print(JSONArray.toJSON(o));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取盟市纬度的数据 结果
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getImproveRes")
	public void getImproveRes(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String psName = pp.parseString("psName", request);
			psName = URLDecoder.decode(psName, "UTF-8");
			String cityId = request.getParameter("cityId");
			// String waterOrGas = pp.parseString("waterOrGas", request);
			// waterOrGas = URLDecoder.decode(waterOrGas, "UTF-8");
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			String pageNumber = request.getParameter("pageNumber");
			String pageSize = request.getParameter("pageSize");
			ResQuota bean = new ResQuota();
			if (!("".equals(cityId) || "-1".equals(cityId))) {
				bean.setCityId(cityId);
			}
			bean.setPsName(psName);
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			bean.setPageNumber(Integer.parseInt(pageNumber));
			bean.setPageSize(Integer.parseInt(pageSize));

			int number = Integer.parseInt(pageNumber);
			int size = Integer.parseInt(pageSize);
			List<ResQuota> beans = service.getImproveRes(bean);
			JSONObject object = new JSONObject();
			if (beans != null) {
				int count = beans.size();
				object.put("total", count);
				int begin = (number - 1) * size;
				int end = number * size;
				if (count < end) {
					end = count;
				}
				object.put("rows", beans.subList(begin, end));
			}
			response.getWriter().print(JSONArray.toJSON(object));

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 行业类型 明细
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getImproveResDetailSta")
	public void getImproveResDetailSta(HttpServletRequest request, HttpServletResponse response) {
		try {
			String psCode = request.getParameter("psCode");
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			ResQuota bean = new ResQuota();
			bean.setPsCode(psCode);
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			ResQuota quota = service.getImproveResDetailSta(bean);
			JSONObject o = ResQuotaUtils.formatQuotaInfo(quota);
			response.getWriter().print(JSONArray.toJSON(o));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 盟市 指标得分信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getImproveLine")
	public void getImproveLine(HttpServletRequest request, HttpServletResponse response) {
		try {

			ParseParameter pp = ParseParameter.getParser();
			String year = request.getParameter("year");
			String algorithmCode = pp.parseString("algorithmCode", request);
			algorithmCode = URLDecoder.decode(algorithmCode, "UTF-8");
			String sroceType = request.getParameter("sroceType");
			ResQuota bean = new ResQuota();
			bean.setDate(year);
			List<ResQuota> beans = service.getImproveYear(bean);
			message = new Message();
			if (beans == null) {
				message.setFlag(-1);
				message.setMessage("没有满足条件的查询结果");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				JSONObject o = ResQuotaUtils.formatQuotaYear(beans, algorithmCode, sroceType);
				message.setFlag(0);
				message.setData(o);
				response.getWriter().print(JSONArray.toJSON(message));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 盟市 指标得分信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getImprovePSTypeLine")
	public void getImprovePSTypeLine(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String algorithmCode = pp.parseString("algorithmCode", request);
			algorithmCode = URLDecoder.decode(algorithmCode, "UTF-8");
			String year = request.getParameter("year");
			ResQuota bean = new ResQuota();
			bean.setDate(year);
			List<ResQuota> beans = service.getImprovePSTypeYear(bean);

			JSONObject o = ResQuotaUtils.formatQuotaPSTypeYear(beans, algorithmCode);
			response.getWriter().print(JSONArray.toJSON(o));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 行业类型 明细
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getImproveYearCity")
	public void getImproveYearCity(HttpServletRequest request, HttpServletResponse response) {
		try {
			String cityId = request.getParameter("cityId");
			String sroceType = request.getParameter("sroceType");
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			ResQuota bean = new ResQuota();
			bean.setCityId(cityId);
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			List<ResQuota> quota = service.getImproveYearCity(bean);
			message = new Message();
			if (quota == null) {
				message.setFlag(-1);
				message.setMessage("没有满足条件的查询结果");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				JSONObject o = ResQuotaUtils.formatQuotasInfoMonth(bean, quota, sroceType);
				message.setFlag(0);
				message.setData(o);
				response.getWriter().print(JSONArray.toJSON(message));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 行业类型 明细
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getImprovePSTypeMonth")
	public void getImprovePSTypeMonth(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String psType = pp.parseString("psType", request);
			psType = URLDecoder.decode(psType, "UTF-8");
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			String sroceType = request.getParameter("sroceType");
			ResQuota bean = new ResQuota();
			bean.setPsType(psType);
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			List<ResQuota> quota = service.getImprovePSTypeMonth(bean);
			message = new Message();
			if (quota == null) {
				message.setFlag(-1);
				message.setMessage("没有满足条件的查询结果");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				JSONObject o = ResQuotaUtils.formatQuotasInfoMonth(bean, quota, sroceType);
				message.setFlag(0);
				message.setData(o);
				response.getWriter().print(JSONArray.toJSON(message));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 行业类型 明细
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getImprovEnterpriseLine")
	public void getImprovEnterpriseLine(HttpServletRequest request, HttpServletResponse response) {
		try {
			String psCode = request.getParameter("psCode");
			String sroceType = request.getParameter("sroceType");
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			ResQuota bean = new ResQuota();
			bean.setPsCode(psCode);
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			List<ResQuota> quota = service.getImprovEnterpriseLine(bean);
			message = new Message();
			if (quota == null) {
				message.setFlag(-1);
				message.setMessage("没有满足条件的查询结果");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				JSONObject o = ResQuotaUtils.formatQuotasInfoMonth(bean, quota, sroceType);
				message.setFlag(0);
				message.setData(o);
				response.getWriter().print(JSONArray.toJSON(message));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 根据盟市和 psName 获取对应的企业信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getEnterpriseByInfo")
	public void getEnterpriseByInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String psName = pp.parseString("psName", request);
			psName = URLDecoder.decode(psName, "UTF-8");
			String cityId = request.getParameter("cityId");
			ResQuota bean = new ResQuota();
			if (!("".equals(cityId) || "-1".equals(cityId))) {
				bean.setCityId(cityId);
			}
			bean.setPsName(psName);
			List<ResQuota> beans = service.getEnterpriseByInfo(bean);
			response.getWriter().print(JSONArray.toJSON(beans));

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 根据盟市和 psName 获取对应的企业信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getEnterpriseStatistics")
	public void getEnterpriseStatistics(HttpServletRequest request, HttpServletResponse response) {
		try {
			String psCode = request.getParameter("psCode");
			String time = request.getParameter("queryTime");
			ResQuota bean = new ResQuota();
			bean.setPsCode(psCode);
			time = time.replace("-", "");
			bean.setDate(time);
			JSONObject object = service.getEnterpriseBIInfo(bean);
			message = new Message();
			if (object == null) {
				message.setFlag(-1);
				message.setMessage("没有满足条件的查询结果");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				message.setData(object);
				response.getWriter().print(JSONArray.toJSON(message));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 模糊查询部门信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/addPSReliable")
	public void addPSReliable(HttpServletRequest request, HttpServletResponse response) {
		try {
			String psCode = request.getParameter("psCode");
			String beginDate = request.getParameter("beginDate");
			String endDate = request.getParameter("endDate");
			ResQuota bean = new ResQuota();
			bean.setPsCode(psCode);
			bean.setBeginTime(beginDate);
			bean.setEndTime(endDate);
			int flag = service.addPSReliable(bean);
			message = new Message();
			if (flag < 1) {
				message.setFlag(-1);
				message.setMessage("添加数据失败");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				response.getWriter().print(JSONArray.toJSON(message));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
