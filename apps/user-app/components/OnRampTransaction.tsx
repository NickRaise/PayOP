import { Card } from '@repo/ui/Card'
import React from 'react'

enum StatusType {
    Failure,
    Success,
    Processing
}

interface TransactionType {
    id: string,
    time: Date,
    amount: number,
    status: StatusType,
    provider: string
}

const OnRampTransaction = ({ transactions }: {
    transactions: TransactionType[]
}) => {
    console.log("thi is tarasacionsss", transactions)
    if (transactions.length === 0) {
        return (
            <Card title='Recent Transactions'>
                <div className='text-center py-8 italic'>
                    No recent transactions...
                </div>
            </Card>
        )
    }

    return (
        <Card title='Recent Transactions'>
            <div className='pt-2'>
                {transactions.map(t => (
                    <div key={t.id} className='flex justify-between'>
                        <div>
                            <div className='text-sm'>
                                Received INR
                            </div>
                            <div className='text-slate-600 text-xs'>
                                {t.time.toDateString()}
                            </div>
                        </div>
                        <div className='flex flex-col justify-center'>
                            + Rs {t.amount / 100}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default OnRampTransaction