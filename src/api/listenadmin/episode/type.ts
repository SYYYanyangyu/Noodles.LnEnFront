// 添加听力剧集
export interface EposideAddRequest {
    categoryId: string;
    name: Name;
    audioUrl: string;
    durationInSecond: number;
    subtitle: string;
    subtitleType: string;
}

// 添加听力剧集
export interface Name {
    chinese: string;
    english: string;
}
// 听力剧集接口返回数据类型
export interface EposideAddResponse extends Response {
    guid: string;
}

export interface EposideResponse extends Response {
    id: string;
    categoryId: string;
    isDeleted: boolean;
    creationTime: string;
    deletionTime: string;
    lastModificationTime: string;
    sequenceNumber: number;
    name: Name;
    audioUrl: string;
    durationInSecond: number;
    subtitle: string;
    subtitleType: string;
}

// 听力剧集接口返回数据类型
export interface EposideAddResponse extends Response {
    guid: string;
}

export interface EposideResponse extends Response {
    id: string;
    categoryId: string;
    isDeleted: boolean;
    creationTime: string;
    deletionTime: string;
    lastModificationTime: string;
    sequenceNumber: number;
    name: Name;
    audioUrl: string;
    durationInSecond: number;
    subtitle: string;
    subtitleType: string;
}

// 假设 Name 接口和 Response 接口已经在之前定义
