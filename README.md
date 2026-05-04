# Lensmind™ — Site Headless

Site oficial da Lensmind: gafas inteligentes con IA para o mercado LATAM.

**Stack:** Next.js 14 + TypeScript + Tailwind + Framer Motion + Shopify Storefront API + Netlify

---

## 🎬 Modo Mock — Funciona SEM configurar Shopify!

**Você pode fazer deploy IMEDIATAMENTE, sem precisar de token Shopify.**

O site detecta automaticamente:
- ❌ Sem token Shopify → exibe produto **mock** com dados reais do Lensmind
- ✅ Com token Shopify → busca produto real automaticamente

Não precisa mudar código nenhum. Só configurar a env var depois.

---

## 🚀 Deploy IMEDIATO no Netlify

### Via GitHub Desktop (recomendado)

Você já fez isso! Repositório em `github.com/Ribeirolord93/lensmind-site`.

### Conectar Netlify ao repositório

1. Acessa [app.netlify.com](https://app.netlify.com) e faz login com GitHub
2. **Add new site → Import an existing project → Deploy with GitHub**
3. Seleciona o repositório `lensmind-site`
4. Configurações de build (vêm do `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `.next`
5. **NÃO precisa adicionar env vars agora** (modo mock funciona sem elas)
6. Clica em **Deploy site**

🎉 **Site no ar em 2-4min!**

---

## 🔑 Quando tiver o token Shopify

### 1. Pegar token

Após instalar app **Headless** (espera 1h após mudar plano):
1. Admin Shopify → **Headless** (canal de venda)
2. **Add storefront** → nome: `Lensmind LATAM`
3. **Storefront API permissions** → Edit:
   - `unauthenticated_read_product_listings` ✅
   - `unauthenticated_read_product_inventory` ✅
   - `unauthenticated_write_checkouts` ✅
   - `unauthenticated_read_checkouts` ✅
   - `unauthenticated_read_content` ✅
4. **Reveal Private access token** → copiar

### 2. Adicionar no Netlify

**Site settings → Environment variables → Add a variable:**

| Key | Value |
|---|---|
| `SHOPIFY_STORE_DOMAIN` | `lensmind.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | `shpat_xxx...` |
| `SHOPIFY_STOREFRONT_API_VERSION` | `2024-10` |
| `NEXT_PUBLIC_SITE_URL` | `https://lensmind.lat` |

3. **Trigger deploy → Deploy site**
4. Em ~3min site refaz build com produto REAL.

---

## 🌐 Conectar domínio lensmind.lat

1. Netlify: **Domain settings → Add custom domain → lensmind.lat**
2. Netlify mostra os DNS records necessários
3. Namecheap → Domain List → Manage `lensmind.lat` → Advanced DNS
4. Adiciona records (CNAME ou A) que o Netlify pediu
5. SSL automático após DNS propagar (15min-24h)

---

## 🎨 Design

- **Display font:** Fraunces italic (editorial premium)
- **Body font:** Manrope
- **Cores:** Ink #0A0A0A · Bone #F5F1EA · Ember #D97706
- **Vibe:** Tech-luxe LATAM (Apple Vision + Nothing + Hemios)

---

## 🛠️ Performance Targets

- Lighthouse Performance: 95+
- LCP: < 1.5s
- CLS: 0
- Bundle JS: < 100kb

---

## 🐛 Troubleshooting

**Site mostra produto mock mesmo com env vars configuradas:**
→ Confere se token tem 20+ caracteres
→ Trigger redeploy

**Botão "Comprar" mostra "Próximamente":**
→ Modo demo ativo. Normal antes de conectar Shopify.

**Imagens não carregam:**
→ Verifica `next.config.js` (deve ter `cdn.shopify.com` e `images.unsplash.com`)

---

## 🗺️ Rotas

| URL | Descrição |
|---|---|
| `/` | Home com 11 seções de conversão |
| `/productos/[handle]` | Página de produto individual (SEO-friendly) |
| `/api/cart` | API checkout (POST) |
| `/sitemap.xml` | Gerado automaticamente, inclui todos os produtos |
| `/robots.txt` | Permite tudo, bloqueia /api/ |
| `/opengraph-image` | OG card 1200×630 dinâmico para WhatsApp/IG/Twitter |
