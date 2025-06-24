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


            // Vérifier si on est en mode développement local
            // En local, process.env.NODE_ENV n'est pas 'production' ou baseUrl est vide/localhost
            const isLocalDev = !baseUrl ||
                              baseUrl.includes('localhost') ||
                              baseUrl.includes('127.0.0.1') ||
                              process.env.NODE_ENV !== 'production'

            if (isLocalDev) {
                // Environnement local
                fullUrl = '/' + String(otherPath)
                console.log('Server-side LOCAL - Final URL:', fullUrl)

            } else {
                // GitHub Pages ou production
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
