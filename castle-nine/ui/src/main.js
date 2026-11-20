import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

async function readMvuState() {
  try {
    const host = window.parent !== window ? window.parent : window
    const mvu = host.Mvu || window.Mvu
    if (!mvu) return null

    if (host.waitGlobalInitialized) {
      await host.waitGlobalInitialized('Mvu')
    }

    const getId = host.getCurrentMessageId || window.getCurrentMessageId
    const messageId = getId ? getId() : 'latest'
    const data = mvu.getMvuData({ type: 'message', message_id: messageId })
    return data?.stat_data?.$game ?? null
  } catch (error) {
    console.warn('[castle-nine] MVU 读取失败，使用本地初始状态', error)
    return null
  }
}

async function boot() {
  window.__castleInitialState = await readMvuState()
  createApp(App).mount('#app')
}

boot()
