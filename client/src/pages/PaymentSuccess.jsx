import React, { useEffect } from "react";
import { motion } from "motion/react";
import { FiCheckCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/api";

export default function PaymentSuccess() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    // Payment ke baad updated user/credits fetch karo
    getCurrentUser(dispatch);

    // 5 seconds baad home page par redirect
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    // Cleanup
    return () => clearTimeout(timer);

  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-4">

      {/* Success Icon */}
      <motion.div
        initial={{
          scale: 0,
          rotate: -180,
        }}
        animate={{
          scale: 1,
          rotate: 360,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="text-green-500 text-6xl"
      >
        <FiCheckCircle />
      </motion.div>


      {/* Heading */}
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
        }}
        className="text-2xl font-bold text-green-600"
      >
        Payment Successful! Credits Added
      </motion.h1>


      {/* Redirect Text */}
      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.6,
        }}
        className="text-gray-500 text-sm"
      >
        Redirecting to Home...
      </motion.p>

    </div>
  );
}