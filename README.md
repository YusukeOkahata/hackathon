# hackathon

![プロジェクトのロゴやスクリーンショットがあればここに配置する]

## 注意事項

インターネット通信が可能な環境で実行すること．jQuery が反映されず，サイドバーが引っ込まなくなる．
docker-compose.yml で mysql の環境を構築しています．ターミナル上で mysql のコンテナに入れなかった場合は以下の手順で volume の削除を行ってみてください．

1. データボリュームの確認を行います:
   ```bash
   docker volume ls
   ```
2. 現在のコンテナの停止及び削除を行います:
   ```bash
   docker-compose down
   ```
3. MySQL データの削除:
   既存のデータボリュームを削除することで，MySQL の設定をリセットします．ただし，この操作を行うとデータベース内の全データが失われるため，必要に応じてバックアップを取ってください．
   ```bash
   docker volume rm <your_project_name>_db_data
   ```
   your_project_name は docker-compose.yml があるディレクトリ名となります．
4. コンテナを再起動します:
   ```bash
   docker-compose up -d
   ```

## 概要

このプロジェクトは小野先生のタスク管理を手助けすることを目的としています．主な機能は以下の通りです．

- ユーザの新規登録，ログイン
- 先生との個人チャット機能

## デモ

![デモのスクリーンショットやGIFがあればここに配置する]

## インストール

このプロジェクトをローカル環境にインストールする手順を示します。

1. リポジトリをクローンします:
   ```bash
   git clone https://github.com/YusukeOkahata/hackathon.git
   ```
2. ディレクトリに移動します:
   ```bash
   cd リポジトリ名
   ```
3. 必要な依存関係をインストールします（例：Python の場合）:
   ```bash
   pip install -r requirements.txt
   ```

## 使い方

/hackathon のディレクトリで以下のコマンドを実行しサーバーを起動

```bash
npm run dev
```

listening on 3040 とターミナルで出力されるので localhost:3040 で接続
