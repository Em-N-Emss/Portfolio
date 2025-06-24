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

        // const needsPortfolioPrefix = typeof window !== "undefined" && window.location.pathname.startsWith("/Portfolio/")
        // const basePath = needsPortfolioPrefix ? "/Portfolio" : ""
        // const fullUrl = `${basePath}/${String(otherPath)}`

        // Détecter l'environnement en regardant l'URL actuelle
        let fullUrl

        if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname
            if (currentPath.includes('/Portfolio/')) {
                // GitHub
                fullUrl = '/Portfolio/' + String(otherPath)
            } else {
                // local
                fullUrl = '/' + String(otherPath)
            }
        } else {
            // Fallback si window n'est pas disponible
            fullUrl = '/' + String(otherPath)
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
