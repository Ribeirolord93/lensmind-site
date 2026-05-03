# Lensmind™ — Site Headless

Site oficial da Lensmind: gafas inteligentes con IA para o mercado LATAM.

**Stack:**
- ⚡ Next.js 14 (App Router) + TypeScript
- 🎨 Tailwind CSS + Framer Motion
- 🛒 Shopify Storefront API (GraphQL)
- 🚀 Deploy: Netlify

---

## 🎬 Setup Local

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar Shopify Storefront API

No painel da Shopify:

1. Acesse **Configurações → Apps e canais de venda → Desenvolver apps**
2. Clique em **Criar um app**
3. Nome: `Lensmind Headless`
4. Em **Configuração**, clique em **Configurar Storefront API**
5. Marque os escopos:
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_product_inventory`
   - ✅ `unauthenticated_write_checkouts`
   - ✅ `unauthenticated_read_checkouts`
   - ✅ `unauthenticated_read_content`
6. Salve e clique em **Instalar app**
7. Copie o **Storefront API access token**

### 3. Criar `.env.local`

```bash
cp .env.example .env.local
```

Edite com seus valores:

```env
SHOPIFY_STORE_DOMAIN=lensmind.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=seu_token_aqui
SHOPIFY_STOREFRONT_API_VERSION=2024-10
NEXT_PUBLIC_SITE_URL=https://lensmind.lat
```

### 4. Rodar localmente

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deploy no Netlify

### Opção A — Via CLI (mais rápido)

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Opção B — Via UI (recomendado)

1. Faça push do projeto para um repositório Git (GitHub/GitLab)
2. Acesse [app.netlify.com](https://app.netlify.com)
3. Clique em **Add new site → Import an existing project**
4. Conecte ao repositório
5. Configurações de build (já vêm do `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Em **Environment variables**, adicione:
   - `SHOPIFY_STORE_DOMAIN`
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
   - `SHOPIFY_STOREFRONT_API_VERSION`
   - `NEXT_PUBLIC_SITE_URL`
7. Clique em **Deploy site**

### Conectar domínio lensmind.lat

1. No Netlify: **Domain settings → Add custom domain**
2. Digite `lensmind.lat` e siga as instruções
3. Na Namecheap (ou onde comprou): atualize os DNS conforme Netlify indicar
4. SSL é automático (~10 min após DNS propagar)

---

## 📁 Estrutura

```
lensmind-site/
├── app/
│   ├── api/cart/route.ts      # API: criar checkout
│   ├── globals.css            # Estilos globais + utilitários
│   ├── layout.tsx             # Root layout + fontes + SEO
│   ├── not-found.tsx          # Página 404
│   └── page.tsx               # Home (single-product)
├── components/
│   ├── Header.tsx             # Header sticky com glassmorphism
│   ├── Hero.tsx               # Hero cinematográfico
│   ├── Marquee.tsx            # Faixa horizontal infinita
│   ├── BenefitsGrid.tsx       # Grid 4 benefícios
│   ├── ProductShowcase.tsx    # Galeria + Buy
│   ├── ProductGallery.tsx     # Galeria editorial
│   ├── BuyButton.tsx          # CTA → checkout Shopify
│   ├── ComparisonTable.tsx    # Ray-Ban Meta vs Lensmind
│   ├── StatsBar.tsx           # Stats de mercado
│   ├── FAQ.tsx                # Acordeão animado
│   ├── FinalCTA.tsx           # Última conversão
│   └── Footer.tsx             # Newsletter + links
├── lib/
│   ├── shopify.ts             # Client + helpers
│   └── queries.ts             # GraphQL queries
├── types/
│   └── shopify.ts             # Types da API
├── netlify.toml               # Config de deploy
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🎨 Design System

### Paleta

- **Ink** `#0A0A0A` — fundo principal (preto profundo)
- **Bone** `#F5F1EA` — texto principal (off-white quente)
- **Ember** `#D97706` — accent (laranja Lensmind)
- **Smoke** `#737373` — texto secundário

### Tipografia

- **Display:** Fraunces (serif italic editorial)
- **Body:** Manrope (sans-serif refinada)

### Princípios

- Mobile-first
- Animações com `cubic-bezier(0.22, 1, 0.36, 1)` (natural easing)
- Glassmorphism em cards premium
- Grain overlay sutil pra textura
- Tipografia editorial italic em headlines

---

## 🛠️ Performance

Targets:
- Lighthouse Performance: 95+
- LCP: < 1.5s
- CLS: 0
- Bundle JS: < 100kb

Otimizações:
- ISR (revalidação a cada 60s)
- Imagens AVIF/WebP via Next/Image
- Edge caching no Netlify
- Code splitting automático
- Fontes via next/font (sem FOUT)

---

## 🐛 Troubleshooting

### "Shopify env vars não configuradas"
→ Verifique se `.env.local` existe e tem os valores corretos.

### Produto não aparece
→ Verifique se o produto está com status **Ativo** no Shopify (não **Rascunho**) e se está atribuído ao **canal de vendas Online Store**.

### Checkout não abre
→ Verifique se o Storefront API token tem permissão `unauthenticated_write_checkouts`.

### Deploy quebra no Netlify
→ Confirme que todas as 4 env vars estão configuradas no painel do Netlify.

---

## 📞 Próximos passos (roadmap)

- [ ] Configurar pagamentos no Shopify (Mercado Pago, Stripe, PayPal)
- [ ] Adicionar Pixel Meta + TikTok no `layout.tsx`
- [ ] Adicionar imagem OG (`/public/og-image.jpg`)
- [ ] Criar páginas de políticas (privacidad, devoluciones, etc.)
- [ ] Integrar Judge.me ou similar para reviews
- [ ] Adicionar Google Analytics 4
