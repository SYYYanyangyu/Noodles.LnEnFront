//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

import type {
  AlbumAddRequest,
  AlbumAddResponse,
  AlbumListResponse
} from './type'


enum API {
  AlbumAddData_URL = '/Listening.Admin/Album/Add',
  AlbumListData_URL = '/Listening.Admin/Album/FindByCategoryId/'
}

// 添加接口
export const reqAdd = (data: AlbumAddRequest) =>
  request.post<any, AlbumAddResponse>(API.AlbumAddData_URL, data)


export const reqblumList = (CategoryId:string) =>
  request.get<any, AlbumListResponse>(`${API.AlbumListData_URL}${CategoryId}`)