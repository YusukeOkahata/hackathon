# docker-express-mysql-sample

<div id="top"></div>

## 使用技術一覧

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">

  <!-- ミドルウェア一覧 -->
  <img src="https://img.shields.io/badge/-MySQL-4479A1.svg?logo=mysql&style=for-the-badge&logoColor=white">
 
  <!-- インフラ一覧 -->
  <img src="https://img.shields.io/badge/-Docker-1488C6.svg?logo=docker&style=for-the-badge">
</p>

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)

<!-- READMEの作成方法のドキュメントのリンク -->
<br />
<div align="right">
    <a href="READMEの作成方法のリンク"><strong>READMEの作成方法 »</strong></a>
</div>
<br />
<!-- Dockerfileのドキュメントのリンク -->
<div align="right">
    <a href="Dockerfileの詳細リンク"><strong>Dockerfileの詳細 »</strong></a>
</div>
<br />
<!-- プロジェクト名を記載 -->

## プロジェクト名

小野先生のタスク管理システム

<!-- プロジェクトについて -->

## プロジェクトについて

小野先生への質問や連絡などのチャット機能と返信状況の確認ができる Web アプリケーション

<!-- プロジェクトの概要を記載 -->

<p align="right">(<a href="#top">トップへ</a>)</p>

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク | バージョン |
| -------------------- | ---------- |
| MySQL                | 5.7        |
| Node.js              | 12         |

その他のパッケージのバージョンは package.json を参照してください

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->

<pre>
.
├─app
│  ├─bin
│  ├─node_modules
│  │  ├─.bin
│  │  ├─@mapbox
│  │  ├─accepts
│  │  ├─array-flatten
│  │  ├─basic-auth
│  │  ├─bcryptjs
│  │  │  ├─.vscode
│  │  │  ├─bin
│  │  │  ├─dist
│  │  │  ├─externs
│  │  │  ├─scripts
│  │  │  ├─src
│  │  │  │  └─bcrypt
│  │  │  │      ├─prng
│  │  │  │      └─util
│  │  │  └─tests
│  │  ├─bignumber.js
│  │  │  └─doc
│  │  ├─body-parser
│  │  │  └─lib
│  │  │      └─types
│  │  ├─bytes
│  │  ├─content-disposition
│  │  ├─content-type
│  │  ├─cookie
│  │  ├─cookie-parser
│  │  ├─cookie-signature
│  │  ├─core-util-is
│  │  │  └─lib
│  │  ├─debug
│  │  │  └─src
│  │  ├─depd
│  │  │  └─lib
│  │  │      ├─browser
│  │  │      └─compat
│  │  ├─destroy
│  │  ├─ee-first
│  │  ├─ejs
│  │  │  └─lib
│  │  ├─encodeurl
│  │  ├─escape-html
│  │  ├─etag
│  │  ├─express
│  │  │  └─lib
│  │  │      ├─middleware
│  │  │      └─router
│  │  ├─express-session
│  │  │  ├─node_modules
│  │  │  │  ├─cookie
│  │  │  │  ├─cookie-signature
│  │  │  │  ├─depd
│  │  │  │  │  └─lib
│  │  │  │  │      └─browser
│  │  │  │  └─safe-buffer
│  │  │  └─session
│  │  ├─finalhandler
│  │  ├─forwarded
│  │  ├─fresh
│  │  ├─http
│  │  ├─http-errors
│  │  ├─iconv-lite
│  │  │  ├─encodings
│  │  │  │  └─tables
│  │  │  └─lib
│  │  ├─inherits
│  │  ├─ipaddr.js
│  │  │  └─lib
│  │  ├─isarray
│  │  ├─media-typer
│  │  ├─merge-descriptors
│  │  ├─methods
│  │  ├─mime
│  │  │  └─build
│  │  ├─mime-db
│  │  ├─mime-types
│  │  ├─morgan
│  │  ├─ms
│  │  ├─mysql
│  │  │  └─lib
│  │  │      └─protocol
│  │  │          ├─constants
│  │  │          ├─packets
│  │  │          └─sequences
│  │  ├─negotiator
│  │  │  └─lib
│  │  ├─on-finished
│  │  ├─on-headers
│  │  ├─parseurl
│  │  ├─path-to-regexp
│  │  ├─process-nextick-args
│  │  ├─proxy-addr
│  │  ├─qs
│  │  │  ├─dist
│  │  │  ├─lib
│  │  │  └─test
│  │  ├─random-bytes
│  │  ├─range-parser
│  │  ├─raw-body
│  │  ├─readable-stream
│  │  │  ├─doc
│  │  │  │  └─wg-meetings
│  │  │  └─lib
│  │  │      └─internal
│  │  │          └─streams
│  │  ├─safe-buffer
│  │  ├─safer-buffer
│  │  ├─send
│  │  ├─serve-static
│  │  ├─setprototypeof
│  │  ├─sqlstring
│  │  │  └─lib
│  │  ├─statuses
│  │  ├─string_decoder
│  │  │  └─lib
│  │  ├─type-is
│  │  ├─uid-safe
│  │  ├─unpipe
│  │  ├─util-deprecate
│  │  ├─utils-merge
│  │  └─vary
│  ├─public
│  │  ├─image
│  │  ├─javascript
│  │  └─stylesheets
│  ├─routes
│  └─views
├─mysql
│  ├─data
│  │  ├─chatapp
│  │  ├─mysql
│  │  ├─performance_schema
│  │  └─sys
│  └─init
└─node_modules
    ├─.bin
    ├─@mapbox
    │  └─node-pre-gyp
    │      ├─.github
    │      │  └─workflows
    │      ├─bin
    │      └─lib
    │          └─util
    │              └─nw-pre-gyp
    ├─abbrev
    ├─agent-base
    │  ├─dist
    │  │  └─src
    │  └─src
    ├─ansi-regex
    ├─aproba
    ├─are-we-there-yet
    │  └─lib
    ├─balanced-match
    │  └─.github
    ├─bcrypt
    │  ├─.github
    │  │  └─workflows
    │  ├─examples
    │  ├─lib
    │  │  └─binding
    │  │      └─napi-v3
    │  ├─src
    │  └─test
    ├─bcryptjs
    │  ├─.vscode
    │  ├─bin
    │  ├─dist
    │  ├─externs
    │  ├─scripts
    │  ├─src
    │  │  └─bcrypt
    │  │      ├─prng
    │  │      └─util
    │  └─tests
    ├─brace-expansion
    ├─chownr
    ├─color-support
    ├─concat-map
    │  ├─example
    │  └─test
    ├─console-control-strings
    ├─debug
    │  └─src
    ├─delegates
    │  └─test
    ├─detect-libc
    │  └─lib
    ├─emoji-regex
    │  └─es2015
    ├─fs-minipass
    │  └─node_modules
    │      └─minipass
    ├─fs.realpath
    ├─gauge
    ├─glob
    ├─has-unicode
    ├─https-proxy-agent
    │  └─dist
    ├─inflight
    ├─inherits
    ├─is-fullwidth-code-point
    ├─make-dir
    │  └─node_modules
    │      ├─.bin
    │      └─semver
    │          └─bin
    ├─minimatch
    ├─minipass
    ├─minizlib
    │  └─node_modules
    │      └─minipass
    ├─mkdirp
    │  ├─bin
    │  └─lib
    ├─ms
    ├─node-addon-api
    │  └─tools
    ├─node-fetch
    │  └─lib
    ├─nopt
    │  ├─bin
    │  └─lib
    ├─npmlog
    ├─object-assign
    ├─once
    ├─path-is-absolute
    ├─readable-stream
    │  └─lib
    │      └─internal
    │          └─streams
    ├─rimraf
    ├─safe-buffer
    ├─semver
    │  ├─bin
    │  ├─classes
    │  ├─functions
    │  ├─internal
    │  └─ranges
    ├─set-blocking
    ├─signal-exit
    ├─string-width
    ├─string_decoder
    │  └─lib
    ├─strip-ansi
    ├─tar
    │  └─lib
    ├─tr46
    │  └─lib
    ├─util-deprecate
    ├─webidl-conversions
    │  └─lib
    ├─whatwg-url
    │  └─lib
    ├─wide-align
    ├─wrappy
    └─yallist
</pre>

<p align="right">(<a href="#top">トップへ</a>)</p>

## 開発環境構築

<!-- コンテナの作成方法、パッケージのインストール方法など、開発環境構築に必要な情報を記載 -->

### コンテナの作成と起動

<!--
.env ファイルを以下の環境変数例と[環境変数の一覧](#環境変数の一覧)を元に作成

.env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=django-db
MYSQL_USER=django
MYSQL_PASSWORD=django
MYSQL_HOST=db
MYSQL_PORT=3306
SECRET_KEY=django
DJANGO_SETTINGS_MODULE=project.settings.local

.env ファイルを作成後、以下のコマンドで開発環境を構築
-->

app ディレクトリに移動し，依存関係をインストール

```
cd app
npm install
cd ../
```

コンテナを起動し，開発環境を構築

```
docker-compose up --build
```

### 動作確認

http://localhost:3000 にアクセスできるか確認
アクセスできたら成功

### コンテナの停止

以下のコマンドでコンテナを停止することができます

```
docker-compose down
```
