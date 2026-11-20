<template>
  <div class="game">
    <div
      class="scene"
      :class="{ night: mode === 'night', breach: mode === 'breach' }"
      :style="{ backgroundImage: `url(${sceneImage})` }"
    />
    <div class="vignette" />
    <div class="grain" />

    <Opening v-if="mode === 'opening'" @start="start" />

    <template v-else>
      <HUD :state="state" :player="player" :job="job" />

      <DayScene
        v-if="mode === 'day'"
        :state="state"
        :room="currentRoom"
        :player="player"
        :npcs="currentNpcs"
        @search="search"
        @talk="talkNpc"
      />
      <NightScene v-else-if="mode === 'night'" :state="state" :player="player" />
      <BreachScene v-else-if="mode === 'breach'" :state="state" :player="player" />

      <div v-if="mode === 'day'" class="actions">
        <button class="action" @click="rest">休息<small>2h · +3 体力</small></button>
        <button class="action" @click="gotoRoom('R24')">去大厅<small>1h</small></button>
        <button class="action primary" @click="toNight">等到天黑<small>20:00</small></button>
      </div>

      <div v-else-if="mode === 'night'" class="actions">
        <button class="action" @click="nightAction('guard')">守门<small>-20% 伤害</small></button>
        <button class="action" @click="nightAction('repair')">修理<small>+25 耐久</small></button>
        <button class="action" @click="nightAction('sleep')">睡眠<small>+2 体力</small></button>
        <button class="action danger" @click="nightAction('out')">外出<small>风险</small></button>
      </div>

      <div v-else-if="mode === 'breach'" class="actions">
        <button class="action" @click="breachAction('heal')">用药<small>+4 HP</small></button>
        <button class="action" @click="breachAction('seal')">封门<small>木料 ×2</small></button>
        <button class="action danger" @click="breachAction('flee')">逃跑<small>体力 -2</small></button>
        <button class="action danger" @click="breachAction('hold')">硬撑<small>承受伤害</small></button>
      </div>

      <nav class="dock">
        <button class="dock-btn" @click="panel = 'map'">地图</button>
        <button class="dock-btn" @click="panel = 'bag'">背包</button>
        <button class="dock-btn" @click="panel = 'people'">人物</button>
      </nav>

      <SidePanel
        v-if="panel"
        :panel="panel"
        :state="state"
        :rooms="rooms"
        :npcs="npcs"
        @close="panel = null"
        @goto="gotoRoom"
        @talk="talkNpc"
      />

      <NpcPanel
        v-if="activeNpc"
        :npc="activeNpc"
        :state="state"
        @close="activeNpc = null"
        @service="useNpc"
      />
    </template>

    <div v-if="mode === 'death'" class="overlay">
      <div class="overlay-card">
        <div class="opening-title">你死在了古堡里</div>
        <p class="overlay-text">第 {{ state.day }} 天，{{ state.phase }}。门外的东西记住了你的名字。</p>
        <button class="start-btn" @click="reset">重新进入古堡</button>
      </div>
    </div>

    <div v-if="mode === 'victory'" class="overlay">
      <div class="overlay-card">
        <div class="opening-title">大门开了</div>
        <p class="overlay-text">第 10 天 08:00，古堡把门还给了你们。存活的人走了出去。</p>
        <button class="start-btn" @click="reset">再来一局</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import HUD from './components/HUD.vue'
import Opening from './components/Opening.vue'
import DayScene from './components/DayScene.vue'
import NightScene from './components/NightScene.vue'
import BreachScene from './components/BreachScene.vue'
import SidePanel from './components/SidePanel.vue'
import NpcPanel from './components/NpcPanel.vue'
import { npcs, jobs, rooms, initialState } from './data/game.js'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

const mode = ref('opening')
const state = reactive(Object.assign(structuredClone(initialState), window.__castleInitialState || {}))
const player = ref(null)
const job = ref(null)
const panel = ref(null)
const activeNpc = ref(null)
const difficulty = ref('常客')

const currentNpcs = computed(() =>
  npcs.filter(n => n.room === state.visited && state.npc[n.id]?.active),
)

function refreshNpcs() {
  const ids = npcs.map(n => n.id)
  const chosen = new Set()
  while (chosen.size < 4) chosen.add(ids[Math.floor(Math.random() * ids.length)])
  for (const id of ids) {
    state.npc[id].active = chosen.has(id)
    state.npc[id].done = false
  }
}

const currentRoom = computed(() => rooms.find(r => r.id === state.visited) || rooms[0])

const sceneImage = computed(() => {
  if (mode.value === 'opening') return asset('scenes/hall.webp')
  if (mode.value === 'day') return asset(`scenes/${currentRoom.value.scene}.webp`)
  return asset('scenes/door_night.webp')
})

function persist() {
  try {
    const host = window.parent !== window ? window.parent : window
    const mvu = host.Mvu || window.Mvu
    if (!mvu) return
    const getId = host.getCurrentMessageId || window.getCurrentMessageId
    const messageId = getId ? getId() : 'latest'
    const data = mvu.getMvuData({ type: 'message', message_id: messageId })
    data.stat_data = data.stat_data || {}
    data.stat_data.$game = JSON.parse(JSON.stringify(state))
    mvu.replaceMvuData(data, { type: 'message', message_id: messageId })
  } catch (error) {
    console.warn('[castle-nine] MVU 写入失败', error)
  }
}

function start(payload) {
  player.value = {
    name: payload.name,
    portrait: payload.appearance.portrait,
    attrs: payload.attrs,
  }
  job.value = payload.job
  difficulty.value = payload.difficulty
  state.playerName = payload.name
  state.playerPortrait = payload.appearance.portrait
  state.attrs = payload.attrs
  state.sight = 2
  state.log = [
    `第 ${state.day} 天 14:00，你以${payload.job.name}的身份留在长餐桌厅。`,
    '门外还留着昨夜的撞痕。',
  ]
  refreshNpcs()
  mode.value = 'day'
  persist()
}

function talkNpc(npc) {
  activeNpc.value = npc
  panel.value = null
}

function useNpc(npc) {
  const rec = state.npc[npc.id]
  if (!rec || rec.done) return
  rec.done = true
  rec.trust = Math.min(5, rec.trust + 1)
  state.time = addHour(state.time, 1)

  if (npc.id === 'doctor') {
    state.hp = Math.min(state.hpMax, state.hp + 3)
    state.log.push('老医者替你处理了伤口。')
  } else if (npc.id === 'watchman') {
    state.night.guardFree = true
    state.log.push('守夜老人答应替你守第一更。')
  } else if (npc.id === 'cook') {
    state.stamina = Math.min(state.staminaMax, state.stamina + 3)
    state.log.push('厨娘塞给你一碗热汤。')
  } else if (npc.id === 'artisan') {
    state.gate.plate = Math.min(state.gate.plateMax, state.gate.plate + 20)
    state.log.push('失忆工匠修好了门板的一角。')
  } else if (npc.id === 'pawnbroker') {
    state.copper += 5
    state.log.push('当铺老板收下一件旧物，给了你 5 铜。')
  } else if (npc.id === 'maskmerchant') {
    state.copper = Math.max(0, state.copper - 20)
    state.log.push('面具商人卖给你一件来路不明的东西。')
  } else if (npc.id === 'diviner') {
    state.log.push('占卜师说：今夜来的是叩门者和裂口者。')
  } else if (npc.id === 'scavenger') {
    state.copper = Math.max(0, state.copper - 10)
    state.log.push('拾荒者塞给你一件从口袋里掏出来的东西。')
  }

  activeNpc.value = null
  persist()
  if (state.time >= '20:00') toNight()
}

function addHour(t, h) {
  const [H, M] = t.split(':').map(Number)
  const total = (H + h) % 24
  return `${String(total).padStart(2, '0')}:${String(M).padStart(2, '0')}`
}

function search(i) {
  if (state.points[i]) return
  state.points[i] = true
  state.time = addHour(state.time, 1)
  state.stamina = Math.max(0, state.stamina - 1)
  const finds = [
    '你从旧木箱里翻出一枚锈蚀的铁件。',
    '挂画后面掉出一小块蜡，像谁藏起来的。',
    '地毯下面只有灰，还有几道抓痕。',
  ]
  state.log.push(finds[i])
  if (state.time >= '20:00') toNight()
  else persist()
}

function rest() {
  state.time = addHour(state.time, 2)
  state.stamina = Math.min(state.staminaMax, state.stamina + 3)
  state.log.push('你靠着墙闭眼休息了一会儿。')
  if (state.time >= '20:00') toNight()
  else persist()
}

function gotoRoom(id) {
  if (id === state.visited) {
    panel.value = null
    return
  }
  state.visited = id
  state.points = [false, false, false]
  state.time = addHour(state.time, 1)
  state.stamina = Math.max(0, state.stamina - 1)
  state.log.push(`你走到${rooms.find(r => r.id === id).name}。`)
  panel.value = null
  if (state.time >= '20:00') toNight()
  else persist()
}

function toNight() {
  mode.value = 'night'
  state.phase = '黑夜'
  state.time = '20:00'
  state.night.hour = 1
  state.night.monsters = [
    { name: '叩门者', type: '破门', player: 0, intent: '本更将撞击门板' },
    { name: '犬形', type: '击杀', player: 3, intent: '潜伏中（下更 +50%）' },
  ]
  state.log.push('20:00，天黑。门外传来第一声撞击。')
  persist()
}

function damageGate(scale, guard) {
  const base = 12 + Math.random() * 12
  const dmg = Math.max(1, Math.round(base * scale * (guard ? 0.8 : 1)))
  state.gate.plate = Math.max(0, state.gate.plate - dmg)
  if (state.gate.plate <= 0) enterBreach()
}

function nightAction(action) {
  if (action === 'guard') {
    state.stamina = Math.max(0, state.stamina - 1)
    state.log.push('你抵住门板，撞击被卸掉一半。')
    resolveNight(true)
    return
  }
  if (action === 'repair') {
    state.stamina = Math.max(0, state.stamina - 2)
    state.gate.plate = Math.min(state.gate.plateMax, state.gate.plate + 25)
    state.log.push('你用木料补上门板的裂缝。')
    resolveNight(false)
    return
  }
  if (action === 'sleep') {
    state.stamina = Math.min(state.staminaMax, state.stamina + 2)
    state.log.push('你靠着门睡着了，梦里有人在数数。')
    resolveNight(false)
    return
  }
  if (action === 'out') {
    state.stamina = Math.max(0, state.stamina - 2)
    state.hp = Math.max(0, state.hp - 1)
    state.log.push('你摸黑去了走廊，撞见一团影子，挨了一下。')
    if (state.hp <= 0) {
      mode.value = 'death'
      return
    }
    resolveNight(false)
  }
}

function resolveNight(guard) {
  const watchman = state.night.guardFree && state.night.hour === 1
  if (watchman) {
    state.night.guardFree = false
    state.log.push('守夜老人替你挡下了第一更的撞击。')
  } else {
    damageGate(1, guard)
  }
  if (mode.value === 'breach') return
  state.night.hour += 1
  if (state.night.hour > 6) {
    dawn()
  } else {
    persist()
  }
}

function dawn() {
  state.day += 1
  if (state.day > 9) {
    mode.value = 'victory'
    return
  }
  mode.value = 'day'
  state.phase = '白天'
  state.time = '08:00'
  state.hp = Math.min(state.hpMax, state.hp + 1)
  state.stamina = Math.min(state.staminaMax, state.stamina + 3)
  state.fear = Math.max(0, state.fear - 2)
  state.points = [false, false, false]
  state.night.guardFree = false
  refreshNpcs()
  state.log.push(`第 ${state.day} 天 08:00，天亮了。门外没有声音。`)
  persist()
}

function enterBreach() {
  mode.value = 'breach'
  state.log.push('门板裂开了。有东西进来了。')
}

function breachAction(action) {
  if (action === 'heal') {
    state.hp = Math.min(state.hpMax, state.hp + 4)
    state.log.push('你撕开绷带，把血止住。')
  }
  if (action === 'seal') {
    const heal = Math.round(state.gate.plateMax * 0.3)
    state.gate.plate = Math.min(state.gate.plateMax, state.gate.plate + heal)
    state.log.push('你用木料临时封门，怪物被挡在外面。')
    mode.value = 'night'
    persist()
    return
  }
  if (action === 'flee') {
    state.stamina = Math.max(0, state.stamina - 2)
    state.hp = Math.max(0, state.hp - 2)
    state.log.push('你从窗户翻出去，逃进走廊。')
    if (state.hp <= 0) {
      mode.value = 'death'
      return
    }
    mode.value = 'day'
    state.visited = 'R24'
    persist()
    return
  }
  if (action === 'hold') {
    state.hp -= 5
    state.log.push('你缩在角落，硬撑过这一更。')
  }
  if (state.hp <= 0) {
    mode.value = 'death'
    return
  }
  state.night.hour += 1
  if (state.night.hour > 6) dawn()
  else persist()
}

function reset() {
  const fresh = structuredClone(initialState)
  Object.assign(state, fresh)
  state.sight = 0
  player.value = null
  job.value = null
  panel.value = null
  mode.value = 'opening'
}
</script>
