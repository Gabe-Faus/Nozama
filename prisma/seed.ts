import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

const main = async () => {
    //Populando usuários
    const pessoa1 = await prisma.user.upsert({
        where: { email: "randomperson@gmail.com" },
        update: {}, 
        create: {
            email: "randomperson@gmail.com",
            isAdmin: false,
        },
    });

    const pessoa2 = await prisma.user.upsert({
        where: { email: "notadmin@gmail.com" },
        update: {}, 
        create: {
            email: "notadmin@gmail.com",
            isAdmin: false,
        },
    });

    const pessoa3 = await prisma.user.upsert({
        where: { email: "bingbong@gmail.com" },
        update: {}, 
        create: {
            email: "bingbong@gmail.com",
            isAdmin: true,
        },
    });
    
    const pessoa4 = await prisma.user.upsert({
        where: { email: "PoEenjoyer@gmail.com" },
        update: {}, 
        create: {
            email: "PoEenjoyer@gmail.com",
            isAdmin: false,
        },
    });

    const pessoa5 = await prisma.user.upsert({
        where: { email: "pipamaneira@gmail.com" },
        update: {}, 
        create: {
            email: "pipamaneira@gmail.com",
            isAdmin: false,
        },
    });

    //Populando categorias
    await prisma.category.createMany({
        data: [
            {name: "Eletrodomestico"},
            {name: "Brinquedos"},
            {name: "Eletronicos"},
            {name: "Livros"},
            {name: "Roupas"},
            {name: "Limpeza"},
        ],
    });

    const categories = await prisma.category.findMany()
    const categoryMap = new Map()
    categories.forEach(cat => categoryMap.set(cat.name, cat.id))

    //Populando produtos
    await prisma.product.create ({
        data: {
            name: "Smartphone Samsung",
            description: "Samsung Galaxy S24 FE 5G 128GB 8GB RAM Tela 6.7 Câm. Tripla 50+12+8MP Frontal 10MP",
            evaluation_avg: 8.3,
            photo: "samsung.png",
            category_id: categoryMap.get("Eletronicos"),        
        },
    });

    await prisma.product.create ({
        data: {
            name: "Anna Kariênina",
            description: "Publicado originalmente em forma de fascículos entre 1875 e 1877, antes de finalmente ganhar corpo de livro em 1877, Anna Kariênina continua a causar espanto. Com absoluta maestria, Tolstói conduz o leitor por um ambiente de imagens vívidas e quase palpáveis que têm como pano de fundo a Rússia czarista. Nessa galeria de personagens excessivamente humanos, ninguém está inteiramente a salvo de julgamento. Religião, família, política e classe social são postas à prova no trágico percurso traçado por uma aristocrata casada que, ao se envolver em um caso extraconjugal, experimenta as virtudes e as agruras de um amor profundamente conflituoso.",
            evaluation_avg: 9.2,
            photo: "lirvoannakarenina.png",
            category_id: categoryMap.get("Livros"),
        },
    });
    
    await prisma.product.create ({
        data: {
            name: "Drácula",
            description: "Drácula, um clássico que ainda corre quente na veia de inúmeras gerações de leitores por todo o mundo e a mais celebrada narrativa de vampiros, continua a transcender fronteiras de tempo, espaço, história e memória.",
            evaluation_avg: 8.9,
            photo: "livrodracula.png",
            category_id: categoryMap.get("Livros"),
        },
    });

    await prisma.product.create ({
        data: {
            name: "Boneco Funko POP! Satoru Gojo",
            description: "Satoru Gojo ganha sua versão Funko Pop! em meio à sua poderosa Técnica Maldita: Azul, demonstrando todo o seu domínio sobre a Energia Amaldiçoada.",
            evaluation_avg: 8.9,
            photo: "funkosatorugojo.png",
            category_id: categoryMap.get("Brinquedos"),
        },
    })
    
    await prisma.product.create ({
        data: {
            name: "Laptop ASUS TUF Gaming F16",
            description: "ASUS TUF Gaming F16 Intel Core 5, RTX 4050, 8 GB, 512 GB SSD, KeepOS,16.0'' FHD",
            evaluation_avg: 8.7,
            photo: "asustufgaming.png",
            category_id: categoryMap.get("Eletronicos"),
        },
    });

    await prisma.product.create ({
        data: {
            name: "Cafeteira Espresso Nespresso Essenza Mini",
            description: "Compacta e fácil de usar: a máquina Essenza Mini ultraleve e ultracompacta combina um design compacto e elegante com a simplicidade de uso para fazer um espresso perfeito. A máquina é fácil de colocar e mover em qualquer cozinha ou casa.",
            evaluation_avg: 9.8,
            photo: "cafeteiranespressoessenxamini.png",
            category_id: categoryMap.get("Eletrodomestico"),
        }
    })


    //Populando reviews para os produtos
    await prisma.reviews.createMany({
        data: [
            //Smartphone Samsung
            {
                user_id: pessoa1.id,
                product_id: (await prisma.product.findFirst({ where: { name: "Smartphone Samsung" } }))!.id,
                evaluation: 9,
                comment: "Excelente smartphone! A câmera é ótima e a bateria dura o dia todo!!!",
                truthfull: true,
                photo_review: null,
            },
            {
                user_id: pessoa2.id,
                product_id: (await prisma.product.findFirst({ where: { name: "Smartphone Samsung" } }))!.id,
                evaluation: 8,
                comment: "Muito bom, mas achei um pouco caro para o que oferece.",
                truthfull: true,
                photo_review: null,
            },

            //Anna Kariênina
            {
                user_id: pessoa3.id,
                product_id: (await prisma.product.findFirst({ where: { name: "Anna Kariênina" } }))!.id,
                evaluation: 10,
                comment: "Obra prima de Tolstói! Uma das melhores leituras da minha vida.",
                truthfull: true,
                photo_review: null,
            },
            {
                user_id: pessoa5.id,
                product_id: (await prisma.product.findFirst({ where: { name: "Anna Kariênina" } }))!.id,
                evaluation: 9,
                comment: "Livro profundo e emocionante. Recomendo para todos os amantes de literatura clássica.",
                truthfull: true,
                photo_review: null,
            },

            //Drácula
            {
                user_id: pessoa1.id,
                product_id: (await prisma.product.findFirst({ where: { name: "Drácula" } }))!.id,
                evaluation: 9,
                comment: "Clássico atemporal! A atmosfera gótica é perfeita.",
                truthfull: true,
                photo_review: null,
            },
            {
                user_id: pessoa4.id,
                product_id: (await prisma.product.findFirst({ where: { name: "Drácula" } }))!.id,
                evaluation: 8,
                comment: "Muito bom, mas a linguagem é um pouco densa para os dias atuais.",
                truthfull: true,
                photo_review: null,
            },

            //Funko POP! Satoru Gojo
            {
                user_id: pessoa2.id,
                product_id: (await prisma.product.findFirst({ where: { name: "Boneco Funko POP! Satoru Gojo" } }))!.id,
                evaluation: 10,
                comment: "Perfeito! Gojo-sensei ficou incrível. Chegou bem embalado.",
                truthfull: true,
                photo_review: "funko_gojo_review.jpg",
            },
            {
                user_id: pessoa5.id,
                product_id: (await prisma.product.findFirst({ where: { name: "Boneco Funko POP! Satoru Gojo" } }))!.id,
                evaluation: 9,
                comment: "Adorei o design! Fiel ao personagem do anime.",
                truthfull: true,
                photo_review: null,
            },
            {
                user_id: pessoa3.id,
                product_id: (await prisma.product.findFirst({ where: { name: "Boneco Funko POP! Satoru Gojo" } }))!.id,
                evaluation: 7,
                comment: "Legal, mas achei um pouco pequeno para o preço.",
                truthfull: true,
                photo_review: null,
            },

            //Laptop ASUS TUF Gaming F16
            {
                user_id: pessoa1.id,
                product_id: (await prisma.product.findFirst({ where: { name: "Laptop ASUS TUF Gaming F16" } }))!.id,
                evaluation: 9,
                comment: "Notebook monstro! Roda todos os jogos atuais sem travamentos.",
                truthfull: true,
                photo_review: "asus_gaming_setup.jpg",
            },
            {
                user_id: pessoa3.id,
                product_id: (await prisma.product.findFirst({ where: { name: "Laptop ASUS TUF Gaming F16" } }))!.id,
                evaluation: 8,
                comment: "Boa máquina para o preço. O aquecimento é controlado mesmo em jogos pesados.",
                truthfull: true,
                photo_review: null,
            },

            //Cafeteira Nespresso
            {
                user_id: pessoa2.id,
                product_id: (await prisma.product.findFirst({ where: { name: "Cafeteira Espresso Nespresso Essenza Mini" } }))!.id,
                evaluation: 10,
                comment: "Café perfeito todos os dias! Prática e fácil de limpar.",
                truthfull: true,
                photo_review: "nespresso_kitchen.jpg",
            },
            {
                user_id: pessoa4.id,
                product_id: (await prisma.product.findFirst({ where: { name: "Cafeteira Espresso Nespresso Essenza Mini" } }))!.id,
                evaluation: 9,
                comment: "Adoro o café que faz! Compacta e não ocupa espaço na bancada.",
                truthfull: true,
                photo_review: null,
            },
            {
                user_id: pessoa5.id,
                product_id: (await prisma.product.findFirst({ where: { name: "Cafeteira Espresso Nespresso Essenza Mini" } }))!.id,
                evaluation: 10,
                comment: "Mudou minha rotina matinal! Café de qualidade em segundos.",
                truthfull: true,
                photo_review: "cafe_morning.jpg",
            },
            {
                user_id: pessoa1.id,
                product_id: (await prisma.product.findFirst({ where: { name: "Cafeteira Espresso Nespresso Essenza Mini" } }))!.id,
                evaluation: 8,
                comment: "Muito boa, mas as cápsulas são um pouco caras.",
                truthfull: true,
                photo_review: null,
            },
        ],
    })

    //Populando Favoritos
    await prisma.favoritos.createMany({
        data: [
        // Pessoa1
        {
        user_id: pessoa1.id,
        product_id: (await prisma.product.findFirst({ where: { name: "Smartphone Samsung" } }))!.id,
        },
        {
        user_id: pessoa1.id,
        product_id: (await prisma.product.findFirst({ where: { name: "Anna Kariênina" } }))!.id,
        },
        {
        user_id: pessoa1.id,
        product_id: (await prisma.product.findFirst({ where: { name: "Laptop ASUS TUF Gaming F16" } }))!.id,
        },

        // Pessoa2
        {
        user_id: pessoa2.id,
        product_id: (await prisma.product.findFirst({ where: { name: "Smartphone Samsung" } }))!.id,
        },
        {
        user_id: pessoa2.id,
        product_id: (await prisma.product.findFirst({ where: { name: "Laptop ASUS TUF Gaming F16" } }))!.id,
        },
        {
        user_id: pessoa2.id,
        product_id: (await prisma.product.findFirst({ where: { name: "Cafeteira Espresso Nespresso Essenza Mini" } }))!.id,
        },

        // Pessoa3
        {
        user_id: pessoa3.id,
        product_id: (await prisma.product.findFirst({ where: { name: "Anna Kariênina" } }))!.id,
        },
        {
        user_id: pessoa3.id,
        product_id: (await prisma.product.findFirst({ where: { name: "Drácula" } }))!.id,
        },
        {
        user_id: pessoa3.id,
        product_id: (await prisma.product.findFirst({ where: { name: "Boneco Funko POP! Satoru Gojo" } }))!.id,
        },

        // Pessoa4 
        {
        user_id: pessoa4.id,
        product_id: (await prisma.product.findFirst({ where: { name: "Drácula" } }))!.id,
        },
        {
        user_id: pessoa4.id,
        product_id: (await prisma.product.findFirst({ where: { name: "Boneco Funko POP! Satoru Gojo" } }))!.id,
        },

        // Pessoa5
        {
        user_id: pessoa5.id,
        product_id: (await prisma.product.findFirst({ where: { name: "Cafeteira Espresso Nespresso Essenza Mini" } }))!.id,
        },
        ],
    })

};


//Pato Pato Pato Pato Pato 

main()
    .then(async() => await prisma.$disconnect())
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
    });
