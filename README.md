# ExamNotes

AI-powered exam preparation platform that generates personalized and structured exam notes using the Gemini API.

## 🚀 Features

- 🔐 Google Authentication with JWT
- 🍪 HTTP-only cookie based authentication
- 🤖 AI-powered note generation using Gemini
- 📝 Custom notes based on topic, class level and exam type
- 📚 Notes history
- 💳 Credit-based AI generation
- 💰 Stripe payment integration
- 🔔 Stripe webhook with signature verification
- 🗄️ MongoDB Atlas database
- 🔄 Redux state management

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Redux

### Backend
- Node.js
- Express.js
- REST APIs
- JWT
- Cookie Parser
- CORS

### Database
- MongoDB
- MongoDB Atlas
- Mongoose

### AI
- Google Gemini API
- Gemini Flash Model

### Payment
- Stripe Checkout
- Stripe Webhooks

## 🏗️ Architecture

```text
React Frontend
      │
      ▼
Node.js + Express
      │
 ┌────┼───────────────┐
 ▼    ▼               ▼
MongoDB  Gemini API   Stripe
Atlas      │            │
           │         Webhook
           │            │
           └────────────┘
