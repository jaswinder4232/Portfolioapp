export const GA_TRACKING_ID = "G-R7RDP2W2QZ";

export const pageview = (url) => {
    if (!window.gtag) return;

    window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
    });
};

export const event = ({ action, category, label, value }) => {
    if (!window.gtag) return;

    window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value,
    });
    console.log("GA Event:", { action, category, label, value });
};
