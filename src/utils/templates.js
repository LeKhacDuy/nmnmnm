// Helper to encode URI components safely
const enc = (str) => encodeURIComponent(str || '');

export const TEMPLATES = {
    // I. GOOGLE
    google_search: (q) => `https://www.google.com/search?q=${enc(q)}`,
    google_maps: (q, lat, lng, address) => {
        if (lat && lng) return `https://www.google.com/maps/search/${enc(q)}/@${lat},${lng},16z`;
        return `https://www.google.com/maps/search/${enc(q + ' ' + address)}`;
    },
    google_images: (q, district) => `https://www.google.com/search?tbm=isch&q=${enc(q + ' ' + district)}`,
    google_videos: (q, district) => `https://www.google.com/search?tbm=vid&q=${enc(q + ' ' + district)}`,
    google_news: (q, city) => `https://www.google.com/search?tbm=nws&q=${enc(q + ' ' + city)}`,
    google_shopping: (q, district) => `https://www.google.com/search?tbm=shop&q=${enc(q + ' ' + district)}`,

    // II. FACEBOOK
    facebook_search: (q, district) => `https://www.facebook.com/search_results/?q=${enc(q + ' ' + district)}`,
    facebook_pages: (q, district) => `https://www.facebook.com/search/pages/?q=${enc(q + ' ' + district)}`,
    facebook_groups: (q, city) => `https://www.facebook.com/search/groups/?q=${enc(q + ' ' + city)}`,
    facebook_events: (q, district) => `https://www.facebook.com/search/events/?q=${enc(q + ' ' + district)}`,
    facebook_reels: (q, district) => `https://www.facebook.com/search/reels/?q=${enc(q + ' ' + district)}`,

    // III. INSTAGRAM
    instagram_tag_web: (tag) => `https://www.instagram.com/explore/tags/${enc(tag)}/`,
    instagram_search: (q, district) => `https://www.instagram.com/explore/search/keyword/?q=${enc(q + ' ' + district)}`,

    // IV. YOUTUBE
    youtube_search: (q, district, ward) => `https://www.youtube.com/results?search_query=${enc(q + ' ' + district + ' ' + ward)}`,
    youtube_shorts: (q, district) => `https://www.youtube.com/results?search_query=${enc(q + ' shorts ' + district)}`,

    // V. TIKTOK
    tiktok_search: (q, district) => `https://www.tiktok.com/search?q=${enc(q + ' ' + district)}`,
    tiktok_tag: (tag) => `https://www.tiktok.com/tag/${enc(tag)}`,

    // VI. FOOD & DELIVERY
    shopeefood_search: (q) => `https://shopeefood.vn/search?keyword=${enc(q)}`,
    grabfood_search: (q, lat, lng) => `https://food.grab.com/vn/en/restaurants?query=${enc(q)}&latitude=${lat}&longitude=${lng}`,
    befood_web: () => `https://food.be.com.vn/`,

    // VII. AI ASSISTANTS
    chatgpt_search: (q, address) => `https://chatgpt.com/?q=${enc(q + ' gần ' + address)}`,
    gemini_search: (q, address) => `https://www.google.com/search?q=${enc(q + ' gần ' + address)}&udm=50&source=hp&hl=vi`,
    copilot_search: (q, address) => `https://copilot.microsoft.com/?q=${enc(q + ' gần ' + address)}`,
    perplexity_search: (q, address) => `https://www.perplexity.ai/search?q=${enc(q + ' gần ' + address)}`,
    claude_web: () => `https://claude.ai/new`,
    grok_web: () => `https://x.com/i/grok`,

    // VIII. SHOPPING
    shopee_search: (q) => `https://shopee.vn/search?keyword=${enc(q)}`,
    lazada_search: (q) => `https://www.lazada.vn/catalog/?q=${enc(q)}`,
    tiki_search: (q) => `https://tiki.vn/search?q=${enc(q)}`,

    // IX. TRAVEL & BOOKING
    traveloka_search: (q) => `https://www.traveloka.com/vi-vn/search?q=${enc(q)}`,
    booking_search: (q, city) => `https://www.booking.com/searchresults.vi.html?ss=${enc(city)}&nflt=hotelfacility%3D107`,
    agoda_search: (q, city) => `https://www.agoda.com/search?text=${enc(q + ' ' + city)}`
};
