<script lang="ts">
import { ElForm, ElFormItem, ElButton, ElCard, ElMessage } from 'element-plus';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
// interface and ts type
import { reqAdd } from '@/api/listenadmin/episode';
import type { EpisodeAddRequest } from "@/api/listenadmin/episode/type";

//component
import UploadComponent from '@/components/Upload/inde.vue';

export default {
    components: {
        UploadComponent,
    },
    props: {
        modelValue: String,
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        //路由对象
        let $route = useRoute();

        const form = reactive({
            albumId: $route.query.id as string,
            name: {
                chinese: '',
                english: '',
            },
            audioUrl: props.modelValue || '',
            audioSecond: 0,
            subtitle: '',
            subtitleType: '',
        });

        const value = ref('');

        const textarea = ref('');

        const submitForm = async () => {
            try {
                const response = await reqAdd(form as EpisodeAddRequest);
                if (response) {
                    ElMessage.success("添加成功");
                    // 这里可以进行其他成功处理逻辑
                } else {
                    ElMessage.error("添加失败");
                    // 这里可以进行其他失败处理逻辑
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                ElMessage.error('表单提交失败');
            }
        };

        const audioSecond = (msg:number) => {
           form.audioSecond = msg
        }

        const rules = {
            'name.chinese': [{ required: true, message: '请输入中文名称', trigger: 'blur' }],
            'name.english': [{ required: true, message: '请输入英文名称', trigger: 'blur' }],
            'audioUrl': [{ required: true, message: '请选择音频文件', trigger: 'change' }],
            'durationInSecond': [{ required: true, message: '请输入音频时长', trigger: 'blur' }],
            'subtitle': [{ required: true, message: '请输入字幕内容', trigger: 'blur' }],
            'subtitleType': [{ required: true, message: '请输入字幕类型', trigger: 'blur' }],
        };

        const options = [
            { value: 'srt', label: 'srt' },
            { value: 'vtt', label: 'vtt' },
            { value: 'lrc', label: 'lrc' },
            { value: 'json', label: 'json' },
        ];

        return {
            form,
            value,
            textarea,
            rules,
            options,
            submitForm,
            audioSecond
        };
    },
};
</script>
  
<template>
    <div class="upload-container">
        <el-card class="upload-card">
            <div class="header">
                <h1>音频和字幕上传</h1>
            </div>
            <div class="upload-form">
                <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
                    <el-form-item label="中文名称">
                        <el-input v-model="form.name.chinese" class="responsive-input" />
                    </el-form-item>

                    <el-form-item label="英文名称">
                        <el-input v-model="form.name.english" class="responsive-input" />
                    </el-form-item>

                    <!-- <upload-component v-model="form.audioUrl" /> -->
                    <upload-component v-model="form.audioUrl" @audio-Second = "audioSecond"/>

                    <el-form-item label="音频时长">
                        <el-input v-model="form.audioSecond" disabled class="responsive-input" />
                    </el-form-item>

                    <el-form-item label="字幕类型">
                        <el-select v-model="value" class="m-2" placeholder="请选择字幕类型" size="large">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="字幕文件" prop="subtitleFile">
                        <el-input v-model="textarea" :rows="5" type="textarea" placeholder="请输入字幕文件"
                            class="responsive-input" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
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
</style>
  