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

        const currentSlug = fileData.slug || ''
        console.log('Current slug:', currentSlug)

        console.log('Other path:', otherPath)

        // Vérifier si on a une config de base URL dans fileData

        const hasPortfolioBase = window?.location?.href?.includes('github.io/Portfolio') || false
        console.log('Has Portfolio base:', hasPortfolioBase)


        let fullUrl
        if (hasPortfolioBase) {
            fullUrl = '/Portfolio/' + String(otherPath)
        } else {
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
