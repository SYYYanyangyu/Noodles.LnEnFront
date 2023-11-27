// 添加听力目录
export interface AlbumAddRequest {
    name: {
        chinese: string;
        english: string;
    };
    categoryId: string;
}

//定义全部接口返回数据都拥有ts类型
export interface Response {
    code: number
    message: string
    ok: boolean
}

//登录接口返回数据类型
export interface AlbumAddResponse extends Response {
    guid: string
}

// 听力目录返回接口
export interface AlbumListResponse extends Response {
    id: string;
    isDeleted: boolean;
    creationTime: string;  // Date object could also be used if appropriate
    deletionTime: string;  // Date object could also be used if appropriate
    lastModificationTime: string;  // Date object could also be used if appropriate
    isVisible: boolean;
    name: {
        chinese: string;
        english: string;
    };
    sequenceNumber: number;
    categoryId: string;
}



