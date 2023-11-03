//统一管理咱们项目用户相关的接口
import request from '@/utils/request'
import type {
    AddCategory,
    AddCategoryResponseData
} from './type'
//项目用户相关的请求地址
enum API {
    CategoryAdd_URL = '/Listening.Admin/Category/Add',
}

//添加分类目录接口
export const reqLogin = (data: AddCategory) =>
    request.post<any, AddCategoryResponseData>(API.CategoryAdd_URL, data)

