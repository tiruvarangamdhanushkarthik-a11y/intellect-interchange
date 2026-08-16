import type { StudentPressureItem } from '../types';

export const FEATURED_DIGITAL_DRAIN = {
  title: 'DIGITAL DRAIN',
  headline: 'Technology was built to save our time. Somewhere along the way, it started consuming it.',
  manifesto: 'We were promised unprecedented efficiency, instant connectivity, and democratized access to the world’s intellectual treasures. Instead, algorithmic architectures engineered by the world’s most sophisticated behavioral psychologists have weaponized variable dopamine schedules to capture, fragment, and monetize the most irreplaceable resource a student possesses: uninterrupted conscious attention.',
  stats: [
    { label: 'Average daily screen time for students', value: '7.8 Hours', context: 'Excluding purely academic coursework' },
    { label: 'Attention span before task interruption', value: '47 Seconds', context: 'Down from 2.5 minutes in 2004' },
    { label: 'Reported phantom vibration / phone checking', value: '150+ times/day', context: 'Subconscious autonomic anxiety response' }
  ],
  deepDiveAnalysis: `When attention is fractured across multiple notification streams, the brain cannot enter what psychologist Mihaly Csikszentmihalyi called "Flow"—the state of deep immersive focus where profound synthesis, mathematical breakthroughs, and original writing occur. 

Instead, students operate in a perpetual state of "Continuous Partial Attention." This condition triggers elevated cortisol levels, degrades working memory capacity, and induces chronic cognitive fatigue. When studying feels agonizingly slow and reading a single book chapter feels impossible, it is not an innate lack of intelligence; it is a neurological system under constant siege from engineered distraction.`,
  takeaways: [
    'Attention is the bedrock of intellectual sovereignty. If you cannot control where your mind rests, someone else controls your thoughts.',
    'Boredom is not a void to be instantly patched with infinite vertical video; it is the necessary precursor to original imagination.',
    'Every notification is an unsolicited bid to purchase your finite mortality for fractions of an advertising cent.'
  ],
  actionableFramework: 'The 3-Day Attention Sovereignty Protocol: 1) Physical quarantine of smartphone during deep work; 2) Monochromatic display mode; 3) 60 minutes of daily deliberate un-stimulated analog contemplation.'
};

export const STUDENT_PRESSURE_TOPICS: StudentPressureItem[] = [
  {
    id: 'academic-pressure',
    title: 'ACADEMIC PRESSURE',
    shortDesc: 'The reduction of multidimensional human intelligence into single numerical grades.',
    manifestoQuote: '“You are told your entire future hinges on a single three-hour test written on a random Tuesday.”',
    deepAnalysis: 'Standardized assessment treats education as a high-stakes filtering mechanism rather than a developmental voyage. The sheer volume of non-contextual information students are mandated to memorize creates a culture of superficial cramming followed by rapid cognitive purging. Genuine comprehension is sacrificed at the altar of percentile metrics.',
    symptoms: [
      'Chronic insomnia and panic before examinations',
      'Loss of organic curiosity for subjects once loved',
      'Equating personal self-worth with grade-point averages',
      'Paralyzing dread of asking "stupid" clarifying questions'
    ],
    hiddenSystemicDrivers: [
      'Institutional reliance on standardized metrics for funding and prestige rankings',
      'Credential inflation demanding ever-higher cutoffs for basic career entry',
      'Curricula designed for mechanical grading rather than creative nuance'
    ],
    counterAction: 'Differentiate between "Exam Performance" (a temporary game with arbitrary rules) and "True Understanding" (your permanent intellectual capital). Play the game when required, but never mistake the score for your mind’s true capacity.',
    reflectionQuestion: 'If no one were watching, grading, or paying you, what subject would you study purely for the joy of understanding it?',
    severityGrade: 'Critical'
  },
  {
    id: 'comparison',
    title: 'COMPARISON & RELATIVE DEPRIVATION',
    shortDesc: 'The psychological poison of comparing your raw internal reality with curated external highlight reels.',
    manifestoQuote: '“You see their acceptance letters and polished milestones, but never their sleepless panic in the dark.”',
    deepAnalysis: 'Social networks and academic forums subject students to an unnatural psychological condition: constant, unfiltered upward social comparison against the top 0.1% of global peers. Evolutionary psychology equipped us to compare ourselves with a local tribe of 100 people; today, our brains process thousands of hyper-optimized triumphs every morning before getting out of bed.',
    symptoms: [
      'Impostor syndrome despite clear objective achievements',
      'Secret bitterness upon hearing of a classmate’s success',
      'Reluctance to share authentic struggles out of shame',
      'Constant urge to broadcast achievements for external validation'
    ],
    hiddenSystemicDrivers: [
      'Algorithm-driven distribution of hyper-exceptional outlier stories',
      'Performative culture on professional platforms (LinkedIn, Instagram)',
      'Societal conditioning equating silence about struggle with weakness'
    ],
    counterAction: 'Measure your trajectory longitudinally against your past self from twelve months ago, rather than cross-sectionally against algorithmically curated strangers.',
    reflectionQuestion: 'How much of your anxiety is born from what you lack, versus what you saw someone else post about having?',
    severityGrade: 'Pervasive'
  },
  {
    id: 'career-confusion',
    title: 'CAREER CONFUSION',
    shortDesc: 'Being forced to select a lifelong specialized identity before ever discovering who you are.',
    manifestoQuote: '“At 17 you need permission to use the restroom, but you are expected to pick a 40-year career trajectory.”',
    deepAnalysis: 'The industrial model demands premature specialization. Students are coerced into committing tens of thousands of hours and massive financial capital toward rigid career paths based on outdated advice from generations whose economic landscape bore zero resemblance to today’s rapidly shifting technological ecosystem.',
    symptoms: [
      'Existential dread regarding future relevance and AI automation',
      'Pursuing prestige degrees that evoke zero intrinsic enthusiasm',
      'Paralysis when attempting to explore non-traditional creative pathways',
      'Fear of disappointing mentors by changing course'
    ],
    hiddenSystemicDrivers: [
      'Economic volatility driving risk-averse parental guidance',
      'Lack of interdisciplinary exposure in high school and college curricula',
      'The societal myth of the linear "dream career"'
    ],
    counterAction: 'Build a broad stack of rare, overlapping skills (e.g., Coding + Clear Writing + Human Psychology) rather than relying on a single hyper-specific rigid job title.',
    reflectionQuestion: 'If all careers paid the exact same salary and possessed the same social prestige, what work would you spend your days doing?',
    severityGrade: 'Systemic'
  },
  {
    id: 'digital-addiction',
    title: 'DIGITAL ADDICTION & FRAGMENTATION',
    shortDesc: 'The systematic capture of the student attentional economy by algorithmic feeds.',
    manifestoQuote: '“You open the screen to check one formula, and two hours vanish into a haze of endless feeds.”',
    deepAnalysis: 'Every swipe, infinite scroll mechanism, and variable reward notification on modern digital platforms has been calibrated through behavioral psychology to induce mild neurological craving states. Students find themselves unable to read long-form texts or sustain deep mathematical problem-solving because their baseline dopamine sensitivity has been warped.',
    symptoms: [
      'Compulsive phone checking within 30 seconds of waking up',
      'Inability to read a book chapter without craving stimulation',
      'Restlessness during quiet, unstructured moments',
      'Severe cognitive brain-fog following multi-hour screen binges'
    ],
    hiddenSystemicDrivers: [
      'Multi-billion-dollar attention monetization business models',
      'Ubiquity of required digital tools in modern academic coursework',
      'Absence of physical third spaces for youth socialization'
    ],
    counterAction: 'Create frictionless analog sacred spaces: study with physical books, notebook and pen, with digital devices physically located in a different room.',
    reflectionQuestion: 'What profound thought or creative realization did you miss today because you reached for your phone the second you felt slightly bored?',
    severityGrade: 'Critical'
  },
  {
    id: 'failure',
    title: 'THE PARALYZING FEAR OF FAILURE',
    shortDesc: 'A zero-mistake culture that treats honest experimentation as catastrophic error.',
    manifestoQuote: '“When failure is penalized rather than examined, students learn to hide mistakes rather than master them.”',
    deepAnalysis: 'In standard academic structures, errors on assignments directly lower final grades with no opportunity for iterative revision. This cultivates a debilitating fixed mindset where students avoid challenging problems, cheat on assignments to protect marks, and develop crippling perfectionism that stifles all original creative risk-taking.',
    symptoms: [
      'Procrastination driven by fear of producing imperfect work',
      'Abandoning difficult projects at the first sign of friction',
      'Excessive anxiety over minor clerical or academic slips',
      'Reluctance to attempt ambitious, non-standard projects'
    ],
    hiddenSystemicDrivers: [
      'Strict non-iterative grading rubrics with zero tolerance for productive failure',
      'Cultural narratives celebrating prodigies while hiding the years of clumsy failures',
      'High-stakes single-attempt entrance exam systems'
    ],
    counterAction: 'Adopt the scientific methodology: an error is not an indictment of your intelligence; it is clean empirical data on what hypothesis was incorrect.',
    reflectionQuestion: 'What ambitious project would you start tomorrow if you were guaranteed that failure would be applauded as brave experimentation?',
    severityGrade: 'Pervasive'
  },
  {
    id: 'parental-expectations',
    title: 'PARENTAL & FAMILY EXPECTATIONS',
    shortDesc: 'The heavy emotional burden of fulfilling dreams that were never your own.',
    manifestoQuote: '“They sacrificed everything for your future; now you carry the guilt of wanting a different life.”',
    deepAnalysis: 'Parents frequently project their own unhealed financial anxieties, unfulfilled ambitions, and social status desires onto their children. Students find themselves trapped in a profound moral dilemma: sacrificing their own psychological authenticity and innate curiosity to keep the peace, or asserting independence at the risk of being labeled ungrateful.',
    symptoms: [
      'Overwhelming guilt whenever taking breaks or resting',
      'Selecting majors based on parental approval rather than aptitude',
      'Chronic terror of not living up to family sacrifices',
      'Masking real emotional distress to prevent parental worry'
    ],
    hiddenSystemicDrivers: [
      'Generational trauma and historical economic instability in developing societies',
      'Cultural values that conflate filial piety with total life obedience',
      'Lack of open, non-judgmental communication channels between generations'
    ],
    counterAction: 'Recognize that authentic gratitude does not mean living someone else’s life. Living an authentic, resilient life is the greatest long-term honor you can offer to your family’s sacrifices.',
    reflectionQuestion: 'Are you living your life to author your own story, or to prevent your parents from feeling disappointed?',
    severityGrade: 'Systemic'
  },
  {
    id: 'competition',
    title: 'HYPER-COMPETITION & ZERO-SUM THINKING',
    shortDesc: 'When classmates are viewed as rival competitors rather than intellectual comrades.',
    manifestoQuote: '“You are trained to look at your peers not as collaborators in truth, but as obstacles to the cutoff score.”',
    deepAnalysis: 'When access to high-quality education and economic opportunity is constrained into artificial bottlenecks, students are pitted against each other in ruthless zero-sum competitions. This erodes empathy, fosters secret gatekeeping of notes and resources, and destroys the collaborative community essential for psychological well-being and scientific advancement.',
    symptoms: [
      'Hesitation to share study notes or help a struggling peer',
      'Constant calculation of relative curve standings',
      'Inability to celebrate collective group achievements',
      'Paranoid suspicion of peers’ intentions and study habits'
    ],
    hiddenSystemicDrivers: [
      'Severe under-investment in tertiary educational capacity relative to population',
      'Curve-grading models that mathematically require a fixed percentage to fail',
      'Corporate hiring practices emphasizing prestige pedigree over collaborative competence'
    ],
    counterAction: 'Build intellectual micro-alliances. History shows that intellectual breakthroughs occur in dense, supportive networks of shared inquiry (e.g., The Lunar Society, The Inklings), not solitary warfare.',
    reflectionQuestion: 'How much more could you understand if you shared your best insights with your peers instead of hoarding them for an exam?',
    severityGrade: 'Critical'
  },
  {
    id: 'loneliness',
    title: 'ISOLATION & THE MASK OF COMPETENCE',
    shortDesc: 'Suffering alone in crowded lecture halls and bustling digital group chats.',
    manifestoQuote: '“You can have 800 followers, 20 WhatsApp groups, and not a single soul you can tell you’re breaking down.”',
    deepAnalysis: 'Hyper-connectivity has ironically yielded the loneliest generation in documented human history. Superficial digital interactions replace vulnerable, face-to-face communion. Because everyone projects competence and joy online, each individual student falsely concludes that they alone are struggling, resulting in severe psychological alienation.',
    symptoms: [
      'Feeling profoundly disconnected even while surrounded by peers',
      'Avoiding social gatherings due to emotional exhaustion',
      'Believing nobody would understand or care about your authentic struggles',
      'Numbing emotional emptiness through binge consumption'
    ],
    hiddenSystemicDrivers: [
      'Replacement of spontaneous physical community with curated digital feeds',
      'Relentless pressure to appear successful and self-sufficient',
      'Stigmatization of vulnerability and mental health dialogue in academic hubs'
    ],
    counterAction: 'Take the brave first step of radical honesty: share a real, unfiltered doubt or struggle with one trusted person. You will almost universally discover they were feeling the exact same way.',
    reflectionQuestion: 'Who in your life knows the real, unpolished truth of what you are experiencing right now?',
    severityGrade: 'Pervasive'
  },
  {
    id: 'productivity-pressure',
    title: 'PRODUCTIVITY GUILT & HUSTLE CULTURE',
    shortDesc: 'The internalization of the belief that resting is a moral failure.',
    manifestoQuote: '“Even when lying down to sleep, your mind whispers: you should be studying, you should be building, you are wasting time.”',
    deepAnalysis: 'Modern hustle culture has transformed every second of life into an economic optimization problem. Hobbies are monetized as side-hustles; reading for pleasure is replaced by listening to 2x speed productivity summaries; and sleep is treated as a regrettable biological inconvenience. This hyper-optimization leads directly to nervous system exhaustion and chronic cynicism.',
    symptoms: [
      'Inability to relax without overwhelming guilt',
      'Obsessive tracking of time and productivity metrics',
      'Viewing personal relationships purely through transactional utility',
      'Crashing into severe multi-week burnout after periods of intense grind'
    ],
    hiddenSystemicDrivers: [
      'Ubiquity of "grindset" influencer media on short-form video platforms',
      'Economic precarity convincing youth that only extreme overwork ensures survival',
      'The erasure of contemplative leisure from cultural values'
    ],
    counterAction: 'Reclaim sacred rest. Understand that the brain consolidates memories, solves complex problems, and generates creative leaps during rest and sleep, not during perpetual frenetic motion.',
    reflectionQuestion: 'Can you sit quietly in a room for thirty minutes doing nothing without feeling guilty for existing?',
    severityGrade: 'Critical'
  }
];
