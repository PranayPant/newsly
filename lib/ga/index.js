export function trackPageView(url) {
    window.gtag('config', process.env.NEXT_PUBLIC_MEASUREMENT_ID, {
        path_url: url,
    })
}

export function trackClickEvent({ action, params }) {
    window.gtag('event', action, params)
}
