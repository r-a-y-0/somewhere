import { Payment } from "@/types/trip";

export function calculateSplit(payments: Payment[], members: string[]) {
  const paid: Record<string, number> = Object.fromEntries(members.map((m) => [m, 0]));
  const owed: Record<string, number> = Object.fromEntries(members.map((m) => [m, 0]));

  for (const p of payments) {
    paid[p.paidBy] += p.amount;
    const share = p.amount / p.participants.length;
    for (const person of p.participants) owed[person] += share;
  }

  const balance = Object.fromEntries(members.map((m) => [m, paid[m] - owed[m]]));
  const creditors = members.map((m) => ({ name: m, amount: balance[m] })).filter((x) => x.amount > 0.01);
  const debtors = members.map((m) => ({ name: m, amount: -balance[m] })).filter((x) => x.amount > 0.01);

  const settlements: { from: string; to: string; amount: number }[] = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const amount = Math.min(debtors[i].amount, creditors[j].amount);
    settlements.push({ from: debtors[i].name, to: creditors[j].name, amount: Number(amount.toFixed(2)) });
    debtors[i].amount -= amount;
    creditors[j].amount -= amount;
    if (debtors[i].amount < 0.01) i++;
    if (creditors[j].amount < 0.01) j++;
  }

  return { paid, owed, balance, settlements };
}
