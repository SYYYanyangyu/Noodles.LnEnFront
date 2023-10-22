<template>
    <div>
        <div class="upload-container">
            <el-card class="upload-card">
                <div class="header">
                    <h1>音频和字幕上传</h1>
                </div>
                <div class="upload-form">
                    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
                        <el-form-item label="音频文件" prop="audioFile">
                            <el-upload class="upload-demo" action="/your-audio-upload-endpoint"
                                :on-success="handleAudioSuccess" :on-error="handleUploadError" :limit="1"
                                :show-file-list="false">
                                <el-button type="primary">选择文件</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="字幕文件" prop="subtitleFile">
                            <el-upload class="upload-demo" action="/your-subtitle-upload-endpoint"
                                :on-success="handleSubtitleSuccess" :on-error="handleUploadError" :limit="1"
                                :show-file-list="false">
                                <el-button type="primary">选择文件</el-button>
                            </el-upload>
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
            </el-card>
        </div>

    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
    ElForm,
    ElFormItem,
    ElButton,
    ElUpload,
    ElCard,
    ElMessage,
} from 'element-plus';

interface User {
    date: string
    name: string
    address: string
}

export default defineComponent({
    components: {
        ElForm,
        ElFormItem,
        ElButton,
        ElUpload,
        ElCard,
    },
    setup() {
        const form = ref({
            audioFile: null,
            subtitleFile: null,
        });

        const rules = {
            audioFile: [
                { required: true, message: '请选择音频文件', trigger: 'change' },
            ],
            subtitleFile: [
                { required: true, message: '请选择字幕文件', trigger: 'change' },
            ],
        };

        const formRef = ref<any>(null);

        const handleAudioSuccess = (response: any) => {
            form.audioFile = response.url;
        };

        const handleSubtitleSuccess = (response: any) => {
            form.subtitleFile = response.url;
        };

        const handleUploadError = (err: any) => {
            ElMessage.error('上传失败');
            console.error(err);
        };

        const submitForm = () => {
            formRef.value.validate((valid: boolean) => {
                if (valid) {
                    ElMessage.success('上传成功');
                } else {
                    ElMessage.error('表单验证失败');
                }
            });
        };

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
        ]

        return {
            form,
            rules,
            formRef,
            submitForm,
            handleAudioSuccess,
            handleSubtitleSuccess,
            handleUploadError,
            tableRowClassName,
            tableData
        };
    },
});
</script>
  
<style scoped>
.upload-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 30%;

    .upload-card {
        width: 95%;

        .header {
            background-color: #007BFF;
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
    
    .status-card {
        width: 95%;
        height: 70%;

        .header {
            background-color: #007BFF;
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

    }
}
</style>
  