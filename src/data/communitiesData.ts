export interface CommunityItem {
  id: string;
  name: string;
  shortTag: string;
  tagline: string;
  description: string;
  iconName: string;
  color: string;
  coords: [number, number, number]; // 3D orbital coordinates around Intellect Core
  status: 'active' | 'coming_soon';
  inviteUrl?: string;
  topics: string[];
  features: string[];
}

export const OFFICIAL_WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/CfovYK1W1r72DxPB8dpmia";

export const COMMUNITIES_DATA: CommunityItem[] = [
  {
    id: 'ai-tech',
    name: 'AI & Technology',
    shortTag: 'AI / TECH',
    tagline: 'The frontier of machine intelligence & autonomous software',
    description: 'Artificial Intelligence, Machine Learning, coding, projects, neural networks, and emerging technology.',
    iconName: 'Cpu',
    color: '#00f0ff',
    coords: [3.4, 0.6, 0.4],
    status: 'active',
    inviteUrl: OFFICIAL_WHATSAPP_COMMUNITY_URL,
    topics: ['Machine Learning', 'Generative AI', 'Full-Stack Dev', 'Open Source', 'Autonomous Agents'],
    features: ['Project Masterminds', 'Hackathon Sprints', 'Code Reviews', 'Research Paper Breakdowns']
  },
  {
    id: 'ece-vlsi',
    name: 'ECE & VLSI',
    shortTag: 'ECE / VLSI',
    tagline: 'Silicon architectures, chip design & embedded hardware',
    description: 'Electronics, Digital VLSI, embedded systems, robotics, semiconductor physics, and hardware innovation.',
    iconName: 'CircuitBoard',
    color: '#a855f7',
    coords: [1.1, 2.8, -1.8],
    status: 'active',
    inviteUrl: OFFICIAL_WHATSAPP_COMMUNITY_URL,
    topics: ['Digital VLSI', 'Verilog / FPGA', 'Microcontrollers', 'Neuromorphic Chips', 'IoT & Robotics'],
    features: ['Hardware Teardowns', 'Silicon Design Q&As', 'Embedded Prototypes', 'Core ECE Resources']
  },
  {
    id: 'upsc-civil',
    name: 'UPSC & Civil Services',
    shortTag: 'UPSC / CIVIL',
    tagline: 'Public administration, geopolitical analysis & strategic thinking',
    description: 'Preparation, discussions, current affairs, policy analysis, strategy, ethics, and public service.',
    iconName: 'Scale',
    color: '#fbbf24',
    coords: [-2.9, 1.6, 1.2],
    status: 'active',
    inviteUrl: OFFICIAL_WHATSAPP_COMMUNITY_URL,
    topics: ['Governance & Policy', 'Geopolitics', 'Ethics & Integrity', 'Current Affairs', 'Answer Synthesis'],
    features: ['Editorial Deconstructions', 'Daily Analytical Prompts', 'Peer Review Hub', 'Strategy Frameworks']
  },
  {
    id: 'student-reality',
    name: 'Student Reality',
    shortTag: 'STUDENT LIFE',
    tagline: 'Deconstructing academic pressure & authentic lived experiences',
    description: 'Education reform, college life, careers, student mindset, mental wellness, and real-world challenges.',
    iconName: 'HeartPulse',
    color: '#f43f5e',
    coords: [-2.1, -2.4, -0.6],
    status: 'active',
    inviteUrl: OFFICIAL_WHATSAPP_COMMUNITY_URL,
    topics: ['Digital Drain', 'Career Clarity', 'Imposter Syndrome', 'Autodidactic Learning', 'Peer Support'],
    features: ['Honest Discourse Circles', 'Attention Sovereignty', 'Career Navigation', 'Student Chronicles']
  },
  {
    id: 'podcast',
    name: 'Podcast',
    shortTag: 'PODCAST',
    tagline: 'Raw intellectual dialogues hosted by T. Dhanush Karthik',
    description: 'Conversations, interviews, ideas, and perspectives from student creators, engineers, and philosophers hosted by T. Dhanush Karthik.',
    iconName: 'Radio',
    color: '#34d399',
    coords: [1.7, -2.6, 1.5],
    status: 'coming_soon',
    topics: ['Host: T. Dhanush Karthik', 'Cognitive Sovereignty', 'Future of Work', 'Engineering Mindset'],
    features: ['Hosted by T. Dhanush Karthik', 'Binaural Studio Audio', 'Student Guest Spots', 'Unscripted Debates']
  }
];
