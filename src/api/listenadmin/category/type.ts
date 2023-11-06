// 添加听力目录
export interface CategoryAddRequest {
    name: Name;
    coverUrl: string;
}

//定义全部接口返回数据都拥有ts类型
export interface Response {
    code: number
    message: string
    ok: boolean
}

//登录接口返回数据类型
export interface CategoryAddResponse extends Response {
    guid: string
}

export interface Name {
    chinese: string;
    english: string;
}

export interface CategoryResponse  extends Response {
    id: string;
    isDeleted: boolean;
    creationTime: string;
    deletionTime: string;
    lastModificationTime: string;
    sequenceNumber: number;
    name: Name;
    coverUrl: string;
}




