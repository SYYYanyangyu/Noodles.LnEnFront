import {createRouter , createWebHashHistory} from 'vue-router'

import {constantRoute} from './routes'

// create router
let router = createRouter({
    // router patten 
    history:createWebHashHistory(),
    routes: constantRoute,

    // 滚动行为
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})

export default router;