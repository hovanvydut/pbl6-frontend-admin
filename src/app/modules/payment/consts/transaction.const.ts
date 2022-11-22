import { TransactionType } from "../enums/transaction.enum";

export const HistoryTransactionTypes = [
    {
        id: TransactionType.Recharge,
        name: "Lịch sử nạp tiền",
    },
    {
        id: TransactionType.Payment,
        name: "Lịch sử tiêu tiền",
    },
]