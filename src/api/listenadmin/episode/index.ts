//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

import type {
  EposideAddRequest,
  CategoryAddResponse,
  CategoryResponse
} from './type'


enum API {
  EpisodeAdd_URL = '/Listening.Admin//Episode/Add',
  CategoryEdit_URL = '/Listening.Admin/Category/Update/',
  CategoryDelete_URL = '/Listening.Admin/Category/DeleteById/',
  CategoryFind_URL = '/Listening.Admin/Category/FindById/',
  CategoryList_URL = '/Listening.Admin/Category/FindAll',
}

// 添加
export const reqAdd = (data: EposideAddRequest) =>
  request.post<any, String>(API.EpisodeAdd_URL, data)

// 修改
export const reqEdit = (CategoryId: string,data:CategoryAddRequest) =>
  request.put<any, CategoryAddResponse>(`${API.CategoryEdit_URL}${CategoryId}`,data)

// 删除
export const reqDelete = (CategoryId: string) =>
  request.delete<any, CategoryAddResponse>(`${API.CategoryDelete_URL}${CategoryId}`)

// 查找
export const reqFind = (CategoryId: string) =>
  request.get<any, CategoryResponse>(`${API.CategoryFind_URL}${CategoryId}`)

// 目录
export const reqCategoryList = () =>
  request.get<any, CategoryResponse[]>(API.CategoryList_URL)