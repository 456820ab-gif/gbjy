// 古堡九夜 · 平衡模拟（含 NPC 每日帮助）
// 验证：NPC 治疗/修门/免伤/交易后，第 9 夜是否还有压力。

const GATE = { 1: 360, 2: 620, 3: 900 };
const COST = { 2: 110, 3: 200 };
const NIGHT_COUNT = (n, sight) => 1 + Math.floor(n / 2) + Math.floor(sight / 20);
const ATTACK = (n, sight) => (12 + n * 4.5) * (1 + Math.floor(sight / 20) * 0.1);
const NIGHT_DAMAGE = (n, sight, extra = 0) =>
  ATTACK(n, sight) * 0.5 * (NIGHT_COUNT(n, sight) + extra) * 6;

// 收入：第 1 天 45（摆钟未建 + 当铺 5），之后 57（摆钟 12 + 出售 40 + 当铺 5）。
const INCOME = [45, 57, 57, 57, 57, 57, 57, 57, 57];

function simulate() {
  let copper = 20;
  let level = 1;
  let gateBonus = 0;
  const log = [];
  const nights = [1, 3, 5, 8, 9];

  for (let day = 1; day <= 9; day++) {
    copper += INCOME[day - 1];
    // 失忆工匠每天修门 40，最多累计 120。
    gateBonus = Math.min(60, gateBonus + 20);

    if (level < 2 && copper >= COST[2]) {
      copper -= COST[2];
      level = 2;
    }
    if (level < 3 && copper >= COST[3]) {
      copper -= COST[3];
      level = 3;
    }

    if (!nights.includes(day)) continue;

    const sight = day >= 5 ? 20 : day >= 3 ? 10 : 0;
    const extra = day >= 3 && day % 3 === 0 ? 1 : 0;
    const baseDmg = NIGHT_DAMAGE(day, sight, extra);
    // 守夜老人：第一更门免伤，总伤害按 5/6 计。
    const dmg = baseDmg * 5 / 6;
    const guarded = dmg * 0.8;
    const gate = GATE[level] + gateBonus;
    const safe = guarded < gate;

    log.push({
      day,
      level,
      copper,
      gateBonus,
      count: NIGHT_COUNT(day, sight) + extra,
      damage: +dmg.toFixed(1),
      guarded: +guarded.toFixed(1),
      gate,
      left: +(gate - guarded).toFixed(1),
      safe,
    });
  }

  return log;
}

const rows = simulate();
console.table(rows);

const last = rows[rows.length - 1];
console.log(`\n第 9 夜：门 ${last.level} 级 + 工匠 ${last.gateBonus}，守门后剩余 ${last.left}，${last.safe ? '可过' : '需封门/治疗/逃跑'}`);

const totalCost = COST[2] + COST[3];
const totalIncome = INCOME.reduce((a, b) => a + b, 0);
console.log(`升级总成本 ${totalCost} 铜，9 天总收入 ${totalIncome} 铜（含当铺与出售）。`);
