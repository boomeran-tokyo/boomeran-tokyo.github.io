# 八幡山ブーメラン — Athletic / ブライト・アスリート プロトタイプ

公式サイトのリニューアル提案 (Option B)。プロスポーツチームの公式サイトを参照軸に、明るく清潔感のある「ブライト・アスリート」方向で構築したプロトタイプです。

## コンセプト
- **アスリート感のあるブライト・ミニマル**。NBA / Premier League / Bリーグ等の公式チームサイト、Nike や Under Armour の製品 LP を参照しつつ、小学生チームらしい親しみと安心感を両立。
- 「子供のスポーツチーム = カジュアル/ポップ」という既定路線を一歩外し、**本格競技チーム** としての姿勢と、**世田谷区の地域に根ざした 17 年の実績** を強く打ち出す。
- 数字（創立年・対象学年・週活動回数・月額部費）を大きく見せ、保護者が判断しやすいファクトベースの構造に再編。

## 配色設計
| 用途 | 色 | 意図 |
|------|----|------|
| Primary（シグネチャー） | `#00B4D8` cyan-blue | 爽快感・清潔感・スピード感。チームの「キレ」「疾走感」を象徴 |
| Primary Deep | `#0288A8` | グラデーション・ホバー・濃淡 |
| Accent | `#FF6B35` orange | CTA・ハイライト。シアンの補色寄りでメリハリと熱量 |
| Ink (text) | `#0A1F33` 濃紺 | 黒よりやわらかく、スポーティで知的 |
| Soft BG | `#F4F9FC` / `#E6F3F9` | 章ごとに白→淡水色を交互に配置し、リズムを出す |

水色 + 白を主基調にすることで「明るさ・健全さ・体育館の空気感」を演出。アクセントオレンジは CTA とマーキー（流れる帯）のみに限定使用し、ユーザーが「次に押すべきところ」が一目で分かるようにしています。コントラスト比は本文 `#0A1F33` on `#FFFFFF` で約 15:1、副次テキスト `#4A5A6B` でも約 7:1 を確保し、WCAG AA を満たします。

## タイポグラフィ
- **見出し英字**: `Manrope` (Weight 700 / 800 / 900) — ジオメトリックでアスリート感のあるディスプレイ系。「CATCH. THROW. WIN AS ONE.」のヒーローコピーに採用。
- **本文・UI**: `Inter` (Weight 400 / 600 / 700) — モダン Sans の事実上の標準。可読性とニュートラルさを担保。
- **和文**: `Noto Sans JP` (Weight 400 / 500 / 700 / 900) — Inter / Manrope と相性が良く、見出しの大きな日本語も破綻しません。

数字 (`stat__num`) は Manrope の Weight 900 で `clamp(2.8rem, 5vw, 4.5rem)` の大判表示。プロスポーツチーム公式サイトに見られる「データ感」を出しています。

## 工夫したインタラクション・アニメーション
- **ヒーロー動画の動的振り分け** — 画面幅に応じて `movie2.mp4` / `movie2_sp.mp4` を JS から差し替え。`preload="metadata"` と `poster` で初回描画を軽量化。
- **タイトル段組フェードアップ** — 3 行のキャッチを 150ms ずつずらしてフェードイン。`prefers-reduced-motion` 尊重。
- **マーキー帯** — `BOOMERAN ★ SETAGAYA ★ DODGEBALL ★ SINCE 2007 ★` を斜めに流すアクセント。グラデーションでなく単色オレンジで強く存在させる。
- **数値カウントアップ** — `IntersectionObserver` でビューに入った瞬間に easeOutCubic で実数値までアニメ。
- **`reveal` 一括出現** — `data-delay` 属性で要素ごとの遅延を制御。スクロールの流れと自然に同期。
- **ヘッダーの動的トーン変化** — 初期はヒーロー上に半透明・白文字、スクロール後はガラスモーフィズム（背景半透明 + backdrop-blur）に切替。
- **カードの上方ホバー + 上端ラインのアニメ** — `card::before` を `scaleX(0) → scaleX(1)`、ホバー時に滑らかに伸びる。
- **チーム画像のバッジ** — `17 YEARS OF SPIRIT` をオレンジバッジで斜めに重ね、創立 2007 年からの歴史を視覚化。

## 既存以外で追加したセクション
| セクション | 意図 |
|-----------|------|
| **Stats（実績バー）** | 2007 / 6学年 / 週2回 / ¥3,000 を巨大数字で見せ、保護者が一目で意思決定材料を把握できるように |
| **Coaches（コーチ紹介）** | 既存テキストにあった監督・コーチ名を独立セクション化。安心して子を預けられる雰囲気を作る |
| **Gallery（活動風景）** | 既存画像を CSS Grid のアシンメトリ配置で再活用。動画なしでもダイナミックに見せる |
| **FAQ** | 「初心者でも OK か」「持ち物は」など、問い合わせ前の障壁を下げる。`<details>` で JS 不要・SEO に有利 |
| **CTA Band（Contact）** | フッター直前に Instagram / Facebook DM への直リンクを大きく配置し、最終的なコンバージョン導線を強化 |

## 技術メモ
- **ビルドレス**: 素の HTML / CSS / JS のみ。フレームワーク・jQuery 不使用。
- **アクセシビリティ**: `<html lang="ja">`、セマンティック HTML（`header` / `main` / `section` / `nav` / `footer` / `article` / `figure`）、全 `<img>` に `alt`、メニュートグルに `aria-expanded` / `aria-controls`、`prefers-reduced-motion` 対応。
- **SEO 要素を維持**: JSON-LD（SportsTeam + EducationalOrganization）、OGP / Twitter Card、canonical、Google Analytics タグを既存サイトからそのまま継承。
- **パフォーマンス**:
  - Google Fonts に `preconnect` + `preload as=style`
  - 画像はヒーロー以外 `loading="lazy"` `decoding="async"`
  - ヒーロー動画は `preload="metadata"` で初期負荷を抑制
  - JS は `defer` で読み込み、IntersectionObserver でレイアウト計算を最小化
- **GitHub Pages 配信前提**: 全リンク・画像は相対パス（`../../images/...`）。

## 動作確認
```bash
# リポジトリルートで
python3 -m http.server 8000
# ブラウザで http://localhost:8000/prototypes/option-b-athletic/ を開く
```

## ファイル構成
```
prototypes/option-b-athletic/
├── index.html   # 1 ページ完結のマークアップ
├── style.css    # 配色変数 + コンポーネント単位の CSS
├── script.js    # 動画振り分け、メニュー、Reveal、CountUp
└── README.md    # 本ファイル
```
