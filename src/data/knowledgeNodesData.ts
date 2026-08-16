import type { KnowledgeNodeData } from '../types';

export const KNOWLEDGE_NODES_DATA: KnowledgeNodeData[] = [
  {
    id: 'ai-tech',
    name: 'AI & TECHNOLOGY',
    shortTag: 'TECH & MIND',
    coords: [3.8, 1.8, 1.2],
    color: '#00f0ff',
    secondaryColor: '#0891b2',
    iconName: 'Cpu',
    tagline: 'When algorithms curate reality, what remains of autonomous human intention?',
    manifesto: 'We live in an era where computation has evolved from a tool of calculation to an architecture of cognition. Artificial Intelligence does not merely automate tasks; it recalibrates human thought patterns, dopamine baselines, and epistemological certainty.',
    coreDilemma: 'Is artificial intelligence elevating human creativity to metaphysical heights, or quietly mechanizing the human spirit into predictable statistical feedback loops?',
    provocativeQuestions: [
      'If AI can synthesize answers instantaneously, what becomes of the cognitive stamina required to struggle with ambiguity?',
      'Are recommendation algorithms optimizing for human enlightenment or cognitive docility?',
      'When an AI writes with flawless syntax and zero consciousness, what is the true difference between processing and understanding?',
      'Will future generations lose the capacity for deep solitary reflection in an ambient AI ecosystem?'
    ],
    inDepthArticles: [
      {
        title: 'The Cognitive Atrophy of Instant Solutions',
        readTime: '6 min read',
        summary: 'How instantaneous algorithmic resolution erodes the neural plasticity needed for creative problem solving.',
        fullText: 'The human brain develops resilience and structural depth primarily through friction. When students encounter intellectual obstacles and resolve them through iterative mental struggle, the synaptic pathways of comprehension are physically fortified. Generative AI removes this generative friction. By providing immediate, polished syntheses, it gives the illusion of understanding without the neurological substrate of cognition.',
        keyTakeaway: 'Understanding is not the possession of an answer; it is the journey of overcoming the question.'
      },
      {
        title: 'Algorithmic Determinism vs. Human Serendipity',
        readTime: '8 min read',
        summary: 'Why algorithmic predictability threatens the accidental discoveries that sparked human history.',
        fullText: 'Every major breakthrough in art, philosophy, and empirical science was born from serendipitous error—the unexpected connection forged by an idiosyncratic mind wandering outside established boundaries. Predictive algorithms, by design, optimize for mathematical probability and historical patterns, confining human inquiry within the boundaries of what has already been indexed.',
        keyTakeaway: 'True intellect lives in the improbable outliers that no neural network was trained to expect.'
      }
    ],
    mediaReferences: [
      {
        type: 'lecture',
        title: 'The Epistemic Horizon of Machine Intelligence',
        creator: 'Intellect Interchange Symposium',
        description: 'A deep examination of how automated reasoning reshapes the philosophical definition of truth.',
        durationOrPages: '34 min audio'
      },
      {
        type: 'study',
        title: 'Cognitive Offloading in Academic Environments',
        creator: 'Cognitive Science Working Group',
        description: 'Empirical inquiry into student retention rates when assisted by conversational LLMs.',
        durationOrPages: '18 pages'
      }
    ]
  },
  {
    id: 'education',
    name: 'EDUCATION',
    shortTag: 'PEDAGOGY',
    coords: [-3.4, 2.2, 1.8],
    color: '#38bdf8',
    secondaryColor: '#0284c7',
    iconName: 'GraduationCap',
    tagline: 'Standardized grading measures compliance with a curriculum, not the capacity to think beyond it.',
    manifesto: 'The industrial education paradigm was engineered during the 19th century to produce punctual, obedient, and uniform laborers for an assembly-line economy. Modern classrooms still reward regurgitation of fixed syllabi while systematically penalizing dissent, curiosity, and cross-disciplinary exploration.',
    coreDilemma: 'Can an institution designed around standardization ever cultivate genuine individuality and first-principles reasoning?',
    provocativeQuestions: [
      'Why do standardized examinations prioritize speed of recall over depth of contemplation?',
      'If intellectual curiosity is innate to childhood, at what precise grade does the curriculum extinguish it?',
      'Why are students taught WHAT to think for fifteen years, but rarely HOW to examine the presuppositions of their teachers?',
      'Does a high GPA signify intellectual capability, or simply high tolerance for bureaucratic compliance?'
    ],
    inDepthArticles: [
      {
        title: 'The Factory Model of Mind',
        readTime: '7 min read',
        summary: 'Deconstructing the Prussian origins of modern school bells, standardized testing, and siloed subjects.',
        fullText: 'When Horace Mann adapted the Prussian education model in the mid-1800s, the primary societal requirement was discipline, uniformity, and adherence to authority. The division of organic reality into 45-minute compartmentalized periods—Physics, History, Grammar—shattered the holistic nature of knowledge. The consequence is a student body trained to see fragments rather than interconnected ecosystems.',
        keyTakeaway: 'The world presents problems in interconnected systems, while schools test knowledge in isolated boxes.'
      }
    ],
    mediaReferences: [
      {
        type: 'essay',
        title: 'Beyond the Syllabus: Reclaiming Autodidactism',
        creator: 'Prof. Julian Vance',
        description: 'Why the greatest thinkers in history were intellectual outlaws outside formal curricula.',
        durationOrPages: '12 pages'
      }
    ]
  },
  {
    id: 'student-reality',
    name: 'STUDENT REALITY',
    shortTag: 'LIVED EXPERIENCE',
    coords: [-3.8, -1.8, 1.5],
    color: '#f43f5e',
    secondaryColor: '#be123c',
    iconName: 'HeartPulse',
    tagline: 'Behind flawless resumes and exam ranks lies an unacknowledged epidemic of existential exhaustion.',
    manifesto: 'Students today are navigating an unprecedented collision of hyper-competitive global credential inflation, constant algorithmic comparison on social platforms, parental anxieties, and economic uncertainty. The unspoken truth is that millions of young minds are suffering in profound isolation while performing competence.',
    coreDilemma: 'How can youth cultivate self-worth when society measures human dignity almost exclusively through academic metrics and career prestiges?',
    provocativeQuestions: [
      'Why is burnout treated as a personal weakness rather than the predictable outcome of an unsustainable systemic grind?',
      'How much of your current career ambition is genuinely yours, and how much is absorbed societal programming?',
      'What happens to a generation that has never been allowed to experience unmeasured, non-monetized curiosity?',
      'Why do we celebrate sleepless nights and stress as badges of honor in student culture?'
    ],
    inDepthArticles: [
      {
        title: 'The Tyranny of the Unbroken Resume',
        readTime: '9 min read',
        summary: 'Why modern students feel unable to pause, reflect, or explore without fear of falling permanently behind.',
        fullText: 'The modern student trajectory has been transformed into an unforgiving escalation of milestones: entrance exams, internships, leadership credentials, research publications. The space for aimless contemplation—the very soil from which authentic identity and passion emerge—has been liquidated in the name of competitive advantage.',
        keyTakeaway: 'A mind constantly optimized for performance loses the ability to discover what is worth performing for.'
      }
    ],
    mediaReferences: [
      {
        type: 'audio',
        title: 'The Silent War: Anonymous Student Confessions',
        creator: 'Intellect Interchange Audio Lab',
        description: 'Intimate, unscripted voices discussing fear of disappointment, comparison fatigue, and finding meaning.',
        durationOrPages: '28 min'
      }
    ]
  },
  {
    id: 'society',
    name: 'SOCIETY & CULTURE',
    shortTag: 'STRUCTURES',
    coords: [3.2, -2.4, 1.6],
    color: '#fbbf24',
    secondaryColor: '#d97706',
    iconName: 'Users',
    tagline: 'Culture dictates what questions are polite to ask and which realities must remain unexamined.',
    manifesto: 'Human civilization is structured around invisible consensus realities—economic myths, social hierarchies, tribal identities, and collective illusions. To think critically is to pull back the curtain on these agreed-upon conventions and inspect the foundations beneath our cultural certainty.',
    coreDilemma: 'Is modern society prioritizing collective comfort and ideological conformity over objective inquiry and ethical courage?',
    provocativeQuestions: [
      'Which beliefs you hold today would be considered irrational 200 years from now?',
      'Does social media facilitate democratic dialogue, or does it incentivize outrage algorithms that polarize communities?',
      'Are we genuinely freer than historical generations, or have our constraints simply become psychological rather than physical?',
      'How much of your social circle’s consensus is driven by genuine agreement versus fear of social exclusion?'
    ],
    inDepthArticles: [
      {
        title: 'The Architecture of Manufactured Consent',
        readTime: '10 min read',
        summary: 'An exploration of how media framing and digital bubbles construct what a society deems unthinkable.',
        fullText: 'Societies rarely control thought through overt force; they do so by setting the boundaries of acceptable discourse. By narrowing the spectrum of legitimate debate while encouraging vigorous debate within that narrow corridor, institutions create the illusion of freedom while ensuring foundational structures remain unquestioned.',
        keyTakeaway: 'The most dangerous censorship is the self-censorship born from the desire for peer belonging.'
      }
    ],
    mediaReferences: [
      {
        type: 'essay',
        title: 'The Panopticon of the Feed',
        creator: 'Cultural Philosophy Forum',
        description: 'Analyzing Foucault’s surveillance theory through the lens of modern social media notification loops.',
        durationOrPages: '15 pages'
      }
    ]
  },
  {
    id: 'science',
    name: 'SCIENCE & REALITY',
    shortTag: 'EPISTEMOLOGY',
    coords: [0.0, 3.6, -2.0],
    color: '#34d399',
    secondaryColor: '#059669',
    iconName: 'Atom',
    tagline: 'Science is not a shrine of final dogmas; it is a relentless method for discovering where we are mistaken.',
    manifesto: 'From quantum entanglement to neurobiological consciousness, the edge of scientific discovery continually reveals that physical reality is vastly stranger, more counter-intuitive, and more open-ended than human sensory intuitions suggest.',
    coreDilemma: 'Can empirical reductionism fully explain the subjective mystery of human consciousness and moral purpose?',
    provocativeQuestions: [
      'If our senses evolved purely for survival rather than truth, how much of physical reality are we structurally blind to?',
      'Is consciousness an emergent property of complex physical matter, or a fundamental property of the cosmos?',
      'Why does the scientific community often resist paradigm shifts until the older generation of scientists passes away?',
      'What are the limits of mathematics in capturing qualitative human experience?'
    ],
    inDepthArticles: [
      {
        title: 'The Illusion of Sensory Completeness',
        readTime: '7 min read',
        summary: 'Cognitive evolutionary theory and why human perception is an interface rather than a direct window on reality.',
        fullText: 'Donald Hoffman’s evolutionary game theory demonstrates that organisms that perceive objective truth are consistently out-competed by organisms whose perceptions are tuned purely for fitness payoffs. Human vision, hearing, and time perception are desktop icons designed to keep us alive, not an exhaustive rendering of the quantum universe.',
        keyTakeaway: 'We do not see reality as it is; we see reality as it is useful for our survival to see it.'
      }
    ],
    mediaReferences: [
      {
        type: 'study',
        title: 'Quantum Indeterminacy and the Limits of Determinism',
        creator: 'Theoretical Physics Institute',
        description: 'Exploring the boundary between observer measurement and wave function collapse.',
        durationOrPages: '22 pages'
      }
    ]
  },
  {
    id: 'history',
    name: 'HISTORY & IDEAS',
    shortTag: 'TEMPORAL DEPTH',
    coords: [-2.6, 0.5, -3.2],
    color: '#fb7185',
    secondaryColor: '#e11d48',
    iconName: 'Hourglass',
    tagline: 'Those who do not understand how ideas were constructed accept them as laws of nature.',
    manifesto: 'History is not merely a catalogue of dates and sovereign wars; it is a living battlefield of competing philosophies. Every political system, educational model, and economic doctrine under which we live today was once a radical, contested thought experiment.',
    coreDilemma: 'Are humans progressing along an inevitable moral and intellectual arc, or endlessly cycling through historical hubris?',
    provocativeQuestions: [
      'Who decided the standard life path you are currently expected to follow, and under what historical conditions?',
      'How have ancient civilizations navigated the exact same existential crises of meaning that we face today?',
      'Why is history rewritten by every successive power structure to legitimize its own supremacy?',
      'What modern consensus belief will future historians look back on with the deepest bewilderment?'
    ],
    inDepthArticles: [
      {
        title: 'The Invention of the Standardized Career',
        readTime: '8 min read',
        summary: 'Tracing the 20th-century corporate creation of the linear retirement-driven life cycle.',
        fullText: 'For most of human history, work was seasonal, communal, and directly tied to immediate survival or craftsmanship. The concept of selling 40 hours a week in a specialized cubicle for 40 continuous years in exchange for end-of-life leisure was invented during the post-WWII corporate boom. It is a historical anomaly, not a biological imperative.',
        keyTakeaway: 'Do not confuse the prevailing customs of your century with eternal human nature.'
      }
    ],
    mediaReferences: [
      {
        type: 'lecture',
        title: 'Socrates on Trial: The Peril of Public Questioning',
        creator: 'Classical Philosophy Archives',
        description: 'Why democratic Athens executed its most famous thinker for teaching youth to interrogate authority.',
        durationOrPages: '42 min'
      }
    ]
  },
  {
    id: 'psychology',
    name: 'PSYCHOLOGY & MIND',
    shortTag: 'INNER UNIVERSE',
    coords: [2.5, 0.8, -3.4],
    color: '#a855f7',
    secondaryColor: '#7e22ce',
    iconName: 'Brain',
    tagline: 'The most difficult territory to explore is the conditioned architecture of your own mind.',
    manifesto: 'Our thoughts feel intimate and spontaneous, yet cognitive psychology and psychoanalysis reveal that the majority of our decisions, emotional reactions, and biases are governed by unconscious conditioning, ancestral fear mechanisms, and defense strategies.',
    coreDilemma: 'How can an individual claim free will when the unconscious mind makes decisions seconds before the conscious ego rationalizes them?',
    provocativeQuestions: [
      'How many of your daily actions are motivated by genuine desire versus the avoidance of subconscious shame?',
      'Why does the human ego defend its political or intellectual opinions as fiercely as physical territory?',
      'Is the voice in your head your authentic self, or simply an observer narrating your evolutionary impulses?',
      'Why is solitude so uncomfortable for the modern mind that we instinctively reach for a screen?'
    ],
    inDepthArticles: [
      {
        title: 'The Default Mode Network and the Trap of Rumination',
        readTime: '6 min read',
        summary: 'Neuroscience of the brain’s resting state and how over-identification with ego generates chronic anxiety.',
        fullText: 'When human beings are not actively engaged in a goal-oriented task, a collection of interacting brain regions known as the Default Mode Network (DMN) activates. The DMN is primarily responsible for self-referential thought: analyzing past regrets, anticipating future dangers, and maintaining the social narrative of the ego. Without training in meta-cognition, the DMN becomes a continuous engine of existential dread.',
        keyTakeaway: 'You are not the voice in your head; you are the space in which that voice is observed.'
      }
    ],
    mediaReferences: [
      {
        type: 'audio',
        title: 'Metacognition: Learning to Watch Your Thoughts',
        creator: 'Mind & Consciousness Lab',
        description: 'Guided psychological deconstruction of automatic thought loops and cognitive biases.',
        durationOrPages: '21 min'
      }
    ]
  },
  {
    id: 'future',
    name: 'THE FUTURE',
    shortTag: 'HORIZONS',
    coords: [0.0, -3.5, 2.2],
    color: '#818cf8',
    secondaryColor: '#4f46e5',
    iconName: 'Sparkles',
    tagline: 'The future is not a predetermined destination; it is an open question waiting for conscious answers.',
    manifesto: 'We stand at the threshold of biological synthesis, synthetic intelligence, planetary climate transformation, and space colonization. The questions we dare to ask today will determine whether technology amplifies human flourishing or accelerates systemic fragility.',
    coreDilemma: 'Will our technological capabilities continue to outpace our philosophical wisdom until catastrophic imbalance occurs?',
    provocativeQuestions: [
      'What ethical rights will sentient non-biological entities possess, and who will arbitrate them?',
      'When genetic engineering allows cognitive enhancement for the wealthy, what happens to human equality?',
      'Can humanity coordinate globally on existential risks, or are our tribal evolutionary brains incapable of planetary empathy?',
      'What will human purpose look like in an era where all economic production is automated?'
    ],
    inDepthArticles: [
      {
        title: 'Wisdom Deficit: The Asymmetry of Modern Power',
        readTime: '8 min read',
        summary: 'Why human civilization is dangerously accelerating technological horsepower without expanding moral maturity.',
        fullText: 'As philosopher Nick Bostrom notes, technological progress is like reaching into an urn of balls representing discoveries. Most are white (beneficial), some are grey (mixed), but a few might be black balls (existential destruction). Without an equivalent investment in ethical deliberation and collective wisdom, the probability of drawing a catastrophic innovation approaches unity.',
        keyTakeaway: 'Power without philosophical wisdom is an existential liability for a civilization.'
      }
    ],
    mediaReferences: [
      {
        type: 'study',
        title: 'Post-Scarcity Economics and the Architecture of Human Dignity',
        creator: 'Global Futures Initiative',
        description: 'Theoretical models for societal organization when labor is decoupled from survival.',
        durationOrPages: '30 pages'
      }
    ]
  }
];
