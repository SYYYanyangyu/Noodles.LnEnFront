//http://localhost/Listening.Admin/Category/Add
export interface AddCategory {
    chinese: string
    english: string
    coverurl: string
}

//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

//定义登录接口返回数据类型
export interface AddCategoryResponseData extends ResponseData {
    data: string
}
