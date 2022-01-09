const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
	// wrtie Prisma Client query here
	const allUsers = await prisma.user.findMany();
	console.log(allUsers);
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
