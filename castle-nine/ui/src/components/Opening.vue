<template>
  <section class="opening">
    <div class="opening-title">古堡九夜</div>
    <div class="opening-sub">一个人，一座每天重排的古堡</div>

    <div class="section-label">
      <span>一、创建你的角色</span>
      <small>四维总和 24</small>
    </div>

    <div class="create-form">
      <label class="field">
        <span>姓名</span>
        <input v-model="name" maxlength="12" placeholder="住客" />
      </label>

      <div class="attr-grid">
        <label v-for="a in attrList" :key="a.key" class="attr">
          <span>{{ a.label }} <b>{{ attrs[a.key] }}</b></span>
          <input v-model.number="attrs[a.key]" type="range" min="1" max="20" step="1" />
        </label>
      </div>
      <div class="attr-total" :class="{ bad: total !== 24 }">
        四维总和 {{ total }} / 24
      </div>
    </div>

    <div class="section-label">
      <span>二、选择职业</span>
      <small>九选一 · 再点一次看详情</small>
    </div>

    <div class="job-grid">
      <button
        v-for="j in jobs"
        :key="j.id"
        class="job-card"
        :class="{ active: job === j.id }"
        @click="pickJob(j)"
      >
        <img :src="j.portrait" :alt="j.name" />
        <div class="job-name">{{ j.name }}</div>
        <div class="job-passive">{{ j.passive }}</div>
      </button>
    </div>

    <div class="section-label"><span>三、难度</span></div>
    <div class="difficulty">
      <button
        v-for="d in ['借住', '常客', '归古堡所有']"
        :key="d"
        class="diff-btn"
        :class="{ active: difficulty === d }"
        @click="difficulty = d"
      >{{ d }}</button>
    </div>

    <button class="start-btn" :disabled="total !== 24" @click="start">
      进入古堡
    </button>

    <Teleport to="body">
      <div v-if="detailJob" class="modal-mask" @click.self="detailJob = null">
        <div class="modal job-detail-modal">
          <div class="drawer-head">
            <span class="drawer-title">{{ detailJob.name }}</span>
            <button class="drawer-close" @click="detailJob = null">关闭</button>
          </div>

          <img class="job-detail-img" :src="detailJob.portrait" :alt="detailJob.name" />

          <div class="job-detail-row">
            <span>被动</span><p>{{ detailJob.passive }}</p>
          </div>
          <div class="job-detail-row">
            <span>主动</span><p>{{ detailJob.active }}</p>
          </div>
          <div class="job-detail-row">
            <span>弱点</span><p>{{ detailJob.weakness }}</p>
          </div>
          <div class="job-detail-row">
            <span>专属</span><p>{{ detailJob.item }}</p>
          </div>

          <button class="start-btn" @click="chooseFromDetail">选择这个职业</button>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { jobs } from '../data/game.js'

const emit = defineEmits(['start'])

const name = ref('住客')
const attrs = reactive({ 体: 6, 智: 6, 感: 6, 意: 6 })
const job = ref(jobs[0].id)
const difficulty = ref('常客')
const detailJob = ref(null)

function pickJob(j) {
  if (job.value === j.id) {
    detailJob.value = j
  } else {
    job.value = j.id
  }
}

function chooseFromDetail() {
  job.value = detailJob.value.id
  detailJob.value = null
}

const attrList = [
  { key: '体', label: '体魄' },
  { key: '智', label: '智识' },
  { key: '感', label: '感知' },
  { key: '意', label: '意志' },
]

const total = computed(() => attrs.体 + attrs.智 + attrs.感 + attrs.意)

function start() {
  if (total.value !== 24) return
  const selectedJob = jobs.find(j => j.id === job.value)
  emit('start', {
    name: name.value.trim() || '住客',
    appearance: { name: selectedJob.name, portrait: selectedJob.portrait },
    attrs: { ...attrs },
    job: selectedJob,
    difficulty: difficulty.value,
  })
}
</script>
