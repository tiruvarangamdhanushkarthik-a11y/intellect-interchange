export type NodeCategory =
  | 'ai-tech'
  | 'education'
  | 'student-reality'
  | 'society'
  | 'science'
  | 'history'
  | 'psychology'
  | 'future';

export interface KnowledgeNodeData {
  id: NodeCategory;
  name: string;
  shortTag: string;
  coords: [number, number, number];
  color: string;
  secondaryColor: string;
  iconName: string;
  tagline: string;
  manifesto: string;
  coreDilemma: string;
  provocativeQuestions: string[];
  inDepthArticles: {
    title: string;
    readTime: string;
    summary: string;
    fullText: string;
    keyTakeaway: string;
  }[];
  mediaReferences: {
    type: 'essay' | 'audio' | 'study' | 'lecture';
    title: string;
    creator: string;
    description: string;
    durationOrPages: string;
  }[];
}

export interface StudentPressureItem {
  id: string;
  title: string;
  shortDesc: string;
  manifestoQuote: string;
  deepAnalysis: string;
  symptoms: string[];
  hiddenSystemicDrivers: string[];
  counterAction: string;
  reflectionQuestion: string;
  severityGrade: 'Critical' | 'Pervasive' | 'Systemic';
}

export interface SocraticSynthesis {
  question: string;
  semanticAnalysis: string;
  perspectives: {
    lens: string;
    framework: string;
    argument: string;
    critique: string;
  }[];
  empiricalEvidence: {
    context: string;
    finding: string;
    caveat: string;
  }[];
  counterArgument: {
    coreChallenge: string;
    blindSpot: string;
  };
  thingsToQuestion: string[];
  yourConclusionPrompt: string;
}

export interface IdeaQuestion {
  id: string;
  text: string;
  category: NodeCategory;
  author: string;
  submittedAt: string;
  upvotes: number;
  tags: string[];
  perspectives: {
    id: string;
    author: string;
    text: string;
    timestamp: string;
    upvotes: number;
  }[];
}

export interface MediaResource {
  id: string;
  type: 'DOCUMENTARIES' | 'VIDEOS' | 'PODCASTS' | 'ARTICLES' | 'RESEARCH';
  title: string;
  subtitle: string;
  durationOrLength: string;
  authorOrCreator: string;
  category: string;
  isFeatured?: boolean;
  abstract: string;
  detailedAnalysis: string;
  coreQuestions: string[];
  audioWaveformPreset?: number[];
}
