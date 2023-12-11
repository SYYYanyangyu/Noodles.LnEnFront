//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

import type {
  FileExistsRequest,
  FileExistsResponse,
} from './type'


enum API {
  FileExists_URL = '/FileService/Uploader/FileExists',
  Upload_URL = '/FileService/Uploader/Upload',
  UploadImages_URL = '/FileService/Uploader/UploadImages'
}

// 判断文件是否存在
export const reqFileExists = (model: FileExistsRequest) =>
  request.get<any, FileExistsResponse>(`${API.FileExists_URL}?fileSize=${model.fileSize}&sha256Hash=${model.sha256Hash}`)

// 上传音频
export const UploadAudio = async (model: FormData): Promise<string> =>
  request.post<any, string>(API.Upload_URL, model, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// 上传图片
export const UploadImages = async (model: FormData): Promise<string> => 
  request.post<any,string>(API.UploadImages_URL,model, {
    headers: { "Content-Type": "multipart/form-data" },
  });


