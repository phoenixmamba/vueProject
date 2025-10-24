<template>
  <el-dialog v-model="visible" title="应用详情" width="500px" :show-close="false">
    <div class="app-detail-content">
      <!-- 应用基础信息 -->
      <!-- <div class="app-basic-info">
        <div class="info-item">
          <span class="info-label">创建者：</span>
          <UserInfo :user="app?.user" size="small" />
        </div>
        <div class="info-item">
          <span class="info-label">创建时间：</span>
          <span>{{ formatTime(app?.createTime) }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">生成类型：</span>
          <el-tag v-if="app?.codeGenType" type="primary">
            {{ formatCodeGenType(app.codeGenType) }}
          </el-tag>
          <span v-else>未知类型</span>
        </div>
      </div> -->

      <!-- 操作栏（仅本人或管理员可见） -->
      <div class="app-actions">
        <el-space>
          <el-button type="primary" @click="handleEdit">
            <el-icon><EditPen /></el-icon>
            修改
          </el-button>
          <el-popconfirm
            title="确定要删除这个应用吗？"
            @confirm="handleDelete"
            confirm-button-text="确定"
            cancel-button-text="取消"
          >
            <template #reference>
              <el-button type="danger">
                <el-icon><Delete /></el-icon>
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </el-space>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, withDefaults, defineProps, defineEmits, ref, watch } from 'vue'
import { EditPen, Delete } from '@element-plus/icons-vue'
import UserInfo from './UserInfo.vue'
import { formatTime } from '@/utils/time'

const props = withDefaults(defineProps<{
  open: boolean
  app?: any
}>(), {
  open: false,
  app: null
})

const emit = defineEmits(['update:open', 'edit', 'delete'])

const visible = ref(false)

watch(() => props.open, (newVal) => {
  visible.value = newVal
})

watch(visible, (newVal) => {
  emit('update:open', newVal)
})

const handleEdit = () => {
  emit('edit')
}

const handleDelete = () => {
  emit('delete')
}
</script>

<style scoped>
.app-detail-content {
  padding: 8px 0;
}

.app-basic-info {
  margin-bottom: 24px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.info-label {
  width: 80px;
  color: #666;
  font-size: 14px;
  flex-shrink: 0;
}

.app-actions {
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}
</style>