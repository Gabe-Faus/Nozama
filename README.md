# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## About the project

Este projeto é uma plataforma desenvolvida com o stack T3 (Next.js, TypeScript, Prisma, entre outras tecnologias) que oferece acesso a uma grande coleção de avaliações de produtos encontrados na Amazon. A proposta é fornecer um ambiente organizado e confiável onde usuários assinantes podem consultar opiniões autênticas de diversos consumidores, facilitando a tomada de decisão antes de uma compra.

Dentro do site, os produtos são categorizados e acompanhados de análises detalhadas, permitindo que o usuário descubra quais são os melhores itens de cada categoria com base em avaliações agregadas. A plataforma centraliza essas informações de forma clara e acessível, oferecendo uma experiência prática para quem busca reviews completos e imparciais.

## Getting Started

Para iniciar o projeto pela primeira vez, siga essa sequência de comandos:  

**1°:**&nbsp;&nbsp;   git pull origin main     &nbsp;&nbsp;&nbsp;(Caso exista uma branch mais atualizada no GitHub)  
**2°:**&nbsp;&nbsp;   pnpm i  
**3°:**&nbsp;&nbsp;   npx prisma migrate dev --name init     &nbsp;&nbsp;&nbsp;(Criar banco de dados e tabelas)  
**4°:**&nbsp;&nbsp;   pnpm ts-node prisma/seed.ts     &nbsp;&nbsp;&nbsp;(Popular banco de dados)    
**5°:**&nbsp;&nbsp;   pnpm prisma studio  
<br>


Caso queria apenas rodar novamente:  
  
**1°:**&nbsp;&nbsp;   pnpm i  
**2°:**&nbsp;&nbsp;   pnpm db:push    
**3°:**&nbsp;&nbsp;   pnpm prisma studio  
<br>


Caso tenha feito alguma alteração no seed:  

**1°:**&nbsp;&nbsp;   pnpm prisma migrate reset  
**2°:**&nbsp;&nbsp;   pnpm ts-node prisma/seed.ts  
**3°:**&nbsp;&nbsp;   pnpm prisma studio  
<br>


Caso queria subir as alterações locais para o GitHub:  

**1°:**&nbsp;&nbsp;   git pull origin main     &nbsp;&nbsp;&nbsp;(Caso exista uma branch mais atualizada no GitHub)  
**2°:**&nbsp;&nbsp;   git add .  
**3°:**&nbsp;&nbsp;   git commit -m "Frase com  a ideia do que foi feito"  
**4°:**&nbsp;&nbsp;   git push origin branch-que-você-está    

