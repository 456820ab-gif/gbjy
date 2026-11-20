<template>
  <header class="hud">
    <div class="hud-top">
      <div class="hud-day">
        第 {{ state.day }} 天
        <small>{{ state.time }} · {{ state.phase }}</small>
      </div>
      <div class="hud-phase">{{ state.phase === '白天' ? '白昼' : '黑夜' }}</div>
    </div>

    <div class="hud-bars">
      <div class="bar">
        <div class="bar-label"><span>HP</span><b>{{ state.hp }}/{{ state.hpMax }}</b></div>
        <div class="bar-track"><div class="bar-fill hp" :style="{ width: pct(state.hp, state.hpMax) }" /></div>
      </div>
      <div class="bar">
        <div class="bar-label"><span>体力</span><b>{{ state.stamina }}/{{ state.staminaMax }}</b></div>
        <div class="bar-track"><div class="bar-fill stamina" :style="{ width: pct(state.stamina, state.staminaMax) }" /></div>
      </div>
      <div class="bar">
        <div class="bar-label"><span>恐惧</span><b>{{ state.fear }}/10</b></div>
        <div class="bar-track"><div class="bar-fill fear" :style="{ width: pct(state.fear, 10) }" /></div>
      </div>
    </div>

    <div class="hud-res">
      <span>铜扣 <b>{{ state.copper }}</b></span>
      <span>夜露 <b>{{ state.dew }}</b></span>
      <span>注视 <b>{{ state.sight ?? 0 }}</b></span>
      <span v-if="job">{{ job.name }}</span>
    </div>
  </header>
</template>

<script setup>
defineProps({
  state: { type: Object, required: true },
  player: { type: Object, default: null },
  job: { type: Object, default: null },
})

const pct = (v, max) => `${Math.max(0, Math.min(100, (v / max) * 100))}%`
</script>
