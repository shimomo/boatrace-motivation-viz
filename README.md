# BOA Motivation Viz

[![ci](https://github.com/shimomo/boa-motivation-viz/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/shimomo/boa-motivation-viz/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/shimomo/boa-motivation-viz/branch/main/graph/badge.svg?token=DrJuOErMa9)](https://codecov.io/gh/shimomo/boa-motivation-viz)
[![license](https://img.shields.io/github/license/shimomo/boa-motivation-viz)](LICENSE)
[![last commit](https://img.shields.io/github/last-commit/shimomo/boa-motivation-viz)](https://github.com/shimomo/boa-motivation-viz/commits/main)

[BOA Motivation Viz](https://shimomo.github.io/boa-motivation-viz/) は、ボートレースの出走表データを元に選手の体重増減からモチベーションを可視化する Web アプリケーションです。体重の変動から、選手のやる気やコンディションを視覚的に捉えることができます。 Next.js で開発し、GitHub Pages にデプロイしています。

## 主な機能
- 出走表データの API 取得と解析：外部 API から最新の出走情報を取得し、選手ごとの体重を抽出
- 体重増減の一覧表示：レースごとに選手の体重変化を一覧形式で表示
- シンプルで直感的な UI：視認性を重視した構成で、変化の傾向がすぐに把握できます

## データ取得元
本アプリで使用している出走表データは、以下の別リポジトリで開発・公開している疑似 API から取得しています。

- リポジトリ名: [boatraceopenapi/api](https://github.com/boatraceopenapi/api)
- 公開先 URL: GitHub Pages を利用した静的サイトとして提供
- API の仕様や更新状況により、本アプリの動作に影響が出る場合があります。

## 技術スタック
- フロントエンド： Next.js
- デザイン： Tailwind CSS
- デプロイ先： GitHub Pages

## デプロイ
- 静的ファイルを生成して GitHub Pages で公開しています。
- 公開先 URL: [https://shimomo.github.io/boa-motivation-viz/](https://shimomo.github.io/boa-motivation-viz/)

## 今後の予定
- 体重増減からモチベーション指標を定量化し、より分かりやすく表示
- 体重以外のデータの追加
- モバイル対応の改善

## 注意事項
- データの正確性は保証しません。取得元の仕様変更等により動作が変わる可能性があります。

## ライセンス
BOA Motivation Viz は [MITライセンス](LICENSE) の元で公開されています。
