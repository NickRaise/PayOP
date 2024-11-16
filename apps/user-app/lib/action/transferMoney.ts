"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import db from "@repo/db/client"

const transferMoney = async (receiver: string, amount: number) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        console.log("Not logged in")
        return {
            message: "Invalid request receiver not found",
            status: 400
        }
    }
    console.log("Seaching reciever")
    const toUser = await db.user.findUnique({
        where: {
            number: receiver
        }
    })

    if (!toUser) {
        console.log("User not found")
        return {
            message: "User not found!"
        }
    }
    console.log("FOund user")

    const toUserAccount = await db.balance.findUnique({
        where: {
            userId: toUser.id
        }
    })

    if (!toUserAccount) {
        return {
            message: "Cannot proceed! The selected user has not created his/her account."
        }
    }


    try {
        await db.$transaction(async (tx) => {
            const userBalance = await tx.balance.findUnique({
                where: {
                    userId: session?.user?.id
                },
                select: {
                    amount: true
                }
            })
            if (!userBalance || userBalance.amount < amount)
                throw new Error("Insufficient funds!")

            await tx.balance.update({
                where: {
                    userId: session?.user?.id
                },
                data: {
                    amount: {
                        decrement: Number(amount)
                    }
                }
            })

            await tx.balance.update({
                where: {
                    userId: toUser.id
                },
                data: {
                    amount: {
                        increment: Number(amount)
                    }
                }
            })
        })
    } catch (err) {
        console.log(err)
        return {
            message: "Something wrong with the transfer process"
        }
    }
}

export default transferMoney