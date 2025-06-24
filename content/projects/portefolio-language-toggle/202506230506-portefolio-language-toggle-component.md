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
        const needsPortfolioPrefix = typeof window !== 'undefined' && window.location.pathname.startsWith('/Portfolio/')
        const basePath = needsPortfolioPrefix ? '/Portfolio' : ''
        const fullUrl = `${basePath}/${String(otherPath)}`
```

## Explication

### Ligne 1 : La détection

```typescript
const needsPortfolioPrefix = typeof window !== 'undefined' && window.location.pathname.startsWith('/Portfolio/')
```

**Ça se lit comme ça :** "Est-ce que j'ai besoin du préfixe Portfolio dans l'URL ?"

**Oui** = Nous sommes dans la version en ligne du portefolio (celui sur lequel vous êtes)

**Non** = Nous sommes sur le serveur, en local


**Décortiquons :**

1. **`typeof window !== 'undefined'`**
   - Vérifie si `window` existe (on est dans un navigateur, pas sur le serveur)
   - Évite les erreurs si le code s'exécute côté serveur

2. **`&&` (ET logique)**
   - Si la première condition est fausse, `needsPortfolioPrefix` devient `false`

3. **`window.location.pathname.startsWith('/Portfolio/')`**
   - `window.location.pathname` = le chemin de l'URL actuelle

   - `.startsWith('/Portfolio/')` = est-ce que ça commence par "/Portfolio/" ?

**Exemples concrets :**
- **Local :** `pathname = "/resources/test"` → commence par "/Portfolio/" ? **NON** → `needsPortfolioPrefix = false`
- **GitHub :** `pathname = "/Portfolio/resources/test"` → commence par "/Portfolio/" ? **OUI** → `needsPortfolioPrefix = true`

### Ligne 2 : Le choix du chemin de base

```typescript
const basePath = needsPortfolioPrefix ? '/Portfolio' : ''
```

**C'est un opérateur ternaire :** `condition ? siVrai : siFaux`

- Si `needsPortfolioPrefix` est `true` → `basePath = '/Portfolio'`
- Si `needsPortfolioPrefix` est `false` → `basePath = ''` (chaîne vide)

### Ligne 3 : Construction du lien final

```typescript
const fullUrl = `${basePath}/${String(otherPath)}`
```

**Template literal :** on combine `basePath` + "/" + `otherPath`

**Exemples :**

- **Local :** `basePath = ''` → `fullUrl = '' + '/' + 'resources/test.en'` = `'/resources/test.en'`
- **GitHub :** `basePath = '/Portfolio'` → `fullUrl = '/Portfolio' + '/' + 'resources/test.en'` = `'/Portfolio/resources/test.en'`

### En résumé

1. Où suis-je actuellement ?
    - a. "Si je suis dans /Portfolio/, alors mes liens doivent aussi pointer vers /Portfolio/"
    - b. "Sinon, pas besoin de préfixe"
2. Le lien est construit avec ou sans préfixe selon le cas


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
    const LanguageToggle: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
        const translations = fileData.frontmatter?.translations
        const currentLang = fileData.frontmatter?.lang || 'fr'

        if (!translations) {
            return null
        }

        const otherLang = currentLang === "en" ? "fr" : "en"
        const otherPath = translations[otherLang]

        const needsPortfolioPrefix = typeof window !== 'undefined' && window.location.pathname.startsWith('/Portfolio/')
        const basePath = needsPortfolioPrefix ? '/Portfolio' : ''
        const fullUrl = `${basePath}/${String(otherPath)}`

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
