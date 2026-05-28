# VALORANT Masters 伦敦大师赛 · 全民PICK榜

VALORANT Masters London 2026 社区预测互动 Web App —— 冠军投票、赛果预测、积分排行、分享海报。

## 技术栈

- **React 19** + **TypeScript 6**
- **Vite 8** 构建工具
- **Tailwind CSS 3** 样式方案
- **Lucide React** 图标库
- **canvas-confetti** 庆祝动效
- **localStorage** 本地数据持久化

## 项目结构

```
src/
├── App.tsx                  # 主路由 + 全局状态管理
├── main.tsx                 # 入口文件
├── pages/                   # 页面组件
│   ├── HomePage.tsx         # 首页：冠军投票 + 队伍卡片
│   ├── PredictPage.tsx      # 赛程预测页
│   ├── ResultPage.tsx       # 预测结果展示页
│   ├── RankingPage.tsx      # 排行榜页
│   ├── ProfilePage.tsx      # 个人中心页
│   └── SharePage.tsx        # 分享海报页
├── components/              # 可复用组件
│   ├── TeamCard.tsx         # 队伍投票卡片
│   ├── MatchPredictionCard.tsx  # 比赛预测卡片
│   ├── RankingTable.tsx     # 排行榜表格（含实时模拟）
│   ├── SharePoster.tsx      # 分享海报生成器
│   ├── BottomNav.tsx        # 底部导航栏
│   ├── Layout.tsx           # 页面布局容器
│   ├── TeamLogos.tsx        # 队伍 Logo URL 映射
│   ├── StatCard.tsx         # 统计数据卡片
│   └── Disclaimer.tsx       # 免责声明
├── data/                    # 静态数据
│   ├── teams.ts             # 12 支参赛队伍信息
│   └── matches.ts           # 全赛程数据（瑞士轮 + 季后赛）
├── lib/                     # 工具库
│   ├── storage.ts           # localStorage 数据管理
│   └── supabaseClient.ts    # Supabase 后端预留（Mock）
└── assets/                  # 静态资源
    └── hero.png             # 首页英雄图
```

## 功能特性

- **冠军投票** — 12 支参赛队伍卡片，每人限投一次，投票后实时更新支持率
- **比赛预测** — 选择胜方 + 预测比分（BO3: 2:0/2:1, BO5: 3:0/3:1/3:2）
- **积分系统** — 预测成功 +3 积分，积分历史可查
- **排行榜** — 按赛区筛选，模拟实时数据变化
- **分享海报** — 生成预测结果分享图
- **赛程覆盖** — 瑞士轮 3 轮 + 季后赛双败淘汰 + 总决赛

## 快速开始

```bash
# 安装依赖
npm install

# 开发服务器
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview

# 代码检查
npm run lint
```

## 赛制说明

| 阶段 | 时间 | 规则 |
|------|------|------|
| 瑞士轮 | 6月6日 — 6月11日 | 8 支非种子队，BO3，前 4 名晋级 |
| 季后赛 | 6月13日 — 6月21日 | 4 种子 + 4 晋级，双败淘汰，总决赛 BO5 |

## 参赛队伍

**种子队（直通季后赛）：** EDG · PRX · G2 · TH

**非种子队（瑞士轮）：** DRG · VIT · XLG · NRG · GE · FUT · FS · LEV
