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
  albumFindById = '/Listening.Admin/Album/FindById/',
  albumEdit_URL = '/Listening.Admin/Album/Update/',
  albumDelete_URL = '/Listening.Admin/Album/DeleteById/',
}

// 添加接口
export const reqAdd = (data: AlbumAddRequest) =>
  request.post<any, string>(API.AlbumAddData_URL, data)

// 列表
export const reqblumList = (CategoryId:string) =>
  request.get<any, AlbumListResponse[]>(`${API.AlbumListData_URL}${CategoryId}`)

// 查找
export const reqFind = (Id: string) =>
request.get<any, AlbumListResponse>(`${API.albumFindById}${Id}`)

// 修改
export const reqEdit = (Id: string,data:AlbumAddRequest) =>
  request.put<any, AlbumListResponse>(`${API.albumEdit_URL}${Id}`,data)

// 删除
export const reqDelete = (Id: string) =>
  request.delete<any, any>(`${API.albumDelete_URL}${Id}`)