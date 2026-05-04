'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, Star } from 'lucide-react';

// Device Mockup — SVG dos óculos estilizado em 3D
// Quando produto real for adicionado no Shopify, trocar por <Image>
function GlassesMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="relative w-full max-w-[600px] mx-auto"
      style={{ perspective: '1200px' }}
    >
      {/* Glow effect atrás */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-ember/[0.15] rounded-full blur-[80px]" />
      </div>

      {/* Glasses SVG — estilizado, futurista */}
      <svg
        viewBox="0 0 600 280"
        className="w-full h-auto drop-shadow-2xl"
        style={{ filter: 'drop-shadow(0 30px 60px rgba(217, 119, 6, 0.2))' }}
      >
        <defs>
          {/* Gradiente lente esquerda */}
          <linearGradient id="lensL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#2a2a2a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.95" />
          </linearGradient>

          {/* Gradiente lente direita */}
          <linearGradient id="lensR" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#2a2a2a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.95" />
          </linearGradient>

          {/* Reflexo nas lentes */}
          <linearGradient id="reflex" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="40%" stopColor="#d97706" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Frame metálico */}
          <linearGradient id="frame" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1f1f1f" />
            <stop offset="50%" stopColor="#0a0a0a" />
            <stop offset="100%" stopColor="#1f1f1f" />
          </linearGradient>

          {/* Ember accent na haste */}
          <radialGradient id="emberDot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff9500" stopOpacity="1" />
            <stop offset="60%" stopColor="#d97706" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Hastes (temples) */}
        <path
          d="M 50 130 Q 30 130 30 145 L 30 165"
          stroke="url(#frame)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 550 130 Q 570 130 570 145 L 570 165"
          stroke="url(#frame)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Lente esquerda */}
        <g>
          <ellipse
            cx="180"
            cy="135"
            rx="115"
            ry="70"
            fill="url(#lensL)"
            stroke="#0a0a0a"
            strokeWidth="4"
          />
          {/* Reflexo na lente */}
          <ellipse
            cx="160"
            cy="115"
            rx="60"
            ry="30"
            fill="url(#reflex)"
            opacity="0.6"
          />
          {/* Brilho topo */}
          <ellipse
            cx="155"
            cy="105"
            rx="35"
            ry="10"
            fill="#ffffff"
            opacity="0.12"
          />
        </g>

        {/* Lente direita */}
        <g>
          <ellipse
            cx="420"
            cy="135"
            rx="115"
            ry="70"
            fill="url(#lensR)"
            stroke="#0a0a0a"
            strokeWidth="4"
          />
          <ellipse
            cx="400"
            cy="115"
            rx="60"
            ry="30"
            fill="url(#reflex)"
            opacity="0.6"
          />
          <ellipse
            cx="395"
            cy="105"
            rx="35"
            ry="10"
            fill="#ffffff"
            opacity="0.12"
          />
        </g>

        {/* Ponte (bridge) */}
        <path
          d="M 295 130 Q 300 122 305 130"
          stroke="url(#frame)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Câmera (detalhe esquerdo, simulando o sensor Sony) */}
        <g>
          <circle cx="90" cy="105" r="6" fill="#0a0a0a" stroke="#d97706" strokeWidth="1" />
          <circle cx="90" cy="105" r="2.5" fill="#d97706" opacity="0.9" />
          <circle cx="90" cy="105" r="1" fill="#fff" opacity="0.8" />
        </g>

        {/* LED indicador (ember dot animado) */}
        <circle cx="510" cy="105" r="3" fill="url(#emberDot)">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Reflexo brilhante topo dos óculos (highlight) */}
        <path
          d="M 80 95 Q 300 75 520 95"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          opacity="0.15"
        />
      </svg>

      {/* Floating chips com features */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute top-2 left-0 hidden sm:block"
      >
        <div className="glass-strong px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase text-ember font-medium">
          📸 Sony 1080p
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-2 right-0 hidden sm:block"
      >
        <div className="glass-strong px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase text-ember font-medium">
          🤖 IA · 40 idiomas
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-ink grain pt-20 lg:pt-0">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-ember/[0.08] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-ember/[0.05] rounded-full blur-[160px]" />
      </div>

      {/* Editorial frame */}
      <div className="absolute inset-x-6 top-20 hidden lg:flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-smoke-500 z-10">
        <span>· Vol. 01 ·</span>
        <span>Lensmind™ Edition LATAM 2026</span>
        <span>· $199 USD ·</span>
      </div>

      <div className="container mx-auto px-6 py-12 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT: Texto + CTA */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.35em] uppercase text-ember font-medium">
                <span className="w-6 h-px bg-ember" />
                La Nueva Generación
                <span className="w-6 h-px bg-ember" />
              </span>
            </motion.div>

            {/* Display headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="display-heading text-[14vw] sm:text-[10vw] lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.92] mb-6 text-balance"
            >
              La <span className="text-ember">IA</span> que vive
              <br />
              en tu <span className="text-ember not-italic">mirada</span>.
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-smoke-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed text-balance"
            >
              Cámara Sony 1080p, traductor en tiempo real y asistente de IA.
              Todo el poder del{' '}
              <span className="text-bone-200 italic">Ray-Ban Meta</span> — por
              menos de la mitad.
            </motion.p>

            {/* Price block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-baseline gap-3 mb-8"
            >
              <span className="text-smoke-500 text-base line-through">
                $329
              </span>
              <span className="text-bone text-3xl md:text-4xl font-light">
                $199
              </span>
              <span className="text-smoke-400 text-sm">USD</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase bg-ember/10 text-ember px-2.5 py-1 rounded-sm font-medium">
                -40%
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-3 items-center lg:items-start justify-center lg:justify-start mb-10"
            >
              <Link href="#producto" className="btn-ember group w-full sm:w-auto">
                <span>Comprar ahora</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link href="#tecnologia" className="btn-ghost w-full sm:w-auto">
                Ver tecnología
              </Link>
            </motion.div>

            {/* Trust signals row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.85 }}
              className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0"
            >
              <div className="flex flex-col items-center lg:items-start gap-1">
                <Truck size={18} className="text-ember" strokeWidth={1.5} />
                <span className="text-[10px] tracking-wider uppercase text-smoke-400 text-center lg:text-left">
                  Envío gratis
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <ShieldCheck size={18} className="text-ember" strokeWidth={1.5} />
                <span className="text-[10px] tracking-wider uppercase text-smoke-400 text-center lg:text-left">
                  30 días garantía
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <Star
                  size={18}
                  className="text-ember"
                  strokeWidth={1.5}
                  fill="currentColor"
                />
                <span className="text-[10px] tracking-wider uppercase text-smoke-400 text-center lg:text-left">
                  4.8 · Premium
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Glasses Mockup */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="order-1 lg:order-2 relative"
          >
            <GlassesMockup />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-smoke-500"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-smoke-500 to-transparent" />
      </motion.div>
    </section>
  );
}
