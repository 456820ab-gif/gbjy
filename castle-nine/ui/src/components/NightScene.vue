<template>
  <main class="night-stage">
    <GateDiagram :gate="state.gate" />

    <div class="wave">
      第 {{ state.night.hour }} 更 / 6
      <i v-for="n in 6" :key="n" :class="{ on: n <= state.night.hour }" />
    </div>

    <div class="monster-list">
      <div v-for="m in state.night.monsters" :key="m.name" class="monster-row">
        <span class="monster-type" :class="m.type">{{ m.type }}</span>
        <span class="monster-name">{{ m.name }}</span>
        <span class="monster-intent">{{ m.intent }}</span>
      </div>
    </div>

    <div class="log">
      <p v-for="(line, i) in state.log.slice(-2)" :key="i">{{ line }}</p>
    </div>

    <img v-if="player" class="portrait small" :src="player.portrait" :alt="player.name" />
  </main>
</template>

<script setup>
import GateDiagram from './GateDiagram.vue'

defineProps({
  state: { type: Object, required: true },
  player: { type: Object, default: null },
})
</script>
