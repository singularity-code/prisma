const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
	// wrtie Prisma Client query here

	findUsers();
	// createTest();
	updateTest();
	countPublished();
}

const findUsers = async () => {
	const allUsers = await prisma.user.findMany({
		include: {
			posts: true,
			profile: true,
		},
	});
	console.log(allUsers);
};

const createTest = async () => {
	await prisma.user.create({
		data: {
			name: 'Tester',
			email: 'test@prisma.io',
			posts: {
				create: { title: 'Sample Text' },
			},
			profile: {
				create: { bio: 'This is biography' },
			},
		},
	});
};

const updateTest = async () => {
	const post = await prisma.post.update({
		where: { id: 2 },
		data: { published: true },
	});
	console.log(post);
};

const countPublished = async () => {
	const p = await prisma.post.count({
		where: {
			published: true,
		},
	});
	console.log(p);
};

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
