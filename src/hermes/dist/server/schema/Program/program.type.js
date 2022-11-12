"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const nexus_prisma_1 = require("nexus-prisma");
(0, nexus_1.objectType)({
    name: nexus_prisma_1.Program.$name,
    definition(t) {
        t.field(nexus_prisma_1.Program.id);
    }
});
//# sourceMappingURL=program.type.js.map