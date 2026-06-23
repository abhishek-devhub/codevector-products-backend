import express from "express";
import cors from "cors"
import helmet from "helmet";
import morgan from "morgan";

import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import healthRoutes from "./routes/health.routes.js";
import productRoutes from "./routes/product.routes.js";
import devRoutes from "./routes/dev.routes.js";

const app = express()

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/health', healthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/dev', devRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;