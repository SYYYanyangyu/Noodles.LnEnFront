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
  Show_URL = '/Listening.Admin/Episode/Show/',
  Hide_URL = '/Listening.Admin/Episode/Hide/',
  // 解码状态相关
  EpisodeEncodingStatusHub_URL = '/Listening.Admin/Hubs/EpisodeEncodingStatusHub',

}

// 添加
export const reqAdd = async (data: EpisodeAddRequest) =>
  request.post<any, String>(API.EpisodeAdd_URL, data)

// 修改
export const reqEdit = (id: string, data: EditRequest) =>
  request.put<any, EditRequest>(`${API.EpisodeEdit_URL}${id}`, data)

// 删除
export const reqDelete = (id: string) =>
  request.delete<any, any>(`${API.EpisodeDelete_URL}${id}`)

// 展示
export const reqShow = (id: string) => {
  request.put<any,void>(`${API.Show_URL}${id}`)
}

// 隐藏
export const reqHide = (id: string) => {
  request.put<any,void>(`${API.Hide_URL}${id}`)
}

// 查询解码成功
export const reqList = (albumId: string,) =>
  request.get<any, EpisodeResponse[]>(`${API.EpisodeList_URL}${albumId}`)

// 查询解码失败
export const reqEncodeList = (albumId: string) =>
  request.get<any, EncodeReponse[]>(`${API.EncodeList_URL}${albumId}`)

// 除 m4a 格式以外的其他格式的实时解码状态
export const reqEpisodeEncodingStatus = (config : any) => {
  request.options<any, EncodeReponse[]>(`${API.EpisodeEncodingStatusHub_URL}`,config)
}

