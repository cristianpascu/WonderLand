import { PrismaClient } from '@prisma/client';

const datasourceUrl = process.env.DATABASE_URL;

new PrismaClient({
    datasourceUrl,
});

(async () => {
    process.exit(0);
})();
