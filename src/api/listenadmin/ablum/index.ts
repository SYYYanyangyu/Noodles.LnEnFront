//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

import type {
  AlbumAddRequest,
  AlbumAddResponse,
  AlbumListResponse
} from './type'


enum API {
  AlbumAddData_URL = '/Listening.Admin/Album/Add',
  AlbumListData_URL = '/Listening.Admin/Album/FindByCategoryId/',
  AblumFindById = '/Listening.Admin/Album/FindById/',
  AblumEdit_URL = '/Listening.Admin/Album/Update/',
  AblumDelete_URL = '/Listening.Admin/Album/DeleteById/',
}

// 添加接口
export const reqAdd = (data: AlbumAddRequest) =>
  request.post<any, string>(API.AlbumAddData_URL, data)

// 列表
export const reqblumList = (CategoryId:string) =>
  request.get<any, AlbumListResponse[]>(`${API.AlbumListData_URL}${CategoryId}`)

// 查找
export const reqFind = (Id: string) =>
request.get<any, AlbumListResponse>(`${API.AblumFindById}${Id}`)

// 修改
export const reqEdit = (Id: string,data:AlbumAddRequest) =>
  request.put<any, AlbumListResponse>(`${API.AblumEdit_URL}${Id}`,data)

// 删除
export const reqDelete = (Id: string) =>
  request.delete<any, any>(`${API.AblumDelete_URL}${Id}`)