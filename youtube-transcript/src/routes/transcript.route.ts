import { getTranscript } from "../controllers/transcript.controller";
import express from "express";

const transcriptRouter = express.Router();

transcriptRouter.route('/').get(getTranscript);

export default transcriptRouter;
