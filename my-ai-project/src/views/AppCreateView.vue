<template>
  <div class="app-create-page">
    <div class="app-create-form">
      <h2>创建新应用</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
        <el-form-item label="应用名称" prop="appName">
          <el-input 
            v-model="form.appName" 
            placeholder="请输入应用名称"
            clearable
          />
        </el-form-item>
        
        <el-form-item label="应用信息" prop="appInfo">
          <el-input
            v-model="form.appInfo"
            type="textarea"
            :rows="6"
            placeholder="请输入应用的详细信息"
            resize="vertical"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            @click="submitForm"
            :loading="isCreating"
          >
            创建应用
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="app-list">
      <h2>应用列表</h2>
      <div class="app-list-content">
        <!-- 应用列表将在这里显示 -->
        <el-empty v-if="appList.length === 0" description="暂无应用数据" />
        
        <!-- 这里是应用列表的占位符，后续可以添加实际的应用列表 -->
        <div v-else class="apps-grid">
          <el-card 
            v-for="app in appList" 
            :key="app.id" 
            class="app-card"
            shadow="hover"
          >
            <template #header>
              <div class="app-card-header">
                <span class="app-name">{{ app.name }}</span>
              </div>
            </template>
            <div class="app-description">
              {{ app.description }}
            </div>
            <div class="app-actions">
              <el-button type="primary" size="small" @click="editApp(app)">
                编辑
              </el-button>
              <el-button type="danger" size="small" @click="deleteApp(app)">
                删除
              </el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import axios from 'axios';

interface App {
  id: number;
  name: string;
  description: string;
}

export default defineComponent({
  name: 'AppCreateView',
  setup() {
    const formRef = ref();
    const isCreating = ref(false);
    const router = useRouter();
    
    const form = reactive({
      appName: '',
      appInfo: ''
    });
    
    const rules = {
      appName: [
        { required: true, message: '请输入应用名称', trigger: 'blur' },
        { min: 1, max: 50, message: '应用名称长度不能超过50个字符', trigger: 'blur' }
      ],
      appInfo: [
        { required: true, message: '请输入应用信息', trigger: 'blur' },
        { min: 1, max: 500, message: '应用信息长度不能超过500个字符', trigger: 'blur' }
      ]
    };
    
    // 模拟应用列表数据
    const appList = ref<App[]>([
      // 示例数据
      // { id: 1, name: '示例应用1', description: '这是一个示例应用的描述信息' },
      // { id: 2, name: '示例应用2', description: '这是另一个示例应用的描述信息' }
    ]);
    
    const submitForm = async () => {
      if (!formRef.value) return;
      
      await formRef.value.validate((valid: boolean) => {
        if (valid) {
          createApp();
        }
      });
    };
    
    const createApp = async () => {
      isCreating.value = true;
      try {
        // 调用创建应用接口
        const response = await axios.post(
          'http://localhost:8001/ai-meeting/api/app/createApp',
          {
            appName: form.appName,
            initPrompt: form.appInfo
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        // 获取返回的应用ID
        const appId = response.data;
        
        // 直接跳转到聊天页面
        router.push(`/app/${appId}`);
      } catch (error) {
        console.error('创建应用失败:', error);
        ElMessage.error('应用创建失败');
      } finally {
        isCreating.value = false;
      }
    };
    
    const editApp = (app: App) => {
      ElMessage.info(`编辑应用: ${app.name}`);
      // 这里可以实现编辑逻辑
    };
    
    const deleteApp = (app: App) => {
      ElMessageBox.confirm(
        `确定要删除应用 "${app.name}" 吗？此操作不可恢复`,
        '删除确认',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        // 执行删除操作
        const index = appList.value.findIndex(item => item.id === app.id);
        if (index !== -1) {
          appList.value.splice(index, 1);
          ElMessage.success('删除成功');
        }
      }).catch(() => {
        // 用户取消删除
      });
    };
    
    // 模拟加载应用列表
    const loadAppList = async () => {
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500));
        // 实际项目中这里会从服务器获取数据
      } catch (error) {
        ElMessage.error('加载应用列表失败');
      }
    };
    
    onMounted(() => {
      loadAppList();
    });
    
    return {
      formRef,
      form,
      rules,
      isCreating,
      appList,
      submitForm,
      editApp,
      deleteApp
    };
  }
});
</script>

<style scoped>
.app-create-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.app-create-form {
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.app-create-form h2 {
  margin-bottom: 20px;
  color: #303133;
}

.app-list h2 {
  margin-bottom: 20px;
  color: #303133;
}

.app-list-content {
  min-height: 300px;
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.app-card {
  border-radius: 8px;
}

.app-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-name {
  font-weight: bold;
  font-size: 16px;
  color: #303133;
}

.app-description {
  min-height: 60px;
  color: #606266;
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 1.5;
}

.app-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

@media (max-width: 768px) {
  .app-create-page {
    padding: 10px;
  }
  
  .app-create-form {
    padding: 16px;
  }
  
  .apps-grid {
    grid-template-columns: 1fr;
  }
}
</style>