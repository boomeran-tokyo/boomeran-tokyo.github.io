# Option A — Energetic / 高エネルギー・ストリート

八幡山ブーメラン公式サイト リニューアル提案 (A 案)。

## コンセプト

ストリートスポーツ／e-sports のフライヤーを参照した、**鮮烈で疾走感のあるエネルギッシュ・デザイン**。
ドッジボールというスポーツが持つ「スピード」「瞬発力」「チームで沸く一体感」を、condensed フォントの巨大タイポ・斜めのモーション要素・原色のコントラストで表現する。
小学生チームの「明るさ・楽しさ」を堅持しつつ、保護者や子どもに**「ここに行けば本気で楽しめる」**と一目で伝わるビジュアルを目指した。

## 配色設計

| 役割 | カラー | 用途 |
|---|---|---|
| Boomeran Red | `#FF3B30` | プライマリ／CTA／タイトル強調。ボールの飛んでくる速度感の象徴 |
| Boomeran Blue | `#007AFF` | アクセント／カードホバー／陰影。コートの冷静さと信頼 |
| Boomeran Yellow | `#FFD60A` | キッカー／ティッカー帯／注目バッジ。歓声・喜びのエネルギー |
| Ink (Black) | `#0B0B0F` | 本文・ボーダー・ボタン影。"ストリート"の骨格 |
| Paper (White) | `#FFFFFF` | 背景／余白。視認性とコントラストの基盤 |

赤・青・黄の三原色を**等比でぶつけず**、赤を主役・青を冷静サポート・黄を歓声アクセントとして使い分け。黒い太い線とドロップシャドウで全体を引き締め、ストリートポスター／リソグラフ印刷のような質感を演出した。

## タイポ選定理由

- **Anton (display)** — 縦に長く非常に condensed な無料 Google Font。大きく組んでも紙面を支配し、"動き"を出せる。見出し・統計数値・ボタンラベルに使用。
- **Bebas Neue (display 補助)** — Anton と並ぶ condensed sans。フォールバック・補助。
- **Noto Sans JP (body, 500 / 700 / 900)** — 日本語本文。Anton の力強さに負けない太めウェイトを 700/900 で運用、本文 500 で可読性を確保。

英字大見出しの**ベースライン揃え／ベタ組み**と、日本語本文の素直な可読組みを意図的にコントラストさせ、「英語ロゴでカッコよく、日本語で誠実に伝える」二層構造とした。

## 主要インタラクション・アニメーション

1. **ヒーロー巨大タイポの段階流入** — `CATCH. / THROW. / WIN.` の 3 行を 0.15 秒ずつずらして下から滑り込み。冒頭から「速い」体験を提示。
2. **横スクロール ティッカー** — `BOOMERAN ★ SETAGAYA ★ DODGEBALL ★ SINCE 2007` を黄帯で無限ループ。サイト全体を「動いている」状態に。
3. **斜めストライプ背景／スピードライン** — Join セクションと Hero に CSS の repeating-linear-gradient で薄いストライプを敷き、静止時にもスピード感を残す。
4. **Intersection Observer によるリビール** — 全セクションの主要要素が画面に入ると、左右上下からスライドイン。`data-direction` 属性で方向制御。`prefers-reduced-motion` 尊重。
5. **数字カウントアップ** — 創立年数・部費 ¥3,000 などをスクロール到達時に 0 から滑らかに加算（ease-out cubic）。
6. **ジョイン カードの「貼り紙」表現** — 3 枚のカードがそれぞれ微妙に違う角度に傾斜（`rotate(-1deg) / 0.5deg / -0.5deg`）。ホバーで水平に戻り、赤・青・黄に塗り変わる "シール" 風挙動。
7. **ハードドロップシャドウ** — ボタン・カードに `box-shadow: 6px 6px 0 var(--ink)` のオフセット影を当て、リソグラフ／ステッカー感を全体で統一。
8. **ヒーロー動画のデバイス振り分け** — JS で `movie2.mp4` / `movie2_sp.mp4` を画面幅から振り分け、`preload="metadata"` で軽量化。`prefers-reduced-motion` 時は自動停止。

## 既存以外に追加したセクション

| セクション | 意図 |
|---|---|
| **Stats Strip (4 数字)** | 「19年/週2/¥3,000/100% FUN」の即読み数字で、保護者が瞬時に判断できる情報密度を確保。 |
| **Schedule (アイコン 4 枚)** | 「いつ／どこ／いくら／対象」を分割カード化し、既存の `<dl>` 一覧より格段にスキャナブルに。 |
| **FAQ (`<details>`)** | 「未経験OK？体験無料？区外OK？」など、問い合わせ前の不安を先回りで解消。Native `<details>` で JS なしでも動作。 |
| **Final CTA (We Are Boomeran!)** | 既存サイトの最終バナーを CTA として再構築し、ページ末で「体験を申し込む」へ確実に導線。 |
| **Footer 3 カラム** | サイトマップ／SNS／ブランドを整理し、コーポレート感と信頼性を強化。 |

## 制約への適合

- 素の HTML / CSS / JS のみ。フレームワーク・ビルド工程なし。
- CSS Grid / Flexbox を全面採用。`@media (max-width: 960px / 560px)` でモバイル優先。
- ヒーロー動画は `autoplay loop muted playsinline preload="metadata"`、`poster` に `all.jpg` を指定。
- 既存 JSON-LD / OGP / Twitter Card / canonical / Google Analytics タグをすべて保持。
- すべての `<img>` に `alt` 属性、`<header> / <nav> / <main> / <section> / <footer>` などのセマンティクス、`<html lang="ja">`、`aria-*` 属性、`prefers-reduced-motion` 対応を実装。
- スクリプトは `defer`、フォント `preconnect`、画像は `loading="lazy"`（ヒーロー以外）で PSI スコアに配慮。

## 動作確認

リポジトリルートで HTTP サーバを起動してアクセス。

```bash
cd /home/inoue/claude/work/boom/boomeran-tokyo.github.io
python3 -m http.server 8000
# → http://localhost:8000/prototypes/option-a-energetic/
```

画像・動画は `../../images/` の相対パスで解決される。

## ファイル構成

```
prototypes/option-a-energetic/
├── index.html  — マークアップ (セマンティック HTML, JSON-LD, OGP, GA 含む)
├── style.css   — スタイル (CSS Variables, Grid, アニメーション)
├── script.js   — Vanilla JS (動画振り分け / メニュー / Reveal / Counter)
└── README.md   — 本ドキュメント
```
