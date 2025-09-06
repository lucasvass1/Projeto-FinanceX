# 📊 FinanceX

FinanceX é um aplicativo de controle financeiro pessoal, desenvolvido com **Next.js**, **React 18**, **TypeScript** e **TailwindCSS**.  
Permite gerenciar transações, categorias, métodos de pagamento e acompanhar seus gastos de forma prática e intuitiva.

---

## 🚀 Tecnologias

- **Frontend & UI:** Next.js, React 18, TailwindCSS, Radix UI  
- **Formulários & Validação:** React Hook Form, Zod  
- **Banco de dados:** Prisma + @prisma/client  
- **Autenticação:** Clerk (Next.js)  
- **Data & Hora:** date-fns, react-day-picker  
- **Tabelas:** @tanstack/react-table  
- **Outros:** clsx, class-variance-authority, react-number-format, swr  
- **Dev tools:** TypeScript, ESLint, Prettier, Husky, TailwindCSS Animate  

---

## 📦 Como rodar o projeto

```bash
# Instalar dependências
npm install

# Rodar migrations do Prisma (se houver alterações)
npx prisma migrate dev

# Gerar client do Prisma
npx prisma generate

# Rodar o projeto Next.js
npm run dev
