<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import CryptoJS from 'crypto-js';
import {
    ElForm,
    ElFormItem,
    ElButton,
    ElUpload,
    ElCard,
    ElMessage,
} from 'element-plus';
import { reqFileExists, UploadAudio } from '@/api/listenadmin/upload';
import type {
    FileExistsRequest, FileExistsResponse
} from "@/api/listenadmin/upload/type";

const emit = defineEmits(["update:modelValue"]);
interface Form {
    english: string;
    chinese: string;
    region: string;
    date1: string;
    date2: string;
    delivery: boolean;
    type: string[];
    resource: string;
    desc: string;
    currentId: string;
    audioFile: File | null;
    subtitleFile: File | null;
    durationInSecond: number;
    status: string;
    percentage: number
}

const form = reactive<Form>({
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
    audioFile: null,
    subtitleFile: null,
    durationInSecond: 0,
    status: 'warning',
    percentage: 0
});

const value = ref('')
const textarea = ref('')
const formRef = ref<any>(null);
const fileName = ref('');
const fileInput = ref(null);
const rules = {
    audioFile: [
        { required: true, message: '请选择音频文件', trigger: 'change' },
    ],
    subtitleFile: [
        { required: true, message: '请选择字幕文件', trigger: 'change' },
    ],
};
const options = [
    {
        value: 'srt',
        label: 'srt',
    },
    {
        value: 'vtt',
        label: 'vtt',
    },
    {
        value: 'lrc',
        label: 'lrc',
    },
    {
        value: 'json',
        label: 'json',
    }
]

const submitForm = () => {
    formRef.value.validate((valid: boolean) => {
        if (valid) {
            ElMessage.success('上传成功');
        } else {
            ElMessage.error('表单验证失败');
        }
    });
};

let fileExists = false;    // 初始化外部变量以存储文件是否存在的状态
let fileUrl = '';          // 存储如果文件存在的话服务器返回的URL
const beforeFileUpload = async () => {
    debugger
    const files = fileInput.value;
        if (files.length <= 0) {
          alert("没有选择文件");
          return;
        }
        const file = files[0];
        let fileReads = new FileReader();
        //开始读取文件
        fileReads.readAsArrayBuffer(file);

    fileReads.onload = async function () {
        const wordArray = CryptoJS.lib.WordArray.create(fileReads.result);
        const hash = CryptoJS.SHA256(wordArray).toString();
        const fileSize = file.size;
        const fileExist: FileExistsRequest = { fileSize, sha256Hash: hash };

        // 在这里将文件大小和哈希值的对象传入
        // 进行解构并重命名内部的data
        const { data: fileExistData } = await reqFileExists(fileExist);

        if (fileExistData.isExists) {
            emit('update:modelValue', fileExistData.url);
        }
    }

    return false;
};
const submitUpload = async () => {
    if (fileExists) {
        // 文件已经在服务器上存在，可以直接使用 fileUrl
        console.log('File already exists at', fileUrl);
        // 这里可以添加你的逻辑来处理已经存在文件的情况        
    } else {
        const formData = new FormData();
        formData.append("file", fileInput.value.files);

        try {
            const response = await UploadAudio(formData);
            emit('update:modelValue', response);
        } catch (error) {
            alert("上传失败" + error);
        }
    }
};

const uploadWithEpisode = async () => {
    // Your upload logic here
};

onMounted(async function () {

});

</script>
  

<template>
    <div>
        <div class="upload-container">
            <el-card class="upload-card">
                <div class="header">
                    <h1>音频和字幕上传</h1>
                </div>
                <div class="upload-form">
                    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
                        <el-form-item label="中文名称">
                            <el-input v-model="form.chinese" class="responsive-input" />
                        </el-form-item>

                        <el-form-item label="英文名称">
                            <el-input v-model="form.english" class="responsive-input" />
                        </el-form-item>

                        <el-form-item label="音频路径" prop="audioFile" class="form-item">
                            <div class="upload-section">
                                <el-input v-model="form.english" disabled
                                    placeholder="File path will be displayed here after uploading." class="path-input" />
                                <el-upload class="upload" :auto-upload="false" :before-upload="beforeFileUpload"
                                    ref="fileInput">
                                    <div style="margin-top: 10px;;">
                                        <el-button type="primary">选择文件</el-button>
                                    </div>
                                </el-upload>

                                <el-button @click="submitUpload" class="upload-button">上传</el-button>

                            </div>
                            <span class="file-name">{{ fileName }}</span>

                            <el-progress :percentage="form.percentage" :status="form.status" class="upload-progress" />
                        </el-form-item>

                        <el-form-item label="音频时长">
                            <el-input v-model="form.durationInSecond" disabled class="responsive-input" />
                        </el-form-item>

                        <el-form-item label="字幕类型">
                            <el-select v-model="value" class="m-2" placeholder="请选择字幕类型" size="large">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="字幕文件" prop="subtitleFile">
                            <el-input v-model="textarea" :rows="5" type="textarea" placeholder="请输入字幕文件"
                                class="responsive-input" />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm">上传</el-button>
                        </el-form-item>

                    </el-form>
                </div>
            </el-card>
        </div>

        <div class="upload—status">
            <el-card class="status-card">
                <div class="header">
                    <h1>上传状态</h1>
                </div>

                <div class="upload-table">
                    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
                        <el-table-column prop="date" label="Date" width="180" />
                        <el-table-column prop="name" label="Name" width="180" />
                        <el-table-column prop="address" label="Address" />
                    </el-table>
                </div>

                <div class="upload-pagenation">
                    <el-pagination small background layout="prev, pager, next" :total="50" class="mt-4" />
                </div>
            </el-card>
        </div>

    </div>
</template>
  
<style scoped lang="scss">
.upload-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 30%;

    .upload-card {
        width: 95%;
        min-height: 25%;

        .header {
            background-color: darkseagreen;
            padding: 20px;
            text-align: center;
            color: #fff;
            font-size: 24px;
            border-radius: 5px 5px 0 0;
        }

        .upload-form {
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
    }
}

.upload—status {
    display: flex;
    justify-content: center;
    align-items: center;
    /* min-height: 65vh;  */
    margin-top: 20px;

    .status-card {
        width: 95%;
        height: 65%;

        .header {
            background-color: darkseagreen;
            padding: 20px;
            text-align: center;
            color: #fff;
            font-size: 24px;
            border-radius: 5px 5px 0 0;
        }

        .upload-table {
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

        .upload-pagenation {
            display: flex;
            justify-content: center;
            padding: 20px;
            border-radius: 0 0 5px 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            margin-top: 20px;
        }

    }
}

.responsive-input {
    width: 100%;
    max-width: 600px;
}

.el-progress--line {
    margin-bottom: 15px;
    width: 350px;
    padding: 5px
}

.form-item {
    display: flex;
    flex-direction: row;
    /* 调整排列方向为横向 */
    align-items: center;
    /* 垂直居中对齐元素 */
}

.file-name {
    display: inline-block;
    /* 改为行内元素 */
    margin: 0;
    /* 去掉周围的 margin */
}

.upload-progress {
    margin: 0 20px;
    /* 在两侧添加一些间距 */
}

.upload-section {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #eee;
    /* 添加边框 */
    padding: 10px;
    /* 添加内间距 */
    border-radius: 5px;
    /* 添加边框圆角 */
}

.upload .el-button {
    padding: 12px 20px;
    /* 调整按钮的 padding 以改变其高度 */
    line-height: 1.2;
    /* 调整 line-height 以改变文字高度 */
}
</style>
  