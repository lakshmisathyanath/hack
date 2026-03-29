// State Management
let currentRole = 'user';
let selectedSkills = new Set();

// DOM Elements
const app = document.getElementById('app');

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    initLoginListeners();
});

function initLoginListeners() {
    const signupLink = document.getElementById('signupLink');
    if (signupLink) {
        signupLink.onclick = (e) => {
            e.preventDefault();
            if (currentRole === 'talent') {
                renderTalentRegistration();
            } else {
                renderUserRegistration();
            }
        };
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = handleLogin;
    }
}

// Role Switching Logic (for Login Page)
function setRole(role) {
    currentRole = role;
    const roleIndicator = document.getElementById('roleIndicator');
    const roleOptions = document.querySelectorAll('.role-option');
    
    roleOptions.forEach(opt => opt.classList.toggle('active', opt.dataset.role === role));

    if (role === 'user') {
        roleIndicator.style.transform = 'translateX(0)';
    } else {
        roleIndicator.style.transform = 'translateX(100%)'; 
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    console.log(`Logging in as ${currentRole}:`, email);
    
    if (currentRole === 'talent') {
        renderTalentDashboard();
    } else {
        renderUserDashboard(); 
    }
}

// --- Registration View Rendering ---

const SKILLS = [
    "Musician", "Singer", "Dancer", "DJ", "Photographer", "Videographer", 
    "Visual Artist", "Makeup Artist", "Chef", "Bartender", "Comedian", 
    "Magician", "MC/Host", "Florist", "Event Decorator"
];

function renderTalentRegistration() {
    window.scrollTo(0, 0);
    document.body.classList.add('registration-active');
    app.innerHTML = `
        <div class="registration-card">
            <div class="registration-header">
                <div class="logo-container" style="background: linear-gradient(135deg, #6366F1, #3B82F6);">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                </div>
                <h1 class="welcome-title">Create Your Talent Profile</h1>
                <p class="welcome-subtitle">Showcase your skills and get hired for amazing events</p>
            </div>

            <form id="registrationForm">
                <h2 class="section-title">Personal Information</h2>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-input" placeholder="John Doe" required>
                    </div>
                    <div class="form-col">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-input" placeholder="john@example.com" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">Phone Number</label>
                        <input type="tel" class="form-input" placeholder="+1 (555) 123-4567">
                    </div>
                    <div class="form-col">
                        <label class="form-label">Location</label>
                        <input type="text" class="form-input" placeholder="New York, NY">
                    </div>
                </div>

                <h2 class="section-title">Professional Details</h2>
                <div class="form-group" style="margin-bottom: 32px;">
                    <label class="form-label">Years of Experience</label>
                    <input type="text" class="form-input" placeholder="e.g., 5+ years">
                </div>

                <div class="form-group">
                    <label class="form-label">Skills (Select all that apply)</label>
                    <div class="skills-container">
                        ${SKILLS.map(skill => `
                            <div class="skill-chip" onclick="toggleSkill('${skill}', this)">${skill}</div>
                        `).join('')}
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">About You</label>
                    <textarea class="form-input" placeholder="Tell event organizers about yourself, your experience, and what makes you unique..."></textarea>
                </div>

                <h2 class="section-title">Verification Video</h2>
                <div class="video-dropzone" id="dropzone" onclick="simulateUpload()">
                    <div class="dropzone-icon">📤</div>
                    <p class="dropzone-text">Drag and drop a video file here or click to upload</p>
                    <div id="uploadStatus" style="margin-top:15px; font-weight:600; color: #9D50BB;"></div>
                </div>

                <div class="registration-actions">
                    <button type="button" class="btn-secondary" onclick="location.reload()">Cancel</button>
                    <button type="submit" class="btn-primary btn-save">
                        <span>✨ Save Profile</span>
                    </button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('registrationForm').onsubmit = handleSaveProfile;
}

function toggleSkill(skill, el) {
    if (selectedSkills.has(skill)) {
        selectedSkills.delete(skill);
        el.classList.remove('selected');
    } else {
        selectedSkills.add(skill);
        el.classList.add('selected');
    }
}

function simulateUpload() {
    const status = document.getElementById('uploadStatus');
    status.innerText = "Processing video...";
    status.style.color = "#9D50BB";
    
    setTimeout(() => {
        status.innerText = "Analyzing skills via AI...";
        setTimeout(() => {
            status.innerText = "✅ Verification Successful! Skill confirmed.";
            status.style.color = "#10B981";
        }, 1500);
    }, 1000);
}

function renderUserRegistration() {
    window.scrollTo(0, 0);
    document.body.classList.add('registration-active');
    app.innerHTML = `
        <div class="registration-card">
            <div class="registration-header">
                <div class="logo-container" style="background: linear-gradient(135deg, #FF5317, #FF2052);">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                </div>
                <h1 class="welcome-title">Create Your User Account</h1>
                <p class="welcome-subtitle">Join the community and start organizing events</p>
            </div>

            <form id="userRegistrationForm">
                <h2 class="section-title">Personal Information</h2>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-input" id="userName" placeholder="John Doe" required>
                    </div>
                    <div class="form-col">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-input" id="userEmail" placeholder="john@example.com" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label class="form-label">Phone Number</label>
                        <input type="tel" class="form-input" id="userPhone" placeholder="+1 (555) 000-0000">
                    </div>
                    <div class="form-col">
                        <label class="form-label">Username</label>
                        <input type="text" class="form-input" id="userUsername" placeholder="johndoe_organizer" required>
                    </div>
                </div>

                <h2 class="section-title">Security</h2>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-input" id="userPassword" placeholder="••••••••" required>
                </div>

                <div class="registration-actions">
                    <button type="button" class="btn-secondary" onclick="location.reload()">Cancel</button>
                    <button type="submit" class="btn-primary btn-save">
                        <span>🚀 Create Account</span>
                    </button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('userRegistrationForm').onsubmit = handleSaveUser;
}

function handleSaveProfile(e) {
    e.preventDefault();
    if (selectedSkills.size === 0) {
        alert("Please select at least one skill!");
        return;
    }
    alert("Profile Created Successfully! Redirecting to your Talent Dashboard...");
    renderTalentDashboard();
}

function handleSaveUser(e) {
    e.preventDefault();
    const data = {
        name: document.getElementById('userName').value,
        username: document.getElementById('userUsername').value,
        role: 'user'
    };
    alert(`Welcome abroad, ${data.name}! Your account "${data.username}" has been created.`);
    renderUserDashboard();
}

// --- Talent Dashboard Rendering ---

const MOCK_TALENTS = [
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

const MOCK_EVENTS = [
    {
        title: "Summer Music Festival 2026",
        category: "Music & Concert",
        date: "June 15, 2026",
        location: "Central Park, New York, NY",
        organizer: "NYC Events Corp",
        skills: ["Musician", "Singer", "DJ"],
        description: "Join the largest summer music celebration in New York! We are looking for versatile talents to perform across multiple stages. This is a high-visibility event with over 50,000 attendees expected.",
        requirements: ["Own Equipment", "Pro Sound Check", "Stage Presence", "Punctuality"]
    },
    {
        title: "Corporate Gala Evening",
        category: "Corporate Event",
        date: "May 20, 2026",
        location: "Grand Hotel, Manhattan, NY",
        organizer: "Tech Innovations Inc",
        skills: ["Musician", "MC/Host"],
        description: "An elegant evening for industry leaders. We require a professional MC and background musicians for the reception and main dinner. Formal attire is required.",
        requirements: ["Formal Attire", "Experience in Corporate", "Public Speaking", "Collaboration"]
    },
    {
        title: "Art Exhibition Opening",
        category: "Art Exhibition",
        date: "April 10, 2026",
        location: "Modern Art Gallery, Brooklyn, NY",
        organizer: "Brooklyn Arts Foundation",
        skills: ["Visual Artist", "Photographer"],
        description: "Showcase your artistic process or capture the essence of the opening night. We need a live painter and a high-end photographer for event coverage.",
        requirements: ["Portfolio required", "Quick turnaround", "Interactive performance", "Editing skills"]
    },
    {
        title: "Wedding Celebration",
        category: "Wedding",
        date: "July 8, 2026",
        location: "Waterfront Venue, Queens, NY",
        organizer: "Sarah & Michael",
        skills: ["DJ", "Photographer", "Dancer"],
        description: "A beautiful waterfront wedding. We need a high-energy DJ and a team of professional dancers to get the party started after the ceremony.",
        requirements: ["Wedding experience", "Playlist customization", "Vibrant energy", "Crowd engagement"]
    },
    {
        title: "Food & Wine Festival",
        category: "Culinary Event",
        date: "August 22, 2026",
        location: "Harbor Plaza, New York, NY",
        organizer: "Gourmet Events LLC",
        skills: ["Chef", "Bartender", "Musician"],
        description: "A weekend of culinary excellence. We are looking for guest chefs for live demos and flair bartenders for the VIP lounge.",
        requirements: ["Health Certification", "Speed and accuracy", "Flair skills", "Audience interaction"]
    },
    {
        title: "Comedy Night Extravaganza",
        category: "Party & Celebration",
        date: "May 1, 2026",
        location: "Comedy Club, Manhattan, NY",
        organizer: "Laugh Factory NYC",
        skills: ["Comedian", "MC/Host"],
        description: "A high-stakes comedy night. We are looking for opening acts and a sharp host to manage the night's flow and keep the audience energized.",
        requirements: ["Original Material", "Improvisational skills", "Microphone etiquette", "Professionalism"]
    },
    {
        title: "Rooftop Yoga & Wellness",
        category: "Health & Wellness",
        date: "June 25, 2026",
        location: "Skyline Terrace, Long Island City",
        organizer: "ZenFlow NYC",
        skills: ["Yoga Instructor", "Musician", "Photographer"],
        description: "A sunset wellness event. We need a soothing live musician (handpan or acoustic) and a photographer to capture the serene atmosphere.",
        requirements: ["Own equipment", "Yoga experience plus", "Atmospheric style", "Social media savvy"]
    },
    {
        title: "Tech Workshop: AI for Creators",
        category: "Education & Workshop",
        date: "July 12, 2026",
        location: "Innovation Hub, Manhattan",
        organizer: "Future Skills Lab",
        skills: ["Presenter", "MC/Host", "Videographer"],
        description: "A deep dive into AI tools for creative professionals. Seeking an engaging presenter to assist the main speaker and a videographer for course content.",
        requirements: ["Tech savvy", "Public speaking", "4K Video gear", "Editing proficiency"]
    },
    {
        title: "Charity Auction Gala",
        category: "Fundraiser",
        date: "September 15, 2026",
        location: "Liberty Hall, NYC",
        organizer: "Hope Foundation",
        skills: ["Auctioneer", "MC/Host", "Musician"],
        description: "A prestigious fundraiser for local community projects. We need a high-energy auctioneer and a classical ensemble for the cocktail hour.",
        requirements: ["Formal experience", "Charity background", "Stellar reputation", "Black tie attire"]
    },
    {
        title: "Indie Film Premiere",
        category: "Film & Media",
        date: "October 5, 2026",
        location: "Metro Cinema, Brooklyn",
        organizer: "Underground Films",
        skills: ["MC/Host", "Photographer", "DJ"],
        description: "The official premiere of 'Neon Shadows'. Looking for a host for the Q&A session and a DJ for the afterparty.",
        requirements: ["Film knowledge", "Interviewing skills", "Afterparty experience", "Networking"]
    },
    {
        title: "Retro Game Night",
        category: "Gaming & Esports",
        date: "November 20, 2026",
        location: "Pixel Arcade, Manhattan",
        organizer: "Gamer Collective",
        skills: ["Host", "Commentator", "DJ"],
        description: "A nostalgic night of 80s and 90s gaming. We need a charismatic commentator for the tournament and a DJ spinning retro hits.",
        requirements: ["Gaming knowledge", "90s music collection", "Commentary experience", "Hyper-energetic"]
    }
];

let MOCK_REQUESTS = [
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
    },
    {
        id: 5,
        title: "Luxury Brand Launch",
        organizer: "Aura Boutique",
        budget: "$1,800",
        date: "August 5, 2026",
        message: "We need a high-end fashion photographer for our flagship store opening. Your aesthetic matches ours perfectly.",
        skills: ["Photographer", "Visual Artist"]
    },
    {
        id: 6,
        title: "Music Video Cameo",
        organizer: "SoundWave Records",
        budget: "$500",
        date: "August 28, 2026",
        message: "Seeking a professional dancer for a guest spot in an upcoming artist's video. 1-day shoot in Brooklyn.",
        skills: ["Dancer", "Performer"]
    },
    {
        id: 7,
        title: "Festival Headliner Prep",
        organizer: "Summer Vibes Ltd",
        budget: "$3,500",
        date: "September 12, 2026",
        message: "We are finalizing the lineup for our autumn festival and want to secure your DJ set for the main stage.",
        skills: ["DJ", "Producer"]
    },
    {
        id: 8,
        title: "Private Investor Dinner",
        organizer: "Nexus Capital",
        budget: "$1,100",
        date: "October 18, 2026",
        message: "Seeking a refined pianist or jazz soloist for a dinner with high-profile investors. Very exclusive environment.",
        skills: ["Musician", "Pianist"]
    },
    {
        id: 9,
        title: "Podcast Guest Hosting",
        organizer: "The Creator Pod",
        budget: "$400",
        date: "November 5, 2026",
        message: "We'd love to have you guest host an episode about the talent industry. Great exposure to a large audience.",
        skills: ["MC/Host", "Speaker"]
    },
    {
        id: 10,
        title: "Award Ceremony Voiceover",
        organizer: "Creative Arts Council",
        budget: "$700",
        date: "December 1, 2026",
        message: "We need a professional voice for our annual awards ceremony. Remote recording or live on-site.",
        skills: ["Voice Actor", "MC/Host"]
    },
    {
        id: 11,
        title: "High-Fashion Runway Walk",
        organizer: "Vogue Vision",
        budget: "$2,500",
        date: "December 15, 2026",
        message: "Looking for experienced models for our winter collection showcase. High-profile event.",
        skills: ["Model", "Performer"]
    },
    {
        id: 12,
        title: "Street Art Mural",
        organizer: "Urban Revive",
        budget: "$4,000",
        date: "January 10, 2027",
        message: "We want a large-scale mural for a new community center. Your portfolio stood out!",
        skills: ["Visual Artist", "Painter"]
    },
    {
        id: 13,
        title: "Tech Keynote Intro",
        organizer: "FutureTech Expo",
        budget: "$1,500",
        date: "January 25, 2027",
        message: "Seeking a dynamic presenter to introduce our keynote speaker for the 2027 Expo.",
        skills: ["Presenter", "MC/Host"]
    },
    {
        id: 14,
        title: "Charity Run Lead",
        organizer: "City Marathon",
        budget: "$600",
        date: "February 5, 2027",
        message: "We need a high-energy person to lead the warm-up session for our charity 10K run.",
        skills: ["Fitness Lead", "MC/Host"]
    }
];

function scrollInvitations(direction) {
    const container = document.getElementById('requestCarousel');
    const scrollAmount = 350; // Card width + some gap
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

function handleAcceptRequest(id) {
    const req = MOCK_REQUESTS.find(r => r.id === id);
    alert(`Success! You have accepted the invitation for "${req.title}". The organizer "${req.organizer}" has been notified.`);
    MOCK_REQUESTS = MOCK_REQUESTS.filter(r => r.id !== id);
    renderTalentDashboard();
}

function handleRejectRequest(id) {
    if(confirm("Are you sure you want to decline this invitation?")) {
        MOCK_REQUESTS = MOCK_REQUESTS.filter(r => r.id !== id);
        renderTalentDashboard();
    }
}

function handleNegotiate(id) {
    const req = MOCK_REQUESTS.find(r => r.id === id);
    const counter = prompt(`Project: ${req.title}\nCurrent Budget: ${req.budget}\n\nEnter your counter-offer (e.g., $1,500):`);
    if (counter) {
        alert(`Your counter-offer of ${counter} has been sent to ${req.organizer}!`);
        MOCK_REQUESTS = MOCK_REQUESTS.filter(r => r.id !== id);
        renderTalentDashboard();
    }
}

function renderTalentDashboard() {
    window.scrollTo(0, 0);
    document.body.className = 'dashboard-active';
    
    app.innerHTML = `
        <nav class="navbar">
            <div class="nav-left">
                <div class="nav-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"/>
                    </svg>
                    <span>TalentHub</span>
                </div>
                <div class="search-bar">
                    <span>🔍</span>
                    <input type="text" class="search-input" placeholder="Search talents, skills, locations...">
                </div>
            </div>
            <div class="nav-right">
                <div class="profile-circle" onclick="renderTalentProfile()" style="cursor: pointer;">AT</div>
            </div>
        </nav>

        <div class="dashboard-container">
            <div class="welcome-header">
                <div class="welcome-text">
                    <h1>Welcome back, Alex Thompson! 👋</h1>
                    <p>Here are events matching your skills</p>
                </div>
                <div class="welcome-right">
                    <div class="badge-verified">✅ Verified Talent</div>
                    <div class="notif-count">🔔 3 New Opportunities</div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stats-card">
                    <div class="stats-info">
                        <span>Active Applications</span>
                        <h2>5</h2>
                    </div>
                    <div class="stats-icon" style="background: #EEF2FF; color: #6366F1;">📈</div>
                </div>
                <div class="stats-card">
                    <div class="stats-info">
                        <span>Matches Found</span>
                        <h2>6</h2>
                    </div>
                    <div class="stats-icon" style="background: #ECFDF5; color: #10B981;">✨</div>
                </div>
                <div class="stats-card">
                    <div class="stats-info">
                        <span>Direct Invitations</span>
                        <h2 style="color: #6366F1;">${MOCK_REQUESTS.length}</h2>
                    </div>
                    <div class="stats-icon" style="background: #EEF2FF; color: #6366F1;">💌</div>
                </div>
                <div class="stats-card">
                    <div class="stats-info">
                        <span>Profile Views</span>
                        <h2>128</h2>
                    </div>
                    <div class="stats-icon" style="background: #FDF2F8; color: #DB2777;">🔔</div>
                </div>
            </div>

            ${MOCK_REQUESTS.length > 0 ? `
                <div class="section-header-dash">
                    <div class="section-icon" style="background: #6366F1;">💌</div>
                    <h2>Direct Invitations</h2>
                </div>
                
                <div class="invitations-carousel-wrapper">
                    <button class="carousel-nav-btn left-btn" onclick="scrollInvitations(-1)">&lt;</button>
                    <div class="request-grid-carousel" id="requestCarousel">
                        ${MOCK_REQUESTS.map(req => `
                            <div class="request-card">
                                <div class="request-header">
                                    <div class="request-info">
                                        <h3>${req.title}</h3>
                                        <p class="req-organizer">from <strong>${req.organizer}</strong></p>
                                    </div>
                                    <div class="req-budget">${req.budget}</div>
                                </div>
                                <p class="req-message">"${req.message}"</p>
                                <div class="event-details" style="margin-bottom: 20px;">
                                    <div class="event-detail-item">📅 ${req.date}</div>
                                    <div class="event-detail-item">🎯 Skills: ${req.skills.join(', ')}</div>
                                </div>
                                <div class="request-actions">
                                    <button class="btn-accept" onclick="handleAcceptRequest(${req.id})">Accept</button>
                                    <button class="btn-negotiate" onclick="handleNegotiate(${req.id})">Negotiate</button>
                                    <button class="btn-reject" onclick="handleRejectRequest(${req.id})">Decline</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <button class="carousel-nav-btn right-btn" onclick="scrollInvitations(1)">&gt;</button>
                </div>
            ` : ''}

            <div class="section-header-dash">
                <div class="section-icon">🪄</div>
                <h2>Events Matching Your Skills</h2>
            </div>

            <div class="event-grid">
                ${MOCK_EVENTS.map((event, index) => `
                    <div class="event-card">
                        <div class="event-top">
                            <h3 class="event-title">${event.title}</h3>
                            <span class="event-category-tag">${event.category}</span>
                        </div>
                        <div class="event-details">
                            <div class="event-detail-item">📅 ${event.date}</div>
                            <div class="event-detail-item">📍 ${event.location}</div>
                            <div class="event-detail-item">👤 ${event.organizer}</div>
                        </div>
                        <div class="req-skills-title">Required Skills:</div>
                        <div class="event-skills">
                            ${event.skills.map(skill => `<span class="skill-tag-small">${skill}</span>`).join('')}
                        </div>
                        <div class="event-actions">
                            <button class="btn-view-details" onclick="renderEventDetails(${index})">View Details</button>
                            <button class="btn-apply-small" onclick="renderApplyForm(${index})">Apply Now</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderEventDetails(index) {
    const event = MOCK_EVENTS[index];
    window.scrollTo(0, 0);
    
    app.innerHTML = `
        <nav class="navbar">
            <div class="nav-left">
                <div class="nav-logo" onclick="renderTalentDashboard()" style="cursor: pointer;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"/>
                    </svg>
                    <span>TalentHub</span>
                </div>
            </div>
            <div class="nav-right">
                <div class="profile-circle" onclick="renderTalentProfile()" style="cursor: pointer;">AT</div>
            </div>
        </nav>

        <div class="details-container">
            <button class="back-btn" onclick="renderTalentDashboard()">
                <span>⬅️</span> Back to Dashboard
            </button>

            <div class="details-header-card">
                <span class="details-category">${event.category}</span>
                <div class="details-title-row">
                    <h1>${event.title}</h1>
                    <button class="btn-apply-details" onclick="renderApplyForm(${index})">Apply Now</button>
                </div>
                
                <div class="details-meta-grid">
                    <div class="meta-item">
                        <label>Date & Time</label>
                        <span>📅 ${event.date}</span>
                    </div>
                    <div class="meta-item">
                        <label>Location</label>
                        <span>📍 ${event.location}</span>
                    </div>
                    <div class="meta-item">
                        <label>Organizer</label>
                        <span>👤 ${event.organizer}</span>
                    </div>
                </div>
            </div>

            <div class="details-section">
                <h2>📝 About the Event</h2>
                <div class="details-content">
                    <p>${event.description}</p>
                </div>
            </div>

            <div class="details-section">
                <h2>⚡ Requirements</h2>
                <div class="requirements-list">
                    ${event.requirements.map(req => `
                        <div class="requirement-item">
                            <span>✅</span> ${req}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="details-section">
                <h2>🎯 Target Skills</h2>
                <div class="event-skills" style="margin-bottom: 0;">
                    ${event.skills.map(skill => `<span class="skill-tag-large">${skill}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderUserDashboard() {
    window.scrollTo(0, 0);
    document.body.className = 'dashboard-active user-module';
    
    app.innerHTML = `
        <nav class="navbar">
            <div class="nav-left">
                <div class="nav-logo" onclick="renderUserDashboard()" style="cursor: pointer;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                    <span>UserHub</span>
                </div>
            </div>
            <div class="nav-right">
                <div class="profile-circle user-p" onclick="renderUserProfile()" style="cursor: pointer;">JD</div>
            </div>
        </nav>

        <div class="dashboard-container">
            <div class="user-hero">
                <div class="hero-content">
                    <h1>Find the Perfect Talent for Your Event 🚀</h1>
                    <p>Discover top-rated performers, creators, and professionals in seconds.</p>
                </div>
                <div class="hero-search-box">
                    <div class="search-field">
                        <label>Which resource are you looking for?</label>
                        <div class="input-with-icon">
                            <span>🎭</span>
                            <input type="text" id="resourceInput" placeholder="DJ, Singer, Photographer...">
                        </div>
                    </div>
                    <div class="search-divider"></div>
                    <div class="search-field">
                        <label>Location</label>
                        <div class="input-with-icon">
                            <span>📍</span>
                            <input type="text" id="locationInput" placeholder="Manhattan, NY">
                        </div>
                    </div>
                    <button class="btn-hero-search">🔍 Search</button>
                </div>
            </div>

            <div class="category-pills">
                <div class="pill active">All Talents</div>
                <div class="pill">🎚️ DJ/Mixing</div>
                <div class="pill">🎧 Sound/Audio</div>
                <div class="pill">🎤 Singers</div>
                <div class="pill">📸 Photography</div>
                <div class="pill">💃 Dancers</div>
                <div class="pill">🥘 Culinary</div>
            </div>

            <div class="section-header-dash">
                <div class="section-icon" style="background: #3B82F6;">✨</div>
                <h2>Recommended Talents for You</h2>
            </div>

            <div class="talent-grid">
                ${MOCK_TALENTS.map((talent, index) => `
                    <div class="talent-card">
                        <div class="talent-card-header">
                            <div class="talent-avatar-large">${talent.image}</div>
                            ${talent.verified ? '<div class="verified-small">✅</div>' : ''}
                        </div>
                        <div class="talent-card-body">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                <div>
                                    <h3 class="talent-name">${talent.name}</h3>
                                    <p class="talent-role-text">${talent.role}</p>
                                </div>
                                <span class="price-text-large">${talent.hourlyRate}</span>
                            </div>
                            
                            <div class="talent-stats-row">
                                <span class="rating-badge">⭐ ${talent.rating}</span>
                                <span class="review-count">(${talent.reviews} reviews)</span>
                            </div>
                            
                            <div class="talent-meta">
                                <span>📍 ${talent.location}</span>
                            </div>

                            <div class="talent-action-footer">
                                <button class="btn-primary-small" onclick="renderResourceDetails(${index})">View Profile</button>
                                <div class="engagement-buttons">
                                    <button class="btn-hire" onclick="alert('Proceeding to Hire ${talent.name}...')">Hire</button>
                                    <button class="btn-req-dash" onclick="alert('Request sent to ${talent.name}')">Request</button>
                                    <button class="btn-nego-dash" onclick="alert('Negotiation initiated with ${talent.name}')">Negotiate</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Add dynamic search listeners
    const resourceInput = document.getElementById('resourceInput');
    const locationInput = document.getElementById('locationInput');
    
    [resourceInput, locationInput].forEach(input => {
        if(input) {
            input.addEventListener('input', filterTalents);
        }
    });
}

function renderResourceDetails(index) {
    const talent = MOCK_TALENTS[index];
    window.scrollTo(0, 0);
    document.body.className = 'dashboard-active user-module details-active';

    app.innerHTML = `
        <nav class="navbar">
            <div class="nav-left">
                <button class="btn-corner-back" onclick="renderUserDashboard()">⬅️</button>
                <div class="nav-logo" onclick="renderUserDashboard()" style="cursor: pointer;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                    <span>UserHub</span>
                </div>
            </div>
            <div class="nav-right">
                <div class="profile-circle user-p" onclick="renderUserProfile()" style="cursor: pointer;">JD</div>
            </div>
        </nav>

        <div class="details-view-container">
            <div class="details-view-header">
                <div class="header-main-info">
                    <div class="avatar-giant">${talent.image}</div>
                    <div class="info-text">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <h1>${talent.name} ${talent.verified ? '<span style="font-size: 20px;">✅</span>' : ''}</h1>
                        </div>
                        <p class="role-subtitle">${talent.role}</p>
                        <div class="stats-row-large">
                            <span>⭐ ${talent.rating} (${talent.reviews} reviews)</span>
                            <span>📍 ${talent.location}</span>
                        </div>
                    </div>
                </div>
                <div class="pricing-card">
                    <div class="price-header">${talent.hourlyRate}</div>
                    <p>Base hourly rate</p>
                    <div class="booking-actions-vertical">
                        <button class="btn-hire-large">Hire Talent</button>
                        <button class="btn-chat-large" onclick="renderChatPage(${index})">💬 Chat with ${talent.name.split(' ')[0]}</button>
                    </div>
                </div>
            </div>

            <div class="details-view-grid">
                <div class="details-left">
                    <div class="content-section">
                        <h2>🎨 Professional Bio</h2>
                        <p class="bio-text">${talent.bio}</p>
                    </div>

                    <div class="content-section">
                        <h2>📽️ Portfolio & Demos</h2>
                        <div class="portfolio-grid">
                            ${talent.gallery.map(item => `
                                <div class="portfolio-item">
                                    <div class="portfolio-icon">${item}</div>
                                    <div class="portfolio-overlay">View Demo</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="content-section">
                        <h2>📅 Past Successful Events</h2>
                        <div class="timeline">
                            ${talent.pastEvents.map(event => `
                                <div class="timeline-item">
                                    <div class="time-marker"></div>
                                    <div class="time-content">
                                        <h4>${event.name}</h4>
                                        <p>${event.date} • <strong style="color: #10B981;">${event.result}</strong></p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="content-section">
                        <h2>🌟 Client Testimonials</h2>
                        <div class="testimonials-list">
                            ${talent.testimonials.map(item => `
                                <div class="testimonial-card">
                                    <div class="test-header">
                                        <strong>${item.user}</strong>
                                        <span style="color: #F59E0B;">${'⭐'.repeat(item.rating)}</span>
                                    </div>
                                    <p>"${item.text}"</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderChatPage(index) {
    const talent = MOCK_TALENTS[index];
    window.scrollTo(0, 0);
    document.body.className = 'chat-active user-module';

    app.innerHTML = `
        <nav class="navbar" style="position: sticky; top: 0; z-index: 100;">
            <div class="nav-left">
                <button class="btn-corner-back" onclick="renderResourceDetails(${index})">⬅️</button>
                <div class="nav-logo" onclick="renderUserDashboard()" style="cursor: pointer;">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                    <span>UserHub</span>
                </div>
            </div>
            <div class="nav-right">
                <div class="profile-circle user-p" onclick="renderUserProfile()">JD</div>
            </div>
        </nav>

        <div class="chat-main-container">
            <div class="chat-sidebar">
                <div class="chat-sidebar-header">
                    <h2>Messages</h2>
                </div>
                <div class="chat-list">
                    <div class="chat-item active">
                        <div class="chat-avatar-small">${talent.image}</div>
                        <div class="chat-item-info">
                            <h4>${talent.name}</h4>
                            <p>Online</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="chat-window">
                <div class="chat-window-header">
                    <div class="chat-header-left">
                        <div class="chat-avatar-small">${talent.image}</div>
                        <div class="chat-header-info">
                            <h4>${talent.name}</h4>
                            <span class="status-indicator">Active Now</span>
                        </div>
                    </div>
                    <button class="btn-compact-book">Book Now</button>
                </div>
                <div class="chat-messages">
                    <div class="message received">
                        <div class="msg-bubble">Hello John! I saw your inquiry about the Tech Gala. How can I help?</div>
                        <span class="msg-time">10:45 AM</span>
                    </div>
                    <div class="message sent">
                        <div class="msg-bubble">Hi ${talent.name.split(' ')[0]}, yes! I'm interested in your services for our next event. Are you available on June 15th?</div>
                        <span class="msg-time">10:46 AM</span>
                    </div>
                    <div class="message received">
                        <div class="msg-bubble">Let me check my calendar... Yes, for June 15th I have a slot available! What type of sound setup are you expecting?</div>
                        <span class="msg-time">10:47 AM</span>
                    </div>
                </div>
                <div class="chat-input-area">
                    <input type="text" placeholder="Type a message..." class="chat-input">
                    <button class="btn-send">Send</button>
                </div>
            </div>
        </div>
    `;
}

function filterTalents() {
    const resValue = document.getElementById('resourceInput').value.toLowerCase();
    const locValue = document.getElementById('locationInput').value.toLowerCase();
    
    const filtered = MOCK_TALENTS.filter(talent => {
        const matchesRes = talent.role.toLowerCase().includes(resValue) || 
                          talent.skills.some(s => s.toLowerCase().includes(resValue)) ||
                          talent.name.toLowerCase().includes(resValue);
        const matchesLoc = talent.location.toLowerCase().includes(locValue);
        return matchesRes && matchesLoc;
    });

    const grid = document.querySelector('.talent-grid');
    if (grid) {
        grid.innerHTML = filtered.map(talent => `
            <div class="talent-card">
                <div class="talent-card-header">
                    <div class="talent-avatar-large">${talent.image}</div>
                    ${talent.verified ? '<div class="verified-small">✅</div>' : ''}
                </div>
                <div class="talent-card-body">
                    <h3 class="talent-name">${talent.name}</h3>
                    <p class="talent-role-text">${talent.role}</p>
                    <div class="talent-stats-row">
                        <span class="rating-badge">⭐ ${talent.rating}</span>
                        <span class="review-count">(${talent.reviews} reviews)</span>
                    </div>
                    <div class="talent-meta">
                        <span>📍 ${talent.location}</span>
                        <span class="price-text">${talent.hourlyRate}</span>
                    </div>
                    <div class="talent-skills">
                        ${talent.skills.slice(0, 3).map(skill => `<span class="skill-tag-small">${skill}</span>`).join('')}
                    </div>
                    <button class="btn-view-profile-user">View Profile</button>
                </div>
            </div>
        `).join('');
    }
}

function renderUserProfile() {
    window.scrollTo(0, 0);
    document.body.className = 'profile-active user-module';
    
    app.innerHTML = `
        <nav class="navbar">
            <div class="nav-left">
                <button class="btn-corner-back" onclick="renderUserDashboard()">⬅️</button>
                <div class="nav-logo" onclick="renderUserDashboard()" style="cursor: pointer;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                    <span>UserHub</span>
                </div>
            </div>
            <div class="nav-right">
                <button class="btn-logout" onclick="location.reload()">
                    <span>🚪 Logout</span>
                </button>
            </div>
        </nav>

        <div class="profile-container">
            <div class="profile-header">
                <div class="profile-header-main">
                    <div class="profile-avatar" style="background: linear-gradient(135deg, #4F46E5, #3B82F6);">JD</div>
                    <div class="profile-info-header">
                        <h1>John Doe</h1>
                        <p class="profile-tag">Professional Event Organizer</p>
                        <div class="profile-stats">
                            <div class="stat-item"><strong>12</strong> Events Organized</div>
                            <div class="stat-item"><strong>4</strong> Active Requests</div>
                            <div class="stat-item"><strong>4.8</strong> Host Rating</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="profile-main-grid">
                <div class="profile-left">
                    <div class="info-card">
                        <h3>About Me</h3>
                        <p>Independent event planner specializing in corporate galas, private parties, and weddings. Dedicated to connecting great local talent with unforgettable moments.</p>
                    </div>
                    <div class="info-card">
                        <h3>Contact Details</h3>
                        <div class="info-item"><span>📧</span> john.doe@example.com</div>
                        <div class="info-item"><span>📱</span> +1 (555) 987-6543</div>
                    </div>
                </div>
                <div class="profile-right">
                     <div class="info-card">
                        <h3>My Recent Bookings</h3>
                        <p style="color: #64748B; font-style: italic;">No active bookings yet. Start searching to hire your next talent!</p>
                        <button class="btn-primary" style="margin-top: 20px; width: 100%;" onclick="renderUserDashboard()">Explore Talents</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderApplyForm(index) {
    const event = MOCK_EVENTS[index];
    window.scrollTo(0, 0);
    
    app.innerHTML = `
        <nav class="navbar">
            <div class="nav-left">
                <div class="nav-logo" onclick="renderTalentDashboard()" style="cursor: pointer;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"/>
                    </svg>
                    <span>TalentHub</span>
                </div>
            </div>
        </nav>

        <div class="details-container">
            <div class="apply-card">
                <div style="text-align: center; margin-bottom: 32px;">
                    <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 12px;">Submit Application</h1>
                    <p style="color: #64748B;">Applying for: <strong style="color: #0F172A;">${event.title}</strong></p>
                </div>

                <form id="applyForm">
                    <div class="form-group">
                        <label class="form-label" style="font-weight: 700;">Your Quote ($)</label>
                        <div class="quote-input-container">
                            <span class="quote-symbol">$</span>
                            <input type="number" class="quote-input" placeholder="0.00" required min="1">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-weight: 700;">Cover Note</label>
                        <textarea class="cover-note" placeholder="Tell the organizer why you are the best fit for this event..." required></textarea>
                    </div>

                    <div style="display: flex; gap: 16px;">
                        <button type="button" class="btn-secondary" style="flex: 1;" onclick="renderEventDetails(${index})">Cancel</button>
                        <button type="submit" class="btn-submit-app" style="flex: 2;">
                            <span>🚀 Send Application</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.getElementById('applyForm').onsubmit = (e) => {
        e.preventDefault();
        alert(`Application for "${event.title}" sent successfully! The organizer will review your profile and get back to you.`);
        renderTalentDashboard();
    };
}

// --- Talent Profile Rendering ---

const TALENT_DATA = {
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    experience: "5+ years",
    skills: ["Musician", "Singer", "DJ", "MC/Host"],
    bio: "Professional musician and multi-instrumentalist with over 5 years of experience performing at high-end corporate events, weddings, and festivals. Specialized in creating the perfect atmosphere for any occasion."
};

function renderTalentProfile() {
    window.scrollTo(0, 0);
    document.body.className = 'dashboard-active'; // Keep dashboard theme

    app.innerHTML = `
        <nav class="navbar">
            <div class="nav-left">
                <button class="btn-corner-back" onclick="renderTalentDashboard()">⬅️</button>
                <div class="nav-logo" onclick="renderTalentDashboard()" style="cursor: pointer;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"/>
                    </svg>
                    <span>TalentHub</span>
                </div>
            </div>
            <div class="nav-right">
                <div class="profile-circle">AT</div>
            </div>
        </nav>

        <div class="profile-container">

            <div class="profile-header-card">
                <div class="profile-avatar-large">AT</div>
                <div class="profile-header-info">
                    <h1>${TALENT_DATA.name}</h1>
                    <p>Professional Artist & Performer</p>
                    <div class="label-verified-large">
                        <span>✅</span> Verified Talent
                    </div>
                    <button class="btn-logout" onclick="location.reload()" style="margin-top: 20px;">
                        <span>🚪</span> Logout
                    </button>
                </div>
            </div>

            <div class="profile-main-grid">
                <div class="info-left">
                    <div class="info-card">
                        <h2 class="info-card-title">👤 Personal Information</h2>
                        <div class="info-grid">
                            <div class="info-item">
                                <label>Full Name</label>
                                <p>${TALENT_DATA.name}</p>
                            </div>
                            <div class="info-item">
                                <label>Email Address</label>
                                <p>${TALENT_DATA.email}</p>
                            </div>
                            <div class="info-item">
                                <label>Phone Number</label>
                                <p>${TALENT_DATA.phone}</p>
                            </div>
                            <div class="info-item">
                                <label>Location</label>
                                <p>${TALENT_DATA.location}</p>
                            </div>
                        </div>
                    </div>

                    <div class="info-card">
                        <h2 class="info-card-title">💼 Professional Details</h2>
                        <div class="info-item" style="margin-bottom: 24px;">
                            <label>Years of Experience</label>
                            <p>${TALENT_DATA.experience}</p>
                        </div>
                        <div class="info-item" style="margin-bottom: 24px;">
                            <label>Bio</label>
                            <p style="font-weight: 500; line-height: 1.6; color: #64748B;">${TALENT_DATA.bio}</p>
                        </div>
                        <label class="req-skills-title">My Skills</label>
                        <div class="skills-list-large">
                            ${TALENT_DATA.skills.map(skill => `<span class="skill-tag-large">${skill}</span>`).join('')}
                        </div>
                    </div>
                </div>

                <div class="info-right">
                    <div class="info-card" style="padding: 0; overflow: hidden;">
                        <div class="video-showcase-card">
                            <div class="video-play-btn">▶️</div>
                            <h3 style="font-size: 18px; font-weight: 700;">Verification reel.mp4</h3>
                            <p style="font-size: 14px; opacity: 0.7; margin-top: 8px;">Uploaded on March 28, 2026</p>
                        </div>
                    </div>

                    <div class="info-card">
                        <h2 class="info-card-title" style="font-size: 18px;">📊 Profile Stats</h2>
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: 600; color: #64748B;">Rating</span>
                                <span style="font-weight: 700; color: #F59E0B;">⭐ 4.9 (24 Reviews)</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: 600; color: #64748B;">Completion Rate</span>
                                <span style="font-weight: 700; color: #10B981;">98%</span>
                            </div>
                             <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: 600; color: #64748B;">Avg. Response</span>
                                <span style="font-weight: 700; color: #6366F1;">&lt; 2 hours</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
