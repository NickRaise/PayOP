import express from "express"
import db from "@repo/db/client"
const app = express()
app.use(express.json())

interface paymentInformationType {
    token: string,
    userId: string,
    amount: Number
}

app.get("/", (req, res) => {
    res.send({ "ok": "ok" })
})

app.post("/hdfcWebHook", (req, res) => {
    const paymentInformation: paymentInformationType = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount
    }
    console.log(paymentInformation)
    try {
        db.$transaction([
            db.balance.update({
                where: {
                    userId: paymentInformation.userId
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success"
                }
            })
        ])
        res.json({
            message: "Captured"
        })
    } catch (err) {
        console.log(err)
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})
app.listen(3003)