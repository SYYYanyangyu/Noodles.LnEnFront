/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-20 16:28:00
 * @LastEditors: Huccct
 * @LastEditTime: 2023-06-02 11:27:45
 */
import type { RouteRecordRaw } from 'vue-router'
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  userName: string
  avatar: string
  // buttons: string[]
}
