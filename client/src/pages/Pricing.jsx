import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import axios from "axios";
import { serverUrl } from "../App";

export default function Pricing() {
  const navigate = useNavigate();

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const handlePaying = async (amount) => {
    try {
      setPayingAmount(amount);
      setPaying(true);

      const result = await axios.post(
        serverUrl + "/api/credits/order",
        { amount },
        {
          withCredentials: true,
        }
      );

      console.log("Stripe Response:", result.data);

      if (result.data.url) {
        window.location.href = result.data.url;
      } else {
        console.log("Stripe URL not received");
        setPaying(false);
        setPayingAmount(null);
      }

    } catch (error) {
      console.log(
        "Payment Error:",
        error.response?.data || error.message
      );

      setPaying(false);
      setPayingAmount(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 relative">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
      >
        ⬅️ Back
      </button>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 10 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold">
          Buy Credits
        </h1>

        <p className="text-gray-600 mt-2">
          Choose a plan that fits your study needs
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Starter */}
        <PricingCard
          title="Starter"
          price="₹100"
          amount={100}
          credits="120 Credits"
          description="Perfect for quick revisions"
          feature={[
            "Generate AI notes",
            "Exam-Focused answer",
            "Diagram & charts support",
            "Fast generation",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          paying={paying}
          payingAmount={payingAmount}
          onBuy={handlePaying}
        />

        {/* Popular */}
        <PricingCard
          popular
          title="Popular"
          price="₹200"
          amount={200}
          credits="280 Credits"
          description="Best Value for students"
          feature={[
            "All Starter features",
            "More credits for students",
            "Revision mode access",
            "Priority AI response",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          paying={paying}
          payingAmount={payingAmount}
          onBuy={handlePaying}
        />

        {/* Pro */}
        <PricingCard
          title="Pro Learner"
          price="₹500"
          amount={500}
          credits="650 Credits"
          description="For Serious exam preparation"
          feature={[
            "Maximum credit value",
            "Unlimited revisions",
            "Diagram & charts support",
            "Ideal for Full Syllabus",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          paying={paying}
          payingAmount={payingAmount}
          onBuy={handlePaying}
        />

      </div>
    </div>
  );
}


function PricingCard({
  title,
  price,
  amount,
  credits,
  description,
  feature,
  popular,
  selectedPrice,
  setSelectedPrice,
  onBuy,
  payingAmount,
  paying,
}) {
  const isSelected = selectedPrice === amount;
  const isPayingThisCard =
    paying && payingAmount === amount;

  return (
    <motion.div
      onClick={() => setSelectedPrice(amount)}
      whileHover={{ y: -4 }}
      className={`
        relative cursor-pointer
        rounded-xl p-6 bg-white
        border transition
        ${
          isSelected
            ? "border-black"
            : popular
            ? "border-indigo-500"
            : "border-gray-200"
        }
      `}
    >

      {/* Popular */}
      {popular && !isSelected && (
        <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded bg-indigo-600 text-white">
          Popular
        </span>
      )}

      {/* Selected */}
      {isSelected && (
        <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded bg-black text-white">
          Selected
        </span>
      )}

      {/* Title */}
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-1">
        {description}
      </p>

      {/* Price */}
      <div className="mt-4">
        <p className="text-3xl font-bold">
          {price}
        </p>

        <p className="text-sm text-indigo-600">
          {credits}
        </p>
      </div>

      {/* Buy Button */}
      <button
        disabled={isPayingThisCard || paying}
        onClick={(e) => {
          e.stopPropagation();
          onBuy(amount);
        }}
        className={`
          w-full mt-9 py-2 rounded-lg
          font-medium transition
          ${
            isPayingThisCard
              ? "bg-gray-300 cursor-not-allowed"
              : isSelected
              ? "bg-black text-white"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }
        `}
      >
        {isPayingThisCard
          ? "Redirecting..."
          : "Buy Now"}
      </button>

      {/* Features */}
      <ul className="mt-5 space-y-2 text-sm text-gray-600">

        {feature.map((item, i) => (
          <li
            key={i}
            className="flex gap-2"
          >
            <span className="text-green-600">
              ✓
            </span>

            {item}
          </li>
        ))}

      </ul>

    </motion.div>
  );
}