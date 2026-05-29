const fs = require('fs');
const path = require('path');

const htmlContent = fs.readFileSync(path.join(__dirname, 'landigpage-tuabogadamarian.html'), 'utf-8');

// Extract CSS
const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
  let css = styleMatch[1];
  fs.writeFileSync(path.join(__dirname, 'src', 'index.css'), css.trim());
  console.log('Extracted index.css');
}

// Extract Body HTML
const bodyMatch = htmlContent.match(/<body>([\s\S]*?)<script>/);
if (bodyMatch) {
  let bodyHtml = bodyMatch[1];
  
  // Reactify HTML
  bodyHtml = bodyHtml.replace(/class=/g, 'className=');
  bodyHtml = bodyHtml.replace(/for=/g, 'htmlFor=');
  bodyHtml = bodyHtml.replace(/style="([^"]*)"/g, (match, p1) => {
    // Basic inline style to object converter for known instances (display:none)
    if (p1.includes('display:none')) return 'style={{display: "none"}}';
    if (p1.includes('font-weight:600; color: var(--plum);')) return 'style={{fontWeight: 600, color: "var(--plum)"}}';
    if (p1.includes('display:inline-flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:var(--purple); text-decoration:none; letter-spacing:0.05em; text-transform:uppercase; border-bottom: 2px solid var(--light-lavender); padding-bottom:2px;')) {
      return 'style={{display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, color: "var(--purple)", textDecoration: "none", letterSpacing: "0.05em", textTransform: "uppercase", borderBottom: "2px solid var(--light-lavender)", paddingBottom: "2px"}}';
    }
    if (p1.includes('margin:0 auto 16px; display:block')) return 'style={{margin: "0 auto 16px", display: "block"}}';
    if (p1.includes('color:rgba(255,255,255,0.2)')) return 'style={{color: "rgba(255,255,255,0.2)"}}';
    return match; // fallback
  });
  
  // Fix onerror attributes by removing them temporarily or Reactifying
  bodyHtml = bodyHtml.replace(/onerror="[^"]*"/g, '');
  bodyHtml = bodyHtml.replace(/onclick="[^"]*"/g, '');
  bodyHtml = bodyHtml.replace(/onkeydown="[^"]*"/g, '');
  
  // Self closing tags
  bodyHtml = bodyHtml.replace(/<img(.*?)>/g, (match) => match.endsWith('/>') ? match : match.replace('>', ' />'));
  bodyHtml = bodyHtml.replace(/<input(.*?)>/g, (match) => match.endsWith('/>') ? match : match.replace('>', ' />'));
  bodyHtml = bodyHtml.replace(/<br>/g, '<br />');

  const appJsx = `
import React, { useEffect } from 'react';
import './index.css';

export default function App() {
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

  return (
    <>
      ${bodyHtml}
    </>
  );
}
  `;

  fs.writeFileSync(path.join(__dirname, 'src', 'App.jsx'), appJsx.trim());
  console.log('Generated App.jsx');
}
