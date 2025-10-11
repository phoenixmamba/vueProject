<template>
  <div class="meeting">
    <h1>会议管理</h1>
    
    <!-- 新增会议按钮 -->
    <div class="toolbar">
      <el-button type="primary" @click="openCreateDialog">新增会议</el-button>
      <el-button @click="getAllMeetings">刷新列表</el-button>
    </div>
    
    <!-- 会议列表 -->
    <el-table :data="meetings" border style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="会议ID" width="80" />
      <el-table-column prop="title" label="会议标题" min-width="150" />
      <el-table-column prop="content" label="会议内容" min-width="200" show-overflow-tooltip />
      <el-table-column prop="meetingTime" label="会议时间" width="180" />
      <el-table-column prop="location" label="会议地点" width="120" />
      <el-table-column prop="departments" label="参会部门" width="120" />
      <el-table-column prop="leaders" label="参会领导" width="120" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="updateTime" label="更新时间" width="180" />
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDeleteMeeting(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 新增会议对话框 -->
    <el-dialog title="新增会议" v-model="createDialogVisible" width="500px">
      <el-form :model="createMeetingForm">
        <el-form-item label="会议描述">
          <el-input 
            v-model="createMeetingForm.description" 
            type="textarea"
            :rows="4"
            placeholder="请输入会议描述信息，例如：请创建一个明天下午2点在会议室A的项目进度会议"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleCreateMeeting">确定</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 编辑会议对话框 -->
    <el-dialog title="编辑会议" v-model="editDialogVisible" width="500px">
      <el-form :model="editMeetingForm">
        <el-form-item label="会议ID">
          <el-input v-model="editMeetingForm.id" disabled />
        </el-form-item>
        <el-form-item label="更新描述">
          <el-input 
            v-model="editMeetingForm.updateDescription" 
            type="textarea"
            :rows="4"
            placeholder="请输入更新描述信息，例如：把会议时间改为明天下午3点"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleUpdateMeeting">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted, defineComponent } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

interface Meeting {
  id: string;
  title: string;
  content: string;
  meetingTime: string;
  location: string;
  departments: string;
  leaders: string;
  createTime: string;
  updateTime: string;
}

export default defineComponent({
  name: 'MeetingView',
  setup() {
    // 加载状态
    const loading = ref(false);
    
    // 会议列表
    const meetings = ref<Meeting[]>([]);
    
    // 新增会议对话框可见性
    const createDialogVisible = ref(false);
    
    // 编辑会议对话框可见性
    const editDialogVisible = ref(false);
    
    // 创建会议表单
    const createMeetingForm = reactive({
      description: ''
    });
    
    // 编辑会议表单
    const editMeetingForm = reactive({
      id: '',
      updateDescription: ''
    });

    // 打开新增会议对话框
    const openCreateDialog = () => {
      createMeetingForm.description = '';
      createDialogVisible.value = true;
    };
    
    // 打开编辑会议对话框
    const openEditDialog = (meeting: Meeting) => {
      editMeetingForm.id = meeting.id;
      editMeetingForm.updateDescription = '';
      editDialogVisible.value = true;
    };
    
    // 创建会议
    const handleCreateMeeting = async () => {
      if (!createMeetingForm.description) {
        ElMessage.warning('请输入会议描述');
        return;
      }

      try {
        const response = await fetch('/ai-meeting/api/meetings/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'userId': 'user123' // 默认用户ID
          },
          body: JSON.stringify(createMeetingForm.description)
        });

        if (response.ok) {
          await response.json();
          ElMessage.success('会议创建成功');
          createDialogVisible.value = false;
          // 清空表单
          createMeetingForm.description = '';
          // 刷新会议列表
          getAllMeetings();
        } else {
          ElMessage.error('创建会议失败');
        }
      } catch (error) {
        console.error('创建会议错误:', error);
        ElMessage.error('创建会议发生错误');
      }
    };

    // 更新会议
    const handleUpdateMeeting = async () => {
      if (!editMeetingForm.id || !editMeetingForm.updateDescription) {
        ElMessage.warning('请输入更新描述');
        return;
      }

      try {
        const response = await fetch(`/ai-meeting/api/meetings/${editMeetingForm.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'userId': 'user123' // 默认用户ID
          },
          body: JSON.stringify(editMeetingForm.updateDescription)
        });

        if (response.ok) {
          await response.json();
          ElMessage.success('会议更新成功');
          editDialogVisible.value = false;
          // 清空表单
          editMeetingForm.id = '';
          editMeetingForm.updateDescription = '';
          // 刷新会议列表
          getAllMeetings();
        } else {
          ElMessage.error('更新会议失败');
        }
      } catch (error) {
        console.error('更新会议错误:', error);
        ElMessage.error('更新会议发生错误');
      }
    };

    // 删除会议
    const handleDeleteMeeting = async (id: string) => {
      // 确认删除
      try {
        await ElMessageBox.confirm('确认删除该会议吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
      } catch {
        // 取消删除
        return;
      }

      try {
        const response = await fetch(`/ai-meeting/api/meetings/${id}`, {
          method: 'DELETE',
          headers: {
            'userId': 'user123' // 默认用户ID
          }
        });

        if (response.status === 204) {
          ElMessage.success('会议删除成功');
          // 刷新会议列表
          getAllMeetings();
        } else {
          ElMessage.error('删除会议失败');
        }
      } catch (error) {
        console.error('删除会议错误:', error);
        ElMessage.error('删除会议发生错误');
      }
    };

    // 获取所有会议
    const getAllMeetings = async () => {
      loading.value = true;
      try {
        const response = await fetch('/ai-meeting/api/meetings');
        
        if (response.ok) {
          meetings.value = await response.json();
          ElMessage.success('获取会议列表成功');
        } else {
          ElMessage.error('获取会议列表失败');
        }
      } catch (error) {
        console.error('获取会议列表错误:', error);
        ElMessage.error('获取会议列表发生错误');
      } finally {
        loading.value = false;
      }
    };
    
    // 组件挂载后获取会议列表
    onMounted(() => {
      getAllMeetings();
    });

    // 暴露给模板使用的属性和方法
    return {
      // 数据属性
      loading,
      meetings,
      createDialogVisible,
      editDialogVisible,
      createMeetingForm,
      editMeetingForm,
      
      // 方法
      openCreateDialog,
      openEditDialog,
      handleCreateMeeting,
      handleUpdateMeeting,
      handleDeleteMeeting,
      getAllMeetings
    };
  }
});
</script>

<style scoped>
.meeting {
  padding: 20px;
}

.toolbar {
  margin-bottom: 20px;
}

.dialog-footer {
  text-align: right;
}
</style>