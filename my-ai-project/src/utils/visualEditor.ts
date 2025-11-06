/**
 * 可视化编辑器工具类
 * 负责管理iframe内的可视化编辑功能
 */
export interface ElementInfo {
  tagName: string
  id: string
  className: string
  textContent: string
  selector: string
  pagePath: string
  rect: {
    top: number
    left: number
    width: number
    height: number
  }
}

export interface VisualEditorOptions {
  onElementSelected?: (elementInfo: ElementInfo) => void
  onElementHover?: (elementInfo: ElementInfo) => void
}

export class VisualEditor {
  private iframe: HTMLIFrameElement | null = null
  private isEditMode = false
  private options: VisualEditorOptions

  constructor(options: VisualEditorOptions = {}) {
    this.options = options
  }

  /**
   * 初始化编辑器
   */
  init(iframe: HTMLIFrameElement) {
    this.iframe = iframe
  }

  /**
   * 开启编辑模式
   */
  enableEditMode() {
    console.log('VisualEditor: 开启编辑模式');
    if (!this.iframe) {
      console.log('VisualEditor: 无法开启编辑模式，iframe 不存在');
      return
    }
    this.isEditMode = true
    setTimeout(() => {
      this.injectEditScript()
    }, 300)
  }

  /**
   * 关闭编辑模式
   */
  disableEditMode() {
    this.isEditMode = false
    this.sendMessageToIframe({
      type: 'TOGGLE_EDIT_MODE',
      editMode: false,
    })
    // 清除所有编辑状态
    this.sendMessageToIframe({
      type: 'CLEAR_ALL_EFFECTS',
    })
  }

  /**
   * 切换编辑模式
   */
  toggleEditMode() {
    if (this.isEditMode) {
      this.disableEditMode()
    } else {
      this.enableEditMode()
    }
    return this.isEditMode
  }

  /**
   * 强制同步状态并清理
   */
  syncState() {
    if (!this.isEditMode) {
      this.sendMessageToIframe({
        type: 'CLEAR_ALL_EFFECTS',
      })
    }
  }

  /**
   * 清除选中的元素
   */
  clearSelection() {
    this.sendMessageToIframe({
      type: 'CLEAR_SELECTION',
    })
  }

  /**
   * iframe 加载完成时调用
   */
  onIframeLoad() {
    console.log('VisualEditor: onIframeLoad 被调用', {
      isEditMode: this.isEditMode,
      hasIframe: !!this.iframe
    });
    if (this.isEditMode) {
      setTimeout(() => {
        this.injectEditScript()
      }, 500)
    } else {
      // 确保非编辑模式时清理状态
      setTimeout(() => {
        this.syncState()
      }, 500)
    }
  }

  /**
   * 处理来自 iframe 的消息
   */
  handleIframeMessage(event: MessageEvent) {
    console.log('VisualEditor: 接收到 iframe 消息', event.data);
    const { type, data } = event.data
    switch (type) {
      case 'ELEMENT_SELECTED':
        console.log('VisualEditor: 接收到元素选择消息', data);
        if (this.options.onElementSelected && data.elementInfo) {
          console.log('VisualEditor: 调用 onElementSelected 回调');
          this.options.onElementSelected(data.elementInfo)
        }
        break
      case 'ELEMENT_HOVER':
        if (this.options.onElementHover && data.elementInfo) {
          this.options.onElementHover(data.elementInfo)
        }
        break
    }
  }

  /**
   * 向 iframe 发送消息
   */
  private sendMessageToIframe(message: Record<string, any>) {
    console.log('VisualEditor: 向 iframe 发送消息', message);
    if (this.iframe?.contentWindow) {
      // 使用更精确的目标源而不是 '*'
      const iframeSrc = this.iframe.src;
      const targetOrigin = iframeSrc ? new URL(iframeSrc).origin : '*';
      this.iframe.contentWindow.postMessage(message, targetOrigin)
      // 添加确认机制
      setTimeout(() => {
        if (this.iframe?.contentWindow) {
          this.iframe.contentWindow.postMessage({ type: 'PING_IFRAME' }, targetOrigin);
        }
      }, 100);
    } else {
      console.log('VisualEditor: 无法向 iframe 发送消息，contentWindow 不存在');
    }
  }

  /**
   * 注入编辑脚本到 iframe
   */
  private injectEditScript() {
    console.log('VisualEditor: 开始注入编辑脚本');
    if (!this.iframe) {
      console.log('VisualEditor: iframe 不存在，无法注入脚本');
      return
    }

    let retryCount = 0;
    const maxRetries = 10;

    const waitForIframeLoad = () => {
      try {
        console.log('VisualEditor: 检查 iframe 状态', {
          hasContentWindow: !!this.iframe!.contentWindow,
          hasContentDocument: !!this.iframe!.contentDocument,
          readyState: this.iframe!.contentDocument?.readyState
        });
        
        // 检查是否存在跨域问题
        let contentDoc = null;
        try {
          contentDoc = this.iframe!.contentDocument;
        } catch (e) {
          console.log('VisualEditor: 访问 contentDocument 时出现跨域错误', e);
        }
        
        if (this.iframe!.contentWindow && contentDoc) {
          // 检查是否已经注入过脚本
          if (contentDoc.getElementById('visual-edit-script')) {
            console.log('VisualEditor: 编辑脚本已存在，发送切换编辑模式消息');
            this.sendMessageToIframe({
              type: 'TOGGLE_EDIT_MODE',
              editMode: true,
            })
            return
          }

          const script = this.generateEditScript()
          const scriptElement = contentDoc.createElement('script')
          scriptElement.id = 'visual-edit-script'
          scriptElement.textContent = script
          contentDoc.head.appendChild(scriptElement)
          console.log('VisualEditor: 成功注入编辑脚本');
        } else if (this.iframe!.contentWindow && !contentDoc) {
          // 跨域情况下，尝试使用 postMessage 方式注入脚本
          console.log('VisualEditor: 检测到跨域，尝试通过 postMessage 注入脚本');
          const script = this.generateEditScript();
          
          // 尝试发送消息并增加重试机制
          const sendCrossOriginMessage = () => {
            console.log(`VisualEditor: 准备发送跨域注入消息 (尝试 ${retryCount + 1}/${maxRetries})`);
            if (this.iframe?.contentWindow) {
              // 使用更精确的目标源而不是 '*'
              const iframeSrc = this.iframe.src;
              const targetOrigin = iframeSrc ? new URL(iframeSrc).origin : '*';
              this.iframe.contentWindow.postMessage({
                type: 'INJECT_VISUAL_EDITOR_SCRIPT',
                script: script
              }, targetOrigin);
              console.log('VisualEditor: 跨域注入消息已发送');
            } else {
              console.log('VisualEditor: 无法发送跨域注入消息，contentWindow 不存在');
              return;
            }
            
            // 发送确认消息以检查 iframe 是否接收
            setTimeout(() => {
              if (this.iframe?.contentWindow) {
                const iframeSrc = this.iframe.src;
                const targetOrigin = iframeSrc ? new URL(iframeSrc).origin : '*';
                this.iframe.contentWindow.postMessage({
                  type: 'PING_IFRAME'
                }, targetOrigin);
              }
            }, 100);
          };
          
          sendCrossOriginMessage();
          
          // 监听响应消息以确认 iframe 是否接收
          const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'PONG_IFRAME') {
              console.log('VisualEditor: 成功收到 iframe 的响应，脚本应该已注入');
              window.removeEventListener('message', handleMessage);
            } else if (retryCount < maxRetries) {
              retryCount++;
              console.log(`VisualEditor: 未收到响应，${retryCount}/${maxRetries} 次重试`);
              setTimeout(sendCrossOriginMessage, 500);
            } else {
              console.log('VisualEditor: 达到最大重试次数，停止尝试');
              window.removeEventListener('message', handleMessage);
              
              // 如果所有方法都失败了，尝试给出提示
              console.log('VisualEditor: 无法注入编辑脚本，可能是跨域限制导致');
            }
          };
          
          window.addEventListener('message', handleMessage);
          
          // 设置超时，避免监听器一直存在
          setTimeout(() => {
            window.removeEventListener('message', handleMessage);
          }, 10000);
        } else {
          console.log('VisualEditor: iframe 尚未加载完成，等待中...');
          setTimeout(waitForIframeLoad, 100)
        }
      } catch (error) {
        console.error('VisualEditor: 注入编辑脚本失败', error);
        // 静默处理注入失败
      }
    }

    waitForIframeLoad()
  }

  /**
   * 生成编辑脚本内容
   */
  private generateEditScript() {
    console.log('VisualEditor: 生成编辑脚本');
    return `
      (function() {
        console.log('VisualEditor: iframe 中的编辑脚本已启动');
        let isEditMode = true;
        let currentHoverElement = null;
        let currentSelectedElement = null;

        function injectStyles() {
          if (document.getElementById('edit-mode-styles')) return;
          const style = document.createElement('style');
          style.id = 'edit-mode-styles';
          style.textContent = \`
            .edit-hover {
              outline: 2px dashed #1890ff !important;
              outline-offset: 2px !important;
              cursor: crosshair !important;
              transition: outline 0.2s ease !important;
              position: relative !important;
            }
            .edit-hover::before {
              content: '' !important;
              position: absolute !important;
              top: -4px !important;
              left: -4px !important;
              right: -4px !important;
              bottom: -4px !important;
              background: rgba(24, 144, 255, 0.02) !important;
              pointer-events: none !important;
              z-index: -1 !important;
            }
            .edit-selected {
              outline: 3px solid #52c41a !important;
              outline-offset: 2px !important;
              cursor: default !important;
              position: relative !important;
            }
            .edit-selected::before {
              content: '' !important;
              position: absolute !important;
              top: -4px !important;
              left: -4px !important;
              right: -4px !important;
              bottom: -4px !important;
              background: rgba(82, 196, 26, 0.03) !important;
              pointer-events: none !important;
              z-index: -1 !important;
            }
          \`;
          document.head.appendChild(style);
        }

        // 生成元素选择器
        function generateSelector(element) {
          const path = [];
          let current = element;
          while (current && current !== document.body) {
            let selector = current.tagName.toLowerCase();
            if (current.id) {
              selector += '#' + current.id;
              path.unshift(selector);
              break;
            }
            if (current.className) {
              const classes = current.className.split(' ').filter(c => c && !c.startsWith('edit-'));
              if (classes.length > 0) {
                selector += '.' + classes.join('.');
              }
            }
            const siblings = Array.from(current.parentElement?.children || []);
            const index = siblings.indexOf(current) + 1;
            selector += ':nth-child(' + index + ')';
            path.unshift(selector);
            current = current.parentElement;
          }
          return path.join(' > ');
        }

        // 获取元素信息
        function getElementInfo(element) {
          const rect = element.getBoundingClientRect();
          // 获取 HTML 文件名后面的部分（查询参数和锚点）
          let pagePath = window.location.search + window.location.hash;
          // 如果没有查询参数和锚点，则显示为空
          if (!pagePath) {
            pagePath = '';
          }

          return {
            tagName: element.tagName,
            id: element.id,
            className: element.className,
            textContent: element.textContent?.trim().substring(0, 100) || '',
            selector: generateSelector(element),
            pagePath: pagePath,
            rect: {
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height
            }
          };
        }

        // 清除悬浮效果
        function clearHoverEffect() {
          if (currentHoverElement) {
            currentHoverElement.classList.remove('edit-hover');
            currentHoverElement = null;
          }
        }

        // 清除选中效果
        function clearSelectedEffect() {
          const selected = document.querySelectorAll('.edit-selected');
          selected.forEach(el => el.classList.remove('edit-selected'));
          currentSelectedElement = null;
        }

        let eventListenersAdded = false;

        function addEventListeners() {
           if (eventListenersAdded) return;

           const mouseoverHandler = (event) => {
             if (!isEditMode) return;

             const target = event.target;
             if (target === currentHoverElement || target === currentSelectedElement) return;
             if (target === document.body || target === document.documentElement) return;
             if (target.tagName === 'SCRIPT' || target.tagName === 'STYLE') return;

             clearHoverEffect();
             target.classList.add('edit-hover');
             currentHoverElement = target;
           };

           const mouseoutHandler = (event) => {
             if (!isEditMode) return;

             const target = event.target;
             if (!event.relatedTarget || !target.contains(event.relatedTarget)) {
               clearHoverEffect();
             }
           };

           const clickHandler = (event) => {
             if (!isEditMode) return;

             console.log('VisualEditor: iframe 中元素被点击', event.target);
             event.preventDefault();
             event.stopPropagation();

             const target = event.target;
             if (target === document.body || target === document.documentElement) return;
             if (target.tagName === 'SCRIPT' || target.tagName === 'STYLE') return;

             clearSelectedEffect();
             clearHoverEffect();

             target.classList.add('edit-selected');
             currentSelectedElement = target;

             const elementInfo = getElementInfo(target);
             console.log('VisualEditor: 获取到元素信息', elementInfo);
             try {
               window.parent.postMessage({
                 type: 'ELEMENT_SELECTED',
                 data: { elementInfo }
               }, '*');
             } catch (error) {
               console.error('VisualEditor: 发送消息到父窗口失败', error);
               // 静默处理发送失败
             }
           };

           document.body.addEventListener('mouseover', mouseoverHandler, true);
           document.body.addEventListener('mouseout', mouseoutHandler, true);
           document.body.addEventListener('click', clickHandler, true);
           eventListenersAdded = true;
         }

         function setupEventListeners() {
           addEventListeners();
         }

        // 监听父窗口消息
        window.addEventListener('message', (event) => {
          // 添加来源检查以提高安全性
          const iframeSrc = document.referrer;
          if (iframeSrc && event.origin !== new URL(iframeSrc).origin) {
            console.warn('VisualEditor: iframe 中收到非预期来源的消息', event.origin);
            return;
          }
          
          console.log('VisualEditor: iframe 中接收到消息', event.data);
          const { type, editMode, script } = event.data;
          switch (type) {
            case 'TOGGLE_EDIT_MODE':
              isEditMode = editMode;
              if (isEditMode) {
                injectStyles();
                setupEventListeners();
                showEditTip();
              } else {
                clearHoverEffect();
                clearSelectedEffect();
              }
              break;
            case 'CLEAR_SELECTION':
              clearSelectedEffect();
              break;
            case 'CLEAR_ALL_EFFECTS':
              isEditMode = false;
              clearHoverEffect();
              clearSelectedEffect();
              const tip = document.getElementById('edit-tip');
              if (tip) tip.remove();
              break;
            case 'INJECT_VISUAL_EDITOR_SCRIPT':
              // 处理跨域情况下的脚本注入
              console.log('VisualEditor: 接收到跨域脚本注入请求');
              if (script && !document.getElementById('visual-edit-script')) {
                const scriptElement = document.createElement('script');
                scriptElement.id = 'visual-edit-script';
                scriptElement.textContent = script;
                document.head.appendChild(scriptElement);
                console.log('VisualEditor: 跨域脚本注入成功');
              }
              break;
            case 'PING_IFRAME':
              // 响应父窗口的 ping 消息
              console.log('VisualEditor: iframe 收到 ping 消息，正在响应');
              event.source?.postMessage({ type: 'PONG_IFRAME' }, event.origin);
              break;
          }
        });

         function showEditTip() {
           if (document.getElementById('edit-tip')) return;
           const tip = document.createElement('div');
           tip.id = 'edit-tip';
           tip.innerHTML = '🎯 编辑模式已开启<br/>悬浮查看元素，点击选中元素';
           tip.style.cssText = \`
             position: fixed;
             top: 20px;
             right: 20px;
             background: #1890ff;
             color: white;
             padding: 12px 16px;
             border-radius: 6px;
             font-size: 14px;
             z-index: 9999;
             box-shadow: 0 4px 12px rgba(0,0,0,0.15);
             animation: fadeIn 0.3s ease;
           \`;
           const style = document.createElement('style');
           style.textContent = '@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }';
           document.head.appendChild(style);
           document.body.appendChild(tip);
           setTimeout(() => {
             if (tip.parentNode) {
               tip.style.animation = 'fadeIn 0.3s ease reverse';
               setTimeout(() => tip.remove(), 300);
             }
           }, 3000);
         }
         injectStyles();
         setupEventListeners();
         showEditTip();
      })();
    `
  }
}
