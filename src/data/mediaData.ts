import type { MediaResource } from '../types';

export const MEDIA_RESOURCES: MediaResource[] = [
  {
    id: 'media-1',
    type: 'DOCUMENTARIES',
    title: 'HOW AI IS REDUCING HUMAN THINKING CAPACITY',
    subtitle: 'The Invisible Cognitive Trade-off of Automated Intelligence',
    durationOrLength: '42 min Feature',
    authorOrCreator: 'Intellect Interchange Documentary Wing',
    category: 'AI & Cognition',
    isFeatured: true,
    abstract: 'An investigative exploration into how effortless synthetic answers alter brain plasticity, critical skepticism, and the threshold for deep creative struggle.',
    detailedAnalysis: `When calculating machines first entered the classroom in the 1970s, educators feared human mathematical ability would permanently collapse. Instead, arithmetic moved to the machine, allowing mathematicians to operate at higher levels of abstraction. 

However, Large Language Models represent a categorically distinct inflection point. Unlike a calculator, which calculates fixed numerical transformations, language models perform semantic synthesis—the exact domain where human critical judgment, ethical wrestling, and original metaphors are forged. 

By analyzing EEG data from students writing essays independently versus students using generative synthesis tools, researchers discover a startling reduction in prefrontal cortex theta-wave synchronization. The documentary travels across universities and neuroscience labs to ask: If we offload the friction of formulating thoughts, what will happen to the human capacity to independently discern truth from sophisticated falsehood?`,
    coreQuestions: [
      'Is the friction of writing an essay the goal itself, rather than the final text file?',
      'How can an educational curriculum measure cognitive struggle when the final artifact can be generated in 4 seconds?',
      'What happens to human empathy when communicative nuance is templated by synthetic predictive text?'
    ],
    audioWaveformPreset: [20, 35, 60, 80, 45, 90, 100, 75, 40, 65, 85, 30, 50, 70, 95, 40, 25, 60, 80, 55]
  },
  {
    id: 'media-2',
    type: 'ARTICLES',
    title: 'DIGITAL DRAIN: THE MONETIZATION OF STUDENT ATTENTION',
    subtitle: 'Deconstructing the Behavioral Psychology of Infinite Feeds',
    durationOrLength: '12 min Read',
    authorOrCreator: 'Cognitive Ecology Journal',
    category: 'Student Reality',
    isFeatured: true,
    abstract: 'How variable-ratio dopamine scheduling turns students into passive consumers and shatters working memory spans.',
    detailedAnalysis: `Slot machines are notoriously addictive not because they reward the player every time, but because the payout is randomized—a psychological mechanism known as variable-ratio reinforcement. Modern short-form video platforms employ this exact behavioral conditioning on a staggering scale. Every swipe down is an unpredictable pull of the neurological lever: will the next video be hilarious, shocking, or mundane?

This erratic dopamine pulse conditions the brain to reject low-stimulation activities. Reading a dense textbook on quantum mechanics or dissecting historical treaties offers slow, delayed cognitive rewards. When placed in competition with instant, hyper-concentrated algorithmic stimulation, the student's executive attention network collapses. The feeling of "I have no willpower" is not a moral failure; it is the physiological outcome of an asymmetrical war between human biology and supercomputing behavioral design.`,
    coreQuestions: [
      'Why is boredom essential for philosophical contemplation?',
      'How can students design environmental friction to protect their focus?',
      'What are the long-term societal consequences of a population incapable of sustained 2-hour reading sessions?'
    ]
  },
  {
    id: 'media-3',
    type: 'RESEARCH',
    title: 'THE SAD REALITY OF INDIAN STUDENTS',
    subtitle: 'The Engineering, Medical & Entrance Exam Rat Race Deconstructed',
    durationOrLength: '28 Page Whitepaper',
    authorOrCreator: 'Education & Socio-Economic Research Collective',
    category: 'Systemic Crisis',
    isFeatured: true,
    abstract: 'An uncompromising examination of coaching hubs, 16-hour study regimes, family financial stakes, and the loss of youth identity in Kota and beyond.',
    detailedAnalysis: `In emerging economies with massive demographics and constrained tertiary institutional capacity, entrance examinations (such as JEE, NEET, and UPSC) operate not as talent discovery tools, but as hyper-efficient elimination filters. Over 1.5 million students compete for fewer than 15,000 premier seats—a mathematical acceptance rate below 1%.

This structural bottleneck has spawned a multi-billion dollar parallel coaching industry where adolescent students are sequestered into high-pressure test-taking factories. The curriculum is reduced to algorithmic pattern recognition and speed drills. Physical exercise, artistic expression, philosophical exploration, and emotional relationships are treated as frivolous distractions. The whitepaper details the staggering psychological toll: chronic burnout, identity crises upon graduation, and an epidemic of silent despair among students who believed their entire human worth was defined by an all-India rank.`,
    coreQuestions: [
      'How can a nation modernize its economy when its brightest youth are trained as rote examination algorithms?',
      'What alternative credentialing architectures can break the monopoly of hyper-centralized entrance exams?',
      'How do parents and educators dismantle the generational narrative equating engineering/medicine with the only valid survival path?'
    ]
  },
  {
    id: 'media-4',
    type: 'PODCASTS',
    title: 'THE SILENT WAR INSIDE EVERY STUDENT',
    subtitle: 'Episode 01: Breaking the Mask of Competence',
    durationOrLength: '36 min Audio',
    authorOrCreator: 'Intellect Interchange Voices',
    category: 'Psychology',
    isFeatured: true,
    abstract: 'Unscripted discussions with students across disciplines discussing the terrifying gap between who they pretend to be and what they feel.',
    detailedAnalysis: `In this inaugural episode, three anonymous students from engineering, humanities, and medical tracks sit down with a clinical psychologist to dissect the "Mask of Competence." They explore why admitting confusion in class feels like professional suicide, how LinkedIn has turned early-20s life into a performative corporate audition, and practical psychological protocols for detaching self-worth from external milestones.`,
    coreQuestions: [
      'Why is vulnerability viewed as weakness in competitive academic circles?',
      'How do we cultivate communities where failure can be discussed with curiosity rather than shame?'
    ],
    audioWaveformPreset: [15, 45, 75, 90, 60, 30, 80, 95, 70, 40, 60, 85, 90, 45, 30, 65, 80, 50, 20, 10]
  },
  {
    id: 'media-5',
    type: 'VIDEOS',
    title: 'ALGORITHMIC LIFE: RECLAIMING AUTONOMOUS THOUGHT',
    subtitle: 'Video Essay on Digital Panopticons and Free Will',
    durationOrLength: '18 min Video Essay',
    authorOrCreator: 'Philosophy & Media Laboratory',
    category: 'Society & Media',
    isFeatured: true,
    abstract: 'How feed algorithms predict and subtly shape your desires, political opinions, and self-conception before you even consciously formulate them.',
    detailedAnalysis: `When an algorithm can predict what you will click with 94% accuracy, at what point does recommendation transition into covert behavioral modification? By analyzing how recommendation loops create ideological echo chambers and narrow emotional ranges, this video essay demonstrates how to reclaim sovereign agency over your information diet.`,
    coreQuestions: [
      'If an algorithm shapes all your inputs, can you truly claim your conclusions are your own?',
      'What practical information hygiene practices can preserve intellectual independence?'
    ],
    audioWaveformPreset: [30, 50, 70, 85, 95, 60, 40, 75, 85, 90, 65, 35, 55, 80, 70, 40, 25, 60, 75, 45]
  }
];
