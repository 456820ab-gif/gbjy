<template>
  <main class="breach-stage">
    <div class="stage-title" style="color:#d98b8b;margin-bottom:6px">门破了</div>
    <div class="hp-big">
      <div class="bar-label"><span>HP</span><b>{{ state.hp }}/{{ state.hpMax }}</b></div>
      <div class="bar-track">
        <div class="bar-fill hp" :style="{ width: hpPct }" />
      </div>
    </div>

    <div class="breach-list">
      <div v-for="m in state.night.monsters" :key="m.name" class="breach-row">
        <span class="monster-type" :class="m.type">{{ m.type }}</span>
        <span class="bname">{{ m.name }}</span>
        <span class="bact">
          {{ m.type === '击杀' ? `本更将撕咬你 · -${m.player}` : '正在破坏设施' }}
        </span>
      </div>
    </div>

    <div class="log">
      <p v-for="(line, i) in state.log.slice(-2)" :key="i">{{ line }}</p>
    </div>

    <img v-if="player" class="portrait small breach" :src="player.portrait" :alt="player.name" />
  </main>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  state: { type: Object, required: true },
  player: { type: Object, default: null },
})

const hpPct = computed(() => `${Math.max(0, Math.min(100, (props.state.hp / props.state.hpMax) * 100))}%`)
</script>
