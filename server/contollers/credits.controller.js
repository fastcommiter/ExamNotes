import Stripe from "stripe";
import UserModel from "../models/user.model.js";
import dotenv from "dotenv"
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CREDIT_MAP = {
    100: 120,
    200: 280,
    500: 650,
};

// ================= CREATE CHECKOUT SESSION =================

export const createCreditsOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { amount } = req.body;

        // Check whether selected amount exists
        if (!CREDIT_MAP[amount]) {
            return res.status(400).json({
                message: "Invalid Credit Plan",
            });
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",

            payment_method_types: ["card"],

            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-failed`,

            line_items: [
                {
                    price_data: {
                        currency: "inr",

                        product_data: {
                            name: `${CREDIT_MAP[amount]} Credits`,
                        },

                        unit_amount: amount * 100,
                    },

                    quantity: 1,
                },
            ],

            metadata: {
                userId: userId,
                credits: CREDIT_MAP[amount],
            },
        });

        return res.status(200).json({
            success: true,
            url: session.url,
        });

    } catch (error) {
        console.log("Stripe Error:", error);

        return res.status(500).json({
            success: false,
            message: "Payment creation failed",
        });
    }
};


// ================= STRIPE WEBHOOK =================

export const stripeWebhook = async (req, res) => {

    const sig = req.headers["stripe-signature"];

    let event;

    try {

        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

    } catch (error) {

        console.log(
            "❌ Webhook signature error:",
            error.message
        );

        return res.status(400).send(
            `Webhook Error: ${error.message}`
        );
    }


    // Payment successfully completed
    if (event.type === "checkout.session.completed") {

        try {

            const session = event.data.object;

            const userId = session.metadata?.userId;

            const creditsToAdd = Number(
                session.metadata?.credits
            );


            // Validate metadata
            if (!userId || !creditsToAdd) {

                return res.status(400).json({
                    message: "Invalid metadata",
                });

            }


            // Add credits to user
            const user = await UserModel.findByIdAndUpdate(
                userId,
                {
                    $inc: {
                        credits: creditsToAdd,
                    },

                    $set: {
                        isCreditsAvailable: true,
                    },
                },
                {
                    new: true,
                }
            );


            if (!user) {

                return res.status(404).json({
                    message: "User not found",
                });

            }

            console.log(
                `✅ ${creditsToAdd} credits added to user ${userId}`
            );

        } catch (error) {

            console.log(
                "❌ Webhook processing error:",
                error
            );

            return res.status(500).json({
                message: "Webhook processing failed",
            });
        }
    }


    // Tell Stripe webhook was received
    return res.status(200).json({
        received: true,
    });
};