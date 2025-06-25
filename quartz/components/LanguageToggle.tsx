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
