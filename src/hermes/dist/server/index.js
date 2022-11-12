"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApolloServer = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./schema"));
const createApolloServer = ({ prisma }) => {
    return new apollo_server_express_1.ApolloServer({
        schema: schema_1.default,
        context: ({ req, res }) => {
            return {
                req,
                res,
                prisma
            };
        }
    });
};
exports.createApolloServer = createApolloServer;
//# sourceMappingURL=index.js.map