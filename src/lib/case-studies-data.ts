export type CaseStudy = {
  id: number;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  capabilities: string[];
  outcomes: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    "id": 1,
    "title": "Transforming Digital Wallet Intelligence with AI",
    "industry": "Fintech",
    "challenge": "Managing millions of payment transactions while delivering personalized customer experiences and merchant insights across multiple payment channels.",
    "solution": "Implemented an AI-powered wallet intelligence platform with customer analytics, merchant recommendations, and real-time business intelligence.",
    "capabilities": ["Customer behavior analytics", "Merchant recommendations", "Live business intelligence"],
    "outcomes": [
      "Improved customer engagement and retention",
      "Increased merchant performance visibility",
      "Enhanced offer conversion effectiveness"
    ]
  },
  {
    "id": 2,
    "title": "Accelerating Lending Decisions with AI Intelligence",
    "industry": "Fintech",
    "challenge": "Manual underwriting and risk assessment processes slowed loan approvals and increased operational effort.",
    "solution": "Implemented AI-driven borrower assessment, credit scoring, and automated verification workflows.",
    "capabilities": ["Borrower assessment", "Credit scoring", "Automated verification"],
    "outcomes": [
      "Faster loan approvals",
      "Improved risk evaluation",
      "Reduced fraud-related losses"
    ]
  },
  {
    "id": 3,
    "title": "Transforming Insurance Claims with AI Intelligence",
    "industry": "Insurance",
    "challenge": "Increasing claims volumes and manual fraud investigations slowed insurance operations.",
    "solution": "Implemented AI-driven claims assessment, fraud detection, and predictive risk analysis capabilities.",
    "capabilities": ["Claims assessment", "Fraud detection", "Predictive risk analysis"],
    "outcomes": [
      "Faster claims processing",
      "Improved fraud detection",
      "Reduced manual effort"
    ]
  },
  {
    "id": 4,
    "title": "Autonomous Core Banking & Loan Origination Platform",
    "industry": "Fintech",
    "challenge": "Manual underwriting processes caused long loan approval times and poor customer experience.",
    "solution": "Implemented an AI-powered loan decisioning platform integrated with core banking operations.",
    "capabilities": ["Loan decisioning", "Underwriting automation", "Core banking integration"],
    "outcomes": [
      "Faster loan approvals",
      "Automated underwriting",
      "Improved lending scalability"
    ]
  },
  {
    "id": 5,
    "title": "AI-Powered Maternal & Pregnancy Intelligence Platform",
    "industry": "Healthcare",
    "challenge": "Fragmented pregnancy records and manual scan interpretation reduced continuity of care.",
    "solution": "Implemented an AI-powered maternal intelligence platform with fetal analytics and pregnancy risk monitoring.",
    "capabilities": ["Fetal analytics", "Pregnancy risk monitoring", "Connected maternal records"],
    "outcomes": [
      "Improved fetal monitoring",
      "Faster scan interpretation",
      "Better identification of high-risk pregnancies"
    ]
  },
  {
    "id": 6,
    "title": "Enterprise Hospital Information System Platform",
    "industry": "Healthcare",
    "challenge": "Disconnected hospital systems and paper-based workflows reduced operational efficiency.",
    "solution": "Implemented an AI-powered hospital information system integrating clinical and administrative operations.",
    "capabilities": ["Clinical and administrative integration", "Hospital-wide operating view", "Clinical decision support"],
    "outcomes": [
      "Unified healthcare operations",
      "Faster clinical decision support",
      "Reduced administrative overhead"
    ]
  },
  {
    "id": 7,
    "title": "AI-Assisted Clinical Intelligence & Smart Scheduling Platform",
    "industry": "Healthcare",
    "challenge": "Fragmented patient records and inefficient scheduling reduced healthcare operational efficiency.",
    "solution": "Implemented AI-assisted clinical intelligence and automated scheduling workflows.",
    "capabilities": ["Connected patient records", "Clinical intelligence", "Automated scheduling"],
    "outcomes": [
      "Improved patient coordination",
      "Reduced administrative effort",
      "Enhanced scheduling efficiency"
    ]
  },
  {
    "id": 8,
    "title": "AI-Powered Diagnostic Intelligence & Clinical Decision Support Platform",
    "industry": "Healthcare",
    "challenge": "Healthcare professionals required faster access to diagnostic insights and predictive clinical intelligence.",
    "solution": "Implemented an AI-powered diagnostic intelligence platform combining patient history, imaging analysis, and predictive models.",
    "capabilities": ["Patient-history intelligence", "Imaging analysis", "Predictive clinical models"],
    "outcomes": [
      "Improved diagnostic accuracy",
      "Faster treatment planning",
      "Enhanced clinical decision support"
    ]
  },
  {
    "id": 9,
    "title": "Smart Manufacturing Transformation Platform",
    "industry": "Manufacturing",
    "challenge": "Disconnected production planning and shop-floor operations reduced efficiency, increased delays, and limited visibility into manufacturing performance.",
    "solution": "Implemented a smart manufacturing platform integrating production planning, inventory synchronization, machine monitoring, and operational dashboards.",
    "capabilities": ["Production planning", "Inventory synchronization", "Machine monitoring"],
    "outcomes": [
      "Improved production efficiency",
      "Reduced inventory costs",
      "Enhanced operational visibility"
    ]
  },
  {
    "id": 10,
    "title": "Digital Twin & Batch Intelligence Platform",
    "industry": "Manufacturing",
    "challenge": "Limited batch traceability and fragmented inventory management disrupted production and compliance processes.",
    "solution": "Implemented a Digital Twin platform with batch tracking, inventory intelligence, and procurement automation.",
    "capabilities": ["Digital batch tracking", "Inventory intelligence", "Procurement automation"],
    "outcomes": [
      "Improved inventory accuracy",
      "Enhanced production traceability",
      "Reduced material wastage"
    ]
  },
  {
    "id": 11,
    "title": "Smart Factory & Digital Twin Platform",
    "industry": "Manufacturing",
    "challenge": "Manufacturing operations lacked centralized visibility across production, logistics, and inventory workflows.",
    "solution": "Implemented a Smart Factory platform with Digital Twin capabilities, IIoT monitoring, and integrated manufacturing intelligence.",
    "capabilities": ["Factory digital twin", "IIoT monitoring", "Production and logistics visibility"],
    "outcomes": [
      "Improved production coordination",
      "Enhanced material visibility",
      "Faster operational decisions"
    ]
  },
  {
    "id": 12,
    "title": "AI-Powered Workforce Intelligence & Manufacturing Operations Platform",
    "industry": "Manufacturing",
    "challenge": "Large-scale manufacturing operations lacked real-time workforce visibility and productivity monitoring.",
    "solution": "Implemented an AI-powered workforce intelligence platform with behavioral analytics and automated performance monitoring.",
    "capabilities": ["Workforce visibility", "Behavioral analytics", "Performance monitoring"],
    "outcomes": [
      "Improved workforce visibility",
      "Faster productivity issue detection",
      "Enhanced manufacturing efficiency"
    ]
  },
  {
    "id": 13,
    "title": "AI-Driven Manufacturing Quality Intelligence Platform",
    "industry": "Manufacturing",
    "challenge": "Manual quality inspections and delayed defect identification impacted manufacturing performance and consistency.",
    "solution": "Implemented AI-powered visual inspection and quality intelligence workflows.",
    "capabilities": ["Visual quality inspection", "Defect detection", "Quality intelligence"],
    "outcomes": [
      "Faster defect detection",
      "Reduced inspection effort",
      "Improved manufacturing quality consistency"
    ]
  },
  {
    "id": 14,
    "title": "Digital Twin, Predictive Maintenance & Safety Monitoring Platform",
    "industry": "Automobiles",
    "challenge": "Industrial operations lacked proactive maintenance capabilities and real-time safety monitoring.",
    "solution": "Implemented a Digital Twin platform with IoT monitoring, predictive maintenance, and AI-driven safety intelligence.",
    "capabilities": ["Equipment digital twin", "Predictive maintenance", "Safety monitoring"],
    "outcomes": [
      "Reduced unplanned downtime",
      "Improved equipment reliability",
      "Enhanced operational safety"
    ]
  },
  {
    "id": 15,
    "title": "Assembly Line Automation & AI-Based Quality Analysis Platform",
    "industry": "Automobiles",
    "challenge": "Manual inspections and inefficient assembly workflows limited production efficiency and quality consistency.",
    "solution": "Implemented assembly automation, AI-based defect detection, and Digital Twin-driven workflow optimization.",
    "capabilities": ["Assembly automation", "AI-based defect detection", "Digital twin workflow optimization"],
    "outcomes": [
      "Improved defect detection",
      "Increased production throughput",
      "Enhanced assembly quality"
    ]
  },
  {
    "id": 16,
    "title": "Optimizing Hyperlocal Deliveries with AI Fleet Intelligence",
    "industry": "Supply Chain",
    "challenge": "Manual rider assignment and dispatch coordination created delays and reduced delivery efficiency.",
    "solution": "Implemented an AI-powered delivery intelligence platform with automated rider allocation, route optimization, and centralized fleet operations.",
    "capabilities": ["Automated rider allocation", "Route optimization", "Centralized fleet operations"],
    "outcomes": [
      "Faster delivery assignments",
      "Improved fleet visibility",
      "Reduced manual dispatch effort"
    ]
  },
  {
    "id": 17,
    "title": "Smart Warehousing & Inventory Intelligence Platform",
    "industry": "Supply Chain",
    "challenge": "Manual inventory tracking and poor warehouse visibility caused delays and stock inaccuracies.",
    "solution": "Implemented an IoT-enabled warehouse intelligence platform with RFID tracking and real-time inventory monitoring.",
    "capabilities": ["RFID-based tracking", "Live inventory monitoring", "Warehouse operating view"],
    "outcomes": [
      "Improved inventory accuracy",
      "Reduced reconciliation effort",
      "Enhanced warehouse visibility"
    ]
  },
  {
    "id": 18,
    "title": "AI-Powered Inventory Intelligence & Supply Chain Optimization Platform",
    "industry": "Supply Chain",
    "challenge": "Inventory imbalances and manual replenishment planning reduced supply chain efficiency.",
    "solution": "Implemented AI-powered demand forecasting and automated inventory planning workflows.",
    "capabilities": ["Demand forecasting", "Inventory planning", "Automated replenishment"],
    "outcomes": [
      "Improved inventory planning",
      "Reduced stock-outs",
      "Enhanced warehouse visibility"
    ]
  },
  {
    "id": 19,
    "title": "Autonomous Distribution & Warehouse Replenishment Platform",
    "industry": "Supply Chain",
    "challenge": "Manual inventory planning and procurement workflows caused stock-outs and inefficient inventory distribution.",
    "solution": "Implemented AI-powered forecasting, inventory optimization, and automated replenishment workflows.",
    "capabilities": ["Inventory forecasting", "Distribution optimization", "Automated replenishment"],
    "outcomes": [
      "Reduced stock-outs",
      "Improved inventory turnover",
      "Increased supply chain efficiency"
    ]
  },
  {
    "id": 20,
    "title": "ESG Intelligence & Sustainability Management Platform",
    "industry": "Infrastructure",
    "challenge": "Fragmented sustainability data made ESG reporting time-consuming and difficult to manage.",
    "solution": "Implemented a centralized ESG intelligence platform with automated reporting and sustainability analytics.",
    "capabilities": ["Centralized sustainability data", "Reporting automation", "ESG analytics"],
    "outcomes": [
      "Reduced reporting effort",
      "Improved sustainability visibility",
      "Enhanced compliance readiness"
    ]
  },
  {
    "id": 21,
    "title": "Smart Parking & Mobility Optimization Platform",
    "industry": "Infrastructure",
    "challenge": "Parking operations lacked real-time occupancy visibility, resulting in congestion and inefficient space utilization.",
    "solution": "Implemented a smart parking platform with occupancy monitoring, reservations, and mobility analytics.",
    "capabilities": ["Real-time occupancy monitoring", "Parking reservations", "Mobility analytics"],
    "outcomes": [
      "Improved parking utilization",
      "Reduced congestion",
      "Enhanced user experience"
    ]
  },
  {
    "id": 22,
    "title": "IoT-Enabled Smart Infrastructure Monitoring Platform",
    "industry": "Infrastructure",
    "challenge": "Infrastructure monitoring was fragmented across multiple systems, reducing visibility and delaying incident response.",
    "solution": "Implemented a centralized IoT monitoring platform integrating sensors, utilities, security systems, and operational data.",
    "capabilities": ["Connected sensor monitoring", "Utilities and security integration", "Incident visibility"],
    "outcomes": [
      "Improved operational visibility",
      "Faster incident detection",
      "Reduced infrastructure downtime"
    ]
  },
  {
    "id": 23,
    "title": "Multi-Channel Export Commerce Transformation Platform",
    "industry": "Retail",
    "challenge": "Fragmented commerce operations created inefficiencies across inventory, orders, and customer management.",
    "solution": "Implemented a unified commerce platform integrating B2B, B2C, inventory, shipment, and customer workflows.",
    "capabilities": ["B2B and B2C commerce", "Inventory and shipment integration", "Customer workflow coordination"],
    "outcomes": [
      "Improved inventory visibility",
      "Faster order processing",
      "Better operational coordination"
    ]
  },
  {
    "id": 24,
    "title": "Premium Luxury Commerce Experience Platform",
    "industry": "Retail",
    "challenge": "The existing digital experience failed to reflect the premium positioning of the brand.",
    "solution": "Designed and implemented a luxury-focused digital commerce platform with premium user experiences and storytelling capabilities.",
    "capabilities": ["Luxury-focused digital commerce", "Product discovery", "Brand storytelling"],
    "outcomes": [
      "Improved brand perception",
      "Enhanced customer experience",
      "Better product discovery"
    ]
  },
  {
    "id": 25,
    "title": "Wellness Technology Operations Platform",
    "industry": "Healthcare",
    "challenge": "Operational coordination across sales, onboarding, and customer management relied on fragmented tools and manual processes.",
    "solution": "Implemented a centralized customer and operational management platform with workflow automation and operational dashboards.",
    "capabilities": ["Customer and lead management", "Onboarding workflow automation", "Operational dashboards"],
    "outcomes": [
      "Improved lead visibility",
      "Faster customer onboarding",
      "Better team coordination"
    ]
  },
  {
    "id": 26,
    "title": "AI-Powered Recruitment Intelligence & Talent Matching Platform",
    "industry": "Operations",
    "challenge": "High candidate volumes and manual screening processes slowed recruitment operations.",
    "solution": "Implemented an AI-powered recruitment platform with resume parsing and intelligent candidate matching.",
    "capabilities": ["Resume parsing", "Candidate matching", "Screening workflows"],
    "outcomes": [
      "Faster candidate screening",
      "Improved hiring accuracy",
      "Reduced recruiter workload"
    ]
  },
  {
    "id": 27,
    "title": "Intelligent IoT Device Management & OTA Operations Platform",
    "industry": "Manufacturing",
    "challenge": "Managing connected devices and firmware updates lacked centralized visibility and control.",
    "solution": "Implemented an intelligent IoT platform with OTA deployment and predictive monitoring capabilities.",
    "capabilities": ["Connected-device management", "OTA firmware deployment", "Predictive monitoring"],
    "outcomes": [
      "Improved device uptime",
      "Streamlined firmware deployment",
      "Enhanced operational visibility"
    ]
  },
  {
    "id": 28,
    "title": "Political Sentiment Intelligence & Campaign Optimization Platform",
    "industry": "Media",
    "challenge": "Rapidly changing public sentiment and fragmented social media monitoring limited campaign effectiveness.",
    "solution": "Implemented an AI-powered sentiment intelligence platform with audience analytics and trend detection capabilities.",
    "capabilities": ["Audience analytics", "Sentiment monitoring", "Trend detection"],
    "outcomes": [
      "Improved sentiment visibility",
      "Faster trend identification",
      "Enhanced campaign planning"
    ]
  }
];
