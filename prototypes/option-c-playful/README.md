# Option C — Playful / ポップ・フレンドリー

八幡山ブーメラン (世田谷区の小学生ドッジボールチーム) 公式サイトのリニューアル提案プロトタイプです。
小学生とその保護者が「楽しそう！」「うちの子に合いそう！」と直感できる、ポップで親しみやすい方向性に振りました。

ローカル確認:

```bash
# リポジトリルートから
python3 -m http.server 8000
# ブラウザで http://localhost:8000/prototypes/option-c-playful/
```

---

## コンセプト

- **「楽しさ」を画面の前面に。** ドッジボールは本気のスポーツでもあり、小学生にとっては遊びの延長でもあります。本プロトタイプは後者の入口を強調し、初めての家庭でも気軽に問い合わせできる空気感を狙いました。
- **多色 × 丸み × ちょっとした傾き。** カードやステッカー、写真フレームを少し傾けて配置し、子どもの落書きノートのような遊び心を演出。
- **疾走感の表現はかわいく。** 弾むボール、揺れる「！」、なめらかな波線で、競技の運動感をポップに表現しました。

## 配色設計

| 役割 | カラー | 用途 |
| --- | --- | --- |
| ピンク (主役) | `#FF6B9D` | CTA、ロゴアクセント、強調 |
| ターコイズ | `#4ECDC4` | サブカラー、グラデーション相方 |
| イエロー | `#FFE66D` | ハイライト、Stats の数字、「!」 |
| ミント | `#95E1D3` | 装飾アクセント、グラデ |
| クリーム背景 | `#FFF9F2` | 本文背景。白すぎず目に優しい |
| 濃紺グレー (ink) | `#2A2D43` | 本文テキスト。クリーム背景で 12.5:1 以上のコントラストを確保 |

パステル (`*-soft` トーン) はカード背景や Pill タグに使い、ビビッドはアクセントに限定。子供っぽさを出しつつ、読みやすさを担保しています。

## タイポ選定

- **見出し (EN)**: `Comfortaa` 700 — 角の取れた丸ゴシック。ロゴの "Boomeran!" の楽しさを支える。
- **見出し (JP)** / **本文**: `M PLUS Rounded 1c` 500/700/800 — 日本語の丸ゴシック。可読性が高く、子ども向けの柔らかい印象。
- **数字・UI ラベル**: `Quicksand` 600/700 — Stats 数値や eyebrow ラベルに採用。Comfortaa と相性のよい丸サンセリフ。

Google Fonts から 3 ファミリーをまとめて 1 リクエストで読み込み、`preconnect` + `preload` で初期表示を最適化しています。

## インタラクション・アニメーション

- **Intersection Observer の reveal**: 各セクションの主要要素を `data-reveal` で監視し、`opacity + translateY + scale` で弾むイージング (`cubic-bezier(.34,1.56,.64,1)`) で登場。
- **Hero**:
  - `<video autoplay loop muted playsinline preload="metadata">` で背景動画 (PC は `movie2.mp4`、SP は `movie2_sp.mp4` を `<source media>` で出し分け)。
  - 装飾 SVG (波線・星) が左右でゆっくり揺れる。
  - 画面内を回転しながら動き回るドッジボール (`@keyframes ballBounce`)。
  - "!" がぴょこぴょこ揺れる (`@keyframes wiggle`)。
- **カード (募集セクション)**: わずかに傾けた 3 枚カードがホバーで水平に戻り、浮き上がる。
- **コーチ・FAQ**: ホバーでカードがちょっと傾く / details の Q&A 矢印が回転。
- **ヘッダー**: スクロールで影が深くなる。メニューはハンバーガー → カプセル型ドロップダウン、`Esc` キー・外側クリック・リンククリックで閉じる。
- **prefers-reduced-motion**: 揺れ系・浮遊系アニメーションを停止し、reveal も即時表示に切り替え。

## アクセシビリティと SEO

- `<html lang="ja">`、`<header> / <main> / <section> / <nav> / <footer>` のセマンティック構造。
- すべての `<img>` に意味のある `alt`、装飾画像は `aria-hidden="true"` + 空 alt 相当の SVG。
- 本文テキストは `#2A2D43` × `#FFF9F2` でコントラスト 12.5 以上、ボタン (ピンク背景 × 白文字) も 4.5 以上。
- `<details>` を使った FAQ はネイティブのキーボード操作・スクリーンリーダー対応をそのまま活用。
- 既存 SEO 資産を維持: タイトル / description、JSON-LD `SportsTeam + EducationalOrganization`、OGP / Twitter Card、canonical、Google Analytics タグ (G-3GDLMVPS2K)。

## パフォーマンス配慮 (PSI 80+ 目標)

- ビルド工程なし、Vanilla JS 1 ファイル (`script.js` を `defer` 読み込み)。
- フォントは `preconnect` + `preload` + `display=swap`、3 ファミリーを 1 リクエストに集約。
- ヒーロー動画: `preload="metadata"` + `poster="../../images/all.jpg"`、PC/SP で `<source media>` 切替。
- 動画以外の画像はすべて `loading="lazy"` `decoding="async"`、ロゴのみ `loading="eager"`。
- Intersection Observer を 1 つだけ生成し、`unobserve` でメモリを解放。
- CSS は単一ファイル、CSS 変数で再利用 (重複の削減)。

## 追加した独自セクション

| セクション | 意図 |
| --- | --- |
| **Stats 帯** | 「2007 / 1〜6年 / ¥3,000 / 週2日」を一目で。問い合わせ前のキー情報を Hero 直下で即提供。 |
| **Coaches** | 監督・コーチを紹介して保護者の安心感を醸成。実写写真がない想定で頭文字アバターで先行実装。 |
| **FAQ** | 「初心者でも？」「持ち物は？」など、問い合わせ前の不安を解消し DM のハードルを下げる。 |
| **Contact CTA** | Hero 動画と対になる "We Are Boomeran!" の締め。Instagram / Facebook の DM 動線を太くまとめる。 |

## ファイル構成

```
prototypes/option-c-playful/
├── index.html   # 単一ページ。既存 SEO/OGP/JSON-LD/GA を継承
├── style.css    # 全スタイル (CSS 変数 + Grid/Flex + 各種アニメ)
├── script.js    # メニュー、reveal、video、ヘッダー影、年表示
└── README.md    # 本ファイル
```

既存サイトの `images/` (動画含む) はそのまま `../../images/` で相対参照しています。GitHub Pages 配信前提のためビルドや CDN は不要です。
