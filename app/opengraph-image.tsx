import { ImageResponse } from 'next/og';

// runtime = Node.js (padrão). Netlify executa edge runtime
// como Node.js da função region, então não vale a pena marcar edge.
export const alt = 'Lensmind — Gafas Inteligentes con IA';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
          fontFamily: 'sans-serif',
          padding: 80,
          position: 'relative',
        }}
      >
        {/* Glow ember (camada separada — Satori aceita gradient sozinho) */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 800,
            height: 800,
            backgroundImage:
              'radial-gradient(circle, rgba(217,119,6,0.25) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            left: -200,
            width: 700,
            height: 700,
            backgroundImage:
              'radial-gradient(circle, rgba(217,119,6,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Top bar */}
        <div
          style={{
            position: 'absolute',
            top: 50,
            left: 80,
            right: 80,
            display: 'flex',
            justifyContent: 'space-between',
            color: '#737373',
            fontSize: 18,
            letterSpacing: 6,
            textTransform: 'uppercase',
          }}
        >
          <span>· Vol. 01 ·</span>
          <span>Lensmind™ · LATAM 2026</span>
        </div>

        {/* Eyebrow */}
        <div
          style={{
            color: '#D97706',
            fontSize: 22,
            letterSpacing: 8,
            textTransform: 'uppercase',
            fontWeight: 500,
            marginBottom: 30,
            display: 'flex',
          }}
        >
          La Nueva Generación
        </div>

        {/* Main headline */}
        <div
          style={{
            color: '#F5F1EA',
            fontSize: 130,
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 0.95,
            textAlign: 'center',
            letterSpacing: -3,
            marginBottom: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', gap: 28 }}>
            <span>La</span>
            <span style={{ color: '#D97706' }}>IA</span>
            <span>que vive</span>
          </div>
          <div style={{ display: 'flex', gap: 28 }}>
            <span>en tu</span>
            <span style={{ color: '#D97706' }}>mirada.</span>
          </div>
        </div>

        {/* Subhead */}
        <div
          style={{
            color: '#A3A3A3',
            fontSize: 28,
            textAlign: 'center',
            marginBottom: 50,
            display: 'flex',
          }}
        >
          Cámara 1080p · Traductor IA · 40 idiomas
        </div>

        {/* Price pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            backgroundColor: 'rgba(217,119,6,0.1)',
            border: '1px solid rgba(217,119,6,0.3)',
            borderRadius: 4,
            padding: '16px 32px',
            color: '#F5F1EA',
            fontSize: 32,
          }}
        >
          <span
            style={{
              color: '#737373',
              textDecoration: 'line-through',
              fontSize: 24,
            }}
          >
            $199
          </span>
          <span style={{ fontWeight: 300 }}>$149.99 USD</span>
          <span
            style={{
              color: '#D97706',
              fontSize: 20,
              letterSpacing: 4,
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            -25%
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
