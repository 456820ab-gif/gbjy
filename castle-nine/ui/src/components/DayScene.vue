<template>
  <main class="stage">
    <div class="stage-title">
      {{ room.name }}
      <span class="risk">
        <i v-for="n in 3" :key="n" :class="{ on: n <= room.risk + 1 }" />
      </span>
    </div>
    <div class="stage-sub">{{ room.desc }} · 剩余 {{ hoursLeft }} 小时</div>

    <div v-if="npcs.length" class="npc-strip">
      <button
        v-for="n in npcs"
        :key="n.id"
        class="npc-chip"
        :class="{ done: state.npc[n.id]?.done }"
        @click="$emit('talk', n)"
      >
        <img :src="n.portrait" :alt="n.name" />
        <div>
          <b>{{ n.name }}</b>
          <small>
            {{ state.npc[n.id]?.done ? '今日已交互' : `${n.side} · ${n.service}` }}
          </small>
        </div>
      </button>
    </div>

    <div class="points">
      <button
        v-for="(done, i) in state.points"
        :key="i"
        class="point"
        :class="{ done }"
        @click="$emit('search', i)"
      >
        <div class="point-name">{{ done ? '已搜索' : pointNames[i] }}</div>
        <div class="point-hint">{{ done ? '空' : '搜索 · 1h' }}</div>
      </button>
    </div>

    <div class="log">
      <p v-for="(line, i) in state.log.slice(-2)" :key="i">{{ line }}</p>
    </div>

    <img v-if="player" class="portrait" :src="player.portrait" :alt="player.name" />
  </main>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  state: { type: Object, required: true },
  room: { type: Object, required: true },
  player: { type: Object, default: null },
  npcs: { type: Array, default: () => [] },
})

defineEmits(['search', 'talk'])

const pointNames = ['旧木箱', '墙上挂画', '桌下地毯']
const hoursLeft = computed(() => 20 - Number(props.state.time.split(':')[0]))
</script>
