# Trip Share + Split MVP

ログイン不要で、URL共有だけで使える「旅程管理 + 割り勘」アプリです。  
MVPは **localStorage + ダミーデータのみ** で動作し、DB接続は不要です。

## 技術スタック
- Next.js (App Router)
- TypeScript
- Tailwind CSS

## ローカル起動（任意）
> Codex環境では `npm install` が制限されるため、ここは手元PCで実行してください。

```bash
npm install
npm run dev
```

- デモURL: `http://localhost:3000/trip/syd-mel-2026`

## Vercelデプロイ手順
1. このリポジトリを GitHub に push
2. Vercel ダッシュボードで **Add New Project**
3. GitHubリポジトリを **Import**
4. Framework Preset が **Next.js** になっていることを確認
5. Build Command / Output はデフォルトのまま（変更不要）
6. **Environment Variables は設定不要**（このMVPは必須 env なし）
7. Deploy を実行
8. 発行されたURLで `/trip/syd-mel-2026` を開いて確認

## 仕様対応メモ
- 共有導線: `/trip/[shareId]`
- ニックネーム参加: localStorage保存
- Itinerary: Today / Board
- Split: 総支出 / 1人あたり / 収支 / 精算案
- ダークモード: OS設定追従
- Supabase: 現時点では未使用

## 主要ファイル
- `app/trip/[shareId]/page.tsx`
- `components/trip/TripPageClient.tsx`
- `lib/dummyData.ts`
- `lib/split.ts`
- `types/trip.ts`
