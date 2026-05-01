# Travel Board MVP

旅行前の「行きたい場所」を集める、ログイン不要の共有ボードMVPです。

## 1. セットアップ
1. Node.js 18+ を入れる
2. 依存をインストール
   ```bash
   npm install
   ```
3. `.env.example` を `.env.local` にコピーして Supabase の値を入れる
4. Supabase SQL Editor で `supabase/schema.sql` を実行
5. 開発サーバー起動
   ```bash
   npm run dev
   ```

## 2. 実装手順（初心者向け）
1. **データを決める**: `boards` と `spots` の2軸を中心に作る。
2. **トップページを作る**: 「何のアプリか」と「新規ボード作成」ボタンだけ置く。
3. **ボード作成を作る**: 旅行名を入れたら `share_token` を発行して `board/{token}` へ遷移。
4. **ボード詳細を作る**: token から board を取得し、spots 一覧を表示。
5. **スポット追加フォームを作る**: URL・画像URL・メモなどを保存。
6. **見た目を整える**: CSS columns で Masonry 風、画像エラー時はプレースホルダー。
7. **共有導線を作る**: 「これ送る？」で現在URLコピー。

## 3. MVP機能
- ログインなしでボード作成
- URL共有で共同編集
- セクション絞り込み（すべて / Day1 / Day2 / Maybe / お気に入り）
- お気に入りトグル

## 4. 次にやると良い改善
- タグの正規化（`tags` / `spot_tags` へ実保存）
- 楽観的UI更新
- RLSポリシー
- 画像の自動サムネイル
