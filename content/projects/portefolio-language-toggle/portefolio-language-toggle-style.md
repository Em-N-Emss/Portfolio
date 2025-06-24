---
title: "Language Toggle Style"
draft: false
lang: fr
translations:
    en: notelocation.en
tags:
    - code
    - project
    - css
---
# Style du language toggle

## Localisation

Dans `./quartz/styles/custom.scss`

## Code

```scss
@use "./base.scss";

// Language Toggle Styles - Auto-injection compatible
.language-toggle {
  position: fixed;

  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;

  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 0.5rem 0.8rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  // Animation d'apparition
  animation: slideInFromTop 0.5s ease-out;

  &:hover {

    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    top: 0.5rem;

    right: 0.5rem;

    padding: 0.4rem 0.6rem;
  }

  @media (max-width: 480px) {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}

.current-lang-indicator {

  font-size: 1.1em;
  opacity: 0.8;
  margin-right: 0.2rem;
}

.lang-switch-btn {
  background: linear-gradient(135deg, var(--primary, #2563eb), var(--secondary, #1e40af));
  color: white !important;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;

  font-size: 0.85rem;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    background: linear-gradient(135deg, var(--primary-dark, #1d4ed8), var(--secondary-dark, #1e3a8a));
    transform: translateY(-1px) scale(1.05);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }


  &:active {
    transform: translateY(0) scale(1.02);
  }

  @media (max-width: 768px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
}

// Dark mode support
.darkmode {

  .language-toggle {
    background: rgba(31, 41, 55, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  }

  .current-lang-indicator {
    opacity: 0.9;

  }
}

// Animation keyframes
@keyframes slideInFromTop {

  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Assurer que le toggle ne chevauche pas avec d'autres éléments

body {
  padding-right: 0 !important; // Éviter les conflits avec des paddings existants
}

// Styles pour différents thèmes Quartz
.page-header, header, nav {
  position: relative; // S'assurer que le positionnement fonctionne
}
```

---

## Links

202506180115

[[code]]

[[project]]

[[css]]
