import React, { useEffect } from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useDispatch } from "react-redux";

import { getCurrentUser } from "./services/api";


// ========================================
// PAGES
// ========================================

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import History from "./pages/History";
import Notes from "./pages/Notes";
import Pricing from "./pages/Pricing";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";


// ========================================
// SERVER URL
// ========================================

export const serverUrl =
  import.meta.env.VITE_SERVER_URL ||
  "http://localhost:8000";


// ========================================
// APP
// ========================================

function App() {

  const dispatch = useDispatch();


  // ========================================
  // GET CURRENT USER
  // ========================================

  useEffect(() => {

    getCurrentUser(dispatch);

  }, [dispatch]);


  return (

    <Routes>

      {/* ===============================
          AUTH
      =============================== */}

      <Route
        path="/auth"
        element={
          <Auth />
        }
      />


      {/* ===============================
          HOME
      =============================== */}

      <Route
        path="/"
        element={
          <Home />
        }
      />


      {/* ===============================
          NOTES
      =============================== */}

      <Route
        path="/notes"
        element={
          <Notes />
        }
      />


      {/* ===============================
          HISTORY
      =============================== */}

      <Route
        path="/history"
        element={
          <History />
        }
      />


      {/* ===============================
          PRICING
      =============================== */}

      <Route
        path="/pricing"
        element={
          <Pricing />
        }
      />


      {/* ===============================
          PAYMENT SUCCESS
      =============================== */}

      <Route
        path="/payment-success"
        element={
          <PaymentSuccess />
        }
      />


      {/* ===============================
          PAYMENT FAILED
      =============================== */}

      <Route
        path="/payment-failed"
        element={
          <PaymentFailed />
        }
      />


      {/* ===============================
          UNKNOWN ROUTE
      =============================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}


export default App;
