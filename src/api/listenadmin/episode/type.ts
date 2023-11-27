// 添加听力剧集
export interface EpisodeAddRequest {
    albumId: string;
    name: Name;
    audioUrl: string;
    durationInSecond: number;
    subtitle: string;
    subtitleType: string;
}

// 听力剧集接口返回数据类型
export interface Name {
    chinese: string;
    english: string;
  }
  
  // 解码成功
  export interface EpisodeResponse {
    id: string;
    isDeleted: boolean;
    creationTime: string;
    deletionTime: string;
    lastModificationTime: string;
    sequenceNumber: number;
    name: Name;
    albumId: string;
    audioUrl: string;
    durationInSecond: number;
    subtitle: string;
    subtitleType: string;
    isVisible: boolean;
  }

  // 解码失败
  export interface EncodeReponse {
    id: string;
    name: Name;
    albumId: string;
    durationInSecond: number;
    subtitle: string;
    subtitleType: string;
    status: string;
  }

  // 修改
  export interface EditRequest {
    name: Name;
    subtitleType: string;
    subtitle: string;
  }