import { http, cloudEvent } from "@google-cloud/functions-framework";
import { apiFunction, onReciveEvent } from "./functions";

/**
 * Api Function HTTP
 */
http("apiSolution", apiFunction);

/**
 * Event Function for export Files
 */
cloudEvent("exportSolution", onReciveEvent);
