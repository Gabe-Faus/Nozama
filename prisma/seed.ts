import {prisma} from "./";

const main = async () => {
    await prisma.pessoa.create({data: })

};

main()
    .them(async() => await prisma.$disconnect())
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
    });