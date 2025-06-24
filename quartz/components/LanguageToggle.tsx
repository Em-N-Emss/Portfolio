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

        // Utiliser la configuration de Quartz pour détecter l'environnement
        const baseUrl = cfg?.baseUrl || ''
        console.log('Base URL from config:', baseUrl)
        console.log('Other path:', otherPath)


        let fullUrl
        if (baseUrl.includes('github.io/Portfolio')) {
            // On est sur GitHub Pages
            fullUrl = '/Portfolio/' + String(otherPath)
        } else {
            // On est en local ou autre
            fullUrl = '/' + String(otherPath)
        }
        console.log('Final URL:', fullUrl)

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
