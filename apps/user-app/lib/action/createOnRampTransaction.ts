"use server"

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { randomBytes } from 'crypto';

export const OnRampTransaction = async (provider: string, amount: number) => {
    const session = await getServerSession(authOptions)
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const data = await prisma.onRampTransaction.create({
        data: {
            status: "Processing",
            token: await generateRandomToken(),
            provider,
            amount: amount * 100,
            startTime: new Date(),
            userId: session.user.id
        }
    })
    console.log(data)

    return {
        message: "Done"
    }
}


export async function generateRandomToken(): Promise<string> {
    const buffer = randomBytes(16); // Generates 16 random bytes (128 bits)
    return 'id-' + buffer.toString('hex'); // Converts to hexadecimal string and prepends 'id-'
}


// "use server"

// import prisma from "@repo/db/client";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth";
// import { randomBytes } from 'crypto';

// export const OnRampTransaction = async (provider: string, amount: number) => {
//     const session = await getServerSession(authOptions)
//     if (!session?.user || !session.user?.id) {
//         return {
//             message: "Unauthenticated request"
//         }
//     }
//     try {
//         const data = await prisma.onRampTransaction.create({
//             data: {
//                 status: "Processing",
//                 token: await generateRandomToken(),
//                 provider,
//                 amount: amount * 100,
//                 startTime: new Date(),
//                 userId: session.user.id
//             }
//         })
//         console.log(data)

//         return {
//             message: "Done"
//         }
//     } catch (error) {
//         console.log(error)
//         return {
//             message: "Error occurred while creating on ramp transaction"
//         }
//     }
// }


// export async function generateRandomToken(): Promise<string> {
//     const buffer = randomBytes(16); // Generates 16 random bytes (128 bits)
//     return 'id-' + buffer.toString('hex'); // Converts to hexadecimal string and prepends 'id-'
// }