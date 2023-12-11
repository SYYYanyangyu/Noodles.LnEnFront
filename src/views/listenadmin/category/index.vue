<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElNotification, ElMessageBox, UploadProps, UploadUserFile } from 'element-plus';
import { reqAdd, reqCategoryList, reqEdit, reqDelete, reqFind } from '@/api/listenadmin/category';
import { UploadImages } from '@/api/listenadmin/upload';
import type {
    CategoryResponse
} from "@/api/listenadmin/category/type";
//component
import ElPagination from '@/components/Pagination/index.vue';
const total = ref(0);
const pageSize = ref(10); // 每页显示 10 条数据
const currentPage = ref(1); // 当前页码

//获取路由器
let $router = useRouter();

const dialogFormVisible = ref(false)
const dialogTitle = ref('添加');
const tableData = ref<CategoryResponse[]>([]); // 使用 ref 函数定义一个响应式的变量
const form = reactive({
    english: '',
    chinese: '',
    type: [],
    resource: '',
    desc: '',
    currentId: '',
    coverUrl: '',
    path: ''
})
const addform = reactive({
    name: {
        english: '',
        chinese: '',
    },
    coverUrl: '',
    path: ''
});

const uploadRef = ref();

onMounted(async () => {
    await getCategoryList();
});

const getCategoryList = async () => {
    let result: CategoryResponse[] = await reqCategoryList()
    tableData.value = result;
}

// 处理分页组件的页码变化事件
const handlePageChange = async (pageIndex: number) => {
    currentPage.value = pageIndex;
    await getCategoryList();
};

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

    dialogFormVisible.value = false;

    await getCategoryList();
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

const handlealbum = async (row: CategoryResponse) => {
    $router.push({ path: '/listenadmin/album', query: { id: row.id } }) // 使用 id 进行路由跳转  
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
        name: 'examp.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    }
])
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
    console.log(file)
}

const startUpload = async (file: { file: File }) => {
    console.log(file)
    const formData = new FormData();
    if (fileList.value.length > 1) {
        // 以最后一张为标准
        const lastItem = fileList.value[fileList.value.length - 1];
        formData.append("file", lastItem.raw as File);
        const remoterUrl: any = await UploadImages(formData);
        form.coverUrl = remoterUrl.url as string
    }
    else {
        ElNotification({
            type: 'error',
            message: `请选择封面`,
        });
    }
};


const HandleUpload = async (event: Event) => {
    event.stopPropagation();
    uploadRef.value!.submit()
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
                            <el-table-column type="index" label="封面" width="150px">
                                <template #default="{ row }">
                                    <el-image :src="row.coverUrl" fit="cover" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="path" label="path"></el-table-column>
                            <el-table-column prop="name" label="中文标题"
                                :formatter="formatCategpryChineseName"></el-table-column>
                            <el-table-column prop="name" label="英文标题"
                                :formatter="formatCategpryEnglishName"></el-table-column>
                            <el-table-column prop="creationTime" label="创建时间" />
                            <el-table-column prop="lastModificationTime" label="最近修改时间" :formatter="formatDefault" />
                            <el-table-column label="操作" align="right" :style="{ minWidth: '500px' }">
                                <template #default="scope">
                                    <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
                                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                                    <el-button size="small" type="primary" @click="handlealbum(scope.row)">管理专辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <div class="type-pagenation">
                        <ElPagination :total="total" :page-size="pageSize" @change="handlePageChange" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>

    <div class="type_modal">
        <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
            <el-form :model="form">

                <el-form-item label="英文标题">
                    <el-input v-model="form.english" autocomplete="off" />
                </el-form-item>

                <el-form-item label="中文标题">
                    <el-input v-model="form.chinese" autocomplete="off" />
                </el-form-item>

                <el-form-item label="coverUrl">
                    <el-input v-model="form.coverUrl" autocomplete="off" disabled placeholder="封面上传后自动生成" />
                </el-form-item>

                <el-form-item label="页面路径">
                    <el-input v-model="form.path" autocomplete="off" placeholder="/path" />
                </el-form-item>

                <el-upload v-model:file-list="fileList" class="upload-demo" action="#" :http-request="startUpload"
                    ref="uploadRef" :on-preview="handlePreview" :on-remove="handleRemove" :auto-upload="false"
                    list-type="picture">
                    <el-button type="primary">选择上传图片</el-button>
                    <el-button type="Success" v-if="fileList.length > 1" @click="HandleUpload">点击上传</el-button>
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
