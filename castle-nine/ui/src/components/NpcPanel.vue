<template>
  <div class="drawer-mask" @click="$emit('close')" />
  <aside class="drawer npc-drawer">
    <div class="drawer-head">
      <span class="drawer-title">{{ npc.name }}</span>
      <button class="drawer-close" @click="$emit('close')">收起</button>
    </div>

    <div class="npc-profile">
      <img :src="npc.portrait" :alt="npc.name" />
      <div>
        <div class="npc-side">{{ npc.side }} · 好感 {{ trust }}/5</div>
        <p class="npc-desc">{{ npc.desc }}</p>
      </div>
    </div>

    <div class="npc-service">{{ npc.service }}</div>

    <button
      class="action primary"
      :disabled="done"
      @click="$emit('service', npc)"
    >
      {{ done ? '今日已交互' : '接受服务' }}
    </button>
  </aside>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  npc: { type: Object, required: true },
  state: { type: Object, required: true },
})

defineEmits(['close', 'service'])

const trust = computed(() => props.state.npc[props.npc.id]?.trust ?? 0)
const done = computed(() => props.state.npc[props.npc.id]?.done ?? false)
</script>
