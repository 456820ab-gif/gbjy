const CDN = 'https://cdn.jsdelivr.net/gh/456820ab-gif/gbjy@7bacd18/castle-nine/ui/dist/'
export const asset = (p) => (import.meta.env.PROD ? `${CDN}${p}` : `${import.meta.env.BASE_URL}${p}`)

// 玩家可选外观（只影响头像，不影响数值）
export const appearances = [
  { id: 'tactician', name: '推演者', portrait: asset('portraits/job-tactician.webp') },
  { id: 'tinker', name: '修补匠', portrait: asset('portraits/job-tinker.webp') },
  { id: 'watchman', name: '守夜人', portrait: asset('portraits/job-watchman.webp') },
  { id: 'gatekeeper', name: '扛门人', portrait: asset('portraits/job-gatekeeper.webp') },
  { id: 'wallbreaker', name: '拆墙者', portrait: asset('portraits/job-wallbreaker.webp') },
  { id: 'sniffer', name: '嗅探者', portrait: asset('portraits/job-sniffer.webp') },
  { id: 'dreamless', name: '无梦者', portrait: asset('portraits/job-dreamless.webp') },
  { id: 'scavenger', name: '拾遗者', portrait: asset('portraits/job-scavenger.webp') },
  { id: 'gravedigger', name: '守墓人', portrait: asset('portraits/job-gravedigger.webp') },
]

export const jobs = [
  { id: 'tactician', name: '推演者', portrait: asset('portraits/job-tactician.webp'), passive: '地图显示危险等级；施工判定 +1', active: '预知下一更怪物攻击哪个门部件', weakness: '体力上限 -2；恐惧 ≥5 时判定 -1', item: '自我修改的古堡草图（蜡）' },
  { id: 'tinker', name: '修补匠', portrait: asset('portraits/job-tinker.webp'), passive: '施工时间 -25%；拆解得额外同阶材料', active: '把一件道具临时改成同阶另一件', weakness: '不能用重型武器；夜外逃脱体力 +1', item: '缺三件的工具箱（蜡）' },
  { id: 'watchman', name: '守夜人', portrait: asset('portraits/job-watchman.webp'), passive: '夜行视野 +2；察觉意图 +2', active: '标记一只怪物，看到下一更行动', weakness: '恐惧上限 -2；独自夜行恐惧 +2/更', item: '不灭提灯（蜡）' },
  { id: 'gatekeeper', name: '扛门人', portrait: asset('portraits/job-gatekeeper.webp'), passive: '门部件耐久 +20%；扛门 +2；受伤 -1', active: '以身抵门，本更门免伤，自己受 3 伤', weakness: '文字道具不可用；施工 -2', item: '嵌肩门闩（锈）' },
  { id: 'wallbreaker', name: '拆墙者', portrait: asset('portraits/job-wallbreaker.webp'), passive: '破坏判定 +2；可从非门入口进入', active: '砸开一堵墙，创造新走廊', weakness: '危险触发 +10%；每次破坏恐惧 +1', item: '卷刃消防斧（锈）' },
  { id: 'sniffer', name: '嗅探者', portrait: asset('portraits/job-sniffer.webp'), passive: '搜索 +2；显示品阶；闻出人或怪', active: '追踪一个目标，得知位置', weakness: '文字道具不可用；夜外遭遇 +15%', item: '牙哨（骨）' },
  { id: 'dreamless', name: '无梦者', portrait: asset('portraits/job-dreamless.webp'), passive: '免疫梦魇；恐惧上限 8；睡眠不降恐惧', active: '替一名角色承受一次恐惧冲击', weakness: '不能用想象类道具；NPC 好感减半', item: '停摆的怀表（蜡）' },
  { id: 'scavenger', name: '拾遗者', portrait: asset('portraits/job-scavenger.webp'), passive: '搜索额外得 1 件尘阶杂物', active: '回到一小时前的位置', weakness: '怀表每用 3 次降阶，降阶随机失物', item: '不属于这个年代的怀表（蜡）' },
  { id: 'gravedigger', name: '守墓人', portrait: asset('portraits/job-gravedigger.webp'), passive: '高危房显示旧住户埋藏点；拾遗物不恐惧', active: '随机获得锈/蜡/骨道具，或降低注视 2', weakness: '交易价格 +10%；恐惧上限 -1', item: '没有柄的铲子（骨）' },
]

export const npcs = [
  { id: 'doctor', name: '老医者', side: '善良', portrait: asset('portraits/doctor.webp'), room: 'R05', service: '治疗 HP +3', desc: '药箱里有股霉味，但他的手很稳。' },
  { id: 'watchman', name: '守夜老人', side: '善良', portrait: asset('portraits/job-watchman.webp'), room: 'R24', service: '下一夜第一更门免伤', desc: '他记得每一扇门被撞开的声音。' },
  { id: 'cook', name: '厨娘', side: '善良', portrait: asset('portraits/cook.webp'), room: 'R01', service: '体力 +3', desc: '锅里永远有东西在煮，没人知道是什么。' },
  { id: 'artisan', name: '失忆工匠', side: '善良', portrait: asset('portraits/job-tinker.webp'), room: 'R13', service: '修复一个门部件 20 点', desc: '他忘了自己修过什么，但手还记得。' },
  { id: 'pawnbroker', name: '当铺老板', side: '中立', portrait: asset('portraits/pawnbroker.webp'), room: 'R01', service: '买卖道具，价格按品阶', desc: '他收一切东西，包括不该收的。' },
  { id: 'maskmerchant', name: '面具商人', side: '中立', portrait: asset('portraits/job-sniffer.webp'), room: 'R13', service: '卖随机蜡/骨阶道具，可能假货', desc: '面具下面是什么，没人问过。' },
  { id: 'diviner', name: '占卜师', side: '中立', portrait: asset('portraits/diviner.webp'), room: 'R05', service: '预知下一夜怪物组合', desc: '她只收铜扣，不收问题。' },
  { id: 'scavenger', name: '拾荒者', side: '中立', portrait: asset('portraits/job-scavenger.webp'), room: 'R24', service: '铜扣换随机道具', desc: '他的口袋里总有一件你昨天丢的东西。' },
]

export const monsters = [
  { name: '叩门者', type: '破门', door: '×1.2', player: 0, desc: '只撞门板，门破后砸设施' },
  { name: '剥墙兽', type: '破门', door: '×0.8', player: 0, desc: '只打门框，门框破后从墙缝进入' },
  { name: '无面客', type: '欺骗', door: '×0.6', player: 0, desc: '门外模仿同伴声音，诱你开门' },
  { name: '烛泪', type: '破门', door: '×1.0', player: 0, desc: '腐蚀门轴，连锁破坏' },
  { name: '裂口者', type: '击杀', door: '×0.6', player: 5, desc: '先撕门，门破后撕人' },
  { name: '饲影者', type: '精神', door: '0', player: 0, desc: '门破后入室施加恐惧' },
  { name: '钉墙者', type: '封锁', door: '×0.7', player: 0, desc: '门破后钉死出口' },
  { name: '拾骨者', type: '盗窃', door: '0', player: 0, desc: '偷骨阶以上道具' },
  { name: '守夜人', type: '占房', door: '0', player: 0, desc: '玩家离房时占房' },
  { name: '缠足', type: '外勤', door: '0', player: 0, desc: '夜外拖慢，体力 -2' },
  { name: '数息者', type: '外勤', door: '0', player: 1, desc: '夜外倒数，3 次后受伤' },
  { name: '守门犬', type: '守门', door: '0', player: 4, desc: '蹲守门口，返回时咬一口' },
  { name: '犬形', type: '击杀', door: '0', player: 3, desc: '追踪外出者，门破后咬人' },
  { name: '低语者', type: '精神', door: '0', player: 0, desc: '不入室，只加恐惧' },
  { name: '第九位', type: 'Boss', door: '×1.0', player: 6, desc: '每 3 夜出现，记住上次防御方式' },
]

export const rooms = [
  { id: 'R01', name: '长餐桌厅', risk: 0, scene: 'hall', points: 3, desc: '长桌、烛台、冷掉的餐具' },
  { id: 'R05', name: '书房', risk: 1, scene: 'room', points: 3, desc: '堆到天花板的旧书与落灰的钟' },
  { id: 'R13', name: '画廊', risk: 2, scene: 'corridor', points: 3, desc: '肖像的眼睛跟着你移动' },
  { id: 'R24', name: '大厅', risk: 1, scene: 'hall', points: 2, desc: '固定大厅，所有走廊的尽头' },
]

export const initialState = {
  day: 2,
  time: '14:00',
  phase: '白天',
  playerName: '住客',
  playerPortrait: asset('portraits/job-tactician.webp'),
  attrs: [6, 6, 6, 6],
  hp: 8,
  hpMax: 10,
  stamina: 7,
  staminaMax: 10,
  fear: 2,
  copper: 20,
  dew: 0,
  sight: 0,
  gate: { plate: 180, plateMax: 180, hinge: 100, hingeMax: 100, bolt: 140, boltMax: 140, frame: 200, frameMax: 200 },
  visited: 'R01',
  points: [true, false, false],
  npc: {
    doctor: { trust: 1, done: false, active: true },
    watchman: { trust: 1, done: false, active: true },
    cook: { trust: 1, done: false, active: true },
    artisan: { trust: 1, done: false, active: true },
    pawnbroker: { trust: 2, done: false, active: true },
    maskmerchant: { trust: 2, done: false, active: true },
    diviner: { trust: 2, done: false, active: true },
    scavenger: { trust: 2, done: false, active: true },
  },
  night: {
    hour: 2,
    guardFree: false,
    monsters: [
      { name: '叩门者', type: '破门', player: 0, target: '门板', intent: '本更将撞击门板' },
      { name: '犬形', type: '击杀', player: 3, target: '门板', intent: '潜伏中（下更 +50%）' },
    ],
  },
  log: [
    '第 2 天 14:00，你从大厅回到长餐桌厅。',
    '门板还留着昨夜撞击的凹痕。',
  ],
}
