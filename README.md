# Trip Share + Split MVP

スマホファーストの「旅程管理 + 割り勘」WebアプリMVPです。ログインなしで `/trip/[shareId]` を共有して使います。

## 技術
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ローカルダミーデータのみ（DB接続なし）

## 使い方
```bash
npm install
npm run dev
```

`http://localhost:3000/trip/syd-mel-2026` を開いて動作確認します。

## MVP実装内容
- `/trip/[shareId]` の旅程トップ（固定ヘッダー、共有、参加者表示）
- ニックネーム参加（localStorage保存）
- Itineraryタブ（Today / Board）
- 予定追加（MVPではプロンプトUI）
- Splitタブ（支払い一覧、合計、1人あたり、収支、精算案）
- 支払い追加（MVPではプロンプトUI）
- ダークモード対応（OS設定に追従）

## ファイル構成
- `app/trip/[shareId]/page.tsx`: 共有URLページ
- `components/trip/TripPageClient.tsx`: 画面UIと状態管理
- `lib/dummyData.ts`: ダミーデータ
- `lib/split.ts`: 割り勘計算ロジック
- `types/trip.ts`: 型定義

## 初心者向けの実装手順
1. **まず型を作る** (`types/trip.ts`)：予定・支払い・参加者の型を決める。
2. **ダミーデータを用意** (`lib/dummyData.ts`)：実際の旅行データでUIを先に作る。
3. **1画面で完結するUIを作る** (`TripPageClient.tsx`)：
   - 固定ヘッダー
   - Itinerary/Splitタブ
   - ADD/PAYボタン
4. **Itinerary表示**：
   - Today: 今日だけ時系列
   - Board: 日付ごとグループ
5. **Split計算ロジック** (`lib/split.ts`)：
   - `paidBy` は全額立替
   - `participants` で均等割り
   - `支払額 - 負担額` で収支計算
   - 債務者→債権者マッチングで精算案を出す
6. **ニックネーム参加**：初回入力を localStorage に保存し、追加者表示に使う。
7. **最後に見た目調整**：スマホ余白、カードUI、ダークモード、ボタンの押しやすさを整える。
