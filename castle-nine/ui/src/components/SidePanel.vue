<template>
  <div class="drawer-mask" @click="$emit('close')" />
  <aside class="drawer">
    <div class="drawer-head">
      <span class="drawer-title">{{ titles[panel] }}</span>
      <button class="drawer-close" @click="$emit('close')">收起</button>
    </div>

    <template v-if="panel === 'map'">
      <div class="map-grid">
        <button
          v-for="r in rooms"
          :key="r.id"
          class="map-card"
          :class="{ active: r.id === state.visited }"
          @click="$emit('goto', r.id)"
        >
          <div class="map-name">{{ r.name }}</div>
          <div class="map-desc">{{ r.desc }}</div>
        </button>
      </div>
    </template>

    <template v-else-if="panel === 'bag'">
      <div class="bag-grid">
        <div v-for="item in items" :key="item.name" class="bag-item">
          <div class="iname">{{ item.name }}</div>
          <div class="igrade">{{ item.grade }}</div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="side-label">善良</div>
      <div class="people-list">
        <button
          v-for="n in goodNpcs"
          :key="n.id"
          class="person npc"
          :class="{ inactive: !state.npc[n.id]?.active }"
          @click="$emit('talk', n)"
        >
          <img :src="n.portrait" :alt="n.name" />
          <span class="pname">{{ n.name }}</span>
          <span class="pjob">{{ n.service }}</span>
          <span class="pstate" :class="{ done: state.npc[n.id]?.done }">
            {{ !state.npc[n.id]?.active ? '不在古堡' : state.npc[n.id]?.done ? '已交互' : roomName(n.room) }}
          </span>
        </button>
      </div>

      <div class="side-label">中立</div>
      <div class="people-list">
        <button
          v-for="n in neutralNpcs"
          :key="n.id"
          class="person npc"
          :class="{ inactive: !state.npc[n.id]?.active }"
          @click="$emit('talk', n)"
        >
          <img :src="n.portrait" :alt="n.name" />
          <span class="pname">{{ n.name }}</span>
          <span class="pjob">{{ n.service }}</span>
          <span class="pstate" :class="{ done: state.npc[n.id]?.done }">
            {{ !state.npc[n.id]?.active ? '不在古堡' : state.npc[n.id]?.done ? '已交互' : roomName(n.room) }}
          </span>
        </button>
      </div>
    </template>
  </aside>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  panel: { type: String, required: true },
  state: { type: Object, required: true },
  rooms: { type: Array, required: true },
  npcs: { type: Array, required: true },
})

defineEmits(['close', 'goto', 'talk'])

const titles = { map: '古堡地图', bag: '背包', people: '古堡里的 NPC' }

const goodNpcs = computed(() => props.npcs.filter(n => n.side === '善良'))
const neutralNpcs = computed(() => props.npcs.filter(n => n.side === '中立'))

function roomName(id) {
  return props.rooms.find(r => r.id === id)?.name || '古堡'
}

const items = [
  { name: '猎刀', grade: '锈' },
  { name: '蜡烛', grade: '尘' },
  { name: '木料 ×2', grade: '材料' },
  { name: '绷带', grade: '尘' },
  { name: '古堡草图', grade: '蜡' },
]
</script>
