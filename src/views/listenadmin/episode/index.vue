<script setup lang="ts">

import { ElNotification, ElMessageBox } from 'element-plus';
import { reqEncodeList, reqDelete, reqList, reqEpisodeEncodingStatus } from '@/api/listenadmin/episode/index';
import { useRouter, useRoute } from 'vue-router';
import type { EncodeReponse, EpisodeResponse } from "@/api/listenadmin/episode/type";
import { reactive, ref, onMounted } from 'vue'
import * as signalR from '@microsoft/signalr';
import { stat } from 'fs';
//获取路由器
let $router = useRouter();
//路由对象
let $route = useRoute();

const dialogTitle = ref('添加');
const dialogFormVisible = ref(false)
const tableData = ref<EpisodeResponse[]>([]); // 使用 ref 函数定义一个响应式的变量
const tableEncodeData = ref<EncodeReponse[]>([]); // 使用 ref 函数定义一个响应式的变量
const currenId = $route.query.id as string;

const state = reactive({ episodes: [], encodingEpisodes: [], albumId: currenId, isInSortMode: false });
const form = reactive({
    english: '',
    chinese: '',
    type: [],
    resource: '',
    desc: '',
    currentId: '',
    categoryId: $route.query.categorgId as string
})

onMounted(async () => {

    const albumId = $route.query.id as string || 'default';

    // 加载数据
    debugger
    if (albumId != 'default') {
        await getEpsodeList(albumId);
        await getEncodeList(albumId)


        //禁用Negotiation，客户端一直连接初始的服务器，这样服务器搞负载均衡（不用Redis BackPlane等）也没问题
        const options = {
            skipNegotiation: true,
            transport: 1 // 强制WebSockets
        };

        const hub = new signalR.HubConnectionBuilder().withUrl(`http://localhost:8089/Listening.Admin/Hubs/EpisodeEncodingStatusHub`, options).build();
        hub.start();
        hub.on('OnMediaEncodingStarted', id => {
            debugger
            var episode = state.encodingEpisodes.find(e => e.id == id);
            episode.status = "Started";
        });
        hub.on('OnMediaEncodingFailed', id => {
            debugger
            var episode = state.encodingEpisodes.find(e => e.id == id);
            episode.status = "Failed";
        });
        hub.on('OnMediaEncodingCompleted', id => {
            debugger
            var episode = state.encodingEpisodes.find(e => e.id == id);
            episode.status = "Completed";
            getEpsodeList(albumId);
            getEncodeList(albumId)//遇到由完成任务的就刷新数据
        });
    }
});

const currentPage = ref(1);
const pageSize = ref(10);

function handleSizeChange(val: number) {
    pageSize.value = val;
}
function handleCurrentChange(val: number) {
    currentPage.value = val;
}

// 转码状态监听
const renderEncodingStatus = (status) => {
    console.log(status);
    const dict = {
        "Created": "等待转码",
        "Started": "转码中",
        "Failed": "转码失败",
        "Completed": "转码完成"
    };
    const value = dict[status];
    return value ? value : "未知";
};

const getEpsodeList = async (albumId: string) => {
    let result: EpisodeResponse[] = await reqList(albumId)
    tableData.value = result;
}

const getEncodeList = async (albumId: string) => {
    let result: EncodeReponse[] = await reqEncodeList(albumId)
    tableEncodeData.value = result;
}

const formatEpisodeChineseName = (row: EpisodeResponse) => {
    return row.name.chinese; // 从对象的属性中获取需要渲染的值，例如这里返回 name 的 chinese 属性值
};

const formatEpisodeEnglishName = (row: EpisodeResponse) => {
    return row.name.english; // 从对象的属性中获取需要渲染的值，例如这里返回 name 的 chinese 属性值
};

const handleEdit = async (row: EpisodeResponse) => {
    dialogFormVisible.value = true;
    dialogTitle.value = "修改"
    let album: AlbumListResponse = await reqFind(row.id)
    form.english = album.name.english;
    form.chinese = album.name.chinese;
    form.currentId = row.id;
}

const handleDelete = async (row: EpisodeResponse) => {
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

const handleUpload = async () => {
    // 在组件中使用router.push()跳转到带有参数的路由
    $router.push({ path: '/file/upload', query: { id: currenId } })
}

</script>

<template>
    <div class="transcode-page">

        <el-card class="custom-card">
            <div class="custom-card-content">
                <el-button type="primary" @click="handleUpload()">添加</el-button>
            </div>
        </el-card>

        <el-card class="transcode-card">
            <h2 class="table-title">转码过程</h2>
            <el-table :data="tableEncodeData" class="transcode-table" :cell-style="{ backgroundColor: '#FFCCCC' }">

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

                <el-table-column prop="durationInSecond" label="秒数"></el-table-column>

                <el-table-column prop="durationInSecond" label="转码状态">
                    <template #default="scope">
                        {{ renderEncodingStatus(scope.row.status) }}
                    </template>
                </el-table-column>

            </el-table>

            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="100" style="margin-top: 10px;">
            </el-pagination>
        </el-card>

        <el-card class="transcode-card">
            <h2 class="table-title">转码结果</h2>
            <el-table :data="tableData" class="transcode-table" :cell-style="{ backgroundColor: '#CCFFCC' }">

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

                <el-table-column prop="durationInSecond" label="秒数"></el-table-column>

                <el-table-column prop="creationTime" label="创建时间" />

                <el-table-column label="操作" width="250" align="right">
                    <template #default="scope">
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                        <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
                        <el-button size="small" type="primary" @click="handleEpisode(scope.row)">隐藏</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="100" style="margin-top: 10px;">
            </el-pagination>
        </el-card>
    </div>
</template>


<style scoped lang="scss">
.custom-card {
    margin-bottom: 20px;
    padding: 20px;
}

.custom-card-content {
    justify-content: space-between;
}

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

.transcode-card+.transcode-card {
    margin-top: 20px;
}
</style>
