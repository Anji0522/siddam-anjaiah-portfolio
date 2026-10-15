const seedData = {
  profile: {
    name: 'Siddam Anjaiah',
    title: 'React Frontend Developer | Full-Stack Developer',
    subtitle: 'Building responsive, accessible and user-focused web applications with React, JavaScript and modern full-stack technologies.',
    summary:
      'I am a React frontend developer who has built and deployed REST API driven applications including Book Hub, Jobby App, Nxt Watch, and ServiceNest. I also built a Node.js and Express backend with 11 REST APIs. My technical strengths include JWT authentication, protected routing, React Hooks, Context API, responsive design, light and dark theming, semantic HTML, accessible markup, REST API integration, and full-stack development.',
    objective:
      'I am seeking a React Developer or Frontend Developer opportunity where I can apply my React, JavaScript, REST API and full-stack development skills while continuing to grow as a software developer.',
    email: 'anjisiddam01@gmail.com',
    phone: '9390098364',
    location: 'Mancherial, Telangana, India',
    github: 'https://github.com/Anji0522',
    linkedin: 'https://www.linkedin.com/in/siddam-anjaiah/',
    resumeUrl: '/assets/Siddam_Anjaiah_React_Frontend_Resume_1Page.pdf',
    profileImage: '/assets/profile-image.jpeg',
    targetRoles: [
      'React Developer',
      'Frontend Developer',
      'Full-Stack Developer',
      'Junior Software Developer'
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
      apiApps: '4+',
      restApis: '11',
      projectsCount: '5',
      architecture: 'MERN'
    }
  },

  projects: [
    {
      title: 'ServiceNest',
      slug: 'servicenest',
      subtitle: 'Full Stack Service Marketplace with Role-Based Accounts and Payments',
      description:
        'Full Stack Service Marketplace with Role-Based Accounts, 15+ REST endpoints, SQLite database, JWT auth, and Razorpay payment integration.',
      longDescription:
        'ServiceNest is a production-grade full-stack service marketplace connecting local service customers with certified independent providers. Built with a responsive React frontend and a Node.js / Express backend with 15+ REST endpoints, it incorporates role-based access control (Customer vs. Provider), idempotent booking creation, itemized pricing calculations, persistent in-app messaging, automated cash-after-service handling, and online Razorpay payment checkout with cryptographic webhook verification.',
      problemSolved:
        'Local service bookings often suffer from broken communication, unverified providers, pricing ambiguity, and double-booking glitches. ServiceNest resolves these challenges by introducing strict role isolation, idempotent booking pipelines, transparent hourly rate breakdowns, live status updates, and tamper-proof payment verification.',
      technologies: [
        'React',
        'Vite',
        'Node.js',
        'Express.js',
        'SQLite',
        'JWT',
        'bcrypt',
        'Razorpay',
        'GitHub Actions'
      ],
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
      githubUrl: 'https://github.com/Anji0522',
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
      title: 'Book Hub',
      slug: 'book-hub',
      subtitle: 'Book Discovery Web Application with Cookie-Based JWT Authentication',
      description:
        'A comprehensive book discovery application featuring cookie-based JWT authentication, bookshelf filtering, title search, and responsive carousels.',
      longDescription:
        'Book Hub is a feature-rich single-page book discovery application designed for avid readers to explore top-rated books, search across categories, and review comprehensive book details. Built with React and React Router, it utilizes cookie-based authentication via js-cookie, ensuring secure sessions across reloads and route protections.',
      problemSolved:
        'Providing users with an intuitive, responsive interface to discover books with instant search, category filtering, and reliable state feedback (loaders, empty results, network failure fallbacks with retry buttons).',
      technologies: [
        'React',
        'React Router',
        'react-slick',
        'react-icons',
        'js-cookie',
        'REST APIs'
      ],
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
      githubUrl: 'https://github.com/Anji0522',
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
      order: 2
    },
    {
      title: 'Jobby App',
      slug: 'jobby-app',
      subtitle: 'Job Search Application with Combined Multi-Criteria Filtering',
      description:
        'Job discovery platform featuring multi-criteria filter queries, user profiles, detailed job specifications, and similar job recommendations.',
      longDescription:
        'Jobby App is a dedicated employment discovery platform created to streamline the job hunt. It features JWT login, two-way route protection, comprehensive user profiles, multi-faceted filtering (merging keyword search, multiple checkbox employment types, and radio button salary ranges into a single query string), along with detailed job specification pages displaying company profiles, skill tags, life-at-company highlights, and similar job cards.',
      problemSolved:
        'Job seekers frequently need to combine diverse search parameters (location, salary, employment nature) without the UI freezing or triggering conflicting API calls. Jobby App unifies all filters into a single dynamic query pipeline.',
      technologies: [
        'React',
        'React Router',
        'js-cookie',
        'react-icons',
        'REST APIs'
      ],
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
      githubUrl: 'https://github.com/Anji0522',
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
      order: 3
    },
    {
      title: 'Nxt Watch',
      slug: 'nxt-watch',
      subtitle: 'Video Streaming Application with Dynamic Light/Dark Theming',
      description:
        'YouTube-inspired video streaming platform featuring light and dark theming via Styled Components, Context API state management, and video playback.',
      longDescription:
        'Nxt Watch is an immersive video streaming application that models YouTube. It implements seamless light and dark mode toggling using Styled Components and React Context API. Users can browse Home (with live search), Trending, and Gaming sections, watch videos using an embedded react-player, toggle mutually exclusive Like/Dislike states, bookmark videos to a persistent Saved Videos collection, and navigate safely with protected routes.',
      problemSolved:
        'Building a video platform requires persistent global state (theme, saved videos list, like/dislike interactions) across different routes without props drilling or unnecessary re-renders.',
      technologies: [
        'React',
        'React Router',
        'Styled Components',
        'Context API',
        'react-player',
        'reactjs-popup',
        'date-fns',
        'REST APIs'
      ],
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
      githubUrl: 'https://github.com/Anji0522',
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
      order: 4
    },
    {
      title: 'Twitter Clone — Backend REST API',
      slug: 'twitter-clone-backend',
      subtitle: 'Scalable REST API with Relational SQL Joins, JWT Auth, and Aggregates',
      description:
        'Production-ready Node.js and Express backend API featuring 11 RESTful endpoints, bcrypt password encryption, JWT authorization, and relational SQLite queries.',
      longDescription:
        'Twitter Clone Backend is a robust RESTful API built from the ground up using Node.js, Express.js, and SQLite. It provides complete social networking capability across 5 relational tables (user, follower, tweet, reply, like). It includes 11 REST endpoints supporting user registration, authentication, following networks, custom home feeds, tweet creation, replies, likes, and secure tweet deletion with strict ownership verification.',
      problemSolved:
        'Social media backends require strict access control: users must only view feeds from accounts they follow and only delete their own content, all while computing aggregations (likes, replies) with high database efficiency.',
      technologies: [
        'Node.js',
        'Express.js',
        'SQLite',
        'JWT',
        'bcrypt',
        'REST APIs'
      ],
      features: [
        '11 fully tested REST APIs covering all core social networking workflows',
        'Secure user registration with bcrypt password hashing and input sanitization',
        'JWT authentication middleware verifying Bearer tokens and returning 401 for unauthorized calls',
        'Role and ownership-based authorization: users can only delete tweets they authored',
        'Social graph privacy: users can only access tweet details, likes, and replies if they follow the author',
        'Personalized feed API delivering the latest 4 tweets from followed users with computed stats',
        'Complex SQL queries utilizing INNER JOIN, LEFT JOIN, WHERE clauses, and COUNT() aggregates',
        'Standardized HTTP status codes (200, 400, 401, 404, 500) and structured JSON error responses'
      ],
      image: '/assets/projects/twitterbackend.png',
      githubUrl: 'https://github.com/Anji0522',
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
      order: 5
    }
  ],

  skills: [
    // Languages
    { name: 'JavaScript (ES6+)', category: 'Languages', icon: 'SiJavascript', order: 1 },
    { name: 'HTML5', category: 'Languages', icon: 'SiHtml5', order: 2 },
    { name: 'CSS3', category: 'Languages', icon: 'SiCss3', order: 3 },
    { name: 'Python', category: 'Languages', icon: 'SiPython', order: 4 },

    // Frontend
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

    // Libraries
    { name: 'react-slick', category: 'Libraries', icon: 'SiReact', order: 18 },
    { name: 'react-player', category: 'Libraries', icon: 'SiReact', order: 19 },
    { name: 'reactjs-popup', category: 'Libraries', icon: 'SiReact', order: 20 },
    { name: 'react-icons', category: 'Libraries', icon: 'SiReact', order: 21 },
    { name: 'react-loader-spinner', category: 'Libraries', icon: 'SiReact', order: 22 },
    { name: 'date-fns', category: 'Libraries', icon: 'SiJavascript', order: 23 },
    { name: 'js-cookie', category: 'Libraries', icon: 'SiJavascript', order: 24 },

    // Backend
    { name: 'Node.js', category: 'Backend', icon: 'SiNodedotjs', order: 25 },
    { name: 'Express.js', category: 'Backend', icon: 'SiExpress', order: 26 },
    { name: 'REST APIs', category: 'Backend', icon: 'TbApi', order: 27 },
    { name: 'JWT Authentication', category: 'Backend', icon: 'SiJsonwebtokens', order: 28 },
    { name: 'bcrypt', category: 'Backend', icon: 'FaLock', order: 29 },
    { name: 'Razorpay Integration', category: 'Backend', icon: 'SiRazorpay', order: 30 },

    // Databases
    { name: 'SQLite', category: 'Databases', icon: 'SiSqlite', order: 31 },
    { name: 'MySQL', category: 'Databases', icon: 'SiMysql', order: 32 },
    { name: 'MongoDB', category: 'Databases', icon: 'SiMongodb', order: 33 },

    // Testing & Tools
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
  ],

  certifications: [
    {
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
      title: 'Introduction to Databases — MySQL',
      organization: 'NxtWave Disruptive Technologies (CCBP 4.0 Academy)',
      description: 'Relational database schema modeling, SQL querying, primary and foreign key constraints, joins, subqueries, and aggregate computations.',
      date: '2025',
      certificateUrl: 'https://certificates.ccbp.in/intensive/introduction-to-databases?id=HUBAXLCKJK',
      credentialId: 'HUBAXLCKJK',
      skillsCovered: ['MySQL', 'SQL Joins', 'Database Design', 'Aggregates', 'Relational Models'],
      order: 6
    }
  ],

  education: [
    {
      qualification: 'B.Com — Computer Applications',
      institution: 'Vivekavardhini Degree College',
      location: 'Mancherial, Telangana',
      year: '2021 – 2024',
      score: 'CGPA: 6.63',
      details: [
        'Comprehensive study of computer software applications, programming foundations, and information systems',
        'Academic coursework in web technologies, databases, and commercial computing',
        'Demonstrated strong aptitude for web development, algorithm design, and software architecture'
      ],
      order: 1
    },
    {
      qualification: 'Intermediate (CEC)',
      institution: 'TS Model School and Junior College',
      location: 'Mancherial, Telangana',
      year: '2021',
      score: '50.6%',
      details: [
        'Commerce, Economics, and Civics foundation with analytical problem solving',
        'Completed secondary higher education with consistent academic participation'
      ],
      order: 2
    },
    {
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
  ]
};

module.exports = seedData;
