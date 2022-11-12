"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
const nexus_1 = require("nexus");
const nexus_prisma_1 = require("nexus-prisma");
exports.UserType = (0, nexus_1.objectType)({
    name: nexus_prisma_1.User.$name,
    description: nexus_prisma_1.User.$description,
    definition(t) {
        t.field(nexus_prisma_1.User.id);
        t.field(nexus_prisma_1.User.username);
        t.field(nexus_prisma_1.User.email);
        t.field(nexus_prisma_1.User.password);
        t.nullable.string('token');
    }
});
//# sourceMappingURL=user.type.js.map