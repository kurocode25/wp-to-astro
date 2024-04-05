# wp-to-astro
wp-to-astroはWordpressの記事を[Astro](https://astro.build/)向けにエクスポートするためのツールです。 Wordpress eXtended RSSファイルを読み込みYAML形式のfrontmatterを付与したMarkdownファイルを生成します。

## 特徴
Markdownファイルを生成する過程でAstro独自のfrontmatterである`layout`を挿入可能です。

## 依存関係
- nodejs

nodejs ver. 18.19にて動作確認済み
## インストール
以下コマンドを実行します。

```
npm install kurocode25/wp-to-astro
```

## 使い方
### 基本的な使い方
基本的には引数に読み込みファイルのパスを付けて実行します。

```
npx wp-to-astro export.xml
```

### コマンドの詳細
以下にヘルプ画面を示します。

```
Usage: wp-to-astro [options] <export_file_path>

Arguments:
  export_file_path        Wordpress export file path

Options:
  -V, --version           output the version number
  -o --outdir <dir_path>  output dir path (default: "./")
  -l, --layout <string>   layout frontmatter (default: "")
  -y, --year-dir          make year directory
  -m, --month-dir         make month directory
  -h, --help              display help for command
```

## frontmatter
生成されるMarkdwonファイルのfrontmatterは以下の通りです。

- title: 記事タイトル
- date: 公開日
- modified: 最終更新日
- author: 執筆者
- categories: カテゴリーの配列
- tags: タグの配列
- layout: レイアウト用astroファイルへのpath
- type: 投稿タイプ e.g. page: 固定記事　post: 投稿記事

## 類似のツール
- [wordpress-export-to-markdown](https://github.com/lonekorean/wordpress-export-to-markdown)
