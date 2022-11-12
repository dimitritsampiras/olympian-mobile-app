"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const server_1 = require("./server");
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const server = (0, server_1.createApolloServer)({
        prisma
    });
    app.use(express_1.default.json({ limit: '500mb' }));
    yield server.start();
    server.applyMiddleware({ app });
    app.listen({ port: config_1.default.port }, () => {
        console.log(`🚀 Server ready at port http://localhost:${config_1.default.port}${server.graphqlPath}`);
    });
});
main().catch((e) => {
    console.log(e);
});
//# sourceMappingURL=app.js.map