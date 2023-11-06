//对外暴露配置路由(常量路由)
export const constantRoute = [
    {
        //登录
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录',//菜单标题
            hidden: true,//代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
            icon: "Promotion",//菜单文字左侧的图标,支持element-plus全部图标
        }
    }
    ,
    {
        //登录成功以后展示数据的路由
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        meta: {
            title: '',
            hidden: false,
            icon: ''
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            }
        ]
    },
    // {
    //     //404
    //     path: '/404',
    //     component: () => import('@/views/404/index.vue'),
    //     name: '404',
    //     meta: {
    //         title: '404',
    //         hidden: true,
    //         icon: 'DocumentDelete'
    //     }
    // },
    // {
    //     path: '/screen',
    //     component: () => import('@/views/screen/index.vue'),
    //     name: 'Screen',
    //     meta: {
    //         hidden: false,
    //         title: '数据大屏',
    //         icon: 'Platform'
    //     }
    // },
    // {
    //     path: '/acl',
    //     component: () => import('@/layout/index.vue'),
    //     name: 'Acl',
    //     meta: {
    //         title: '权限管理',
    //         icon: 'Lock'
    //     },
    //     redirect:'/acl/user',
    //     children: [
    //         {
    //             path: '/acl/user',
    //             component: () => import('@/views/acl/user/index.vue'),
    //             name: 'Acl',
    //             meta: {
    //                 title: '用户管理',
    //                 icon: 'User'
    //             }
    //         },
    //         {
    //             path: '/acl/role',
    //             component: () => import('@/views/acl/role/index.vue'),
    //             name: 'Role',
    //             meta: {
    //                 title: '角色管理',
    //                 icon: 'UserFilled'
    //             }
    //         },
    //         {
    //             path: '/acl/permission',
    //             component: () => import('@/views/acl/permission/index.vue'),
    //             name: 'Permission',
    //             meta: {
    //                 title: '菜单管理',
    //                 icon: 'Monitor'
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/product',
    //     component: () => import('@/layout/index.vue'),
    //     name: 'Product',
    //     meta: {
    //         title: '商品管理',
    //         icon: 'Goods',
    //     },
    //     redirect:'/product/trademark',
    //     children: [
    //         {
    //             path: '/product/trademark',
    //             component: () => import('@/views/product/trademark/index.vue'),
    //             name: "Trademark",
    //             meta: {
    //                 title: '品牌管理',
    //                 icon: 'ShoppingCartFull',
    //             }
    //         },
    //         {
    //             path: '/product/attr',
    //             component: () => import('@/views/product/attr/index.vue'),
    //             name: "Attr",
    //             meta: {
    //                 title: '属性管理',
    //                 icon: 'ChromeFilled',
    //             }
    //         },
    //         {
    //             path: '/product/spu',
    //             component: () => import('@/views/product/spu/index.vue'),
    //             name: "Spu",
    //             meta: {
    //                 title: 'SPU管理',
    //                 icon: 'Calendar',
    //             }
    //         },
    //         {
    //             path: '/product/sku',
    //             component: () => import('@/views/product/sku/index.vue'),
    //             name: "Sku",
    //             meta: {
    //                 title: 'SKU管理',
    //                 icon: 'Orange',
    //             }
    //         },
    //     ]
    // },
    {
        path:'/listenadmin',
        component: () => import('@/layout/index.vue'),
        name: 'Category',
        meta: {
            title: '目录管理',
            icon: 'Collection',
        },
        redirect:'/listenadmin/category',
        children: [
            {
                path: '/listenadmin/category',
                component: () => import('@/views/listenadmin/category/index.vue'),
                name: "Listentype",
                meta: {
                    title: '听力管理',
                    icon: 'Headset',
                }
            },
            {
                path: '/listenadmin/album',
                component: () => import('@/views/listenadmin/album/index.vue'),
                name: "album",
                meta: {
                    title: '听力管理',
                    icon: 'Flag',
                }
            },
        ]
    },
    {
        path:'/file',
        component: () => import('@/layout/index.vue'),
        name: 'File',
        meta: {
            title: '文件管理',
            icon: 'Files',
        },
        redirect:'/file/management',
        children: [
            {
                path: '/file/management',
                component: () => import('@/views/file/management/index.vue'),
                name: "Manage",
                meta: {
                    title: '文件预览',
                    icon: 'Management',
                }
            },
            {
                path: '/file/upload',
                component: () => import('@/views/file/upload/index.vue'),
                name: "Upload",
                meta: {
                    title: '文件上传',
                    icon: 'Files',
                }
            },
        ]
    },
    {
        //任意路由
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: true,
            icon: 'DataLine'
        }
    }
]