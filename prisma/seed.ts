import {prisma} from "./";

const main = async () => {
    await prisma.pato.create({data: })

};


//Pato Pato Pato Pato Pato 

main()
    .them(async() => await prisma.$disconnect())
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
    });