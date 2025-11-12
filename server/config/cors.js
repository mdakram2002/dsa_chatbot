import cors from "cors";

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://dsa-chatbot-six.vercel.app",
      process.env.CLIENT_URL
    ].filter(Boolean);

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

export default cors(corsOptions);