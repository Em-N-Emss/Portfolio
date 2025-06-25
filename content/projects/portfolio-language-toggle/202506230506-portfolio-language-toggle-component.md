---
title: "Language Toggle Component Amelioration 202506230506"
draft: false
lang: fr
translations:
    en: notelocation.en
tags:
    - code
    - project
    - typescript
    - improvement
---
# Amélioration(s) de language toggle component

La note aux améliorations : [[portefolio-language-toggle-component]]

## Idée(s)

> [!NOTE]
> [[202506230506-portefolio-language-toggle-component|202506230506]] : Changement de langue possible dans la version online du portefolio

### Sections

- [[#Amélioration|Amélioration]]

- [[#Explication|Explication]]

- [[#Code avant|Code avant]]

- [[#Code Après|Code Après]]

## Amélioration

```tsx
        let fullUrl: string

        // Vérifier si on est côté client (navigateur)
        if (typeof window !== "undefined") {
            // Côté client - utiliser l"URL actuelle
            const isGitHubPages = window.location.hostname.includes("github.io")
            const isPortfolioPath = window.location.pathname.startsWith("/Portfolio/")

            if (isGitHubPages || isPortfolioPath) {
                fullUrl = "/Portfolio/" + String(otherPath)
                console.log("CLIENT: GitHub Pages détecté - Final URL:", fullUrl)
            } else {
                fullUrl = "/" + String(otherPath)
                console.log("CLIENT: Local détecté - Final URL:", fullUrl)
            }
        } else {
            // Côté serveur - utiliser plusieurs méthodes de détection
            const baseUrl = cfg?.baseUrl || ""
            // Vérifier les variables d"environnement
            const isProduction = process.env.NODE_ENV === "production"
            const isGitHubActions = process.env.GITHUB_ACTIONS === "true"
            const isCI = process.env.CI === "true"

            // Vérifier les arguments de la ligne de commande
            const hasServeFlag = process.argv.includes("--serve") || process.argv.includes("serve")

            // Vérifier le port (Quartz dev utilise généralement 8080)
            const hasDevPort = process.argv.some(arg => arg.includes("8080"))

            // Détecter l"environnement
            if (isGitHubActions || isCI || (isProduction && !hasServeFlag)) {
                // Production/CI - utiliser le préfixe Portfolio
                fullUrl = "/Portfolio/" + String(otherPath)
                console.log("SERVER: Production/CI détecté - Final URL:", fullUrl)
                console.log("  - NODE_ENV:", process.env.NODE_ENV)
                console.log("  - GITHUB_ACTIONS:", process.env.GITHUB_ACTIONS)
                console.log("  - CI:", process.env.CI)
            } else if (hasServeFlag || hasDevPort || !isProduction) {

                // Développement local - pas de préfixe
                fullUrl = "/" + String(otherPath)
                console.log("SERVER: Développement local détecté - Final URL:", fullUrl)
                console.log("  - hasServeFlag:", hasServeFlag)
                console.log("  - hasDevPort:", hasDevPort)
                console.log("  - NODE_ENV:", process.env.NODE_ENV)
            } else {
                // Fallback - utiliser baseUrl
                if (baseUrl.includes("github.io")) {
                    fullUrl = "/Portfolio/" + String(otherPath)
                    console.log("SERVER: Fallback GitHub Pages - Final URL:", fullUrl)
                } else {
                    fullUrl = "/" + String(otherPath)
                    console.log("SERVER: Fallback local - Final URL:", fullUrl)
                }
            }
        }
```

## Explication

### Le problème initial

Quand je développe en local avec `quartz build --serve`, mon site tourne sur `http://localhost:8080/`. Mais quand c'est déployé sur GitHub Pages, c'est sur `https://em-n-emss.github.io/Portfolio/`.

Donc mes liens de traduction devaient être :
- **Local** : `/resources/ma-page.en`
- **Production** : `/Portfolio/resources/ma-page.en`

### Structure de base du composant

Le composant récupère les métadonnées de la page markdown :

```tsx
const translations = fileData.frontmatter?.translations
const currentLang = fileData.frontmatter?.lang || "fr"
const otherLang = currentLang === "en" ? "fr" : "en"
const otherPath = translations[otherLang]
```

Dans mes fichiers markdown, j'ai cette structure :

**Version française (`ma-page.md`) :**
```md
---
title: "Ma Page"
lang: fr
translations:
  en: ma-page.en
---
```

**Version anglaise (`ma-page.en.md`) :**
```md
---
title: "My Page"
lang: en
translations:
  fr: ma-page
---
```

### Détection côté client (navigateur)

```tsx
if (typeof window !== "undefined") {
    const isGitHubPages = window.location.hostname.includes("github.io")
    const isPortfolioPath = window.location.pathname.startsWith("/Portfolio/")

    if (isGitHubPages || isPortfolioPath) {
        fullUrl = "/Portfolio/" + String(otherPath)
    } else {
        fullUrl = "/" + String(otherPath)
    }
}
```

**Pourquoi cette partie ?**

Quand le code s'exécute dans le navigateur, je peux regarder l'URL actuelle :
- Si je suis sur `*.github.io` → c'est GitHub Pages → j'ajoute `/Portfolio/`
- Si l'URL commence déjà par `/Portfolio/` → pareil
- Sinon → c'est du local → pas de préfixe

### Détection côté serveur (pendant le build)

C'est la partie la plus importante, parce que les liens sont générés pendant le build, pas dans le navigateur.

```tsx
const isProduction = process.env.NODE_ENV === "production"
const isGitHubActions = process.env.GITHUB_ACTIONS === "true"
const isCI = process.env.CI === "true"
```

**Variables d'environnement :**
- `NODE_ENV=production` : Souvent défini en production
- `GITHUB_ACTIONS=true` : GitHub Actions définit ça automatiquement
- `CI=true` : La plupart des systèmes CI définissent ça

```tsx
const hasServeFlag = process.argv.includes("--serve") || process.argv.includes("serve")
const hasDevPort = process.argv.some(arg => arg.includes("8080"))
```

**Arguments de la ligne de commande :**
- Si je lance `quartz build --serve` → `hasServeFlag = true`
- Si "8080" apparaît quelque part → probablement du développement

### Logique de décision

```typescript
if (isGitHubActions || isCI || (isProduction && !hasServeFlag)) {
    // Production/CI - utiliser le préfixe Portfolio
    fullUrl = "/Portfolio/" + String(otherPath)
} else if (hasServeFlag || hasDevPort || !isProduction) {
    // Développement local - pas de préfixe
    fullUrl = "/" + String(otherPath)
} else {
    // Fallback - utiliser baseUrl
    if (baseUrl.includes("github.io")) {
        fullUrl = "/Portfolio/" + String(otherPath)
    } else {
        fullUrl = "/" + String(otherPath)
    }
}
```

**Ma logique :**

1. **Si on est en CI/production ET pas en mode serve** → GitHub Pages → préfixe `/Portfolio/`
2. **Si on a le flag --serve OU port 8080 OU pas en production** → Local → pas de préfixe
3. **Sinon** → Je regarde la config comme fallback

### Pourquoi ça marche

**En développement local :**
```bash
quartz build --serve
```
→ `hasServeFlag = true` → pas de préfixe → URLs comme `/ma-page.en`

**En production (GitHub Actions) :**
```bash
quartz build  # (sans --serve)
```
→ `GITHUB_ACTIONS = true` → préfixe `/Portfolio/` → URLs comme `/Portfolio/ma-page.en`

### Les logs pour débugger

J'ai ajouté des `console.log()` pour voir ce qui se passe :

```tsx
console.log("SERVER: Production/CI détecté - Final URL:", fullUrl)
console.log("  - NODE_ENV:", process.env.NODE_ENV)
console.log("  - GITHUB_ACTIONS:", process.env.GITHUB_ACTIONS)
console.log("  - CI:", process.env.CI)
```

Comme ça, je peux voir exactement quelle condition est déclenchée.

## Code avant

```tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
    const LanguageToggle: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
        const translations = fileData.frontmatter?.translations
        const currentLang = fileData.frontmatter?.lang || 'fr'

        if (!translations) {
            return null
        }

        const translationEntries = Object.entries(translations)

        return (
            <div className="language-toggle">
                <span className="current-lang-indicator">
                    {currentLang === 'fr' ? '🇫🇷' : '🇺🇸'}
                </span>
                {translationEntries.map(([lang, path]) => {
                    if (lang === currentLang) return null

                    const displayText = lang === 'en' ? '🇺🇸 EN' : '🇫🇷 FR'
                    const title = `Switch to ${lang === 'en' ? 'English' : 'Français'}`

                    return (
                        <a
                            key={lang}
                            href={`/${String(path)}`}
                            className="lang-switch-btn"
                            title={title}
                        >
                            {displayText}
                        </a>
                    )
                })}
            </div>
        )
    }

    LanguageToggle.displayName = "LanguageToggle"
    return LanguageToggle
}) satisfies QuartzComponentConstructor
```

## Code Après

```tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
    const LanguageToggle: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
        const translations = fileData.frontmatter?.translations
        const currentLang = fileData.frontmatter?.lang || 'fr'

        if (!translations) {
            return null
        }

        const otherLang = currentLang === "en" ? "fr" : "en"
        const otherPath = translations[otherLang]

        let fullUrl: string

        // Vérifier si on est côté client (navigateur)
        if (typeof window !== "undefined") {
            // Côté client - utiliser l"URL actuelle
            const isGitHubPages = window.location.hostname.includes("github.io")
            const isPortfolioPath = window.location.pathname.startsWith("/Portfolio/")

            if (isGitHubPages || isPortfolioPath) {
                fullUrl = "/Portfolio/" + String(otherPath)
                console.log("CLIENT: GitHub Pages détecté - Final URL:", fullUrl)
            } else {
                fullUrl = "/" + String(otherPath)
                console.log("CLIENT: Local détecté - Final URL:", fullUrl)
            }
        } else {
            // Côté serveur - utiliser plusieurs méthodes de détection
            const baseUrl = cfg?.baseUrl || ""
            // Vérifier les variables d"environnement
            const isProduction = process.env.NODE_ENV === "production"
            const isGitHubActions = process.env.GITHUB_ACTIONS === "true"
            const isCI = process.env.CI === "true"

            // Vérifier les arguments de la ligne de commande
            const hasServeFlag = process.argv.includes("--serve") || process.argv.includes("serve")

            // Vérifier le port (Quartz dev utilise généralement 8080)
            const hasDevPort = process.argv.some(arg => arg.includes("8080"))

            // Détecter l"environnement
            if (isGitHubActions || isCI || (isProduction && !hasServeFlag)) {
                // Production/CI - utiliser le préfixe Portfolio
                fullUrl = "/Portfolio/" + String(otherPath)
                console.log("SERVER: Production/CI détecté - Final URL:", fullUrl)
                console.log("  - NODE_ENV:", process.env.NODE_ENV)
                console.log("  - GITHUB_ACTIONS:", process.env.GITHUB_ACTIONS)
                console.log("  - CI:", process.env.CI)
            } else if (hasServeFlag || hasDevPort || !isProduction) {

                // Développement local - pas de préfixe
                fullUrl = "/" + String(otherPath)
                console.log("SERVER: Développement local détecté - Final URL:", fullUrl)
                console.log("  - hasServeFlag:", hasServeFlag)
                console.log("  - hasDevPort:", hasDevPort)
                console.log("  - NODE_ENV:", process.env.NODE_ENV)
            } else {
                // Fallback - utiliser baseUrl
                if (baseUrl.includes("github.io")) {
                    fullUrl = "/Portfolio/" + String(otherPath)
                    console.log("SERVER: Fallback GitHub Pages - Final URL:", fullUrl)
                } else {
                    fullUrl = "/" + String(otherPath)
                    console.log("SERVER: Fallback local - Final URL:", fullUrl)
                }
            }
        }

        return (
            <div className="language-toggle">
                <a
                    href={fullUrl}
                    className="switch"
                    aria-label={`Switch to ${otherLang === "en" ? "English" : "Français"}`}
                >
                    <input
                        type="checkbox"
                        readOnly
                        checked={currentLang === "en"}
                    />
                    <span className="slider"></span>
                    <span className="label-fr">FR</span>
                    <span className="label-en">EN</span>
                </a>
            </div>
        )
    }

    LanguageToggle.displayName = "LanguageToggle"
    return LanguageToggle
}) satisfies QuartzComponentConstructor
```


---

## Links :

202506230522

[[code]]

[[improvement]]

[[project]]
