<template>
  <div class="gate-wrap">
    <svg class="gate-svg" viewBox="0 0 320 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2a1a12" />
          <stop offset="100%" stop-color="#120b08" />
        </linearGradient>
        <linearGradient id="wood-lit" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#3d2618" />
          <stop offset="50%" stop-color="#2a1a12" />
          <stop offset="100%" stop-color="#170e09" />
        </linearGradient>
        <radialGradient id="ember" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stop-color="rgba(120, 52, 28, 0.22)" />
          <stop offset="100%" stop-color="rgba(0, 0, 0, 0)" />
        </radialGradient>
      </defs>

      <!-- 石框 -->
      <rect x="10" y="8" width="300" height="284" rx="4" fill="#0d0907" stroke="#241c16" stroke-width="2" />
      <rect x="24" y="22" width="272" height="262" fill="url(#wood)" stroke="#0f0906" stroke-width="3" />

      <!-- 门板 -->
      <rect x="34" y="32" width="252" height="242" :fill="plateColor" opacity="0.94" />
      <rect x="34" y="32" width="252" height="242" fill="url(#ember)" />
      <g stroke="#0b0604" stroke-width="2" opacity="0.75">
        <path d="M84 32V274 M134 32V274 M184 32V274 M234 32V274" />
      </g>

      <!-- 门轴 -->
      <rect x="28" y="46" width="14" height="34" fill="#1d130d" />
      <rect x="28" y="226" width="14" height="34" fill="#1d130d" />

      <!-- 门闩 -->
      <rect x="34" y="146" width="252" height="10" fill="#24170f" />
      <rect x="150" y="142" width="26" height="18" rx="2" fill="#332115" stroke="#0d0805" />

      <!-- 裂纹：随最低耐久比例出现 -->
      <g v-if="damage > 0.25" stroke="#050302" stroke-width="1.4" fill="none" opacity="0.9">
        <path d="M60 40 L88 76 L72 104 L96 132" />
        <path d="M210 40 L196 74 L224 100" />
      </g>
      <g v-if="damage > 0.5" stroke="#050302" stroke-width="1.2" fill="none" opacity="0.85">
        <path d="M150 60 L168 92 L152 120 L176 150" />
        <path d="M120 190 L148 216 L132 244" />
        <path d="M240 170 L214 198 L232 226" />
      </g>

      <!-- 标签 -->
      <g font-family="sans-serif" font-size="9" fill="#8f8676">
        <text x="44" y="24">门板 {{ Math.round(gate.plate / gate.plateMax * 100) }}%</text>
        <text x="128" y="24">门轴 {{ Math.round(gate.hinge / gate.hingeMax * 100) }}%</text>
        <text x="214" y="24">门闩 {{ Math.round(gate.bolt / gate.boltMax * 100) }}%</text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  gate: { type: Object, required: true },
})

const damage = computed(() => {
  const r = Math.min(
    props.gate.plate / props.gate.plateMax,
    props.gate.hinge / props.gate.hingeMax,
    props.gate.bolt / props.gate.boltMax,
    props.gate.frame / props.gate.frameMax,
  )
  return 1 - r
})

const plateColor = computed(() => {
  const r = props.gate.plate / props.gate.plateMax
  if (r < 0.25) return '#24100c'
  if (r < 0.5) return '#2a1710'
  return 'url(#wood-lit)'
})
</script>
