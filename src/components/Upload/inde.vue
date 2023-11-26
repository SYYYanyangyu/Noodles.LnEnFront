<template>
    <el-form-item label="音频路径" prop="audioFile" class="form-item">
        <div class="upload-section">
            <el-input v-model="form.audioUrl.value" disabled placeholder="File path will be displayed here after uploading."
                class="path-input" />
            <el-upload class="upload" ref="uploadRef" action="#" :auto-upload="false" :before-upload="beforeFileUpload"
                :http-request="startUpload">
                <div style="margin-top: 10px;">
                    <el-button type="primary">选择文件</el-button>
                </div>
            </el-upload>
            <el-button @click="submitUpload" class="upload-button">上传</el-button>
        </div>
        <span class="file-name">{{ fileName }}</span>
        <el-progress :percentage="form.percentage.value" :status="form.status.value" class="upload-progress" />
    </el-form-item>
</template>
  
<script lang="ts">
import { ref, Ref } from 'vue';
import CryptoJS from 'crypto-js';
import { reqFileExists, UploadAudio } from '@/api/listenadmin/upload';
import type { FileExistsRequest, FileExistsResponse } from "@/api/listenadmin/upload/type";

interface Form {
    audioUrl: Ref<string>;
    percentage: Ref<number>;
    status: Ref<string>;
}

export default {
    props: {
        modelValue: String,
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const form: Form = {
            audioUrl: ref(''),
            percentage: ref(0),
            status: ref('warning'),
        };

        const fileName = ref('');
        const uploadRef = ref();

        const updateFormState = (url: string, percentage: number, status: string) => {
            form.audioUrl.value = url;
            form.percentage.value = percentage;
            form.status.value = status;
        };

        const beforeFileUpload = async (file: File) => {
            if (file.size <= 0) {
                return Promise.reject(new Error("没有选择文件"));
            }

            return new Promise<boolean>((resolve) => {
                const fileReads = new FileReader();
                fileReads.readAsArrayBuffer(file);
                fileReads.onload = async function () {
                    const arrayBuffer = fileReads.result as ArrayBuffer;

                    // 将 ArrayBuffer 转换为 number[]
                    const data = Array.from(new Uint8Array(arrayBuffer));
                    const wordArray = CryptoJS.lib.WordArray.create(data);
                    const hash = CryptoJS.SHA256(wordArray).toString();
                    const fileSize = file.size;
                    const fileExist: FileExistsRequest = { fileSize, sha256Hash: hash };

                    try {
                        const result: FileExistsResponse = await reqFileExists(fileExist);

                        if (result.isExists) {
                            emit('update:modelValue', result.url);
                        }

                        resolve(true);
                    } catch (error) {
                        resolve(false);
                    }
                };
            });
        };

        const startUpload = async (file: File) => {
            const formData = new FormData();
            formData.append("file", file);
            try {
                const remoteUrl = await UploadAudio(formData);
                updateFormState(remoteUrl, 100, 'success');
            } catch (error) {
                updateFormState('', 0, 'error');
            }
        };

        const submitUpload = () => {
            uploadRef.value!.submit();
        };

        return {
            form,
            fileName,
            uploadRef,
            beforeFileUpload,
            startUpload,
            submitUpload,
        };
    },
};
</script>
  
<style scoped lang="scss">
.upload-section {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 5px;
}

.upload .el-button {
    padding: 12px 20px;
    line-height: 1.2;
}
</style>
  