//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

import type {
  EpisodeAddRequest,
  EpisodeResponse,
  EncodeReponse,
  EditRequest
} from './type'


enum API {
  EpisodeAdd_URL = '/Listening.Admin/Episode/Add',
  EpisodeList_URL = '/Listening.Admin/Episode/FindByalbumId/',
  EncodeList_URL = '/Listening.Admin/Episode/FindEncodingEpisodesByalbumId/',
  EpisodeEdit_URL = '/Listening.Admin/Episode/Update/',
  EpisodeDelete_URL = '/Listening.Admin//Episode/DeleteById/',
}

// 添加
export const reqAdd = (data: EpisodeAddRequest) =>
  request.post<any, String>(API.EpisodeAdd_URL, data)

// 修改
export const reqEdit = (id: string, data: EditRequest) =>
  request.put<any, EditRequest>(`${API.EpisodeEdit_URL}${id}`, data)

// 删除
export const reqDelete = (id: string) =>
  request.delete<any, any[]>(`${API.EpisodeDelete_URL}${id}`)

// 查询解码成功
export const reqList = (albumId: string,) =>
  request.get<any, EpisodeAddRequest[]>(`${API.EpisodeList_URL}${albumId}`)

// 查询解码失败
export const reqEncodeList = (albumId: string) =>
  request.get<any, EncodeReponse[]>(`${API.EncodeList_URL}${albumId}`)

