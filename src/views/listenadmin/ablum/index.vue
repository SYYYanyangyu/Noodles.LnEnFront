<script setup lang="ts">

import { reqAdd, reqblumList } from '@/api/listenadmin/ablum';
import { useRouter, useRoute } from 'vue-router';
import type {   AlbumListResponse } from "@/api/listenadmin/ablum/type";

interface User {
    date: string
    name: string
    address: string
}

import { reactive, ref ,onMounted} from 'vue'
const dialogFormVisible = ref(false)
const  categoryId = ref('')
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
})

//获取路由器
let $router = useRouter();
//路由对象
let $route = useRoute();

const addform = reactive({
    name: {
        english: '',
        chinese: '',
    },
    categoryId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
});

onMounted( () => {
    console.log($route.params.categorgId)
});


const getBlumList = async () => {

}

const addblum = async () => {
    addform.name.english = form.english;
    addform.name.chinese = form.chinese;
    let result: AlbumAddResponse = await reqAdd(addform);

    console.log(result);
}

const fileList = ref<UploadUserFile[]>([
    {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
    {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
])
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}
const handlePreview: UploadProps['onPreview'] = (file) => {
    console.log(file)
}
const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row: User
    rowIndex: number
}) => {
    if (rowIndex === 1) {
        return 'warning-row'
    } else if (rowIndex === 3) {
        return 'success-row'
    }
    return ''
}
const tableData: User[] = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]


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
                    <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
                </el-card>
            </el-col>
            <el-col :span="24">
                <el-card class="table-card">

                    <div class="type-table">
                        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
                            <el-table-column prop="date" label="Date" width="180" />
                            <el-table-column prop="name" label="Name" width="180" />
                            <el-table-column prop="address" label="Address" />
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
        <el-dialog v-model="dialogFormVisible" title="添加分类">
            <el-form :model="form">

                <el-form-item label="english title" :label-width="formLabelWidth">
                    <el-input v-model="form.english" autocomplete="off" />
                </el-form-item>

                <el-form-item label="chinese title" :label-width="formLabelWidth">
                    <el-input v-model="form.chinese" autocomplete="off" />
                </el-form-item>

                <el-form-item label="Zones" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="Please select a zone">
                        <el-option label="Zone No.1" value="shanghai" />
                        <el-option label="Zone No.2" value="beijing" />
                    </el-select>
                </el-form-item>

                <el-upload v-model:file-list="fileList" class="upload-demo"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :on-preview="handlePreview"
                    :on-remove="handleRemove" list-type="picture">
                    <el-button type="primary">Click to upload</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            jpg/png files with a size less than 500kb
                        </div>
                    </template>
                </el-upload>

            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="addblum">
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

        .el-button {
            width: 100%;
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
</style>
