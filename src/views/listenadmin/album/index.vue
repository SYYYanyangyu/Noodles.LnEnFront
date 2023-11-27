<script setup lang="ts">

import { ElNotification, ElMessageBox } from 'element-plus';
import { reqAdd, reqblumList, reqEdit, reqDelete, reqFind } from '@/api/listenadmin/album';
import { useRouter, useRoute } from 'vue-router';
import type { AlbumListResponse } from "@/api/listenadmin/album/type";
import { reactive, ref, onMounted } from 'vue'
//获取路由器
let $router = useRouter();
//路由对象
let $route = useRoute();
const dialogTitle = ref('添加');
const dialogFormVisible = ref(false)
const tableData = ref<AlbumListResponse[]>([]); // 使用 ref 函数定义一个响应式的变量
const formLabelWidth = '140px'
const form = reactive({
    english: '',
    chinese: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    currentId: '',
    categoryId: $route.query.id as string
})

const addform = reactive({
    name: {
        english: '',
        chinese: '',
    },
    categoryId: $route.query.id as string
});

onMounted(async () => {
    const categorgId = $route.query.id as string;
    await getalbumList(categorgId);
});

const getalbumList = async (categorgId: string) => {
    let result: AlbumListResponse[] = await reqblumList(categorgId)
    tableData.value = result;
}

const formatEpisodeChineseName = (row: AlbumListResponse) => {
    return row.name.chinese; // 从对象的属性中获取需要渲染的值，例如这里返回 name 的 chinese 属性值
};

const formatEpisodeEnglishName = (row: AlbumListResponse) => {
    return row.name.english; // 从对象的属性中获取需要渲染的值，例如这里返回 name 的 chinese 属性值
};


const editAlbum = async () => {
    addform.name.english = form.english;
    addform.name.chinese = form.chinese;
    let titlevalue = dialogTitle.value;

    if (titlevalue == "修改") {
        await reqEdit(form.currentId, addform);
    } else {
        await reqAdd(addform);
    }

    ElNotification({
        type: 'success',
        message: `${titlevalue}完成`,
    });

    await getalbumList(form.categoryId);
}

const handleEdit = async (row: AlbumListResponse) => {
    dialogFormVisible.value = true;
    dialogTitle.value = "修改"
    let album: AlbumListResponse = await reqFind(row.id)
    form.english = album.name.english;
    form.chinese = album.name.chinese;
    form.currentId = row.id;
}

const handleDelete = async (row: AlbumListResponse) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(async () => {
            await reqDelete(row.id);
            ElNotification({
                type: 'success',
                message: `删除完成`,
            });

            await getalbumList(form.categoryId);
        })
        .catch(() => {
            // catch error
        })
}

const handleEpisode = async (row: AlbumListResponse) => {
   // 在组件中使用router.push()跳转到带有参数的路由
   $router.push({ path: '/listenadmin/episode',query:{id:row.id}})
}

</script>

<template>
    <div class="listentype_container">
        <el-row>
            <el-col :span="24">
                <el-card class="button-card">
                    <template #header>
                        <div class="card-header">
                            <span>分类管理</span>
                            <el-row class="mb-4">
                                <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
                                <el-button type="primary">排序</el-button>
                            </el-row>
                        </div>
                    </template>
                </el-card>
            </el-col>
            <el-col :span="24">
                <el-card class="table-card">
                    <div class="type-table">
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="name" label="中文标题" :formatter="formatEpisodeChineseName">
                                <template v-slot:default="{ row }">
                                    <span :class="row.isVisible === false ? 'strike' : ''">{{
                                        formatEpisodeChineseName(row) }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="英文标题" :formatter="formatEpisodeEnglishName">
                                <template v-slot:default="{ row }">
                                    <span :class="row.isVisible === false ? 'strike' : ''">{{
                                        formatEpisodeEnglishName(row) }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="creationTime" label="创建时间">
                                <template v-slot:default="{ row }">
                                    <span :class="row.isVisible === false ? 'strike' : ''">{{ row.creationTime }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template #default="scope">
                                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                                    <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
                                    <el-button size="small" type="primary" @click="handleEdit(scope.row)">显示音频</el-button>
                                    <el-button size="small" type="primary"
                                        @click="handleEpisode(scope.row)">管理专辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <div class="type-pagenation">
                        <el-pagination small background layout="prev, pager, next" :total="50" class="mt-4" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>

    <div class="type_modal">
        <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
            <el-form :model="form">

                <el-form-item label="english title" :label-width="formLabelWidth">
                    <el-input v-model="form.english" autocomplete="off" />
                </el-form-item>

                <el-form-item label="chinese title" :label-width="formLabelWidth">
                    <el-input v-model="form.chinese" autocomplete="off" />
                </el-form-item>

            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="editAlbum">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>


<style scoped lang="scss">
.button-card {
    width: "95%";

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.table-card {
    width: "95%";
    margin-top: 20px;

    .type-table {
        padding: 20px;
        border-radius: 0 0 5px 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        margin-top: 20px;

        .el-form-item {
            margin-bottom: 15px;
        }

        .upload-demo {
            display: flex;
            justify-content: space-between;
        }

        .el-upload__tip {
            text-align: center;
        }
    }

    .type-pagenation {
        display: flex;
        justify-content: center;
        padding: 20px;
        border-radius: 0 0 5px 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        margin-top: 20px;
    }
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.strike {
    text-decoration: line-through;
}
</style>
