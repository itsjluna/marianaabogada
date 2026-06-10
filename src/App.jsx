import React, { useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './index.css';

function ContactForm({ title, subtitle, isDark }) {
  const [state, handleSubmit] = useForm("contact");

  if (state.succeeded) {
      return (
        <div className="success-msg" style={{display: 'block'}}>
          <h4 style={isDark ? {color: 'white'} : {}}>¡Mensaje Enviado!</h4>
          <p style={isDark ? {color: 'rgba(255,255,255,0.8)'} : {}}>Nos pondremos en contacto contigo lo antes posible.</p>
        </div>
      );
  }

  return (
    <div className="lead-form" style={isDark ? {background: 'transparent', padding: '32px', border: 'none', color: 'white'} : {}}>
      <h3 style={isDark ? {fontSize: '24px', marginBottom: '8px', color: 'white'} : {}}>{title}</h3>
      <p style={isDark ? {fontSize: '14px', marginBottom: '24px', color: 'rgba(255,255,255,0.8)'} : {}}>{subtitle}</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-field">
            <input type="text" name="name" placeholder="Tu nombre completo" required />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </div>
          <div className="form-field">
            <input type="tel" name="phone" placeholder="Tu número de teléfono" required />
            <ValidationError prefix="Phone" field="phone" errors={state.errors} />
          </div>
        </div>
        <div className="form-field">
          <select name="case" required defaultValue="">
            <option value="" disabled>¿Cuál es tu situación?</option>
            <option>Orden de deportación</option>
            <option>Problemas con ICE</option>
            <option>Asilo Político</option>
            <option>Arreglar mis papeles</option>
            <option>Otro</option>
          </select>
          <ValidationError prefix="Case" field="case" errors={state.errors} />
        </div>
        <div className="form-field">
          <textarea name="message" placeholder="Cuéntanos brevemente tu situación (opcional)" style={isDark ? {background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.2)'} : {}}></textarea>
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        </div>
        <button type="submit" disabled={state.submitting} className="form-submit" style={isDark ? {width: '100%', marginTop: '12px', padding: '14px'} : {}}>
          {state.submitting ? 'Enviando...' : 'Enviar mis datos'}
        </button>
      </form>
    </div>
  );
}

export default function App() {
  const [tiktokVideos, setTiktokVideos] = React.useState([]);
  const [loadingVideos, setLoadingVideos] = React.useState(true);

  useEffect(() => {
    fetch('/api/tiktok')
      .then(r => r.json())
      .then(data => {
        if (data && data.videos) {
          setTiktokVideos(data.videos.slice(0,3));
        }
      })
      .catch(e => console.error("Error fetching videos", e))
      .finally(() => setLoadingVideos(false));
  }, []);

  useEffect(() => {
    // Theme toggle init
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    let theme = 'light';
    if (document.documentElement.getAttribute('data-theme') !== 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      theme = 'dark';
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  };

  const playTikTokVideo = (e, videoId) => {
    const card = e.currentTarget;
    card.classList.add('playing');
    card.innerHTML = `<iframe src="https://www.tiktok.com/embed/v2/${videoId}" width="100%" height="100%" style="border:none; border-radius:12px;" allowFullScreen></iframe>`;
  };

  return (
    <>
      

{/*  */}
<nav>
  <div className="nav-logo">
    <img src="images/tu-abogadalogo2.png" alt="Tu Abogada Mariana"  />
    <span style={{display: "none"}}>Tu Abogada Mariana</span>
  </div>
  <div className="nav-actions">
    <button id="theme-toggle" className="theme-toggle" aria-label="Cambiar tema" onClick={toggleTheme}>
      <svg className="sun-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
      <svg className="moon-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
    </button>
    <a href="tel:2814298083" className="nav-call">
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.94-1.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      (281) 429-8083
    </a>
    <a href="https://wa.me/18329694319?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n%20sobre%20mi%20caso%20de%20inmigraci%C3%B3n." target="_blank" className="nav-wa">
      <svg width="15" height="15" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
      WhatsApp
    </a>
  </div>
</nav>

{/*  */}
<section className="hero">
  <div className="hero-bg-gradient" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, background: 'linear-gradient(135deg, var(--plum) 0%, var(--purple) 60%, var(--lavender) 100%)'}}></div>
  <div className="hero-text">
    <p className="hero-eyebrow">Derecho de Inmigración · Houston, Texas · SHEV Law Group</p>

    <div className="urgency-badge">
      <div className="urgency-dot"></div>
      <span>Atención disponible en español</span>
    </div>

    <div className="hero-cta-block" style={{marginTop: '32px'}}>
      <div className="hero-form-wrapper" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
        <ContactForm title="Consulta Gratuita" subtitle="Déjanos tus datos y te llamaremos de inmediato." isDark={true} />
      </div>
      <div className="hero-cta-buttons" style={{marginTop: '24px'}}>
        <a href="https://wa.me/18329694319?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n%20sobre%20mi%20caso%20de%20inmigraci%C3%B3n." target="_blank" className="btn-wa-hero">
          <svg width="22" height="22" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
          Escríbenos por WhatsApp ahora
        </a>
        <a href="tel:2814298083" className="btn-call-hero">
          <svg width="18" height="18" fill="none" stroke="white" stroke-width="1.8" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.94-1.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Llamar: (281) 429-8083
        </a>
      </div>
      <p className="hero-cta-note">
        ¿Prefieres que te contactemos nosotros?
        <a href="#contacto">Deja tus datos aquí →</a>
      </p>
    </div>
  </div>

  <div className="hero-right-col" style={{position: 'relative', width: '100%', height: '100%', zIndex: 2, filter: 'drop-shadow(-20px 0 40px rgba(0,0,0,0.6))'}}>
    <div className="hero-image" style={{clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}>
      <img src="images/mariana-hero.png" alt="Abogada Mariana — SHEV Law Group" className="hero-img-desktop" style={{width: '100%', height: '80%', objectFit: 'contain', objectPosition: 'center bottom', position: 'absolute', bottom: '8%', right: 0}} />
    </div>
    <div className="hero-diagonal-border" style={{clipPath: 'polygon(15% 0, calc(15% + 4px) 0, calc(0% + 4px) 100%, 0% 100%)', background: 'linear-gradient(to bottom, var(--lavender), var(--purple))', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 3}}></div>
    
    <div className="hero-right-text">
      <h1 className="hero-headline-right" style={{fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '16px', textShadow: '0 6px 16px rgba(0,0,0,0.8)'}}>
        No estás<br />
        <em>solo</em>.<br />
        Tu situación<br />
        merece atención <em>seria</em>.
      </h1>
      <p className="hero-sub-right" style={{marginBottom: 0, fontSize: '16px', textShadow: '0 4px 10px rgba(0,0,0,0.8)', color: 'rgba(255,255,255,0.9)'}}>
        Habla con nuestra abogada hoy. Sin presión, sin promesas falsas. Solo claridad sobre tu caso.
      </p>
    </div>
  </div>
</section>

{/*  */}
<div className="trust-bar animate-on-scroll animate-fade-in">
  <div className="trust-item">
    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    Defensa ante deportación
  </div>
  <div className="trust-divider"></div>
  <div className="trust-item">
    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    Reunificación familiar
  </div>
  <div className="trust-divider"></div>
  <div className="trust-item">
    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    Asilo político
  </div>
  <div className="trust-divider"></div>
  <div className="trust-item">
    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
    Residencia &amp; Green Card
  </div>
  <div className="trust-divider"></div>
  <div className="trust-item">
    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/></svg>
    Ciudadanía
  </div>
</div>

{/*  */}
<section className="about">
  <div className="about-image-wrap animate-on-scroll animate-fade-up">
    <img src="images/mariana-about.png" alt="Abogada Mariana"  />
    <div className="shev-badge">
      <svg width="20" height="20" fill="none" stroke="#CA9FCE" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      <div className="shev-badge-text">
        <div className="shev-badge-label">Parte de</div>
        <div className="shev-badge-name">SHEV Law Group · Houston &amp; Dallas</div>
      </div>
    </div>
    <div className="about-quote">
      <p>"Muchos inmigrantes viven con miedo todos los días. Yo estoy aquí para cambiar eso."</p>
      <cite>— Mariana, Abogada de Inmigración</cite>
    </div>
  </div>

  <div className="about-text-block animate-on-scroll animate-fade-up delay-200">
    <div className="about-firm-tag">
      <svg width="14" height="14" fill="none" stroke="#3F2644" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      <span>Abogada en <a href="https://shevlawgroup.com" target="_blank">SHEV Law Group</a></span>
    </div>
    <p className="section-label">Quién soy</p>
    <h2 className="section-title">No eres un número<br />de caso. Eres <em>una persona</em>.</h2>
    <p className="section-body">
      Soy Mariana, abogada de inmigración en Houston, Texas. Trabajo con familias latinas que enfrentan situaciones difíciles: deportaciones, ICE, asilo, residencia y más.
    </p>
    <br />
    <p className="section-body">
      Entiendo el miedo. Entiendo la incertidumbre. Sé que muchas veces la información correcta llega demasiado tarde.
    </p>
    <br />
    <p className="section-body" style={{fontWeight: 600, color: "var(--plum)"}}>
      Mi misión es darte claridad, no promesas. Orientación real, no garantías falsas.
    </p>
    <br />
    <a href="https://shevlawgroup.com/team/" target="_blank" className="btn-about-link">
      Ver perfil completo en SHEV Law Group
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7,7 17,7 17,17"/></svg>
    </a>
  </div>
</section>

{/*  */}
<section className="services">
  <div className="services-header animate-on-scroll animate-fade-up">
    <p className="section-label">Áreas de práctica</p>
    <h2 className="section-title">Ayudamos con los casos<br />que más <em>importan</em></h2>
    <p className="section-body">Cada situación migratoria es diferente. Tu caso merece atención individualizada y seria.</p>
  </div>
  <div className="services-grid">
    <div className="service-card animate-on-scroll animate-fade-up delay-100">
      <div className="service-icon"><svg width="20" height="20" fill="none" stroke="#3F2644" stroke-width="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
      <h3>Defensa ante Deportación</h3>
      <p>Si tienes una orden de deportación o estás en proceso de remoción, actuar rápido puede marcar la diferencia en tu caso.</p>
    </div>
    <div className="service-card animate-on-scroll animate-fade-up delay-200">
      <div className="service-icon"><svg width="20" height="20" fill="none" stroke="#3F2644" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg></div>
      <h3>Asilo Político</h3>
      <p>Si huiste de violencia o persecución en tu país, puedes tener derecho a solicitar protección en los Estados Unidos.</p>
    </div>
    <div className="service-card animate-on-scroll animate-fade-up delay-300">
      <div className="service-icon"><svg width="20" height="20" fill="none" stroke="#3F2644" stroke-width="1.8" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
      <h3>Residencia y Green Card</h3>
      <p>Reunificación familiar, residencia permanente y ajuste de estatus. Te guiamos en cada etapa del proceso.</p>
    </div>
    <div className="service-card animate-on-scroll animate-fade-up delay-100">
      <div className="service-icon"><svg width="20" height="20" fill="none" stroke="#3F2644" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
      <h3>Visas de Trabajo y Familia</h3>
      <p>Evaluamos tus opciones y preparamos tu solicitud de visa para que puedas estar donde perteneces: con tu familia.</p>
    </div>
    <div className="service-card animate-on-scroll animate-fade-up delay-200">
      <div className="service-icon"><svg width="20" height="20" fill="none" stroke="#3F2644" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
      <h3>Situaciones con ICE</h3>
      <p>Detenciones, redadas o citaciones de ICE. Conoce tus derechos y actúa con información correcta a tu lado.</p>
    </div>
    <div className="service-card animate-on-scroll animate-fade-up delay-300">
      <div className="service-icon"><svg width="20" height="20" fill="none" stroke="#3F2644" stroke-width="1.8" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/></svg></div>
      <h3>Ciudadanía / Naturalización</h3>
      <p>Si ya tienes residencia permanente, es posible que califiques para convertirte en ciudadano americano.</p>
    </div>
  </div>
</section>

{/*  */}
<section className="emotional">
  <div className="animate-on-scroll animate-fade-up">
    <p className="section-label">Lo que escuchamos</p>
    <div className="emotional-title-wrap">
      <img src="images/tu-abogadalogo2.png" alt="Logo" className="emotional-title-logo"  />
      <h2 className="section-title">Sabemos lo que<br />estás <em>viviendo</em>.</h2>
    </div>
    <p className="section-body">Muchas personas llegan a nosotros agotadas, con miedo, sin saber qué hacer. Eso es normal. Entender tu situación es el primer paso.</p>
    <div className="fears-list">
      <div className="fear-item"><p>"No sé qué hacer. Tengo miedo de lo que puede pasar."</p></div>
      <div className="fear-item"><p>"No quiero que me deporten. Solo quiero estar con mi familia."</p></div>
      <div className="fear-item"><p>"Llevo años esperando. No entiendo qué está pasando con mi caso."</p></div>
      <div className="fear-item"><p>"¿Todavía tengo opciones? No quiero cometer un error."</p></div>
    </div>
    <a href="https://wa.me/18329694319?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n%20sobre%20mi%20caso%20de%20inmigraci%C3%B3n." target="_blank" className="btn-wa-emotional">
      <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
      Consulta Directa por WhatsApp
    </a>
  </div>
  <div className="emotional-image animate-on-scroll animate-fade-up delay-200">
    <div className="emotional-video-wrapper" style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <iframe 
        width="100%" 
        height="100%" 
        style={{aspectRatio: '16/9', borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} 
        src="https://www.youtube.com/embed/kdavSk91gBs?si=Hu4hlxaldPDluM2m&autoplay=1&mute=1" 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen>
      </iframe>
    </div>
  </div>
</section>

{/*  */}
<section className="process">
  <div className="process-container">
    <div className="animate-on-scroll animate-fade-up">
      <p className="section-label">Cómo trabajamos</p>
      <h2 className="section-title">Tu proceso con <em>nosotros</em></h2>
      <p className="section-body">Cuatro pasos simples para comenzar a tener claridad sobre tu situación migratoria.</p>
    </div>
    <div className="process-steps">
      <div className="process-step animate-on-scroll animate-fade-up delay-100">
        <div className="step-number">01</div>
        <div className="step-icon-wrap">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </div>
        <h3>Nos contactas</h3>
        <p>Llamas, escribes por WhatsApp o dejas tus datos. Sin juicio, solo escucha.</p>
      </div>
      <div className="process-step animate-on-scroll animate-fade-up delay-200">
        <div className="step-number">02</div>
        <div className="step-icon-wrap">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="3"/><line x1="14.2" y1="15.2" x2="17" y2="18"/></svg>
        </div>
        <h3>Revisamos tu caso</h3>
        <p>Evaluamos tu situación en detalle para entender tus opciones reales.</p>
      </div>
      <div className="process-step animate-on-scroll animate-fade-up delay-300">
        <div className="step-number">03</div>
        <div className="step-icon-wrap">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5m1 2h4m-3 3h2"/></svg>
        </div>
        <h3>Te explicamos todo</h3>
        <p>Sin jerga legal. Sin promesas falsas. Solo información clara y honesta.</p>
      </div>
      <div className="process-step animate-on-scroll animate-fade-up delay-400">
        <div className="step-number">04</div>
        <div className="step-icon-wrap">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v20M12 5l6 2M12 5L6 7m0 0l2 6H4zM18 7l2 6h-4z"/></svg>
        </div>
        <h3>Actuamos juntos</h3>
        <p>Si decides avanzar, te acompañamos en cada etapa del proceso.</p>
      </div>
    </div>
  </div>
</section>

{/*  */}
<section className="testimonials">
  <div className="testimonials-header animate-on-scroll animate-fade-up">
    <p className="section-label">Testimonios</p>
    <h2 className="section-title">Lo que dicen quienes<br /><em>confiaron</em> en nosotros</h2>
  </div>
  <div className="testimonials-grid">
    <div className="testimonial-card animate-on-scroll animate-fade-up delay-100">
      <div className="stars">★★★★★</div>
      <blockquote>"Llegué con una orden de deportación y sin esperanza. Mariana me explicó mis opciones con calma. Hoy sigo con mi familia gracias a su ayuda."</blockquote>
      <div className="testimonial-author">Carlos M.</div>
      <div className="testimonial-origin">Honduras · Caso de deportación</div>
    </div>
    <div className="testimonial-card animate-on-scroll animate-fade-up delay-200">
      <div className="stars">★★★★★</div>
      <blockquote>"Por fin alguien que me explicó todo en español, sin hacerme sentir que no entiendo. Salí de la consulta sin miedo por primera vez."</blockquote>
      <div className="testimonial-author">Rosa L.</div>
      <div className="testimonial-origin">México · Residencia permanente</div>
    </div>
    <div className="testimonial-card animate-on-scroll animate-fade-up delay-300">
      <div className="stars">★★★★★</div>
      <blockquote>"Pensé que ya no había opciones para mí. Mariana encontró una vía que yo no conocía. Siempre fue honesta y nunca me prometió lo que no podía cumplir."</blockquote>
      <div className="testimonial-author">Javier R.</div>
      <div className="testimonial-origin">El Salvador · Asilo político</div>
    </div>
  </div>
</section>

{/*  */}
<section className="tiktok-section animate-on-scroll animate-fade-up">
  <div className="tiktok-header">
    <p className="section-label">Redes Sociales</p>
    <h2 className="section-title">Consejos de Inmigración en <em>TikTok</em></h2>
    <p className="section-body">Mantente informado con nuestros videos cortos sobre derechos, trámites y noticias reales de inmigración directamente desde la cuenta oficial de Mariana.</p>
  </div>
  <div className="tiktok-grid">
    {loadingVideos ? (
      <p style={{color: 'rgba(255,255,255,0.7)', textAlign: 'center', gridColumn: '1 / -1'}}>Cargando videos recientes de @tuabogadamariana...</p>
    ) : (
      tiktokVideos.map((video) => (
        <div key={video.id} className="tiktok-card" role="button" tabIndex="0" aria-label={`Reproducir video: ${video.desc}`} onClick={(e) => playTikTokVideo(e, video.id)}>
          <div className="tiktok-thumbnail">
            <img src={video.cover || "images/mariana-about.png"} alt="Miniatura de TikTok" />
            <div className="tiktok-overlay">
              <div className="tiktok-play-btn">
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
            <div className="tiktok-badge">
              <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.09-2.9-.59-4.06-1.51-.86-.67-1.52-1.62-1.92-2.67v8.91c.08 2.82-1.7 5.62-4.48 6.53-2.78.96-6.07.13-7.98-2.03C2.074 17.07.894 13.62 2.014 10.6c1.07-2.98 4.2-5.11 7.4-4.83.15 1.49.62 2.96 1.43 4.24-1.92.24-3.71 1.71-4.04 3.63-.44 2.44 1.25 4.9 3.69 5.34 2.44.47 5.03-1.22 5.48-3.66.1-1.08.06-8.91.06-15.3-.01 0 .01 0 0 0z"/></svg>
              <span>TikTok</span>
            </div>
          </div>
          <div className="tiktok-info">
            <h3 style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{video.desc || "Consejo de Inmigración"}</h3>
            <p style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{video.desc || "Información importante sobre tu proceso."}</p>
            <span className="tiktok-link">Ver en TikTok →</span>
          </div>
        </div>
      ))
    )}
  </div>
  
  <div className="tiktok-footer">
    <a href="https://www.tiktok.com/@tuabogadamariana" target="_blank" className="btn-tiktok-follow">
      <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.09-2.9-.59-4.06-1.51-.86-.67-1.52-1.62-1.92-2.67v8.91c.08 2.82-1.7 5.62-4.48 6.53-2.78.96-6.07.13-7.98-2.03C2.074 17.07.894 13.62 2.014 10.6c1.07-2.98 4.2-5.11 7.4-4.83.15 1.49.62 2.96 1.43 4.24-1.92.24-3.71 1.71-4.04 3.63-.44 2.44 1.25 4.9 3.69 5.34 2.44.47 5.03-1.22 5.48-3.66.1-1.08.06-8.91.06-15.3-.01 0 .01 0 0 0z"/></svg>
      Sigue a @tuabogadamariana en TikTok
    </a>
  </div>
</section>

{/*  */}
<section className="contact-section" id="contacto">
  <div className="animate-on-scroll animate-fade-up">
    <p className="section-label">Contáctanos hoy</p>
    <h2 className="section-title">El primer paso<br />es <em>hablar</em>.</h2>
    <p className="section-body">No ignores las cartas de inmigración. No esperes a que la situación se complique. La información correcta puede cambiarlo todo.</p>

    <div className="contact-primary">
      <a href="https://wa.me/18329694319?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n%20sobre%20mi%20caso%20de%20inmigraci%C3%B3n." target="_blank" className="btn-wa-lg">
        <div className="btn-icon">
          <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
        </div>
        <div className="btn-text-block">
          <div className="btn-label">WhatsApp — respuesta rápida</div>
          <div className="btn-value">+1 (832) 969-4319</div>
        </div>
      </a>
      <a href="tel:2814298083" className="btn-call-lg">
        <div className="btn-icon">
          <svg width="18" height="18" fill="none" stroke="white" stroke-width="1.8" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.94-1.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        <div className="btn-text-block">
          <div className="btn-label">Teléfono</div>
          <div className="btn-value">(281) 429-8083</div>
        </div>
      </a>
    </div>

    <div className="contact-divider">
      <div className="contact-divider-line"></div>
      <span>o déjanos tus datos</span>
      <div className="contact-divider-line"></div>
    </div>

    <a href="mailto:marianatuabogada@gmail.com" className="email-contact">
      <div className="email-contact-icon">
        <svg width="15" height="15" fill="none" stroke="white" stroke-width="1.8" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      </div>
      <div className="email-contact-text">
        <div className="email-label">Email</div>
        <div className="email-value">marianatuabogada@gmail.com</div>
      </div>
    </a>
  </div>

  <div className="animate-on-scroll animate-fade-up delay-200">
    <ContactForm title="¿Prefieres que te llamemos?" subtitle="Deja tus datos y nos comunicamos contigo pronto." isDark={false} />
  </div>
</section>

{/*  */}
<div className="address-bar">
  <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  7324 Southwest Fwy, Suite 1170, Houston, TX 77074 &nbsp;·&nbsp; SHEV Law Group
</div>

{/*  */}
<footer>
  <div className="footer-logo">
    <img src="images/tu-abogadalogo2.png" alt="Tu Abogada Mariana"  />
    <span style={{display: "none"}}>Tu Abogada Mariana</span>
  </div>
  <div className="footer-legal">
    Esta página es solo para fines informativos y no constituye asesoramiento legal.<br />
    Cada caso requiere una evaluación profesional individual. © 2025 SHEV Law Group.
  </div>
  <div className="footer-shev">
    Una marca de <a href="https://shevlawgroup.com" target="_blank">SHEV Law Group</a><br />
    <span style={{color: "rgba(255,255,255,0.2)"}}>Houston · Dallas · Texas</span>
  </div>
</footer>


    </>
  );
}