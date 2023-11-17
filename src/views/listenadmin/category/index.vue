<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification, ElMessageBox } from 'element-plus';
import { reqAdd, reqCategoryList, reqEdit, reqDelete, reqFind } from '@/api/listenadmin/category';
import type {
    CategoryResponse
} from "@/api/listenadmin/category/type";

//获取路由器
let $router = useRouter();
//路由对象
let $route = useRoute();

const dialogFormVisible = ref(false)
const dialogTitle = ref('添加');
const tableData = ref<CategoryResponse[]>([]); // 使用 ref 函数定义一个响应式的变量
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
    coverUrl: ''
})
const addform = reactive({
    name: {
        english: '',
        chinese: '',
    },
    coverUrl: ''
});
onMounted(async () => {
    await getCategoryList();
});
const getCategoryList = async () => {
    let result: CategoryResponse[] = await reqCategoryList()
    tableData.value = result;
}

const editCategory = async () => {
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

    await getCategoryList();
}


const formatCategpryChineseName = (row: CategoryResponse) => {
    return row.name.chinese; // 从对象的属性中获取需要渲染的值，例如这里返回 name 的 chinese 属性值
};

const formatCategpryEnglishName = (row: CategoryResponse) => {
    return row.name.english; // 从对象的属性中获取需要渲染的值，例如这里返回 name 的 chinese 属性值
};

const formatDefault = (row: CategoryResponse) => {
    return row.lastModificationTime == null ? "暂无修改" : row.lastModificationTime; // 从对象的属性中获取需要渲染的值，例如这里返回 name 的 chinese 属性值
}

const fileList = ref<UploadUserFile[]>([
    {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
])
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}
const handlePreview: UploadProps['onPreview'] = (file) => {
    console.log(file)
}

const handleEdit = async (row: CategoryResponse) => {
    dialogFormVisible.value = true;
    dialogTitle.value = "修改"
    let category: CategoryResponse = await reqFind(row.id)
    form.english = category.name.english;
    form.chinese = category.name.chinese;
    form.currentId = row.id;
}

const handleDelete = async (row: CategoryResponse) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(async () => {
            await reqDelete(row.id);
            ElNotification({
                type: 'success',
                message: `删除完成`,
            });

            await getCategoryList();
        })
        .catch(() => {
            // catch error
        })
}

const handleAblum = async (row: CategoryResponse) => {
    $router.push({ path: `/listenadmin/ablum${row.id }`})  // 使用 id 进行路由跳转  
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
                                <el-button type="primary"
                                    @click="dialogTitle = '添加', dialogFormVisible = true">添加</el-button>
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
                            <el-table-column prop="coverUrl" label="封面" width="180" />
                            <el-table-column prop="name" label="中文标题" width="200"
                                :formatter="formatCategpryChineseName"></el-table-column>
                            <el-table-column prop="name" label="英文标题" :formatter="formatCategpryEnglishName"
                                width="350"></el-table-column>
                            <el-table-column prop="creationTime" label="创建时间" />
                            <el-table-column prop="lastModificationTime" label="最近修改时间" :formatter="formatDefault" />
                            <el-table-column label="操作" width="250" align="right">
                                <template #default="scope">
                                    <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
                                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                                    <el-button size="small" type="primary" @click="handleAblum(scope.row)">管理专辑</el-button>
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

                <el-form-item label="英文标题" :label-width="formLabelWidth">
                    <el-input v-model="form.english" autocomplete="off" />
                </el-form-item>

                <el-form-item label="中文标题" :label-width="formLabelWidth">
                    <el-input v-model="form.chinese" autocomplete="off" />
                </el-form-item>

                <el-form-item label="coverUrl" :label-width="formLabelWidth">
                    <el-input v-model="form.coverUrl" autocomplete="off" />
                </el-form-item>

                <!-- action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"  -->
                <el-upload v-model:file-list="fileList" class="upload-demo"
                    action="http://localhost/FileService/Uploader/UploadImages" :on-preview="handlePreview"
                    :on-remove="handleRemove" :auto-upload="true" list-type="picture">
                    <el-button type="primary">Click to upload</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            jpg/png files with a size less than 500kb··
                        </div>
                    </template>
                </el-upload>

            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="editCategory">
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

.item {
    margin-bottom: 18px;
}
</style>
