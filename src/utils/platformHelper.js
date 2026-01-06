import { TEMPLATES } from './templates';

// Helper to encode URI components safely
const enc = (str) => encodeURIComponent(str || '');

export function getPlatformUrl(platformId, keyword, queryObj, subId = null) {
    const { q_road, q_district, q_full, ward, district, city, fullAddress, lat, lng, radius } = queryObj;
    // Check if we have GPS coords
    const hasGPS = lat && lng;

    // Build radius text for queries (e.g., "trong vòng 3km", "within 3km")
    const radiusText = radius ? `trong vòng ${radius}km` : '';
    const radiusTextEn = radius ? `within ${radius}km` : '';

    const baseKeyword = keyword;
    // Enhanced keyword with radius for location-based searches
    const keywordWithRadius = radius ? `${keyword} ${radiusText}` : keyword;

    let url = '';
    const pid = subId || platformId;

    switch (pid) {
        // GOOGLE - Include radius in search
        case 'google_search': url = TEMPLATES.google_search(keywordWithRadius, lat, lng); break;
        case 'google_maps': url = TEMPLATES.google_maps(baseKeyword, lat, lng, fullAddress); break;

        case 'google_images': url = TEMPLATES.google_images(baseKeyword, district); break;
        case 'google_videos': url = TEMPLATES.google_videos(baseKeyword, district); break;
        case 'google_news': url = TEMPLATES.google_news(baseKeyword, city); break;
        case 'google_shopping': url = TEMPLATES.google_shopping(baseKeyword, district); break;

        // FACEBOOK
        case 'facebook_search': url = TEMPLATES.facebook_search(baseKeyword, district); break;
        case 'facebook_pages': url = TEMPLATES.facebook_pages(baseKeyword, district); break;
        case 'facebook_groups': url = TEMPLATES.facebook_groups(baseKeyword, city); break;
        case 'facebook_events': url = TEMPLATES.facebook_events(baseKeyword, district); break;
        case 'facebook_reels': url = TEMPLATES.facebook_reels(baseKeyword, district); break;

        // INSTAGRAM
        case 'instagram_search': url = TEMPLATES.instagram_search(baseKeyword, district); break;
        case 'instagram_tags': url = TEMPLATES.instagram_tag_web(baseKeyword.replace(/\s+/g, '')); break;

        // YOUTUBE
        case 'youtube_search': url = TEMPLATES.youtube_search(baseKeyword, district, ward); break;
        case 'youtube_shorts': url = TEMPLATES.youtube_shorts(baseKeyword, district); break;

        // TIKTOK
        case 'tiktok_search': url = TEMPLATES.tiktok_search(baseKeyword, district); break;
        case 'tiktok_tags': url = TEMPLATES.tiktok_tag(baseKeyword.replace(/\s+/g, '')); break;

        // FOOD DELIVERY
        case 'shopeefood': url = TEMPLATES.shopeefood_search(hasGPS ? q_full : q_road); break;
        case 'grabfood':
            if (hasGPS) {
                url = TEMPLATES.grabfood_search(baseKeyword, lat, lng);
            } else {
                url = `https://food.grab.com/vn/en/restaurants?query=${enc(q_district)}`;
            }
            break;
        case 'befood': url = TEMPLATES.befood_web(); break;

        // AI ASSISTANTS - Include radius for location-aware AI searches
        case 'chatgpt_search':
        case 'chatgpt': url = TEMPLATES.chatgpt_search(keywordWithRadius, fullAddress || district); break;
        case 'gemini_search':
        case 'gemini': url = TEMPLATES.gemini_search(keywordWithRadius, fullAddress || district); break;
        case 'copilot_search':
        case 'copilot': url = TEMPLATES.copilot_search(keywordWithRadius, fullAddress || district); break;
        case 'perplexity_search':
        case 'perplexity': url = TEMPLATES.perplexity_search(keywordWithRadius, fullAddress || district); break;
        case 'claude': url = TEMPLATES.claude_web(); break;
        case 'grok': url = TEMPLATES.grok_web(); break;

        // SHOPPING
        case 'shopee': url = TEMPLATES.shopee_search(baseKeyword); break;
        case 'lazada': url = TEMPLATES.lazada_search(baseKeyword); break;
        case 'tiki': url = TEMPLATES.tiki_search(baseKeyword); break;

        // TRAVEL
        case 'traveloka': url = TEMPLATES.traveloka_search(baseKeyword + ' ' + city); break;
        case 'booking': url = TEMPLATES.booking_search(baseKeyword, city || 'Vietnam'); break;
        case 'agoda': url = TEMPLATES.agoda_search(baseKeyword, city || 'Vietnam'); break;

        default:
            if (TEMPLATES[pid]) {
                try {
                    url = TEMPLATES[pid](baseKeyword, district, city);
                } catch (e) {
                    console.warn("Template error", e);
                }
            }
            break;
    }
    return url;
}

// Platform groups configuration with images for Results display
export const PLATFORM_GROUPS = [
    {
        id: 'ai',
        name: 'Trợ lý AI',
        color: '#8b5cf6',
        platforms: [
            { id: 'gemini_search', name: 'Google AI', icon: '🔮', color: '#4285F4', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop' },
            { id: 'chatgpt_search', name: 'ChatGPT', icon: '🤖', color: '#10A37F', image: 'https://images.unsplash.com/photo-1684391511116-a82c6fd47c23?w=400&h=300&fit=crop' },
            { id: 'copilot_search', name: 'Copilot', icon: '🪟', color: '#00A4EF', image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=300&fit=crop' },
            { id: 'perplexity_search', name: 'Perplexity', icon: '🔍', color: '#1a1a2e', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop' },
        ]
    },
    {
        id: 'maps',
        name: 'Bản đồ & Địa điểm',
        color: '#34A853',
        platforms: [
            { id: 'google_maps', name: 'Google Maps', icon: '🗺️', color: '#34A853', image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400&h=300&fit=crop' },
            { id: 'google_search', name: 'Google Search', icon: '🔍', color: '#4285F4', image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=300&fit=crop' },
        ]
    },
    {
        id: 'social',
        name: 'Social & Review',
        color: '#FE2C55',
        platforms: [
            { id: 'tiktok_search', name: 'TikTok', icon: '🎵', color: '#000000', image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=300&fit=crop' },
            { id: 'youtube_search', name: 'YouTube', icon: '📺', color: '#FF0000', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop' },
            { id: 'facebook_pages', name: 'Facebook', icon: '📘', color: '#1877F2', image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=300&fit=crop' },
            { id: 'instagram_search', name: 'Instagram', icon: '📷', color: '#E4405F', image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&h=300&fit=crop' },
        ]
    },
    {
        id: 'shopping',
        name: 'Mua sắm',
        color: '#EE4D2D',
        platforms: [
            { id: 'shopee', name: 'Shopee', icon: '🛒', color: '#EE4D2D', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop' },
            { id: 'lazada', name: 'Lazada', icon: '💙', color: '#10156F', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop' },
            { id: 'tiki', name: 'Tiki', icon: '💚', color: '#1A94FF', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop' },
        ]
    },
    {
        id: 'food',
        name: 'Đặt đồ ăn',
        color: '#00B14F',
        platforms: [
            { id: 'grabfood', name: 'GrabFood', icon: '🏍️', color: '#00B14F', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop' },
            { id: 'shopeefood', name: 'ShopeeFood', icon: '🍜', color: '#EE4D2D', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop' },
        ]
    },
    {
        id: 'travel',
        name: 'Du lịch',
        color: '#1BA0E2',
        platforms: [
            { id: 'traveloka', name: 'Traveloka', icon: '✈️', color: '#1BA0E2', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop' },
            { id: 'booking', name: 'Booking', icon: '🏨', color: '#003580', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop' },
            { id: 'agoda', name: 'Agoda', icon: '🏠', color: '#589442', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop' },
        ]
    }
];
