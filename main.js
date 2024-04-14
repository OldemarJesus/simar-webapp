async function main() {
    const mainContent = document.querySelector("#main-content")
    const alertTemplate = document.querySelector("#main-content .alert").cloneNode(true)
    document.querySelector("#main-content .alert").remove()

    const res = await fetch("https://simar-alert-api.vercel.app/alerts")
    const alerts = await res.json()

    alerts.forEach(alertData => {
        alertTemplate.textContent = null
        alertTemplate.textContent = alertData
        mainContent.appendChild(alertTemplate)
    });

    // checkPermission()
    // const reg = await registerSw()
    // reg.showNotification("Hello 2", {})

}

const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("No support for service worker!")
    }

    if (!('Notification' in window)) {
        throw new Error("No support for notification API!")
    }
}

const registerSw = async () => {
    const registration = await navigator.serviceWorker.register('sw.js')
    return registration
}

const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
        throw new Error("Notification permission not granted")
    }
}

document.addEventListener("DOMContentLoaded", main);