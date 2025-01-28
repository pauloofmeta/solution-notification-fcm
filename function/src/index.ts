import { http } from '@google-cloud/functions-framework';
import webserver from '@infrastructure/webserver';

/**
 * Api Function HTTP
 */
http('apiSolution', webserver);
