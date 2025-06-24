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

        // const needsPortfolioPrefix = typeof window !== "undefined" && window.location.pathname.startsWith("/Portfolio/")
        // const basePath = needsPortfolioPrefix ? "/Portfolio" : ""
        // const fullUrl = `${basePath}/${String(otherPath)}`

  // Détecter l'environnement en vérifiant si on est côté client et l'hostname
        let fullUrl
        if (typeof window !== "undefined") {
            // Côté client - vérifier l'hostname pour déterminer l'environnement
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

            if (isLocal) {
                // Environnement local - pas de préfixe Portfolio
                fullUrl = '/' + String(otherPath)
                console.log('Local environment - Final URL:', fullUrl)
            } else {
                // GitHub Pages ou production
                fullUrl = '/Portfolio/' + String(otherPath)
                console.log('Production environment - Final URL:', fullUrl)
            }
        } else {
            // Côté serveur - détecter l'environnement différemment
            const baseUrl = cfg?.baseUrl || ''
            console.log('Base URL from config:', baseUrl)
            console.log('Other path:', otherPath)

            // En développement local, même si baseUrl contient github.io,
            // on sert le site sans le préfixe /Portfolio/
            // Détecter si on est en mode dev via NODE_ENV ou d'autres indicateurs
            const isDevelopment = process.env.NODE_ENV === 'development' ||
                                 process.env.NODE_ENV !== 'production' ||
                                 !process.env.NODE_ENV


            if (isDevelopment) {
                // Environnement de développement local
                fullUrl = '/' + String(otherPath)
                console.log('Server-side DEVELOPMENT - Final URL:', fullUrl)
            } else {
                // Production (GitHub Pages)
                fullUrl = '/Portfolio/' + String(otherPath)
                console.log('Server-side PRODUCTION - Final URL:', fullUrl)
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
