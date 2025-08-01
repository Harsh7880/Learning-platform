import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

dotenv.config({});

// call database connection here
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: [
  "https://learning-platform-app-ochre.vercel.app"
   ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials:true
}));

 
// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
 
 
// Health check route (optional but useful)
app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});

// Server listen
app.listen(PORT, () => {
  console.log("------------------------------------------------");
  console.log(`✅ Server successfully started on http://localhost:${PORT}`);
  console.log("------------------------------------------------");
});
