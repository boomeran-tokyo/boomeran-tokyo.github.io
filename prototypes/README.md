# 八幡山ブーメラン公式サイト リニューアル提案 (3 案)

`renewal/modern-redesign` ブランチで作業中のプロトタイプ集です。**本番 `main` ブランチは無修正**。

## 提案 3 案の比較

| 観点 | A: Energetic | B: Athletic | C: Playful |
|---|---|---|---|
| **コンセプト** | ストリート / e-sports ポスター調 | プロチーム公式サイト調 | 子供向けポップ・楽しさ前面 |
| **主役カラー** | 三原色 (赤 #FF3B30 / 青 #007AFF / 黄 #FFD60A) | 水色 #00B4D8 + オレンジ #FF6B35 | ピンク #FF6B9D / ターコイズ #4ECDC4 / イエロー #FFE66D / ミント #95E1D3 |
| **ベース背景** | 白 | 白 + 淡水色グラデ | クリーム #FFF9F2 |
| **見出しフォント** | Anton (condensed) + Bebas Neue | Manrope (geometric) + Inter | Comfortaa + M PLUS Rounded 1c |
| **本文フォント** | Noto Sans JP | Inter + Noto Sans JP | M PLUS Rounded 1c |
| **タイポの印象** | 太く・縦長・大胆 | スリム・モダン・データ感 | 丸み・柔らかい |
| **レイアウト** | 斜めライン、不規則グリッド、ステッカー風 | 整然とした大判グリッド、フルブリード写真 | カード型、傾けた配置、装飾 SVG |
| **疾走感の演出** | スピードライン、斜めストライプ、ティッカー | 大判タイポ、マーキー、カウントアップ | 弾むボール、揺れる「！」、波線 |
| **アニメーション** | 多め・力強い（リビール+カウントアップ+ティッカー） | 控えめ・滑らか（フェードイン中心） | 弾むイージング・bounce、装飾アニメ |
| **ターゲット印象** | 「ガチでやってるチーム」感、本気度 | 「プロみたいに本格的」、安心感・実績 | 「うちの子も楽しめそう」、親近感 |

## ローカルプレビュー方法

ローカル HTTP サーバを起動（既に起動中なら不要）:

```bash
./scripts/http-test.sh start
# ポート 8000-8080 から自動選択。例: http://localhost:8000/
```

各案を開く:

- **A 案 (Energetic)**: <http://localhost:8000/prototypes/option-a-energetic/>
- **B 案 (Athletic)**: <http://localhost:8000/prototypes/option-b-athletic/>
- **C 案 (Playful)**: <http://localhost:8000/prototypes/option-c-playful/>

各ディレクトリの `README.md` に詳細設計（配色・タイポ・追加セクション）あり。

## 共通仕様 (3 案すべて)

- **技術スタック**: 素の HTML / CSS / JS (jQuery / フレームワークなし)
- **モダン CSS**: Grid / Flexbox / カスタムプロパティ
- **JS**: Vanilla (Intersection Observer ベースのアニメ、prefers-reduced-motion 尊重)
- **ヒーロー動画**: 既存の `movie2.mp4` / `movie2_sp.mp4` を画面幅で振り分け、`preload="metadata"`
- **Accessibility**: `<html lang="ja">`, semantic HTML, alt 属性, WCAG AA コントラスト
- **SEO**: 既存の JSON-LD 構造化データ / OGP / Twitter Card / canonical / GA タグを保持
- **画像**: 既存 `team.jpg` `join.jpg` `event.jpg` `all.jpg` 等を `../../images/` で参照

## 次のアクション

1. 3 案をブラウザでプレビュー
2. フィードバック (お気に入りの案 / 直したい点)
3. 1 つを採用 or 複数の要素を組み合わせ
4. 採用案を `index.html` として `main` ブランチに反映
