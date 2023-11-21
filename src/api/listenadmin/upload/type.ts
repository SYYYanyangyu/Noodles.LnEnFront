// 判断上传的文件是否已经存在
export interface FileExistsRequest {
    fileSize:number
    sha256Hash: string
}

//文件是否存在接口返回数据类型
export interface FileExistsResponse extends Response {
    data: {
        isExists: boolean
        url: string
      }
}

export interface FileUpload {
    file: string;  // 字符串表示的二进制文件内容
}

//定义全部接口返回数据都拥有ts类型
export interface Response {
    code: number
    message: string
    ok: boolean
}



