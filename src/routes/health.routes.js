import { Router } from "express";

const healthRoutes = Router();

healthRoutes.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy"
  });
});

export default healthRoutes;