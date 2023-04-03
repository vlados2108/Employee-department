import path from "path"
import cors from "cors"
import dotenv from "dotenv";
import express from "express";
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import z from "zod"
import { env } from 'process';

dotenv.config({ path: path.join(__dirname, "../env") });

// created for each request
const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });
export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
const appRouter = t.router({
    sayHello: t.procedure.query(async () => {
        const message = "hello"
        return { message };
    })
});

export type AppRouter = typeof appRouter;

const app = express();

app.use(
    cors({
        origin: "*",
        credentials: true
    }));

app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));