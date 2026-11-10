const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const getHeaders = (includeAuth = false) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (includeAuth) {
    const token = localStorage.getItem('portfolio_admin_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

export const api = {
  // Profile
  getProfile: async () => {
    try {
      const res = await fetch(`${BASE_URL}/profile`);
      if (!res.ok) throw new Error('Failed to fetch profile');
      return await res.json();
    } catch (err) {
      console.warn('API getProfile fallback triggered:', err.message);
      return { success: true, data: defaultProfile };
    }
  },

  updateProfile: async (data) => {
    const res = await fetch(`${BASE_URL}/profile`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  // Projects
  getProjects: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${BASE_URL}/projects${query ? `?${query}` : ''}`);
      if (!res.ok) throw new Error('Failed to fetch projects');
      return await res.json();
    } catch (err) {
      console.warn('API getProjects fallback triggered:', err.message);
      return { success: true, count: defaultProjects.length, data: defaultProjects };
    }
  },

  getProjectById: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/projects/${id}`);
      if (!res.ok) throw new Error('Failed to fetch project details');
      return await res.json();
    } catch (err) {
      console.warn('API getProjectById fallback triggered:', err.message);
      const cleanId = id.toLowerCase().replace(/[-_\s]/g, '');
      const proj = defaultProjects.find((p) => {
        const cleanSlug = (p.slug || '').toLowerCase().replace(/[-_\s]/g, '');
        const cleanTitle = (p.title || '').toLowerCase().replace(/[-_\s]/g, '');
        return (
          p._id === id ||
          p.slug === id.toLowerCase() ||
          cleanSlug === cleanId ||
          cleanTitle === cleanId ||
          (cleanId === 'mobilesite' && cleanSlug === 'mobiverseindia')
        );
      });
      if (proj) return { success: true, data: proj };
      throw err;
    }
  },

  createProject: async (data) => {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  updateProject: async (id, data) => {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  deleteProject: async (id) => {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return await res.json();
  },

  // Skills
  getSkills: async (category = '') => {
    try {
      const url = category ? `${BASE_URL}/skills?category=${category}` : `${BASE_URL}/skills`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch skills');
      return await res.json();
    } catch (err) {
      console.warn('API getSkills fallback triggered:', err.message);
      return { success: true, count: defaultSkills.length, data: defaultSkills };
    }
  },

  createSkill: async (data) => {
    const res = await fetch(`${BASE_URL}/skills`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  updateSkill: async (id, data) => {
    const res = await fetch(`${BASE_URL}/skills/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  deleteSkill: async (id) => {
    const res = await fetch(`${BASE_URL}/skills/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return await res.json();
  },

  // Certifications
  getCertifications: async () => {
    try {
      const res = await fetch(`${BASE_URL}/certifications`);
      if (!res.ok) throw new Error('Failed to fetch certifications');
      return await res.json();
    } catch (err) {
      console.warn('API getCertifications fallback triggered:', err.message);
      return { success: true, count: defaultCertifications.length, data: defaultCertifications };
    }
  },

  createCertification: async (data) => {
    const res = await fetch(`${BASE_URL}/certifications`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  updateCertification: async (id, data) => {
    const res = await fetch(`${BASE_URL}/certifications/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  deleteCertification: async (id) => {
    const res = await fetch(`${BASE_URL}/certifications/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return await res.json();
  },

  // Education
  getEducation: async () => {
    try {
      const res = await fetch(`${BASE_URL}/education`);
      if (!res.ok) throw new Error('Failed to fetch education');
      return await res.json();
    } catch (err) {
      console.warn('API getEducation fallback triggered:', err.message);
      return { success: true, count: defaultEducation.length, data: defaultEducation };
    }
  },

  createEducation: async (data) => {
    const res = await fetch(`${BASE_URL}/education`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  updateEducation: async (id, data) => {
    const res = await fetch(`${BASE_URL}/education/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  deleteEducation: async (id) => {
    const res = await fetch(`${BASE_URL}/education/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return await res.json();
  },

  // Contact
  submitContact: async (messageData) => {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(messageData)
    });
    return await res.json();
  },

  getContactMessages: async () => {
    const res = await fetch(`${BASE_URL}/contact`, {
      headers: getHeaders(true)
    });
    return await res.json();
  },

  markMessageRead: async (id, read) => {
    const res = await fetch(`${BASE_URL}/contact/${id}/read`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ read })
    });
    return await res.json();
  },

  deleteContactMessage: async (id) => {
    const res = await fetch(`${BASE_URL}/contact/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return await res.json();
  },

  // Admin
  adminLogin: async (credentials) => {
    const res = await fetch(`${BASE_URL}/admin/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(credentials)
    });
    return await res.json();
  }
};

// Fallback defaults matching resume and prompt
export const defaultProfile = {
  name: 'Siddam Anjaiah',
  title: 'React Frontend Developer | Junior Full Stack (React + Node.js)',
  subtitle:
    'Building responsive, accessible and user-focused web applications with React, JavaScript and modern full-stack technologies.',
  summary:
    'Entry-level React developer who has built and deployed four REST API-driven applications, including ServiceNest, a full-stack service marketplace with a React frontend, Node.js/Express API, SQLite database, JWT authentication and Razorpay payments. Strong in React Hooks, Context API, protected routing, responsive design and accessible, test-ready markup (React Testing Library). Seeking a Junior React Developer, Frontend Developer or Junior Full Stack role.',
  objective:
    'Seeking a Junior React Developer, Frontend Developer or Junior Full Stack role where I can apply my React, JavaScript, REST API and full-stack development skills while contributing to high-impact products and growing as a software engineer.',
  email: 'anjisiddam01@gmail.com',
  phone: '9390098364',
  location: 'Mancherial, Telangana | Open to relocate: Hyderabad, Bengaluru, Chennai',
  github: 'https://github.com/Anji0522',
  linkedin: 'https://www.linkedin.com/in/siddam-anjaiah/',
  resumeUrl: '/assets/Siddam_Anjaiah_React_Frontend_Resume.pdf',
  profileImage: '/assets/profile-image.jpeg',
  targetRoles: [
    'Junior React Developer',
    'Frontend Developer',
    'Junior Full Stack (React + Node.js)',
    'React Developer'
  ],
  strengths: [
    'Problem Solving',
    'Continuous Learning',
    'React Development',
    'API Integration',
    'Responsive Design',
    'Debugging',
    'Real-World Application Development',
    'Adaptability',
    'UI Attention',
    'Full-Stack Development'
  ],
  improvingAreas: [
    'Advanced backend architecture',
    'System design',
    'Advanced testing',
    'Cloud deployment',
    'Full-stack architecture',
    'Problem-solving speed'
  ],
  interests: [
    'Web Development',
    'React Development',
    'UI/UX',
    'Full-Stack Development',
    'REST API Development',
    'Learning New Technologies',
    'Real-World Application Development',
    'GitHub',
    'Problem Solving'
  ],
  stats: {
    apiApps: '8+',
    restApis: '25+',
    projectsCount: '11',
    architecture: 'MERN & PERN'
  }
};

export const defaultProjects = [
  {
    _id: 'proj-1',
    title: 'ServiceNest',
    slug: 'servicenest',
    subtitle: 'Full Stack Service Marketplace with Role-Based Accounts and Payments',
    description:
      'Full Stack Service Marketplace with Role-Based Accounts, 15+ REST endpoints, SQLite database, JWT auth, and Razorpay payment integration.',
    longDescription:
      'ServiceNest is a production-grade full-stack service marketplace connecting local service customers with certified independent providers. Built with a responsive React frontend and a Node.js / Express backend with 15+ REST endpoints, it incorporates role-based access control (Customer vs. Provider), idempotent booking creation, itemized pricing calculations, persistent in-app messaging, automated cash-after-service handling, and online Razorpay payment checkout with cryptographic webhook verification.',
    problemSolved:
      'Local service bookings often suffer from broken communication, unverified providers, pricing ambiguity, and double-booking glitches. ServiceNest resolves these challenges by introducing strict role isolation, idempotent booking pipelines, transparent hourly rate breakdowns, live status updates, and tamper-proof payment verification.',
    technologies: ['React', 'Vite', 'Node.js', 'Express.js', 'SQLite', 'JWT', 'bcrypt', 'Razorpay', 'GitHub Actions'],
    features: [
      'Customer accounts & Provider accounts with role-based access control',
      'Role-protected customer and provider dashboards',
      'Provider profiles & customizable service listings',
      'Live catalogue search, category filtering, and sorting',
      'Backed by SQLite database with 15+ REST endpoints',
      'Secure JWT authentication with signed HS256 tokens and bcrypt password hashing',
      'Email validation, international phone validation, and duplicate prevention',
      'Protected sessions with cross-tab synchronization and auto-logout on expiration',
      'Booking system with Idempotency-Key header to prevent duplicate transactions',
      'Role-isolated booking history & status management',
      'Participant-only chat that auto-refreshes for active engagements',
      'Dual payment support: Cash-after-service & Razorpay Checkout with webhook verification',
      'Duplicate event protection and automated payment reconciliation',
      'Automated CI/CD with GitHub Actions, deployed on Render & GitHub Pages'
    ],
    image: '/assets/projects/servicenest.png',
    githubUrl: 'https://github.com/Anji0522/ServiceNest',
    liveUrl: 'https://anji0522.github.io/ServiceNest/',
    featured: true,
    category: 'Full-Stack',
    frontendArchitecture:
      'Built with React and Vite for blazing fast hot module replacement and bundle optimization. Implemented clean modular architecture, custom hooks for session management, Context API for state synchronization across components and browser tabs, responsive CSS Grid and Flexbox layouts.',
    backendArchitecture:
      'Express.js RESTful API architecture following controller-service-repository patterns. SQLite database with parameterized queries to prevent SQL injection. HS256 JWT tokens with revocation checks, bcrypt password hashing, and custom middleware for authentication, authorization, and error handling.',
    apis: [
      'POST /api/auth/register - User registration with validation',
      'POST /api/auth/login - Credential verification and JWT issuance',
      'GET /api/services - Catalogue listing with search and category filters',
      'POST /api/bookings - Idempotent booking creation',
      'GET /api/bookings - Role-filtered booking history',
      'POST /api/payments/razorpay/create-order - Order initialization',
      'POST /api/payments/razorpay/verify - HMAC SHA256 signature verification',
      'POST /api/payments/webhook - Asynchronous webhook payment confirmation'
    ],
    authentication: 'JWT (JSON Web Tokens) with HS256 signing, stored securely, validated via custom auth middleware with role-based permission gates.',
    database: 'SQLite database with schema migrations, relational foreign keys, indexes, and parameterized query execution.',
    deployment: 'Backend deployed on Render with environment variable isolation; frontend deployed with automated GitHub Actions CI/CD to GitHub Pages.',
    challenges:
      'Handling payment webhook verification securely without race conditions, and designing an idempotent booking system that guarantees no double-charging even if network packets are dropped or retried by the browser.',
    whatILearned:
      'Mastered end-to-end full-stack integration, payment gateway security (HMAC signature verification, webhook replay attack mitigation), role-based middleware architecture, and production CI/CD workflows.',
    order: 1
  },
  {
    _id: 'proj-2',
    title: 'MobiVerse India',
    slug: 'mobiverse-india',
    subtitle: 'Production-Quality MERN Marketplace for Mobiles & Accessories',
    description:
      'High-performance MERN marketplace featuring 116+ smartphones, 696+ accessories, 4-way spec comparison, doorstep repair bookings, trade-in valuations, and Razorpay payments.',
    longDescription:
      'MobiVerse India is a production-quality, high-performance MERN marketplace where Indian consumers can browse, compare, and purchase smartphones and accessories officially sold in India. It also connects buyers with authorized service providers for doorstep repairs, screen replacements, and verified trade-ins. Built with React 18, Vite, Express, and MongoDB with Razorpay payment integration.',
    problemSolved:
      'Shopping for smartphones in India is fragmented across disparate platforms without localized specs (Indian 5G bands, AnTuTu scores, GST invoices) or trustworthy repair booking options. MobiVerse India unifies transparent specs, dynamic multi-device comparison, verified doorstep repair scheduling, and instant trade-in valuation into one platform.',
    technologies: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'bcrypt', 'Razorpay', 'Surge'],
    features: [
      '116+ real verified Indian smartphones across 15+ brands with 696+ compatible accessories',
      'Accurate Indian specs: display refresh rate, AnTuTu benchmarks, 5G band support (n28, n78)',
      'Multi-device comparison table for up to 4 phones side-by-side with sticky headers and diff highlighting',
      'Persistent shopping cart with dynamic Indian 18% GST breakdown and free delivery thresholds',
      'Doorstep repair booking flow with live price estimation for screen and battery replacements',
      'Certified trade-in valuation engine calculating real-time exchange discounts',
      'PCI-DSS compliant Razorpay hosted checkout supporting UPI, Cards, Net Banking, and COD',
      'Automated price-drop tracking and price history alerts across models',
      'Deployed to Surge with GitHub Actions automated CI/CD pipeline'
    ],
    image: '/assets/projects/mobiverse.png',
    githubUrl: 'https://github.com/Anji0522/mobileSite',
    liveUrl: 'https://mobiverse-india.surge.sh',
    featured: false,
    category: 'Full-Stack',
    frontendArchitecture:
      'Architected with React 18, Vite, and custom CSS Design Tokens with CSS Grid and Flexbox layouts. Implemented multi-criteria device filtering, debounced search, comparison drawer state, and cart persistence.',
    backendArchitecture:
      'Express.js RESTful API backed by MongoDB / Mongoose with role-based access control, rate limiting, and Razorpay webhook validation.',
    apis: [
      'GET /api/v1/products - Smartphone and accessory catalogue with brand and price filters',
      'GET /api/v1/products/:id - Detailed product specification and compatible accessories',
      'POST /api/v1/repairs/book - Doorstep service repair scheduling and estimation',
      'POST /api/v1/trade-in/estimate - Algorithmic device valuation based on physical condition',
      'POST /api/v1/orders/checkout - Razorpay order creation and payment verification'
    ],
    authentication: 'JWT token authorization with role-based access control (Customer, Service Provider, Admin).',
    database: 'MongoDB with Mongoose schemas for products, accessories, repair bookings, orders, and price history.',
    deployment: 'Frontend deployed to Surge with automated GitHub Actions CI; backend and database on MongoDB Atlas.',
    challenges:
      'Designing a dynamic comparison matrix that accurately aligns heterogeneous device specs across 4 items simultaneously and managing complex trade-in valuation formulas.',
    whatILearned:
      'Gained advanced mastery in building large-scale e-commerce architectures, multi-entity catalog schemas, repair workflow scheduling, and payment webhook security.',
    order: 2
  },
  {
    _id: 'proj-3',
    title: 'Book Hub',
    slug: 'book-hub',
    subtitle: 'Book Discovery Web Application with Cookie-Based JWT Authentication',
    description:
      'A comprehensive book discovery application featuring cookie-based JWT authentication, bookshelf filtering, title search, and responsive carousels.',
    longDescription:
      'Book Hub is a feature-rich single-page book discovery application designed for avid readers to explore top-rated books, search across categories, and review comprehensive book details. Built with React and React Router, it utilizes cookie-based authentication via js-cookie, ensuring secure sessions across reloads and route protections.',
    problemSolved:
      'Providing users with an intuitive, responsive interface to discover books with instant search, category filtering, and reliable state feedback (loaders, empty results, network failure fallbacks with retry buttons).',
    technologies: ['React', 'React Router', 'react-slick', 'react-icons', 'js-cookie', 'REST APIs'],
    features: [
      '5-route single page application with protected routes',
      'Cookie-based JWT authentication and reusable ProtectedRoute component',
      'Bookshelf filtering and keyword search combined into single API queries',
      'useCallback and useEffect optimization to eliminate redundant re-renders',
      'Responsive react-slick carousel for top-rated books showcase',
      'Robust loading, failure (Try Again button), and empty search result states',
      'Passed strict React Testing Library suites for semantic markup and test IDs'
    ],
    image: '/assets/projects/bookhub.png',
    githubUrl: 'https://github.com/Anji0522/bookhub',
    liveUrl: 'https://anji0522.github.io/bookhub/',
    featured: false,
    category: 'Frontend',
    frontendArchitecture:
      'Single Page Application architecture with React Router v5/v6. Reusable layout components, cookie persistence using js-cookie, and component lifecycle state machines (INITIAL, IN_PROGRESS, SUCCESS, FAILURE).',
    backendArchitecture: 'Integrated with authenticated third-party RESTful APIs via fetch with Bearer token authentication headers.',
    apis: [
      'POST /login - Authenticate user and obtain auth cookie',
      'GET /books/top-rated - Fetch curated list of top-rated books for slider',
      'GET /books?shelf=&search= - Filtered and searched book collection',
      'GET /books/:id - Complete book metadata, reviews, and author information'
    ],
    authentication: 'JWT token stored in cookies via js-cookie, validated on route changes by ProtectedRoute wrapper.',
    database: 'REST API backend data source with structured JSON payloads.',
    deployment: 'Deployed on GitHub Pages with client-side routing fallback configuration.',
    challenges:
      'Fine-tuning react-slick slider responsiveness across varying breakpoints and satisfying stringent React Testing Library timing and accessibility expectations.',
    whatILearned:
      'Gained deep experience with cookie-based session management, complex asynchronous UI states, and writing accessible, easily testable React components.',
    order: 3
  },
  {
    _id: 'proj-4',
    title: 'Jobby App',
    slug: 'jobby-app',
    subtitle: 'Job Search Application with Combined Multi-Criteria Filtering',
    description:
      'Job discovery platform featuring multi-criteria filter queries, user profiles, detailed job specifications, and similar job recommendations.',
    longDescription:
      'Jobby App is a dedicated employment discovery platform created to streamline the job hunt. It features JWT login, two-way route protection, comprehensive user profiles, multi-faceted filtering (merging keyword search, multiple checkbox employment types, and radio button salary ranges into a single query string), along with detailed job specification pages displaying company profiles, skill tags, life-at-company highlights, and similar job cards.',
    problemSolved:
      'Job seekers frequently need to combine diverse search parameters (location, salary, employment nature) without the UI freezing or triggering conflicting API calls. Jobby App unifies all filters into a single dynamic query pipeline.',
    technologies: ['React', 'React Router', 'js-cookie', 'react-icons', 'REST APIs'],
    features: [
      'Secure JWT login with instant validation and descriptive error messages',
      'Two-way route protection (unauthenticated redirected to login; authenticated redirected to home)',
      'Unified filter state combining keyword search, multiple employment types, and salary brackets',
      'Detailed Job View with company info, package details, skill chips, and life at company',
      'Similar jobs recommendation grid with responsive layout',
      'Comprehensive state handling: Loader, Network Failure, Retry Action, and No-Jobs-Found states',
      'Strict accessibility compliance with semantic HTML and data-testid attributes'
    ],
    image: '/assets/projects/jobbyapp.png',
    githubUrl: 'https://github.com/Anji0522/JobbyApp',
    liveUrl: 'https://anji0522.github.io/JobbyApp/',
    featured: false,
    category: 'Frontend',
    frontendArchitecture:
      'Built with modular React components, custom hooks for query parameter debouncing, and state synchronization across complex multi-input filter controls.',
    backendArchitecture: 'Communicates with RESTful job search services using async/await and standardized HTTP headers.',
    apis: [
      'POST /login - User authentication',
      'GET /profile - User profile information',
      'GET /jobs?employment_type=&minimum_package=&search= - Filtered job listings',
      'GET /jobs/:id - Comprehensive job details and similar job cards'
    ],
    authentication: 'JWT stored in browser cookies with automatic expiry verification.',
    database: 'REST API backend with persistent job database.',
    deployment: 'Deployed on GitHub Pages with automated build scripts.',
    challenges:
      'Merging disparate filter components (checkbox arrays, radio values, debounced search strings) into a clean, reactive query string without triggering race conditions.',
    whatILearned:
      'Advanced query string orchestration, handling multiple concurrent API calls (Profile + Jobs), and robust error boundary patterns.',
    order: 4
  },
  {
    _id: 'proj-5',
    title: 'Nxt Watch',
    slug: 'nxt-watch',
    subtitle: 'Video Streaming Application with Dynamic Light/Dark Theming',
    description:
      'YouTube-inspired video streaming platform featuring light and dark theming via Styled Components, Context API state management, and video playback.',
    longDescription:
      'Nxt Watch is an immersive video streaming application that models YouTube. It implements seamless light and dark mode toggling using Styled Components and React Context API. Users can browse Home (with live search), Trending, and Gaming sections, watch videos using an embedded react-player, toggle mutually exclusive Like/Dislike states, bookmark videos to a persistent Saved Videos collection, and navigate safely with protected routes.',
    problemSolved:
      'Building a video platform requires persistent global state (theme, saved videos list, like/dislike interactions) across different routes without props drilling or unnecessary re-renders.',
    technologies: ['React', 'React Router', 'Styled Components', 'Context API', 'react-player', 'reactjs-popup', 'date-fns', 'REST APIs'],
    features: [
      'Global state management with Context API for theme, saved videos, and user likes/dislikes',
      'Dynamic Light and Dark theme styling implemented with Styled Components',
      'JWT authentication with protected routes and cookie management',
      'Home section with keyword search and banner dismissal',
      'Trending and Gaming dedicated feeds with tailored card layouts',
      'Interactive Video Player with react-player and relative timestamps using date-fns',
      'Mutually exclusive Like and Dislike toggle actions',
      'Save and Unsave video functionality with dedicated Saved Videos route',
      'Custom interactive logout confirmation modal built using reactjs-popup',
      'Full responsive design optimized for mobile, tablet, and desktop screens'
    ],
    image: '/assets/projects/nxtwatch.png',
    githubUrl: 'https://github.com/Anji0522/NxtWatch',
    liveUrl: 'https://nxtwatch-anjisiddam01.surge.sh/',
    featured: false,
    category: 'Frontend',
    frontendArchitecture:
      'Context API for centralized app-level state; Styled Components for theme token injection and scoped styling; React Router for route hierarchy and nested protected layouts.',
    backendArchitecture: 'RESTful streaming API integration with Bearer authorization.',
    apis: [
      'POST /login - Auth endpoint',
      'GET /videos/all?search= - Home video catalogue',
      'GET /videos/trending - Curated trending video list',
      'GET /videos/gaming - Gaming specific clips',
      'GET /videos/:id - Individual video streaming metadata'
    ],
    authentication: 'JWT authentication with token verification on all protected views.',
    database: 'Cloud REST API video database.',
    deployment: 'Deployed on Surge with custom routing configuration.',
    challenges:
      'Synchronizing the active theme and saved video collection across disparate page routes without unnecessary DOM recalculations.',
    whatILearned:
      'Mastered Styled Components theme theming, React Context design patterns, and handling multimedia playback components in React.',
    order: 5
  },
  {
    _id: 'proj-6',
    title: 'Twitter Clone — Backend REST API',
    slug: 'twitter-clone-backend',
    subtitle: 'Scalable REST API with Relational SQL Joins, JWT Auth, and Aggregates',
    description:
      'Production-ready Node.js and Express backend API featuring 11 RESTful endpoints, bcrypt password encryption, JWT authorization, and relational SQLite queries.',
    longDescription:
      'Twitter Clone Backend is a robust RESTful API built from the ground up using Node.js, Express.js, and SQLite. It provides complete social networking capability across 5 relational tables (user, follower, tweet, reply, like). It includes 11 REST endpoints supporting user registration, authentication, following networks, custom home feeds, tweet creation, replies, likes, and secure tweet deletion with strict ownership verification.',
    problemSolved:
      'Social media backends require strict access control: users must only view feeds from accounts they follow and only delete their own content, all while computing aggregations (likes, replies) with high database efficiency.',
    technologies: ['Node.js', 'Express.js', 'SQLite', 'JWT', 'bcrypt', 'REST APIs'],
    features: [
      '11 fully tested REST APIs covering all core social networking workflows',
      'Secure user registration with bcrypt password hashing and input sanitization',
      'JWT authentication middleware returning 401 for invalid tokens',
      'Role and ownership-based authorization: users can only delete tweets they authored',
      'Social graph privacy: users can only access tweet details, likes, and replies if they follow the author',
      'Personalized feed API delivering the latest 4 tweets from followed users with computed stats',
      'Complex SQL queries utilizing INNER JOIN, LEFT JOIN, WHERE clauses, and COUNT() aggregates',
      'Standardized HTTP status codes (200, 400, 401, 404, 500) and structured JSON error responses'
    ],
    image: '/assets/projects/twitterbackend.png',
    githubUrl: 'https://github.com/Anji0522/twitterNodeJS',
    liveUrl: null,
    featured: false,
    category: 'Backend',
    frontendArchitecture: 'REST API backend designed for any mobile or web client integration.',
    backendArchitecture:
      'Layered Express architecture with dedicated router files, authentication middleware, controller functions, and SQLite database driver with asynchronous promise execution.',
    apis: [
      'POST /register/ - Register new user with password hash',
      'POST /login/ - Authenticate credentials and generate JWT',
      'GET /user/tweets/feed/ - 4 most recent tweets from followed users with reply and like counts',
      'GET /user/following/ - List of users the authenticated user follows',
      'GET /user/followers/ - List of users following the authenticated user',
      'GET /tweets/:tweetId/ - Tweet details (only if following author)',
      'GET /tweets/:tweetId/likes/ - List of users who liked the tweet (only if following author)',
      'GET /tweets/:tweetId/replies/ - List of replies on the tweet (only if following author)',
      'GET /user/tweets/ - All tweets posted by the authenticated user with aggregate stats',
      'POST /user/tweets/ - Create and publish a new tweet',
      'DELETE /tweets/:tweetId/ - Delete tweet with strict author-ownership validation'
    ],
    authentication: 'JWT (JSON Web Token) with bearer authorization middleware and user payload extraction.',
    database: 'SQLite relational database with foreign key constraints, indexes, and aggregate queries.',
    deployment: 'Configured for deployment on Render and cloud Node.js container environments.',
    challenges:
      'Writing optimized SQL queries across multiple joined tables to calculate dynamic like and reply counts without causing n+1 query performance bottlenecks.',
    whatILearned:
      'Deepened expertise in relational database modeling, writing complex SQL joins, building custom security middleware, and designing RESTful API contracts.',
    order: 6
  },
  {
    _id: 'proj-7',
    title: 'MERN Developer Portfolio',
    slug: 'siddam-anjaiah-portfolio',
    subtitle: 'Full-Stack Portfolio with Live GitHub Sync Engine & Admin CMS',
    description:
      'Production MERN developer portfolio engineered with React 18, Express REST APIs, MongoDB Mongoose, live GitHub API synchronization, and admin JWT management.',
    longDescription:
      'A production-grade full-stack portfolio built to showcase real-world applications and verified skills. Features a direct live synchronization engine with the GitHub API that detects added, updated, or deleted repositories in real time, a dynamic project filter and search engine, JWT-protected administrative management dashboard, verified resume PDF viewer, and accessible UI with dark/light mode.',
    problemSolved:
      'Standard static portfolios become outdated the moment new repositories are created or updated on GitHub. This portfolio solves that with a real-time GitHub sync engine, automatic diff detection, and full-stack administrative CRUD controls.',
    technologies: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Framer Motion', 'GitHub Actions'],
    features: [
      'Real-time GitHub synchronization with 60-second polling and automatic diff detection',
      'Interactive search and multi-category filtering (Full-Stack, Frontend, Backend) across technologies',
      'Admin dashboard secured by bcrypt password encryption and HS256 JWT tokens',
      'Embedded verified PDF resume viewer with direct in-browser inspection and download',
      'Dark and Light theme toggle persisted in localStorage and synced with system preferences',
      'NxtWave CCBP verified certification credentials with official validation links',
      'Secure contact form with rate-limiting protection and celebratory animations',
      'Automated GitHub Actions CI/CD deploying directly to GitHub Pages'
    ],
    image: '/assets/projects/servicenest.png',
    githubUrl: 'https://github.com/Anji0522/siddam-anjaiah-portfolio',
    liveUrl: 'https://anji0522.github.io/siddam-anjaiah-portfolio/',
    featured: false,
    category: 'Full-Stack',
    frontendArchitecture:
      'Engineered with React 18, Vite, Framer Motion for smooth animations, custom CSS Design Tokens, and HashRouter for seamless GitHub Pages routing.',
    backendArchitecture:
      'Express.js RESTful API with Helmet security headers, CORS protection, express-rate-limit, and Mongoose ORM models with in-memory database fallback.',
    apis: [
      'GET /api/profile - Developer profile and contact information',
      'GET /api/projects - Complete project catalogue with category filtering',
      'GET /api/skills - Categorized technical skills inventory',
      'POST /api/contact - Validated contact message submission',
      'POST /api/admin/login - Admin authentication and JWT token issuance'
    ],
    authentication: 'JWT authentication with HS256 signing for administrative routes.',
    database: 'MongoDB with Mongoose schemas and development in-memory fallback.',
    deployment: 'Frontend automated CI/CD deployment via GitHub Actions to GitHub Pages; backend ready for Render deployment.',
    challenges:
      'Implementing zero-downtime database fallback for seamless static deployment while retaining full backend API and admin capabilities.',
    whatILearned:
      'End-to-end deployment pipelines, live third-party API synchronization with polling and diffing, and accessible responsive component design.',
    order: 7
  },
  {
    _id: 'proj-8',
    title: 'Expense Tracker',
    slug: 'expense-tracker',
    subtitle: 'Full-Stack Personal Finance & Budgeting Platform (React + PostgreSQL)',
    description:
      'Full-stack personal finance and expense tracker built with React, Node.js, Express, and Neon PostgreSQL featuring budget tracking, transaction analytics, and category breakdowns.',
    longDescription:
      'Expense Tracker is a production-ready, full-stack personal finance platform engineered with a React frontend and an Express REST API connected to a Neon cloud PostgreSQL database. It delivers comprehensive financial management with categorized transaction logging, monthly budget targets, recurring expense calculations, and interactive visual analytics powered by Chart.js / Recharts. The application features robust data validation, JWT authentication, and automated database migrations.',
    problemSolved:
      'Managing personal finances across disparate apps often results in missing data, lack of visual insight, and clunky interfaces. Expense Tracker provides an intuitive, real-time dashboard that instantly visualizes cash flow, spending trends, and budget adherence.',
    technologies: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Neon', 'JWT', 'Chart.js', 'Vercel', 'Render'],
    features: [
      'Comprehensive financial dashboard with real-time balance and net savings analytics',
      'Transaction logging with income, expense, category, date, and receipt attachments',
      'Monthly budget goals with interactive progress bars and alert thresholds',
      'Relational PostgreSQL database architecture hosted on Neon Serverless Postgres',
      'Secure JWT authentication with password hashing and session management',
      'Responsive design with light/dark theming and accessible data tables',
      'Production deployment with Frontend on Vercel and REST API on Render'
    ],
    image: '/assets/projects/servicenest.png',
    githubUrl: 'https://github.com/Anji0522/expense-tracker',
    liveUrl: 'https://expense-tracker-nu-nine-16.vercel.app/',
    featured: false,
    category: 'Full-Stack',
    frontendArchitecture:
      'Engineered with React, Vite, and modern CSS custom properties. Uses custom hooks for data fetching, responsive data tables, and dynamic chart visualizations.',
    backendArchitecture:
      'Layered Node.js and Express REST API architecture with parameterized SQL queries preventing SQL injection, pooled Neon PostgreSQL connections, and error-handling middleware.',
    apis: [
      'POST /api/auth/login - User authentication & JWT issuance',
      'GET /api/transactions - Filtered transaction history by date and category',
      'POST /api/transactions - Record new income or expense transaction',
      'GET /api/budgets - Active monthly budget targets and spending progress',
      'GET /api/analytics/monthly - Aggregated spending data for charts'
    ],
    authentication: 'JWT (JSON Web Token) with bearer authorization headers and protected endpoints.',
    database: 'Neon Serverless PostgreSQL relational database with foreign keys and indexes.',
    deployment: 'Frontend hosted on Vercel; backend REST API hosted on Render with Neon cloud database.',
    challenges:
      'Aggregating transaction totals across diverse categories and date ranges efficiently without creating database bottlenecks.',
    whatILearned:
      'Gained deep proficiency in relational SQL query optimization, serverless PostgreSQL pooling, and financial chart visualizations in React.',
    order: 8
  },
  {
    _id: 'proj-9',
    title: 'Aurevo Watch Store',
    slug: 'aurevo-watch-store',
    subtitle: 'Luxury E-Commerce Storefront with 3D Watch Viewer & Razorpay',
    description:
      'Luxury watch e-commerce web application featuring a procedural 3D watch viewer (Three.js / React Three Fiber), wishlist, persistent bag, and Razorpay checkout.',
    longDescription:
      'Aurevo is a luxury watch storefront engineered with React 18, React Three Fiber, Three.js, Zustand state management, and Express/MongoDB backend. It allows watch enthusiasts to inspect luxury timepieces through an interactive 3D model viewer, filter watches across movements and materials, manage a persistent shopping bag, and simulate order checkout with Razorpay.',
    problemSolved:
      'Standard e-commerce websites offer flat 2D images that fail to communicate the craftsmanship and scale of luxury timepieces. Aurevo solves this by integrating an interactive 3D procedural viewer right into the product catalog.',
    technologies: ['React 18', 'Three.js', 'React Three Fiber', 'Zustand', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay', 'Vite'],
    features: [
      'Interactive procedural 3D timepiece model viewer built with Three.js & React Three Fiber',
      'Comprehensive 12-watch luxury catalog with movement, water resistance, and material filters',
      'Persistent shopping bag and interactive wishlist using Zustand global state',
      'Razorpay payment checkout flow with server-side payment verification',
      'Detailed product specification view with high-definition assets and review flows',
      'Automated testing suites with Vitest, React Testing Library, and Playwright'
    ],
    image: '/assets/projects/servicenest.png',
    githubUrl: 'https://github.com/Anji0522/aurevo-watch-store',
    liveUrl: 'https://anji0522.github.io/aurevo-watch-store/',
    featured: false,
    category: 'Full-Stack',
    frontendArchitecture:
      'Built with React 18, Vite, Zustand for lightweight state management, and React Three Fiber / Drei for canvas 3D rendering.',
    backendArchitecture:
      'Express.js RESTful API backed by MongoDB / Mongoose for watch catalogs, orders, and customer reviews.',
    apis: [
      'GET /api/watches - Filtered collection of luxury timepieces',
      'GET /api/watches/:id - Detailed watch specifications and 3D assets',
      'POST /api/orders/checkout - Razorpay order creation and validation',
      'GET /api/reviews/:watchId - Verified customer product reviews'
    ],
    authentication: 'JWT session tokens with bcrypt password encryption.',
    database: 'MongoDB with Mongoose schemas for products, orders, and reviews.',
    deployment: 'Deployed on GitHub Pages with automated GitHub Actions CI/CD pipeline.',
    challenges:
      'Optimizing 3D canvas render performance to maintain 60 FPS on mobile devices while managing complex state in Zustand.',
    whatILearned:
      'Mastered 3D graphics integration with React Three Fiber, Zustand store patterns, and end-to-end testing with Vitest and Playwright.',
    order: 9
  },
  {
    _id: 'proj-10',
    title: 'LearnHub LMS',
    slug: 'learnhub-lms',
    subtitle: 'Online Learning Management System with Course Authoring & Quizzes',
    description:
      'Online LMS platform supporting student course enrollment, lesson progress tracking, interactive quizzes, role-based instructor authoring, and admin dashboards.',
    longDescription:
      'LearnHub is a full-featured online learning management system built with React, Vite, Node.js, Express, and MongoDB. It features a dual-role architecture: students can discover courses, track module progress, and take assessment quizzes, while instructors can create multi-lesson video curricula, publish course materials, and review student performance analytics through visual charts.',
    problemSolved:
      'Education platforms often fail to provide clear progress indicators and accessible course navigation for students, as well as easy curriculum builders for teachers. LearnHub provides a streamlined, accessible interface for both personas.',
    technologies: ['React 18', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Recharts', 'Lucide React'],
    features: [
      'Student registration, login, and secure session management via HTTP-only cookies',
      'Course catalog with search, category filtering, and syllabus previews',
      'Interactive student learning player with lesson completion tracking and quizzes',
      'Instructor course creation portal with dynamic lesson and quiz builders',
      'Admin analytics dashboard built with Recharts displaying enrollment trends',
      'Responsive, accessible layout designed for mobile and desktop learners'
    ],
    image: '/assets/projects/servicenest.png',
    githubUrl: 'https://github.com/Anji0522/learnhub-lms',
    liveUrl: 'https://anji0522.github.io/learnhub-lms/',
    featured: false,
    category: 'Full-Stack',
    frontendArchitecture:
      'Modular React 18 architecture with Context API, React Router v6, Lucide icons, and Recharts for student performance visualization.',
    backendArchitecture:
      'Express.js backend with Mongoose schemas for users, courses, lessons, enrollments, and quiz submissions.',
    apis: [
      'POST /api/auth/register - Student and instructor account creation',
      'GET /api/courses - Public course catalog and curriculum data',
      'POST /api/courses - Instructor course creation and publishing',
      'POST /api/enrollments - Student course enrollment and progress tracking',
      'POST /api/quizzes/submit - Automated quiz grading and score computation'
    ],
    authentication: 'HTTP-only cookie stored JWT tokens with bcrypt password hashing.',
    database: 'MongoDB database with relational population across courses, lessons, and progress collections.',
    deployment: 'Frontend deployed to GitHub Pages via automated GitHub Actions; backend configured for Render.',
    challenges:
      'Designing flexible MongoDB schemas that support hierarchical course curricula (Courses -> Modules -> Lessons -> Quizzes) with atomic progress tracking.',
    whatILearned:
      'Deepened skills in role-based multi-tier systems, cookie security, and nested relational modeling in MongoDB.',
    order: 10
  },
  {
    _id: 'proj-11',
    title: 'SocialConnect',
    slug: 'socialconnect',
    subtitle: 'Modern MERN Social Networking App with Real-Time Feeds & Socket.io',
    description:
      'Instagram-style social networking web application engineered with React 19, Express, MongoDB, Socket.io, and Tailwind CSS featuring live feeds, stories, likes, and messaging.',
    longDescription:
      'SocialConnect is a modern MERN social platform designed with React 19, Tailwind CSS, and Socket.io. It recreates rich social media experiences with instant photo/post creation, interactive comments, animated double-tap likes, user profile galleries, follower connections, and real-time private messaging powered by WebSockets.',
    problemSolved:
      'Social platforms demand low-latency, real-time interactivity. Standard REST polling introduces network overhead and delayed updates. SocialConnect utilizes Socket.io to deliver instant real-time notifications, live comments, and direct chat messages.',
    technologies: ['React 19', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT', 'bcrypt', 'GitHub Actions'],
    features: [
      'Dynamic feed with real-time post publication and image uploads',
      'Double-tap like animations, comment threads, and bookmarking',
      'Real-time private messaging with typing indicators powered by Socket.io',
      'User profile management with bio, avatar customization, and follower graph',
      'Explore section with trending posts and user recommendations',
      'JWT authentication with bcrypt password security and pre-seeded sandbox credentials',
      'Automated CI/CD with GitHub Actions deploying directly to GitHub Pages'
    ],
    image: '/assets/projects/servicenest.png',
    githubUrl: 'https://github.com/Anji0522/socialConnect',
    liveUrl: 'https://anji0522.github.io/socialConnect/',
    featured: false,
    category: 'Full-Stack',
    frontendArchitecture:
      'Modern React 19 SPA styled with Tailwind CSS, utilizing custom hooks for WebSocket event subscriptions and responsive mobile-first layouts.',
    backendArchitecture:
      'Combined Express HTTP server and Socket.io WebSocket server with event-driven message dispatching and MongoDB change streams.',
    apis: [
      'POST /api/posts - Create and publish a post with caption and media',
      'GET /api/feed - Personalized timeline feed from followed creators',
      'POST /api/posts/:id/like - Toggle post like with instant notification',
      'POST /api/posts/:id/comments - Add comment to conversation thread',
      'GET /api/users/:username - User profile details and post showcase'
    ],
    authentication: 'HS256 signed JWT tokens verified on both HTTP requests and WebSocket handshakes.',
    database: 'MongoDB with indexed collections for users, posts, comments, likes, and messages.',
    deployment: 'Frontend deployed to GitHub Pages with automated CI/CD; backend configured for Render.',
    challenges:
      'Synchronizing real-time Socket.io events with React component lifecycles to prevent ghost listeners and duplicate message rendering.',
    whatILearned:
      'Mastered WebSocket event architecture, real-time notification dispatching, React 19 concurrency patterns, and modern Tailwind CSS UI development.',
    order: 11
  }
];

export const defaultSkills = [
  { name: 'JavaScript (ES6+)', category: 'Languages', icon: 'SiJavascript', order: 1 },
  { name: 'HTML5', category: 'Languages', icon: 'SiHtml5', order: 2 },
  { name: 'CSS3', category: 'Languages', icon: 'SiCss3', order: 3 },
  { name: 'Python', category: 'Languages', icon: 'SiPython', order: 4 },
  { name: 'React', category: 'Frontend', icon: 'SiReact', order: 5 },
  { name: 'React Hooks', category: 'Frontend', icon: 'SiReact', order: 6 },
  { name: 'Context API', category: 'Frontend', icon: 'SiReact', order: 7 },
  { name: 'Class Components', category: 'Frontend', icon: 'SiReact', order: 8 },
  { name: 'Lifecycle Methods', category: 'Frontend', icon: 'SiReact', order: 9 },
  { name: 'React Router', category: 'Frontend', icon: 'SiReactrouter', order: 10 },
  { name: 'Vite', category: 'Frontend', icon: 'SiVite', order: 11 },
  { name: 'Styled Components', category: 'Frontend', icon: 'SiStyledcomponents', order: 12 },
  { name: 'Bootstrap', category: 'Frontend', icon: 'SiBootstrap', order: 13 },
  { name: 'Flexbox', category: 'Frontend', icon: 'SiCss3', order: 14 },
  { name: 'Media Queries', category: 'Frontend', icon: 'SiCss3', order: 15 },
  { name: 'Responsive Design', category: 'Frontend', icon: 'MdDevices', order: 16 },
  { name: 'Light/Dark Theming', category: 'Frontend', icon: 'MdDarkMode', order: 17 },
  { name: 'react-slick', category: 'Libraries', icon: 'SiReact', order: 18 },
  { name: 'react-player', category: 'Libraries', icon: 'SiReact', order: 19 },
  { name: 'reactjs-popup', category: 'Libraries', icon: 'SiReact', order: 20 },
  { name: 'react-icons', category: 'Libraries', icon: 'SiReact', order: 21 },
  { name: 'react-loader-spinner', category: 'Libraries', icon: 'SiReact', order: 22 },
  { name: 'date-fns', category: 'Libraries', icon: 'SiJavascript', order: 23 },
  { name: 'js-cookie', category: 'Libraries', icon: 'SiJavascript', order: 24 },
  { name: 'Node.js', category: 'Backend', icon: 'SiNodedotjs', order: 25 },
  { name: 'Express.js', category: 'Backend', icon: 'SiExpress', order: 26 },
  { name: 'REST APIs', category: 'Backend', icon: 'TbApi', order: 27 },
  { name: 'JWT Authentication', category: 'Backend', icon: 'SiJsonwebtokens', order: 28 },
  { name: 'bcrypt', category: 'Backend', icon: 'FaLock', order: 29 },
  { name: 'Razorpay Integration', category: 'Backend', icon: 'SiRazorpay', order: 30 },
  { name: 'SQLite', category: 'Databases', icon: 'SiSqlite', order: 31 },
  { name: 'MySQL', category: 'Databases', icon: 'SiMysql', order: 32 },
  { name: 'MongoDB', category: 'Databases', icon: 'SiMongodb', order: 33 },
  { name: 'React Testing Library', category: 'Testing & Tools', icon: 'SiTestinglibrary', order: 34 },
  { name: 'Semantic HTML', category: 'Testing & Tools', icon: 'SiHtml5', order: 35 },
  { name: 'Accessibility (a11y)', category: 'Testing & Tools', icon: 'MdAccessibility', order: 36 },
  { name: 'Git', category: 'Testing & Tools', icon: 'SiGit', order: 37 },
  { name: 'GitHub', category: 'Testing & Tools', icon: 'SiGithub', order: 38 },
  { name: 'GitHub Actions', category: 'Testing & Tools', icon: 'SiGithubactions', order: 39 },
  { name: 'GitHub Pages', category: 'Testing & Tools', icon: 'SiGithub', order: 40 },
  { name: 'Render', category: 'Testing & Tools', icon: 'SiRender', order: 41 },
  { name: 'Surge', category: 'Testing & Tools', icon: 'TbCloudUpload', order: 42 },
  { name: 'VS Code', category: 'Testing & Tools', icon: 'SiVisualstudiocode', order: 43 },
  { name: 'npm', category: 'Testing & Tools', icon: 'SiNpm', order: 44 }
];

export const defaultCertifications = [
  {
    _id: 'cert-1',
    title: 'Programming Foundations',
    organization: 'NxtWave Disruptive Technologies (CCBP 4.0 Academy)',
    description: 'Foundational programming principles, logic building, algorithmic problem solving, and Python fundamentals.',
    date: '2025',
    certificateUrl: 'https://certificates.ccbp.in/intensive/programming-foundations?id=ZRRIBVRBEO',
    credentialId: 'ZRRIBVRBEO',
    skillsCovered: ['Python', 'Problem Solving', 'Data Structures', 'Algorithmic Thinking'],
    order: 1
  },
  {
    _id: 'cert-2',
    title: 'Static Website — HTML, CSS',
    organization: 'NxtWave Disruptive Technologies (CCBP 4.0 Academy)',
    description: 'Mastery of semantic HTML5 elements, CSS3 cascade, styling architectures, responsive typography, and layout fundamentals.',
    date: '2025',
    certificateUrl: 'https://certificates.ccbp.in/intensive/static-website?id=IBPRZLHKUW',
    credentialId: 'IBPRZLHKUW',
    skillsCovered: ['HTML5', 'CSS3', 'Semantic Markup', 'Web Layouts'],
    order: 2
  },
  {
    _id: 'cert-3',
    title: 'Responsive Website — Bootstrap, Flexbox',
    organization: 'NxtWave Disruptive Technologies (CCBP 4.0 Academy)',
    description: 'Building mobile-first adaptive web applications utilizing CSS Flexbox, Grid systems, Bootstrap 4/5 framework, and media queries.',
    date: '2025',
    certificateUrl: 'https://certificates.ccbp.in/intensive/responsive-website?id=XKSSYLHFQI',
    credentialId: 'XKSSYLHFQI',
    skillsCovered: ['Bootstrap', 'Flexbox', 'Responsive Design', 'CSS Grid', 'Media Queries'],
    order: 3
  },
  {
    _id: 'cert-4',
    title: 'JavaScript Essentials',
    organization: 'NxtWave Disruptive Technologies (CCBP 4.0 Academy)',
    description: 'Deep dive into JavaScript ES6+, closures, prototype inheritance, event loops, DOM manipulation, promises, and asynchronous fetch APIs.',
    date: '2026',
    certificateUrl: 'https://certificates.ccbp.in/intensive/javascript-essentials?id=BSHTKDQYOJ',
    credentialId: 'BSHTKDQYOJ',
    skillsCovered: ['JavaScript ES6+', 'DOM Manipulation', 'Async/Await', 'Fetch API', 'Event Handling'],
    order: 4
  },
  {
    _id: 'cert-5',
    title: 'React JS',
    organization: 'NxtWave Disruptive Technologies (CCBP 4.0 Academy)',
    description: 'Single Page Application architecture, React Hooks (useState, useEffect, useCallback, useContext), React Router, lifecycle methods, and testing.',
    date: '2026',
    certificateUrl: 'https://certificates.ccbp.in/intensive/react-js?id=DRNOGIJTCF',
    credentialId: 'DRNOGIJTCF',
    skillsCovered: ['React.js', 'React Hooks', 'Context API', 'React Router', 'Component Architecture'],
    order: 5
  },
  {
    _id: 'cert-6',
    title: 'Introduction to Databases — MySQL',
    organization: 'NxtWave Disruptive Technologies (CCBP 4.0 Academy)',
    description: 'Relational database schema modeling, SQL querying, primary and foreign key constraints, joins, subqueries, and aggregate computations.',
    date: '2025',
    certificateUrl: 'https://certificates.ccbp.in/intensive/introduction-to-databases?id=HUBAXLCKJK',
    credentialId: 'HUBAXLCKJK',
    skillsCovered: ['MySQL', 'SQL Joins', 'Database Design', 'Aggregates', 'Relational Models'],
    order: 6
  }
];

export const defaultEducation = [
  {
    _id: 'edu-1',
    qualification: 'B.Com — Computer Applications',
    institution: 'Vivekavardhini Degree College',
    location: 'Mancherial, Telangana',
    year: '2021 – 2024',
    score: 'CGPA: 6.23',
    details: [
      'Comprehensive study of computer software applications, programming foundations, and information systems',
      'Academic coursework in web technologies, databases, and commercial computing',
      'Demonstrated strong aptitude for web development, algorithm design, and software architecture'
    ],
    order: 1
  },
  {
    _id: 'edu-2',
    qualification: 'Intermediate (CEC)',
    institution: 'TS Model School and Junior College',
    location: 'Mancherial, Telangana',
    year: '2021',
    score: 'Grade: Passed',
    details: [
      'Commerce, Economics, and Civics foundation with analytical problem solving',
      'Completed secondary higher education with consistent academic participation'
    ],
    order: 2
  },
  {
    _id: 'edu-3',
    qualification: 'Secondary School Certificate (10th)',
    institution: 'TS Model School',
    location: 'Mancherial, Telangana',
    year: '2019',
    score: 'GPA: 8.3',
    details: [
      'High scholastic achievement with distinction in Mathematics and Science',
      'Active participant in school computing and science exhibitions'
    ],
    order: 3
  }
];
