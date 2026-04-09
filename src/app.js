import express from "express"
import cookieParser from "cookie-parser"
import { ApiError } from "./utils/ApiError.js"

import cors from "cors"
const app = express()

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your Netlify URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));     



app.use(express.json({ limit: "30mb" }))
app.use(express.urlencoded({ extended: true, limit: "30mb" }))
app.use(express.static("public"))
app.use(cookieParser());

//  using express session for session based authentication 



// Routes calling 
import user from "./routes/user.routes.js"


app.use("/api/v1", user)


app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ statusCode: err.statusCode, message: err.message });
  } else {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
export { app }
