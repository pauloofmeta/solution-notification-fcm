import 'express';
import { AwilixContainer } from 'awilix';

declare module 'express' {
  interface Request {
    container?: AwilixContainer;
    userId?: string;
    isPublic?: boolean;
  }
}
