# BabyCalendar

アプリのコンセプトは、子育て世代の最大のタスクである育児と、
自分自身のタスクを一元管理でき、子供が泣いている意味や時間帯を予測しやすくしたり、
自分の時間を確保するための手助けになるアプリがあるといいなをコンセプトに開発。

ユーザー自身のタスク及び、赤ちゃんの行動（寝る、授乳、ご飯など）を記録・管理できるタスク管理アプリです。

## 機能

- **ユーザー認証**：ユーザー登録・ログイン
- **タスク管理**：タスクの作成・編集・削除、ステータス管理
- **ベビーアクション記録**：赤ちゃんの行動を記録（寝る、授乳、ご飯など 6 種類）
- **カレンダービュー**：FullCalendar でベビーアクションを視覚的に表示
- **ドラッグ&ドロップ**：カレンダー上でイベントを時間変更可能

## 技術スタック

### フロントエンド

- **フレームワーク**：React 19 + Vite
- **ルーティング**：React Router v7
- **HTTP 通信**：Axios
- **UI コンポーネント**：Material-UI (MUI)
- **カレンダー**：FullCalendar
- **日時処理**：dayjs（タイムゾーン対応）

### バックエンド

- **フレームワーク**：Laravel 12
- **認証**：Session（セッションベース）
- **DB**：MySQL 8.0
- **API 形式**：REST API（JSON）

### 環境構築 (または 開発・実行環境)

- **コンテナ化**：Docker & Docker Compose
- **ウェブサーバー**：Nginx
- **PHP 実行環境**：PHP 8.2

## インストール手順

### 前提条件

- Docker & Docker Compose がインストールされていること
- `git` がインストールされていること

### セットアップ手順

#### 1. リポジトリをクローン

```bash
git clone <repository-url>
cd todo-app
```

#### 2. Docker コンテナを起動

```bash
docker-compose up -d
```

ビルドに数分かかる場合があります。

#### 3. バックエンド（Laravel）のセットアップ

コンテナが起動したら、バックエンド コンテナ内で以下を実行：

```bash
docker-compose exec backend sh
```

コンテナ内で以下を実行：

```bash
# 依存関係のインストール
composer install

# .env ファイルを生成（.env.example をコピー）
cp .env.example .env

# アプリケーションキーを生成
php artisan key:generate

# データベース マイグレーション
php artisan migrate

# データベース シード（オプション：初期データ投入）
php artisan db:seed
```

#### 4. フロントエンド（React）のセットアップ

ターミナルで以下を実行（ホストマシン側）：

```bash
cd frontend
npm install
```

または、フロントエンド コンテナ内で実行：

```bash
docker-compose exec frontend npm install
```

### アプリケーション起動

```bash
docker-compose up -d
```

- **フロントエンド**：http://localhost:5173
- **バックエンド API**：http://localhost/api
- **Nginx**：http://localhost

## 使用方法

### 1. ユーザー登録

1. ブラウザで http://localhost:5173 を開く
2. 「会員登録」ボタンをクリック
3. 氏名、メールアドレス、パスワード、子供の名前を入力して登録

### 2. ログイン

登録後、メールアドレスとパスワードでログイン

### 3. タスク作成

「新規タスク登録」ボタンをクリックして、タスクを作成

### 4. ベビーアクション記録

カレンダービューで日付をクリック → アクション（寝る、授乳など）を選択して記録
赤ちゃん記録下部のアイコンをクリックすることで即時記録可能

### 5. カレンダー表示

赤ちゃんの行動はカレンダー上に色分けして表示

## ディレクトリ構造

```
todo-app/
├── backend/              # Laravel アプリケーション
│   ├── app/
│   │   ├── Http/Controllers/    # コントローラー
│   │   ├── Models/              # Eloquent モデル
│   │   └── Http/Requests/       # フォームリクエスト
│   ├── database/
│   │   ├── migrations/          # DB マイグレーション
│   │   └── seeders/             # DB シーダー
│   ├── routes/                  # API ルート定義
│   │   ├── api.php              # API ルート
│   │   └── web.php              # Web ルート
│   └── composer.json
├── frontend/             # React アプリケーション
│   ├── src/
│   │   ├── components/          # React コンポーネント
│   │   ├── api/                 # API 呼び出し
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── docker/              # Docker 設定
│   ├── php/             # PHP Dockerfile
│   ├── frontend/        # Frontend Dockerfile
│   └── nginx/           # Nginx 設定
└── docker-compose.yml   # Docker Compose 設定
```
