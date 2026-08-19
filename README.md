# chart_replay — K线回放 & 多指标模拟交易

纯前端单页 K 线回放训练器，支持加密货币 + 外汇/大宗商品，叠加多种技术指标，内置模拟交易和盈亏统计。

## 快速开始

> **注意：** 浏览器 `file://` 协议禁止跨域请求，应用必须通过 HTTP 服务器运行。

**方式一：一键启动（推荐）**

双击 `start.bat`，自动检测 Python / Node.js 并启动服务器，浏览器自动打开。

**方式二：手动启动**

```bash
python -m http.server 8080
# 或
npx serve . -p 8080
```

浏览器访问 `http://localhost:8080/chart_replay.html`。

---

## 功能特性

| 模块 | 说明 |
|------|------|
| **K线回放** | 播放/暂停/步进，速度 0.5x ~ 10x，进度条拖拽 |
| **多数据源** | 加密货币 (Binance) + 外汇/大宗商品 (Yahoo Finance) |
| **多周期** | 1m / 5m / 15m / 1h / 4h / 1d |
| **9种指标** | MA、EMA、BB、MACD、RSI、ATR、KDJ、CCI、FVG公允价值缺口（矩形渲染/回填检测/缺口过滤/多空配色） |
| **自定义参数** | 每个指标可调周期/线数/颜色，即时生效 |
| **模拟交易** | 做多Long / 做空Short / 平仓Close，含杠杆 |
| **持仓盈亏** | 实时浮动盈亏，入场/出场标记在K线图上 |
| **交易历史** | 底部表格展示已平仓记录，含胜率统计 |
| **画线工具** | 基于 lwc-drawing-tools 插件：水平线/趋势线/矩形/斐波那契/画笔/测量/文本等，点击两点式绘制，可拖动/删除 |
| **分类搜索** | 外汇🥇/商品💱/加密货币🪙 分类下拉，模糊搜索 |
| **键盘快捷键** | Space 播放/暂停、←→步进、L做多、S做空、C平仓 |

---

## 支持交易对

### 🪙 加密货币（Binance API）
全部 USDT 计价的现货交易对，热门币种（BTC/ETH/SOL 等）排在前面。

### 💱 外汇 & 🥇 大宗商品（Yahoo Finance API）

| 代码 | 名称 | 分类 |
|------|------|------|
| XAUUSD | 黄金/美元 | 大宗商品 |
| XAGUSD | 白银/美元 | 大宗商品 |
| EURUSD | 欧元/美元 | 外汇 |
| GBPUSD | 英镑/美元 | 外汇 |
| USDJPY | 美元/日元 | 外汇 |
| AUDUSD | 澳元/美元 | 外汇 |
| NZDUSD | 纽元/美元 | 外汇 |
| USDCAD | 美元/加元 | 外汇 |
| USDCHF | 美元/瑞郎 | 外汇 |
| GBPJPY | 英镑/日元 | 外汇 |
| EURJPY | 欧元/日元 | 外汇 |
| EURGBP | 欧元/英镑 | 外汇 |

> 价格精度、报价单位、账户余额货币均自动适配交易对类型。

---

## 键盘快捷键

| 按键 | 操作 |
|------|------|
| `Space` | 播放 / 暂停 |
| `→` | 下一根K线 |
| `←` | 上一根K线 |
| `L` | 开多单 Long |
| `S` | 开空单 Short |
| `C` | 平仓 Close |
| `Esc` | 关闭下拉面板 |

---

## 技术指标一览

| 指标 | 缩写 | 面板名 | 可配参数 |
|------|------|--------|----------|
| 简单移动均线 | SMA | MA | 多条线 × (周期 + 颜色) |
| 指数移动均线 | EMA | EMA | 多条线 × (周期 + 颜色) |
| 布林带 | BB | BB | 周期 + 标准差倍数 |
| 指数平滑异同均线 | MACD | MACD | 快线/慢线/信号线周期 |
| 相对强弱指标 | RSI | RSI | 周期 |
| 平均真实波幅 | ATR | ATR | 周期 |
| 随机指标 | KDJ | KDJ | %K周期 / %D周期 / 平滑 |
| 商品通道指数 | CCI | CCI | 周期 |

---

## 数据源路由

```
用户选择交易对
  ├─ FOREX_PAIRS 列表命中  → Yahoo Finance v8 Chart API
  │   └─ 4h 周期 → 先取1h数据，再客户端聚合为4h
  └─ 其他(加密货币)        → Binance REST API (api.binance.com)
      └─ API 不可用         → 降级为模拟波动数据 (offline mode)
```

---

## 项目结构

```
chart_replay/
├── chart_replay.html       # 主应用（单文件，含 HTML/CSS/JS）
├── lightweight-charts.js   # TradingView 图表库 v5 (standalone)
├── lwc-drawing-tools.umd.js# 绘图工具插件 (UMD)
└── README.md               # 本文档
```

### 代码结构（chart_replay.html）

```
Section 1  — 全局状态 state（含所有运行时变量）
Section 2  — 工具函数（toast / isForex / formatPrice 等）
Section 3  — 交易对定义（POPULAR 热度排序 / FOREX_PAIRS 元数据）
Section 4  — 交易对选择器 UI（loadSymbols / renderPairDropdown / changeSymbol）
Section 5  — 数据获取（fetchKline → Binance / Yahoo / 模拟降级）
Section 6  — 技术指标计算（computeSMA / computeEMA / computeBB / computeMACD 等）
Section 7  — 图表管理（rebuildChart / updateAllIndicators / updateScaleMargins）
Section 8  — 模拟交易（openTrade / closeTrade / updatePositionPnL / updateHistory）
Section 9  — 回放控制（goTo / startPlay / stopPlay / tick）
Section 10 — 指标设置弹窗（openSettings / applySettings / closeSettings）
Section 11 — 画线工具
Section 12 — 周期切换
Section 13 — DOM 事件绑定 & 键盘快捷键
Section 14 — 应用初始化入口 init()
```

---

## 技术栈

- **图表渲染**：[TradingView Lightweight Charts](https://github.com/tradingview/lightweight-charts) **v5**（standalone 构建本地引入）
- **绘图插件**：[lwc-plugin-drawing-tools](https://github.com/Prithvi101/lwc-drawing-tools)（UMD 构建本地引入）
- **数据源**：Binance REST API + Yahoo Finance v8 Chart API
- **纯原生实现**：零框架依赖，CSS 变量暗色主题，Flexbox 全响应式布局

---

## 更新记录

### v2026-08-19 一组优化（体验与健壮性）

- **周期切换不清仓（按时间戳迁移持仓）**
  切 1m/5m/…/1d 时不再强制平仓，持仓按开仓时刻二分定位到新周期对应的 K 线，入场价保留；已平仓标记与游标位置同步按时间戳迁移。仅当新数据完全不覆盖开仓时刻时才回退为平仓结算。
- **切换交易对不再"丢单"**
  自动平仓改用 `closeTrade()` 结算，盈亏计入余额/交易历史/胜率统计，并提示「切换交易对，自动平仓 · PnL …」。
- **止损/止盈方向校验**
  多头止损须低于入场价、止盈须高于入场价（空头相反）；设反会提示正确的参考价并拒绝，避免产生逻辑反向的单。
- **离线模拟数据按周期生成**
  `generateMockData` 按当前周期取 bar 间隔（1m=60s … 1d=86400s），波动率按 √时间 缩放，离线模式下切周期粒度真实有效。
- **`AbortSignal.timeout` 兼容封装**
  新增统一的 `timeoutSignal(ms)` 并替换全部调用点，兼容不支持该 API 的旧内核浏览器，不会因 `TypeError` 卡死请求。
- **响应式布局：兼容平板与手机**
  新增 `≤900px` 与 `≤560px` 两档媒体查询：移动端改为纵向可滚动，图表容器定高（平板 55vh / 手机 50vh），侧栏堆到图表下方，回放控制栏换行、进度条独占一行，设置弹窗与下拉适配窄屏，交易历史横向整表滚动。
  - 实测 390px 手机与 768px 平板档位：无 JS 报错、无横向滚动条、侧栏正确堆叠、断点归位正确。

---

## License

MIT
