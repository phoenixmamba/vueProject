<template>
  <div class="prompt-assistant-page">
    <div class="chat-container">
      <div class="chat-header">
        <h2>Prompt 助手</h2>
        <p>优化您的 Prompt 提示词</p>
      </div>
      
      <div class="chat-messages" ref="messagesContainer">
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          :class="['message', message.role]"
        >
          <div class="message-content">
            <div class="avatar">
              <el-avatar 
                :icon="message.role === 'user' ? 'el-icon-user' : 'el-icon-robot'" 
                size="small" 
              />
            </div>
            <div class="content">
              <MarkdownRenderer :content="message.content" />
            </div>
          </div>
        </div>
        <div v-if="isLoading" class="message assistant">
          <div class="message-content">
            <div class="avatar">
              <el-avatar icon="el-icon-robot" size="small" />
            </div>
            <div class="content">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chat-input">
        <div class="input-wrapper" ref="inputWrapperRef">
          <!-- 垂直拖拽手柄 -->
          <div 
            class="resize-handle" 
            @mousedown="initResize"
            title="拖拽调整输入框高度"
          >
            ⋮
          </div>
          <el-input
            v-model="inputMessage"
            type="textarea"
            :rows="5"
            placeholder="请输入您需要优化的 Prompt..."
            @keydown.ctrl.enter="sendMessage"
            resize="none"
            class="resizable-textarea"
          />
        </div>
        <div class="input-actions">
          <el-button 
            @click="startNewConversation"
            :loading="isNewConversationLoading"
          >
            新的会话
          </el-button>
          <el-button 
            type="primary" 
            @click="sendMessage"
            :disabled="!inputMessage.trim() || isLoading || !conversationId"
            round
          >
            发送 (Ctrl+Enter)
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default defineComponent({
  name: 'PromptAssistantView',
  components: {
    MarkdownRenderer
  },
  setup() {
    const messages = ref<Message[]>([
      {
        role: 'assistant',
        content: '您好！我是 Prompt 助手，可以帮助您优化提示词。请告诉我您想要实现什么效果的 Prompt？'
      }
    ]);
    const inputMessage = ref('');
    const isLoading = ref(false);
    const isNewConversationLoading = ref(false);
    const messagesContainer = ref<HTMLElement | null>(null);
    const conversationId = ref(''); // 将其改为响应式引用
    const inputWrapperRef = ref<HTMLElement | null>(null); // 添加输入框容器引用
    
    // 生成随机ID
    const generateRandomId = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 12; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };
    
    // 初始化拖拽调整大小
    const initResize = (e: MouseEvent) => {
      e.preventDefault();
      
      const startY = e.clientY;
      const textarea = inputWrapperRef.value?.querySelector('textarea');
      if (!textarea) return;
      
      const startHeight = parseInt(document.defaultView?.getComputedStyle(textarea).height || '0', 10);
      
      const doDrag = (e: MouseEvent) => {
        const newHeight = startHeight - (e.clientY - startY); // 修正方向
        
        if (textarea && newHeight > 50) { // 最小高度50px
          textarea.style.height = newHeight + 'px';
        }
      };
      
      const stopDrag = () => {
        document.documentElement.removeEventListener('mousemove', doDrag, false);
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
      };
      
      document.documentElement.addEventListener('mousemove', doDrag, false);
      document.documentElement.addEventListener('mouseup', stopDrag, false);
    };
    
    // 开始新的会话
    const startNewConversation = async () => {
      isNewConversationLoading.value = true;
      let eventSource: EventSource | null = null
      let streamCompleted = false
      try {
        // 生成新的会话ID
        conversationId.value = generateRandomId(); // 更新为 .value 形式

        // 清空消息
        messages.value = [
          {
            role: 'assistant',
            content: ''
          }
        ];

        const url = `http://localhost:8001/ai-meeting/api/prompt/newConversation/${conversationId.value}`

        // 创建 EventSource 连接
        eventSource = new EventSource(url, {
          withCredentials: true,
        })

        let fullContent = ''
        const assistantMessageIndex = 0; // 新消息在数组中的位置

        // 处理接收到的消息
        eventSource.onmessage = function (event) {
          if (streamCompleted) return

          try {
            // 解析JSON包装的数据
            console.log('接收到消息:', event.data)
            // const parsed = JSON.parse(event.data)
            // const content = parsed.d
            const content = event.data
            
            // 拼接内容
            if (content !== undefined && content !== null) {
              fullContent += content
              // 使用 Vue 的响应式更新确保视图更新
              messages.value[assistantMessageIndex].content = fullContent
              // messages.value[aiMessageIndex].loading = false
              
              // 强制触发更新，确保内容显示
              nextTick(() => {
                scrollToBottom()
              })
            }
          } catch (error) {
            console.error('解析消息失败:', error)
            
          }
        }

        // 处理done事件
        eventSource.addEventListener('done', function () {
          if (streamCompleted) return

          streamCompleted = true
          eventSource?.close()
        })
      
        
        scrollToBottom();
      } catch (error) {
        console.error('创建新会话失败:', error);
        ElMessage.error('创建新会话失败');
        
        // 显示错误消息
        messages.value = [{
          role: 'assistant',
          content: '抱歉，创建新会话时出现错误，请稍后重试。'
        }];
      } finally {
        isNewConversationLoading.value = false;
      }
    };
    
    // 发送消息
    const sendMessage = async () => {
      if (!inputMessage.value.trim() || isLoading.value) return;
      
      // 如果还没有会话ID，先创建一个
      if (!conversationId.value) { // 更新为 .value 形式
        conversationId.value = generateRandomId(); // 更新为 .value 形式
      }
      
      // 添加用户消息
      const userMessage: Message = {
        role: 'user',
        content: inputMessage.value
      };
      
      messages.value.push(userMessage);
      const userInput = inputMessage.value;
      inputMessage.value = '';
      
      try {
        isLoading.value = true;
        
        // 添加助手消息占位符
        const assistantMessage: Message = {
          role: 'assistant',
          content: ''
        };
        messages.value.push(assistantMessage);
        const assistantMessageIndex = messages.value.length - 1; // 记录消息索引
        
        // 滚动到底部
        scrollToBottom();
        
        // 调用后端API，将用户输入作为body传递
        await sendPromptToConversation(userInput, assistantMessageIndex);
      } catch (error) {
        console.error('发送消息失败:', error);
        ElMessage.error('发送消息失败');
        // 移除空的助手消息
        messages.value.pop();
      } finally {
        isLoading.value = false;
        scrollToBottom();
      }
    };
    
    // 发送Prompt到会话
    const sendPromptToConversation = async (prompt: string, messageIndex: number) => {
      try {
        let eventSource: EventSource | null = null
        let streamCompleted = false
        // 构建URL参数
        const params = new URLSearchParams({
          description: prompt,
        })
        const url = `http://localhost:8001/ai-meeting/api/prompt/generatePrompt/${conversationId.value}?${params}`

        // 创建 EventSource 连接
        eventSource = new EventSource(url, {
          withCredentials: true,
        })

        let fullContent = ''

        // 处理接收到的消息
        eventSource.onmessage = function (event) {
          if (streamCompleted) return

          try {
            // 解析JSON包装的数据
            console.log('接收到消息:', event.data)
            // const parsed = JSON.parse(event.data)
            // const content = parsed.d
            const content = event.data
            
            // 拼接内容
            if (content !== undefined && content !== null) {
              fullContent += content
              // 使用 Vue 的响应式更新确保视图更新
              messages.value[messageIndex].content = fullContent
              // messages.value[aiMessageIndex].loading = false
              
              // 强制触发更新，确保内容显示
              nextTick(() => {
                scrollToBottom()
              })
            }
          } catch (error) {
            console.error('解析消息失败:', error)
            
          }
        }

        // 处理done事件
        eventSource.addEventListener('done', function () {
          if (streamCompleted) return

          streamCompleted = true
          eventSource?.close()
        })

      } catch (error) {
        console.error('发送Prompt到会话失败:', error);
        messages.value[messageIndex].content = '抱歉，发送消息时出现错误，请稍后重试。';
      }
    };
    
  
    
    // 滚动到底部
    const scrollToBottom = () => {
      nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
      });
    };
    
    // 组件卸载时关闭连接
    onUnmounted(() => {
      // if (controller) {
      //   controller.abort();
      // }
    });
    
    onMounted(() => {
      scrollToBottom();
    });
    
    return {
      messages,
      inputMessage,
      isLoading,
      isNewConversationLoading,
      messagesContainer,
      sendMessage,
      startNewConversation,
      conversationId,
      inputWrapperRef,
      initResize // 暴露拖拽方法
    };
  }
});
</script>

<style scoped>
.prompt-assistant-page {
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f5f5f5;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chat-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.chat-header h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
}

.chat-header p {
  margin: 0;
  opacity: 0.9;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 默认所有消息左对齐 */
}

.message-content {
  display: flex;
  gap: 15px;
  max-width: 90%;
}

/* 用户消息左对齐 */
.message.user .message-content {
  align-self: flex-start;
}

/* 助手消息也左对齐 */
.message.assistant .message-content {
  align-self: flex-start;
}

.message.user .content {
  background-color: #667eea;
  color: white;
}

.message.assistant .content {
  background-color: #f1f1f1;
  color: #333;
}

.avatar {
  flex-shrink: 0;
}

.content {
  padding: 12px 16px;
  border-radius: 18px;
  line-height: 1.5;
  min-width: 0; /* 防止内容溢出 */
  white-space: pre-wrap; /* 保留空白符和换行符 */
}

.typing-indicator {
  display: flex;
  align-items: center;
  padding: 5px 0;
}

.typing-indicator span {
  height: 8px;
  width: 8px;
  background: #ccc;
  border-radius: 50%;
  margin: 0 2px;
  animation: typing 1s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.chat-input {
  padding: 20px;
  border-top: 1px solid #eee;
}

.input-wrapper {
  position: relative;
  margin-bottom: 15px;
}

/* 垂直拖拽手柄 */
.resize-handle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
  cursor: ns-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 16px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.8);
  z-index: 10;
}

.resize-handle:hover {
  background: #f0f0f0;
  color: #666;
}

/* 可调整大小的文本框 */
.resizable-textarea :deep(.el-textarea__inner) {
  resize: none; /* 禁用默认的textarea调整大小 */
  min-height: 120px; /* 设置最小高度 */
  padding-top: 15px; /* 为顶部拖拽手柄留出空间 */
}

.input-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

@media (max-width: 768px) {
  .prompt-assistant-page {
    padding: 10px;
    height: calc(100vh - 50px);
  }
  
  .chat-container {
    border-radius: 8px;
  }
  
  .message-content {
    max-width: 95%;
  }
  
  .chat-header {
    padding: 15px;
  }
  
  .chat-header h2 {
    font-size: 20px;
  }
  
  .chat-messages {
    padding: 15px;
  }
  
  .chat-input {
    padding: 15px;
  }
  
  /* 移动端隐藏拖拽手柄 */
  .resize-handle {
    display: none;
  }
}
</style>