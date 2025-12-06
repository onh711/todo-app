# todo-app

## ディレクトリ構成

以下は本リポジトリの主要なディレクトリ構成です。実際のファイルはプロジェクト内にさらに配置されていますが、開発時に参照する主要な場所をまとめています。

```
./
├─ backend/                # Laravel バックエンド
│  ├─ app/                 # アプリケーションのソース (Models, Http/Controllers など)
│  ├─ bootstrap/
│  ├─ config/
│  ├─ database/
│  │  ├─ migrations/
│  │  └─ seeders/
│  ├─ public/
│  ├─ resources/
│  │  ├─ js/               # フロント統合用の JS（必要に応じて）
│  │  └─ views/
│  ├─ routes/              # API / Web ルーティング
│  ├─ storage/
│  ├─ tests/
│  └─ .env.example         # 環境変数のサンプル（.env をここから作成）
|
├─ frontend/               # React (Vite) フロントエンド
│  ├─ src/                 # React コンポーネント等
│  ├─ public/
│  ├─ package.json
│  └─ vite.config.js
|
├─ docker/                 # Dockerfile 等（サービスごとの Docker 設定）
│  ├─ frontend/Dockerfile
│  └─ php/Dockerfile
|
├─ docker-compose.yml      # フロント、バック、DB をまとめて起動する定義
└─ README.md
```

注意点:
- `backend/.env` は機密情報を含むため必ず `.gitignore` により除外されています。ローカルでは `backend/.env.example` をコピーして `backend/.env` を作成してください。
- フロントとバックは別プロセス（コンテナ）で動作し、CORS や `FRONTEND_URL` / `APP_URL` の設定が必要になる場合があります。

## 開発環境構築方法（完璧版）

ここでは「Docker 推奨」の手順を第一に、次に「Docker を使わないローカル開発」の手順を示します。コピー＆ペーストで実行できるコマンドを明確に記載しています。

前提（Prerequisites）:
- 推奨: Docker と Docker Compose がインストールされていること
- 代替（Docker を使わない場合）: PHP 8.x、Composer、Node.js (16+) / npm、MySQL

1) リポジトリをクローン

```bash
git clone https://github.com/<your-username>/todo-app.git
cd todo-app
```

2) Docker を使う（推奨）

概要: Docker Compose で `frontend`, `backend`, `db` を立ち上げ、初回セットアップで依存インストール、キー生成、マイグレーションを行います。

手順:

```bash
# ルートでコンテナをビルド＆起動
docker-compose up -d --build

# バックエンド依存インストール（コンテナ内で実行）
docker-compose exec backend composer install --no-interaction --prefer-dist

# .env がない場合は example をコピー
docker-compose exec backend sh -c "[ -f .env ] || cp .env.example .env"

# APP_KEY を生成（既にある場合は --force を付けないでください）
docker-compose exec backend php artisan key:generate --force

# マイグレーションとシーダー
docker-compose exec backend php artisan migrate --force --seed

# ストレージリンク（必要な場合）
docker-compose exec backend php artisan storage:link || true

# フロントの依存（コンテナ内）
docker-compose exec frontend npm install

# 開発用サーバーは docker-compose 設定で既に実行されている想定です。
```

確認:
- フロント: http://localhost:5173
- バック: APP_URL 設定に依存（通常 http://localhost または http://127.0.0.1:8000）

トラブルシューティング（よくある問題）:
- DB接続できない: `DB_HOST` は Docker Compose 使用時は `db`（サービス名）にしてください。
- マイグレーションで権限エラー: コンテナのログを確認し、DBが準備できるまでリトライしてください（`depends_on` は完全起動を保証しません）。

3) Docker を使わないローカル環境（代替手順）

バックエンド (Laravel):

```bash
cd backend
composer install --no-interaction --prefer-dist
cp .env.example .env
# .env を開いて DB 等の設定をローカル環境に合わせて編集する
php artisan key:generate
php artisan migrate --seed
php artisan storage:link || true
php artisan serve --host=127.0.0.1 --port=8000
```

フロントエンド (React/Vite):

```bash
cd frontend
npm install
# 開発: ホットリロードで起動
npm run dev
# ビルド（配布用）
npm run build
```

重要設定メモ:
- フロントから API を呼ぶ場合、`backend/.env` の `APP_URL` とフロントの `FRONTEND_URL`（または Vite の設定）の CORS 設定を一致させてください。Laravel では `config/cors.php` および `SANCTUM_STATEFUL_DOMAINS` の設定が関連します。
- ポート競合がある場合は `docker-compose.yml` や `npm run dev` の起動オプションでポートを変更してください（例: `npm run dev -- --port 5174`）。

セキュリティ注意事項:
- 絶対に `backend/.env` を Git にコミットしないでください。APIキーや DB パスワードが含まれているためです。
- もし誤ってシークレットを公開してしまった場合は、すぐに当該シークレットをローテーション（変更）し、コミット履歴から削除する手順（BFG や `git filter-repo` 等）を検討してください。

---

上記を `README.md` の該当セクションとして保存しました。次は確認やスクリーンショット追加などの補助が可能です。
# todo-app
