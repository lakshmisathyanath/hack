export const SKILLS = [
    "Musician", "Singer", "Dancer", "DJ", "Photographer", "Videographer", 
    "Visual Artist", "Makeup Artist", "Chef", "Bartender", "Comedian", 
    "Magician", "MC/Host", "Florist", "Event Decorator"
];

export const MOCK_TALENTS = [
    {
        id: 1,
        name: "Alex Thompson",
        role: "Professional EDM DJ",
        rating: 4.9,
        reviews: 128,
        hourlyRate: "$75/hr",
        skills: ["DJ", "MC/Host", "Sound Engineer"],
        location: "Manhattan, NY",
        verified: true,
        image: "🎧",
        bio: "With over 8 years of experience in the nightlife scene, Alex has performed at top clubs across New York. Specializes in Deep House, Techno, and Progressive EDM. Known for energetic sets and professional MC services.",
        gallery: ["🕺", "✨", "🔊"],
        pastEvents: [
            { name: "Skyline Rooftop Party", date: "Jan 2026", result: "Sold Out" },
            { name: "Tech Gala NYC", date: "Dec 2025", result: "Excellent Feedback" }
        ],
        testimonials: [
            { user: "Sarah K.", rating: 5, text: "Incredible energy! Kept the crowd dancing all night." }
        ]
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "Soul & Jazz Vocalist",
        rating: 5.0,
        reviews: 84,
        hourlyRate: "$120/hr",
        skills: ["Singer", "Jazz", "Piano"],
        location: "Brooklyn, NY",
        verified: true,
        image: "🎤",
        bio: "A classically trained vocalist with a passion for jazz and soul. Sarah has a unique ability to set the mood for weddings, corporate dinners, and intimate lounge settings.",
        gallery: ["🎹", "🕯️", "🌟"],
        pastEvents: [
            { name: "Blue Note Residency", date: "Feb 2026", result: "Ongoing" },
            { name: "The Metropolitan Wedding", date: "Oct 2025", result: "Pure Class" }
        ],
        testimonials: [
            { user: "Michael R.", rating: 5, text: "Her voice is like velvet. Absolutely stunning performance." }
        ]
    },
    {
        id: 3,
        name: "Marcus Chen",
        role: "Event Photographer",
        rating: 4.8,
        reviews: 210,
        hourlyRate: "$90/hr",
        skills: ["Photographer", "Editor", "Visual Artist"],
        location: "Queens, NY",
        verified: true,
        image: "📸",
        bio: "Specializing in capturing candid moments and high-energy event highlights. Marcus uses top-tier equipment and a cinematic editing style to deliver stunning results within 48 hours.",
        gallery: ["🖼️", "⚡", "🌆"],
        pastEvents: [
            { name: "Fashion Week Main Stage", date: "March 2026", result: "2000+ Shots Delivered" },
            { name: "Nike Run Club Meetup", date: "Jan 2026", result: "Social Sensation" }
        ],
        testimonials: [
            { user: "Lisa W.", rating: 4.9, text: "The photos were beyond my expectations. He has a great eye for detail." }
        ]
    },
    {
        id: 4,
        name: "Elena Rodriguez",
        role: "Contemporary Dancer",
        rating: 4.7,
        reviews: 56,
        hourlyRate: "$60/hr",
        skills: ["Dancer", "Performer", "Choreographer"],
        location: "Bronx, NY",
        verified: false,
        image: "💃",
        bio: "A versatile performer with mastery in contemporary, hip-hop, and salsa. Elena brings vibrant movement and stage presence to music videos, live shows, and festivals.",
        gallery: ["🎭", "💥", "🌈"],
        pastEvents: [
            { name: "Central Park Arts Festival", date: "Aug 2025", result: "Audience Favorite" }
        ],
        testimonials: [
            { user: "Priya P.", rating: 4.8, text: "Elena is a powerhouse. Her choreography is fresh and exciting." }
        ]
    },
    {
        id: 5,
        name: "David Smith",
        role: "Executive Chef",
        rating: 4.9,
        reviews: 142,
        hourlyRate: "$150/hr",
        skills: ["Chef", "Culinary", "Menu Design"],
        location: "Manhattan, NY",
        verified: true,
        image: "👨‍🍳",
        bio: "Former head chef at a Michelin-star restaurant, David now provides high-end private dining and catering for exclusive events. Custom menus tailored to every palate.",
        gallery: ["🥘", "🍾", "🍴"],
        pastEvents: [
            { name: "Winter Gala Dinner", date: "Dec 2025", result: "5-Course Menu Success" }
        ],
        testimonials: [
            { user: "James G.", rating: 5, text: "The best private dining experience I've ever had. Truly impeccable." }
        ]
    }
];

export const MOCK_EVENTS = [
    {
        id: 1,
        title: "Summer Music Festival 2026",
        category: "Music & Concert",
        date: "June 15, 2026",
        location: "Central Park, New York, NY",
        organizer: "NYC Events Corp",
        skills: ["Musician", "Singer", "DJ"],
        description: "Join the largest summer music celebration in New York! We are looking for versatile talents to perform across multiple stages.",
        requirements: ["Own Equipment", "Pro Sound Check", "Stage Presence", "Punctuality"]
    },
    {
        id: 2,
        title: "Corporate Gala Evening",
        category: "Corporate Event",
        date: "May 20, 2026",
        location: "Grand Hotel, Manhattan, NY",
        organizer: "Tech Innovations Inc",
        skills: ["Musician", "MC/Host"],
        description: "An elegant evening for industry leaders. We require a professional MC and background musicians.",
        requirements: ["Formal Attire", "Experience in Corporate", "Public Speaking", "Collaboration"]
    },
    {
        id: 3,
        title: "Art Exhibition Opening",
        category: "Art Exhibition",
        date: "April 10, 2026",
        location: "Modern Art Gallery, Brooklyn, NY",
        organizer: "Brooklyn Arts Foundation",
        skills: ["Visual Artist", "Photographer"],
        description: "Showcase your artistic process or capture the essence of the opening night.",
        requirements: ["Portfolio required", "Quick turnaround", "Interactive performance"]
    },
    {
        id: 4,
        title: "Wedding Celebration",
        category: "Wedding",
        date: "July 8, 2026",
        location: "Waterfront Venue, Queens, NY",
        organizer: "Sarah & Michael",
        skills: ["DJ", "Photographer", "Dancer"],
        description: "A beautiful waterfront wedding. We need a high-energy DJ and professional dancers.",
        requirements: ["Wedding experience", "Playlist customization", "Vibrant energy"]
    },
    {
        id: 5,
        title: "Food & Wine Festival",
        category: "Culinary Event",
        date: "August 22, 2026",
        location: "Harbor Plaza, New York, NY",
        organizer: "Gourmet Events LLC",
        skills: ["Chef", "Bartender", "Musician"],
        description: "A weekend of culinary excellence. Looking for guest chefs for live demos and flair bartenders.",
        requirements: ["Health Certification", "Speed and accuracy", "Flair skills"]
    },
    {
        id: 6,
        title: "Comedy Night Extravaganza",
        category: "Party & Celebration",
        date: "May 1, 2026",
        location: "Comedy Club, Manhattan, NY",
        organizer: "Laugh Factory NYC",
        skills: ["Comedian", "MC/Host"],
        description: "A high-stakes comedy night. We are looking for opening acts and a sharp host.",
        requirements: ["Original Material", "Improvisational skills", "Professionalism"]
    },
    {
        id: 7,
        title: "Indie Film Premiere",
        category: "Film & Media",
        date: "October 5, 2026",
        location: "Metro Cinema, Brooklyn",
        organizer: "Underground Films",
        skills: ["MC/Host", "Photographer", "DJ"],
        description: "The official premiere of 'Neon Shadows'. Looking for a host for Q&A and a DJ for the afterparty.",
        requirements: ["Film knowledge", "Interviewing skills", "Afterparty experience"]
    }
];

export const MOCK_REQUESTS = [
    {
        id: 1,
        title: "VIP Lounge Performance",
        organizer: "LuxEvents NYC",
        budget: "$800",
        date: "April 28, 2026",
        message: "We loved your profile and would like to book you for a 2-hour solo set at our executive lounge opening.",
        skills: ["Musician", "MC/Host"]
    },
    {
        id: 2,
        title: "Product Launch DJ",
        organizer: "TechFlow Systems",
        budget: "$1,200",
        date: "May 12, 2026",
        message: "Seeking a high-energy DJ for our new hardware launch event. Must be able to handle our upbeat tech crowd!",
        skills: ["DJ", "Dancer"]
    },
    {
        id: 3,
        title: "Wedding Afterparty Soloist",
        organizer: "Diamond Moments",
        budget: "$950",
        date: "June 15, 2026",
        message: "We need a soul/jazz singer for a private wedding afterparty. Your style is exactly what our client wants.",
        skills: ["Singer", "Jazz"]
    },
    {
        id: 4,
        title: "Corporate Summit Host",
        organizer: "Global Innovate",
        budget: "$2,000",
        date: "July 20, 2026",
        message: "Looking for a professional host to manage our 3-day tech summit. Experience in tech conferences is a plus.",
        skills: ["MC/Host", "Presenter"]
    }
];
