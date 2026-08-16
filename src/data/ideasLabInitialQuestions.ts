import type { IdeaQuestion } from '../types';

export const INITIAL_IDEAS_QUESTIONS: IdeaQuestion[] = [
  {
    id: 'idea-1',
    text: 'Is our education system teaching knowledge or memorisation?',
    category: 'education',
    author: 'Aarav M., 3rd Year Physics',
    submittedAt: '2 days ago',
    upvotes: 342,
    tags: ['Pedagogy', 'Systemic', 'Examinations'],
    perspectives: [
      {
        id: 'p-1',
        author: 'Elena R. (Cognitive Science)',
        text: 'Memorization without a semantic relational web is dead weight in working memory. We are testing hard drive storage rather than CPU processing capacity.',
        timestamp: '1 day ago',
        upvotes: 89
      },
      {
        id: 'p-2',
        author: 'Dev K. (Mathematics)',
        text: 'However, you cannot play creative jazz without first memorizing scales. Some rote internalization is the substrate upon which intuition is built.',
        timestamp: '18 hours ago',
        upvotes: 64
      }
    ]
  },
  {
    id: 'idea-2',
    text: 'Does social media connect students or isolate them into hyper-curated silos?',
    category: 'society',
    author: 'Maya S., Literature & Media',
    submittedAt: '3 days ago',
    upvotes: 289,
    tags: ['Algorithms', 'Loneliness', 'Digital Life'],
    perspectives: [
      {
        id: 'p-3',
        author: 'Karthik N. (Sociology)',
        text: 'It connects us in broadcast format while isolating us in receptive communion. We perform for a crowd while eating dinner alone in the dark.',
        timestamp: '2 days ago',
        upvotes: 112
      }
    ]
  },
  {
    id: 'idea-3',
    text: 'Will AI make students smarter or more dependent on external cognition?',
    category: 'ai-tech',
    author: 'Zack T., Computer Science',
    submittedAt: '5 days ago',
    upvotes: 418,
    tags: ['AI', 'Cognition', 'Future of Mind'],
    perspectives: [
      {
        id: 'p-4',
        author: 'Dr. Sarah C. (Neurophilosophy)',
        text: 'Cognitive offloading is historically normal (writing, print, calculators). The danger is when we offload the questioning faculty itself.',
        timestamp: '4 days ago',
        upvotes: 154
      }
    ]
  },
  {
    id: 'idea-4',
    text: 'Is productivity culture making students less genuinely productive and more anxious?',
    category: 'student-reality',
    author: 'Priya K., Pre-Med',
    submittedAt: '6 days ago',
    upvotes: 376,
    tags: ['Burnout', 'Hustle Culture', 'Mental Health'],
    perspectives: [
      {
        id: 'p-5',
        author: 'Liam O. (Philosophy)',
        text: 'When every moment must be justified by instrumental utility, the mind loses the capacity for the sublime leisure that birthed Greek philosophy and modern science.',
        timestamp: '5 days ago',
        upvotes: 98
      }
    ]
  },
  {
    id: 'idea-5',
    text: 'Why is intellectual curiosity penalized in high-stakes standardized entrance exams?',
    category: 'education',
    author: 'Rohan D., Engineering Aspirant',
    submittedAt: '1 week ago',
    upvotes: 310,
    tags: ['Standardized Tests', 'Curiosity', 'Competition'],
    perspectives: [
      {
        id: 'p-6',
        author: 'Ananya G. (Education Policy)',
        text: 'Because curiosity wanders into un-rubriced territory. Standardized exams require strict convergence on the answer key, not divergent inquiry.',
        timestamp: '6 days ago',
        upvotes: 82
      }
    ]
  },
  {
    id: 'idea-6',
    text: 'How do we define genuine success outside of societal metrics and economic compensation?',
    category: 'psychology',
    author: 'Sofia L., Comparative Ethics',
    submittedAt: '1 week ago',
    upvotes: 265,
    tags: ['Meaning', 'Ethics', 'Autonomy'],
    perspectives: [
      {
        id: 'p-7',
        author: 'Marcus V. (Stoic Studies)',
        text: 'Success is the alignment of conscious action with internal virtue and uncoerced inquiry, regardless of the fluctuating opinions of the marketplace.',
        timestamp: '6 days ago',
        upvotes: 75
      }
    ]
  }
];
