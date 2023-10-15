import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";

//routes
import productRoutes from "./routes/product.js";

//controllers
import { createProduct } from "./controllers/product.js";
import Product from "./models/productModel.js";

//configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); //setting the assets in public folder

//file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//routes
app.use("/products", productRoutes);

//create new product
app.post("/products/new", upload.single("picture"), createProduct);

// app.get("/", async (req, res) => {
//   try {
//     const ans = await upload.find();
//     res.json(ans);
//   } catch (error) {
//     res.status(500).json({ error: "Error retrieving tasks" });
//   }
// });
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving products" });
  }
});
//mongodb

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(5000, () => console.log("listening to 5000")))
  .catch((err) => console.log(err.message));
