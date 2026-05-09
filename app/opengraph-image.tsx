import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

// Roda em Node.js (Netlify executa edge runtime como Node.js da função region).
// Mantemos default (Node) pra usar fs.readFileSync e ler assets do filesystem.
export const alt = 'Lensmind™ — Gafas Inteligentes con IA';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Tokens de cor — espelham paleta do site (ink/bone/ember/smoke).
const INK = '#0A0A0A';
const BONE = '#FAF8F4';
const SMOKE_300 = '#D4D4D4';
const SMOKE_400 = '#A3A3A3';
const SMOKE_500 = '#737373';
const EMBER = '#D97706';

export default async function OpenGraphImage() {
  // Carrega assets do filesystem em runtime (Node.js)
  const heroBuffer = readFileSync(
    join(process.cwd(), 'public', 'lensmind-og-hero.jpg')
  );
  const heroBase64 = `data:image/jpeg;base64,${heroBuffer.toString('base64')}`;

  const interRegular = readFileSync(
    join(process.cwd(), 'public', 'fonts', 'Inter-400.ttf')
  );
  const interMedium = readFileSync(
    join(process.cwd(), 'public', 'fonts', 'Inter-500.ttf')
  );
  const interBold = readFileSync(
    join(process.cwd(), 'public', 'fonts', 'Inter-700.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: INK,
          position: 'relative',
          fontFamily: 'Inter',
        }}
      >
        {/* === LADO ESQUERDO: foto hero === */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 600,
            height: 630,
            display: 'flex',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroBase64}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
          {/* Sombra editorial sutil na borda direita pra suavizar transição com painel ink */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: 80,
              height: '100%',
              backgroundImage:
                'linear-gradient(to right, rgba(10,10,10,0) 0%, rgba(10,10,10,0.45) 100%)',
              display: 'flex',
            }}
          />
        </div>

        {/* === LADO DIREITO: painel ink com texto === */}
        <div
          style={{
            position: 'absolute',
            left: 660,
            top: 0,
            width: 510,
            height: 630,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Eyebrow — caixa alta, cinza, letterspaced */}
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: SMOKE_400,
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: 36,
              display: 'flex',
            }}
          >
            LENSMIND™ · EDITION 01
          </div>

          {/* Headline — peso bold, leading apertado, letter-spacing negativo */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: BONE,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              marginBottom: 32,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>La IA que vive</span>
            <span>en tu mirada.</span>
          </div>

          {/* Subhead — multi-linha cinza claro */}
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: SMOKE_300,
              lineHeight: 1.45,
              marginBottom: 32,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Cámara Sony 1080p · IA por voz.</span>
            <span>Traductor en 40 idiomas.</span>
            <span>Diseñadas para Latinoamérica.</span>
          </div>

          {/* Botão "Comprar — $149.99 USD →" — bg bone, texto ink */}
          <div
            style={{
              backgroundColor: BONE,
              color: INK,
              padding: '14px 26px',
              borderRadius: 3,
              fontSize: 19,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              alignSelf: 'flex-start',
              marginBottom: 18,
            }}
          >
            <span>Comprar — $149.99 USD</span>
            <span>→</span>
          </div>

          {/* Linha discreta de price compare */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 8,
              fontSize: 16,
              fontWeight: 400,
            }}
          >
            <span
              style={{
                color: SMOKE_500,
                textDecoration: 'line-through',
              }}
            >
              Antes $249
            </span>
            <span style={{ color: SMOKE_500 }}>·</span>
            <span style={{ color: EMBER, fontWeight: 500 }}>Ahorra 40%</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interMedium, weight: 500, style: 'normal' },
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
      ],
    }
  );
}
