/* global React, ReactDOM, LCMark, DesignCanvas, DCSection, DCArtboard */

const { useEffect, useRef, useState } = React;

// ============================================================
// Reusable lockups
// ============================================================

const Wordmark = ({ size = 36, color, ampColor, weight = 600 }) => (
  <div
    className="wordmark"
    style={{
      fontSize: size,
      color: color,
      fontWeight: weight,
      whiteSpace: "nowrap",
    }}
  >
    Lajos<span className="amp" style={{ color: ampColor }}>&</span>Coelho
  </div>
);

const Tagline = ({ size = 11, color, mt = 8 }) => (
  <div
    className="tagline"
    style={{ fontSize: size, color, marginTop: mt }}
  >
    Gestão e Serviços
  </div>
);

// ============================================================
// 1. PRIMARY — symbol + name (stacked)
// ============================================================

const PrimaryLockup = ({ animated = true }) => (
  <div className="glow-base hero-mark" style={{ display: "grid", placeItems: "center", gap: 22 }}>
    <LCMark size={132} variant="gradient" glow animated={animated} id="hero" />
    <div style={{ textAlign: "center" }}>
      <Wordmark size={42} />
      <Tagline size={11} color="#6B7375" mt={10} />
    </div>
  </div>
);

// ============================================================
// 2. HORIZONTAL lockup
// ============================================================

const HorizontalLockup = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
    <LCMark size={84} variant="gradient" id="hori" />
    <div style={{ borderLeft: "1px solid #E6ECEC", paddingLeft: 22 }}>
      <Wordmark size={30} />
      <Tagline size={10} color="#6B7375" mt={6} />
    </div>
  </div>
);

// ============================================================
// 3. SYMBOL ONLY (favicon)
// ============================================================

const FaviconRow = () => {
  const sizes = [16, 24, 32, 48, 64, 96];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 28 }}>
      {sizes.map((s) => (
        <div key={s} style={{ display: "grid", placeItems: "center", gap: 10 }}>
          <div style={{
            width: Math.max(s, 22), height: Math.max(s, 22),
            display: "grid", placeItems: "center",
          }}>
            <LCMark size={s} variant="gradient" id={`fav-${s}`} />
          </div>
          <div style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            color: "#6B7375",
          }}>{s}px</div>
        </div>
      ))}
    </div>
  );
};

// ============================================================
// 4. DARK version
// ============================================================

const DarkLockup = () => (
  <div style={{ display: "grid", placeItems: "center", gap: 20 }}>
    <div style={{ position: "relative" }}>
      <div style={{
        position: "absolute", inset: "-30%",
        background: "radial-gradient(closest-side, rgba(139,213,240,.35), transparent 70%)",
        filter: "blur(40px)",
      }} />
      <LCMark size={120} variant="gradient" glow animated id="dark" />
    </div>
    <div style={{ textAlign: "center" }}>
      <div className="wordmark" style={{ fontSize: 36, color: "#fff", fontWeight: 600 }}>
        Lajos<span className="amp" style={{ color: "#8BD5F0" }}>&</span>Coelho
      </div>
      <div className="tagline" style={{ fontSize: 11, color: "rgba(255,255,255,.5)", marginTop: 10 }}>
        Gestão e Serviços
      </div>
    </div>
  </div>
);

// ============================================================
// 5. MONOCHROME
// ============================================================

const MonoLockup = ({ inverted = false }) => (
  <div style={{ display: "grid", placeItems: "center", gap: 18 }}>
    <LCMark
      size={104}
      variant={inverted ? "mono-light" : "mono-dark"}
      id={inverted ? "mono-l" : "mono-d"}
    />
    <Wordmark size={32} color={inverted ? "#fff" : "#2B2B2E"} ampColor={inverted ? "#fff" : "#2B2B2E"} />
    <Tagline size={11} color={inverted ? "rgba(255,255,255,.5)" : "#6B7375"} mt={-6} />
  </div>
);

// ============================================================
// CONSTRUCTION GRID — show the geometry
// ============================================================

const ConstructionGrid = () => {
  // Render the mark at 320 with a 64-cell grid overlay & spec annotations.
  return (
    <div style={{ position: "relative", width: 320, height: 320 }}>
      {/* grid */}
      <div
        className="grid-bg"
        style={{
          position: "absolute", inset: 0,
          borderRadius: 18,
          border: "1px dashed rgba(43,43,46,.18)",
        }}
      />
      {/* baseline circles */}
      <svg viewBox="0 0 64 64" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(88,195,181,.35)" strokeWidth=".4" strokeDasharray="1 1.5"/>
        <circle cx="32" cy="32" r="20" fill="none" stroke="rgba(88,195,181,.25)" strokeWidth=".4" strokeDasharray="1 1.5"/>
        <line x1="32" y1="0" x2="32" y2="64" stroke="rgba(43,43,46,.15)" strokeWidth=".3" strokeDasharray="1 1.5"/>
        <line x1="0" y1="32" x2="64" y2="32" stroke="rgba(43,43,46,.15)" strokeWidth=".3" strokeDasharray="1 1.5"/>
      </svg>
      {/* mark */}
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <LCMark size={320} variant="gradient" id="con" />
      </div>
      {/* spec labels */}
      <div className="spec-label" style={{ top: 6, left: 6 }}>r=10</div>
      <div className="spec-label" style={{ bottom: 6, right: 6 }}>64×64</div>
      <div className="spec-label" style={{ top: 6, right: 6 }}>node</div>
    </div>
  );
};

// ============================================================
// APPLICATIONS
// ============================================================

const FaviconStack = () => (
  <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
    <div className="squircle"><LCMark size={56} variant="gradient" id="sq1" /></div>
    <div className="squircle dark"><LCMark size={56} variant="mono-light" id="sq2" /></div>
    <div className="squircle gradient"><LCMark size={56} variant="mono-light" id="sq3" /></div>
  </div>
);

const BrowserApp = () => (
  <div className="chrome">
    <div className="chrome-bar">
      <div className="dot"/><div className="dot"/><div className="dot"/>
      <div className="url">
        <LCMark size={12} variant="gradient" id="url" />
        <span>lajoscoelho.com.br</span>
      </div>
    </div>
    <div className="chrome-content">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <LCMark size={32} variant="gradient" id="nav" />
        <div className="wordmark" style={{ fontSize: 16 }}>
          Lajos<span className="amp">&</span>Coelho
        </div>
      </div>
      <div className="nav-pills">
        <span className="active">Plataforma</span>
        <span>Soluções</span>
        <span>Sobre</span>
        <span style={{
          padding: "6px 12px", background: "var(--ink)", color: "#fff",
          borderRadius: 8, fontWeight: 500,
        }}>Acessar</span>
      </div>
    </div>
  </div>
);

const PhoneApp = () => (
  <div className="phone">
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
      <LCMark size={28} variant="gradient" id="ph" />
      <div style={{
        width: 28, height: 28, borderRadius: "50%",
        background: "linear-gradient(135deg,#58C3B5,#8BD5F0)",
      }}/>
    </div>
    <div style={{ fontSize: 11, color: "#6B7375", marginBottom: 6 }}>Bom dia,</div>
    <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 18 }}>Dr. Coelho</div>
    <div style={{
      borderRadius: 14,
      padding: 14,
      background: "linear-gradient(135deg,#58C3B5,#8BD5F0)",
      color: "#fff",
      marginBottom: 12,
    }}>
      <div style={{ fontSize: 10, opacity: .85, letterSpacing: ".1em", textTransform: "uppercase" }}>Gestão hoje</div>
      <div style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>14 ativos</div>
      <div style={{ fontSize: 11, opacity: .85, marginTop: 2 }}>3 prioridades pendentes</div>
    </div>
    {[
      { l: "Auditoria clínica", v: "92%", c: "#55F28C" },
      { l: "Indicadores SLA", v: "Estável", c: "#8BD5F0" },
      { l: "Equipes em campo", v: "8 / 12", c: "#58C3B5" },
    ].map((r, i) => (
      <div key={i} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "10px 12px",
        border: "1px solid #E6ECEC", borderRadius: 10, marginBottom: 8,
        fontSize: 12,
      }}>
        <span style={{ color: "#2B2B2E" }}>{r.l}</span>
        <span style={{
          color: r.c, fontWeight: 600,
          fontFamily: "JetBrains Mono, monospace", fontSize: 11,
        }}>{r.v}</span>
      </div>
    ))}
  </div>
);

const BusinessCard = () => (
  <div style={{ display: "flex", gap: 18, perspective: 1200 }}>
    {/* front */}
    <div style={{
      width: 280, height: 168, borderRadius: 12,
      background: "#fff",
      border: "1px solid #E6ECEC",
      boxShadow: "0 18px 40px -14px rgba(43,43,46,.18)",
      padding: 22,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      transform: "rotate(-2deg)",
      transition: "transform .5s cubic-bezier(.2,.8,.2,1)",
    }}
    onMouseEnter={(e)=> e.currentTarget.style.transform = "rotate(0deg) translateY(-4px)"}
    onMouseLeave={(e)=> e.currentTarget.style.transform = "rotate(-2deg)"}
    >
      <LCMark size={38} variant="gradient" id="bc1" />
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#2B2B2E" }}>Lajos & Coelho</div>
        <div className="tagline" style={{ fontSize: 9, color: "#6B7375", marginTop: 3 }}>Gestão e Serviços</div>
      </div>
    </div>
    {/* back */}
    <div style={{
      width: 280, height: 168, borderRadius: 12,
      background: "linear-gradient(135deg,#58C3B5 0%,#8BD5F0 100%)",
      boxShadow: "0 18px 40px -14px rgba(88,195,181,.4)",
      padding: 22,
      color: "#fff",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      transform: "rotate(2deg)",
      transition: "transform .5s cubic-bezier(.2,.8,.2,1)",
    }}
    onMouseEnter={(e)=> e.currentTarget.style.transform = "rotate(0deg) translateY(-4px)"}
    onMouseLeave={(e)=> e.currentTarget.style.transform = "rotate(2deg)"}
    >
      <div style={{ fontSize: 11, opacity: .9 }}>Dr. Felipe Coelho</div>
      <div>
        <div style={{ fontSize: 11, opacity: .9 }}>Diretor de Operações</div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, opacity: .85, marginTop: 6 }}>
          felipe@lajoscoelho.com.br<br/>+55 11 9 9999 0000
        </div>
      </div>
    </div>
  </div>
);

// ============================================================
// COLOR SYSTEM
// ============================================================

const ColorSystem = () => {
  const swatches = [
    { name: "Teal Primary",  hex: "#58C3B5", color: "#fff", bg: "#58C3B5" },
    { name: "Sky Primary",   hex: "#8BD5F0", color: "#0B3A4A", bg: "#8BD5F0" },
    { name: "Green Accent",  hex: "#55F28C", color: "#0B3A20", bg: "#55F28C" },
    { name: "Ink",           hex: "#2B2B2E", color: "#fff", bg: "#2B2B2E" },
    { name: "Background",    hex: "#F7FAFA", color: "#2B2B2E", bg: "#F7FAFA", border: true },
    { name: "Glass",         hex: "rgba(255,255,255,.6)", color: "#2B2B2E",
      bg: "rgba(255,255,255,.6)",
      backdrop: "linear-gradient(135deg,#58C3B5,#8BD5F0)" },
  ];
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 14,
      width: "100%",
    }}>
      {swatches.map((s) => (
        <div key={s.name}
          className="swatch"
          style={{
            background: s.backdrop ?? s.bg,
            color: s.color,
            border: s.border ? "1px solid #E6ECEC" : "none",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {s.backdrop && (
            <div style={{
              position: "absolute", inset: 8, borderRadius: 10,
              background: "rgba(255,255,255,.6)",
              backdropFilter: "blur(20px)",
            }}/>
          )}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="name">{s.name}</div>
          </div>
          <div style={{ position: "relative", zIndex: 1, fontSize: 11, opacity: .9 }}>{s.hex}</div>
        </div>
      ))}
    </div>
  );
};

// ============================================================
// TYPE SYSTEM
// ============================================================

const TypeSystem = () => (
  <div style={{ width: "100%", display: "grid", gap: 18 }}>
    <div>
      <div style={{ fontSize: 11, color: "#6B7375", fontFamily: "JetBrains Mono, monospace", marginBottom: 6 }}>Inter / Display 600</div>
      <div className="wordmark" style={{ fontSize: 56, lineHeight: 1 }}>Aa Bb Cc</div>
    </div>
    <div>
      <div style={{ fontSize: 11, color: "#6B7375", fontFamily: "JetBrains Mono, monospace", marginBottom: 6 }}>Inter / Title 600 — wordmark</div>
      <Wordmark size={28} />
    </div>
    <div>
      <div style={{ fontSize: 11, color: "#6B7375", fontFamily: "JetBrains Mono, monospace", marginBottom: 6 }}>Inter / Caption 400 — uppercase</div>
      <Tagline size={12} color="#2B2B2E" mt={0} />
    </div>
    <div style={{
      display: "flex", gap: 18, paddingTop: 16, borderTop: "1px solid #E6ECEC",
      fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#6B7375",
    }}>
      <div><b style={{color:"#2B2B2E"}}>Tracking</b> -0.02em</div>
      <div><b style={{color:"#2B2B2E"}}>Leading</b> 1.0</div>
      <div><b style={{color:"#2B2B2E"}}>Weights</b> 300 · 400 · 500 · 600</div>
    </div>
  </div>
);

// ============================================================
// HERO — ticker that screams "system / connection / flow"
// ============================================================

const HeroTicker = () => {
  const items = [
    "Sistema", "Conexão", "Fluxo", "Confiança", "Inteligência",
    "Cuidado", "Tecnologia", "Organização", "Premium", "Saúde",
  ];
  const stream = [...items, ...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%", maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}>
      <div className="ticker">
        {stream.map((w, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: i % 4 === 0 ? "#55F28C" : "#58C3B5" }}/>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// CARD WRAPPER
// ============================================================

const Card = ({ tag, title, dark, padded = true, children, height }) => (
  <div className={`card ${dark ? "dark" : ""}`} style={{ height }}>
    <div className="card-head">
      <span>{title}</span>
      {tag && <span className="tag">{tag}</span>}
    </div>
    <div className="card-body" style={{ padding: padded ? 40 : 0, background: dark ? "transparent" : undefined }}>
      <div className="stage">{children}</div>
    </div>
  </div>
);

// ============================================================
// REVEAL — CSS animation handles it on mount
// ============================================================

const useReveal = () => {};

// ============================================================
// ROOT — laid out inside DesignCanvas
// ============================================================

const App = () => {
  useReveal();

  return (
    <DesignCanvas
      title="Lajos & Coelho"
      subtitle="Sistema de identidade — gestão, tecnologia e cuidado."
    >
      {/* ============================================================
          1. PRIMARY — hero card spanning full width
      ============================================================ */}
      <DCSection id="primary" title="01 · Logo Principal">
        <DCArtboard id="hero" label="Lockup vertical (símbolo + nome)" width={760} height={520}>
          <div className="reveal" style={{
            width: "100%", height: "100%",
            background: "radial-gradient(ellipse at top, #fff 0%, #F7FAFA 100%)",
            display: "grid", placeItems: "center",
            position: "relative", overflow: "hidden",
          }}>
            <PrimaryLockup />
            <div style={{ position: "absolute", bottom: 24, left: 0, right: 0 }}>
              <HeroTicker />
            </div>
          </div>
        </DCArtboard>

        <DCArtboard id="primary-mono" label="Sobre fundo escuro" width={520} height={520}>
          <div className="reveal dark" style={{
            width: "100%", height: "100%",
            background: "linear-gradient(160deg, #0E1416 0%, #1A2225 100%)",
            display: "grid", placeItems: "center",
            position: "relative", overflow: "hidden",
          }}>
            {/* ambient grid */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage:
                "linear-gradient(rgba(139,213,240,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,213,240,.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}/>
            <DarkLockup />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ============================================================
          2. HORIZONTAL
      ============================================================ */}
      <DCSection id="horizontal" title="02 · Logo Horizontal">
        <DCArtboard id="hori-light" label="Horizontal · light" width={620} height={300}>
          <div className="reveal" style={{
            width: "100%", height: "100%",
            background: "#fff",
            display: "grid", placeItems: "center",
          }}>
            <HorizontalLockup />
          </div>
        </DCArtboard>

        <DCArtboard id="hori-dark" label="Horizontal · dark" width={620} height={300}>
          <div className="reveal" style={{
            width: "100%", height: "100%",
            background: "#0E1416",
            display: "grid", placeItems: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <LCMark size={68} variant="gradient" id="hori-d" />
              <div style={{ borderLeft: "1px solid rgba(255,255,255,.15)", paddingLeft: 22 }}>
                <div className="wordmark" style={{ fontSize: 24, color: "#fff", fontWeight: 600 }}>
                  Lajos<span className="amp" style={{ color: "#8BD5F0" }}>&</span>Coelho
                </div>
                <Tagline size={9} color="rgba(255,255,255,.5)" mt={6} />
              </div>
            </div>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ============================================================
          3. SYMBOL ONLY (favicon scale)
      ============================================================ */}
      <DCSection id="favicon" title="03 · Símbolo (Favicon)">
        <DCArtboard id="fav-scale" label="Escala — 16px → 96px" width={620} height={260}>
          <div className="reveal" style={{
            width: "100%", height: "100%",
            background: "#fff",
            display: "grid", placeItems: "center",
            padding: 30,
          }}>
            <FaviconRow />
          </div>
        </DCArtboard>

        <DCArtboard id="fav-app" label="Aplicação — app icons" width={460} height={260}>
          <div className="reveal" style={{
            width: "100%", height: "100%",
            background: "#fff",
            display: "grid", placeItems: "center",
          }}>
            <FaviconStack />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ============================================================
          4. DARK
      ============================================================ */}
      <DCSection id="dark" title="04 · Versão Dark">
        <DCArtboard id="dark-hero" label="Dark mode" width={760} height={460}>
          <div className="reveal" style={{
            width: "100%", height: "100%",
            background: "linear-gradient(160deg, #0E1416 0%, #14201F 60%, #0E1416 100%)",
            display: "grid", placeItems: "center",
            position: "relative", overflow: "hidden",
          }}>
            {/* aurora */}
            <div style={{
              position: "absolute", top: "-20%", left: "-10%", width: "60%", height: "60%",
              background: "radial-gradient(closest-side, rgba(88,195,181,.35), transparent 70%)",
              filter: "blur(30px)",
            }}/>
            <div style={{
              position: "absolute", bottom: "-20%", right: "-10%", width: "60%", height: "60%",
              background: "radial-gradient(closest-side, rgba(139,213,240,.25), transparent 70%)",
              filter: "blur(30px)",
            }}/>
            <DarkLockup />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ============================================================
          5. MONOCROMÁTICA
      ============================================================ */}
      <DCSection id="mono" title="05 · Monocromática">
        <DCArtboard id="mono-d" label="Mono · ink (#2B2B2E)" width={420} height={420}>
          <div className="reveal" style={{
            width: "100%", height: "100%",
            background: "#F7FAFA",
            display: "grid", placeItems: "center",
          }}>
            <MonoLockup />
          </div>
        </DCArtboard>

        <DCArtboard id="mono-l" label="Mono · branco invertido" width={420} height={420}>
          <div className="reveal" style={{
            width: "100%", height: "100%",
            background: "#2B2B2E",
            display: "grid", placeItems: "center",
          }}>
            <MonoLockup inverted />
          </div>
        </DCArtboard>

        <DCArtboard id="mono-accent" label="Verde destaque · #55F28C" width={420} height={420}>
          <div className="reveal" style={{
            width: "100%", height: "100%",
            background: "#0E1416",
            display: "grid", placeItems: "center",
          }}>
            <div style={{ display: "grid", placeItems: "center", gap: 18 }}>
              <LCMark size={104} variant="accent" id="green" glow />
              <div className="wordmark" style={{ fontSize: 32, color: "#55F28C", fontWeight: 600 }}>
                Lajos<span style={{ fontWeight: 300, color: "#55F28C", margin: "0 .08em" }}>&</span>Coelho
              </div>
            </div>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ============================================================
          6. CONSTRUCTION GRID
      ============================================================ */}
      <DCSection id="construction" title="06 · Grid de Construção">
        <DCArtboard id="grid" label="Geometria · 64×64 base" width={420} height={420}>
          <div className="reveal" style={{
            width: "100%", height: "100%",
            background: "#fff",
            display: "grid", placeItems: "center",
          }}>
            <ConstructionGrid />
          </div>
        </DCArtboard>

        <DCArtboard id="anatomy" label="Anatomia do monograma" width={620} height={420}>
          <div className="reveal" style={{
            width: "100%", height: "100%",
            background: "#fff",
            padding: 30,
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
              <LCMark size={140} variant="gradient" id="ana" />
              <div style={{ flex: 1, display: "grid", gap: 14, fontSize: 12 }}>
                {[
                  { l: "L bracket", v: "haste vertical + base", c: "#58C3B5" },
                  { l: "C bracket", v: "interlock superior-direito", c: "#8BD5F0" },
                  { l: "Node", v: "nó de sistema · #55F28C", c: "#55F28C" },
                  { l: "Corner radius", v: "10 / 64 (≈15.6%)", c: "#2B2B2E" },
                  { l: "Stroke", v: "14 / 64 (≈21.8%)", c: "#2B2B2E" },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: r.c }}/>
                    <span style={{ fontWeight: 600, color: "#2B2B2E", minWidth: 110 }}>{r.l}</span>
                    <span style={{ color: "#6B7375", fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              fontSize: 11, color: "#6B7375", paddingTop: 16, borderTop: "1px solid #E6ECEC",
              fontFamily: "JetBrains Mono, monospace",
            }}>
              base 64 · clearspace = 1× altura do node · min size 16px
            </div>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ============================================================
          7. TYPE & COLOR
      ============================================================ */}
      <DCSection id="tokens" title="07 · Tokens · Cor & Tipografia">
        <DCArtboard id="colors" label="Paleta" width={620} height={360}>
          <div className="reveal" style={{
            width: "100%", height: "100%",
            background: "#fff",
            padding: 26,
            display: "grid", placeItems: "center",
          }}>
            <ColorSystem />
          </div>
        </DCArtboard>

        <DCArtboard id="type" label="Tipografia · Inter" width={520} height={360}>
          <div className="reveal" style={{
            width: "100%", height: "100%",
            background: "#fff",
            padding: 30,
          }}>
            <TypeSystem />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ============================================================
          8. APPLICATIONS
      ============================================================ */}
      <DCSection id="apps" title="08 · Aplicações">
        <DCArtboard id="web" label="Site institucional" width={680} height={360}>
          <div className="reveal" style={{
            width: "100%", height: "100%",
            background: "linear-gradient(135deg, #F7FAFA 0%, #EAF4F4 100%)",
            display: "grid", placeItems: "center",
            padding: 24,
          }}>
            <BrowserApp />
          </div>
        </DCArtboard>

        <DCArtboard id="mobile" label="App mobile" width={320} height={520}>
          <div className="reveal" style={{
            width: "100%", height: "100%",
            background: "#F7FAFA",
            display: "grid", placeItems: "center",
          }}>
            <PhoneApp />
          </div>
        </DCArtboard>

        <DCArtboard id="card" label="Cartão de visita" width={680} height={360}>
          <div className="reveal" style={{
            width: "100%", height: "100%",
            background: "linear-gradient(135deg,#F7FAFA 0%, #EFF8F8 100%)",
            display: "grid", placeItems: "center",
            padding: 24,
          }}>
            <BusinessCard />
          </div>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
