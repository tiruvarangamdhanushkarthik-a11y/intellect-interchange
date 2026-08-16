import type { SocraticSynthesis } from '../types';

export const CURATED_SOCRATIC_SYNTHESES: Record<string, SocraticSynthesis> = {
  'failure': {
    question: 'Why are students afraid of failure?',
    semanticAnalysis: 'The question assumes failure is inherently terrifying. In biological and computational systems, failure is merely neutral error-correction feedback. The fear is not of the failure itself, but of the social, economic, and identity consequences attached to the failure by modern institutions.',
    perspectives: [
      {
        lens: 'Sociological & Institutional',
        framework: 'Credentialism & Zero-Tolerance Grading',
        argument: 'Educational systems penalize mistakes permanently on transcripts rather than providing iterative revision cycles. The fear is a rational adaptation to an unforgiving grading architecture.',
        critique: 'Fails to explain why students in low-stakes, ungraded environments still experience debilitating performance anxiety.'
      },
      {
        lens: 'Psychological & Psychoanalytic',
        framework: 'Ego Preservation & Contingent Self-Esteem',
        argument: 'When childhood praise is conditioned exclusively on achievement, the student’s subconscious equates an academic error with existential unworthiness and loss of love.',
        critique: 'Often places the entire onus on parental dynamics while ignoring structural socio-economic realities.'
      },
      {
        lens: 'Evolutionary Biology',
        framework: 'Tribal Banishment Signaling',
        argument: 'In ancestral human tribes, visible incompetence risked ostracization, which meant literal physical death. Modern student brains interpret a low test score as an existential threat to tribal inclusion.',
        critique: 'Evolutionary analogies can risk naturalizing cultural pathologies that can actually be reformed.'
      }
    ],
    empiricalEvidence: [
      {
        context: 'Stanford Mindset Studies (Carol Dweck)',
        finding: 'Students praised for innate intelligence actively avoided challenging tasks to protect their label, whereas students praised for effort embraced difficult failures as learning opportunities.',
        caveat: 'Mindset interventions have modest effect sizes when high-stakes structural screening bottlenecks remain unchanged.'
      },
      {
        context: 'Neuroscience of Error-Related Negativity (ERN)',
        finding: 'The brain produces a specific neurological spike (ERN) within 50ms of an error. High-anxiety students exhibit hyperactive ERN waves, experiencing errors as physical pain signals.',
        caveat: 'Brain plasticity allows ERN response to be recalibrated through psychological reframing.'
      }
    ],
    counterArgument: {
      coreChallenge: 'Is the fear of failure entirely toxic, or does a healthy respect for negative outcomes drive essential rigor and prevent catastrophic carelessness in critical fields like medicine, structural engineering, and aviation?',
      blindSpot: 'A total elimination of stakes can lead to apathy; the goal is not to make failure inconsequential, but to decouple failure from human identity and shame.'
    },
    thingsToQuestion: [
      'Who in your life taught you that making a mistake was synonymous with being an inferior person?',
      'If you were mathematically guaranteed that an ambitious project would fail twice before succeeding on the third attempt, would you start today?',
      'How does the fear of looking foolish currently limit the questions you ask in public?'
    ],
    yourConclusionPrompt: 'Synthesize your own stance: Where is the boundary between healthy caution and debilitating terror in your life? How can you reframe error into empirical data?'
  },
  'memorisation': {
    question: 'Is our education system teaching knowledge or memorisation?',
    semanticAnalysis: 'The inquiry interrogates the distinction between "retained data" (memorization) and "conceptual schema" (knowledge). Knowledge enables synthesis, counter-factual reasoning, and transfer across domains, whereas memorization merely replicates fixed tokens under examination conditions.',
    perspectives: [
      {
        lens: 'Epistemological',
        framework: 'Bloom’s Taxonomy Inversion',
        argument: 'Standard curricula focus 80% of evaluation on the lowest cognitive tier (Recall), leaving synthesis, evaluation, and creation as optional extracurricular activities.',
        critique: 'Basic factual recall is an essential foundation; one cannot synthesize complex ideas without a robust mental database of facts.'
      },
      {
        lens: 'Economic & Historical',
        framework: 'Prussian Industrial Pedagogy',
        argument: 'Standardized testing was built for scalability and administrative auditing, not deep understanding. Testing memorization is cheap and algorithmic; assessing creativity is labor-intensive and subjective.',
        critique: 'Standardized tests provide objective benchmarks that can prevent nepotism and subjective grading bias.'
      }
    ],
    empiricalEvidence: [
      {
        context: 'Cognitive Science Ebbinghaus Forgetting Curve',
        finding: 'Students forget up to 75% of crammed examination material within 6 days if it was learned without associative semantic meaning or practical application.',
        caveat: 'Spaced repetition and active recall are effective memorization techniques that can reinforce deep knowledge.'
      }
    ],
    counterArgument: {
      coreChallenge: 'Can true deep thinking occur without memorized foundational knowledge? A chess grandmaster relies on thousands of memorized pattern chunks to play creatively.',
      blindSpot: 'Rejecting all memorization leads to intellectual helplessness when working memory must constantly look up basic principles.'
    },
    thingsToQuestion: [
      'How much of the material you scored an A on last semester can you explain in plain language today?',
      'Are you studying to comprehend the universe, or studying to decode the grading rubric of the examiner?',
      'How will LLMs handling rote recall force human education to redefine genuine intellect?'
    ],
    yourConclusionPrompt: 'Where do you draw the line between foundational memory and mindless regurgitation in your own study habits?'
  },
  'ai-thinking': {
    question: 'Will AI make students smarter or more dependent?',
    semanticAnalysis: 'The question presents a false dichotomy. Technology is non-linear; it amplifies whichever human behavior it is structured to reward. "Smartness" must be decomposed into cognitive stamina, synthesis capability, and factual reach.',
    perspectives: [
      {
        lens: 'Cognitive Offloading Theory',
        framework: 'The Calculators in Math Analogy',
        argument: 'Just as calculators freed mathematicians from mechanical arithmetic to focus on higher topology, AI can free students from basic syntax to focus on high-level philosophical synthesis.',
        critique: 'Unlike math calculators, language models generate the reasoning itself, risking the total bypass of critical analytical friction.'
      },
      {
        lens: 'Neuro-evolutionary',
        framework: 'Synaptic Pruning & Use-It-or-Lose-It',
        argument: 'When the brain ceases to write essays, debug logic, or synthesize disparate sources from scratch, the neural networks responsible for structuring complex thoughts gradually weaken.',
        critique: 'Humans adapt by developing new meta-skills: prompt curation, synthesis verification, and ethical orchestration.'
      }
    ],
    empiricalEvidence: [
      {
        context: '2024 Educational AI Trials',
        finding: 'Students who used AI as a Socratic tutor performed 22% better on independent exams; students who used AI to generate direct answers performed 38% worse when tested without AI.',
        caveat: 'The interface design and student intent determine whether AI acts as a crutch or a catalyst.'
      }
    ],
    counterArgument: {
      coreChallenge: 'Is the traditional essay even the optimal benchmark of intelligence, or is orchestrating multiple AI agents to solve a real-world multi-variable crisis the real intelligence of the 21st century?',
      blindSpot: 'You cannot orchestrate what you do not understand at the fundamental first-principles level.'
    },
    thingsToQuestion: [
      'When you use AI, are you asking it to challenge your reasoning, or simply to save you the discomfort of thinking?',
      'If all external information systems went dark tomorrow, what coherent ideas could your mind construct from memory alone?',
      'Are you using technology as an exoskeleton for the mind, or as an intellectual wheelchair?'
    ],
    yourConclusionPrompt: 'Formulate your personal protocol for using AI: How will you ensure your brain does the heavy cognitive lifting while using AI as a sparring partner?'
  }
};

export const DEFAULT_FALLBACK_SYNTHESIS: SocraticSynthesis = {
  question: 'What is the nature of genuine intellectual independence?',
  semanticAnalysis: 'To examine intellectual independence is to inquire whether an individual can formulate beliefs from direct observation and first-principles reasoning rather than absorbing inherited cultural dogmas.',
  perspectives: [
    {
      lens: 'Philosophical (Kant & Enlightenment)',
      framework: 'Sapere Aude (Dare to Know)',
      argument: 'Immaturity is the inability to use one’s understanding without guidance from another. True intellect is the courage to think without external dogmatic crutches.',
      critique: 'No human mind is an island; all thought relies on language, history, and communal knowledge repositories.'
    },
    {
      lens: 'Cognitive & Behavioral',
      framework: 'Confirmation Bias & Tribal Heuristics',
      argument: 'Human brains evolved for social belonging rather than truth-seeking. Independent thinking requires continuous, uncomfortable metacognitive self-interrogation.',
      critique: 'Extreme skepticism can lead to cynical paralysis and isolation if not grounded in empirical curiosity.'
    }
  ],
  empiricalEvidence: [
    {
      context: 'Asch Conformity Experiments',
      finding: '75% of participants conformed to an obviously incorrect group consensus at least once due to the psychological discomfort of standing alone.',
      caveat: 'The presence of even a single dissenting ally reduced conformity by over 80%.'
    }
  ],
  counterArgument: {
    coreChallenge: 'Can any human truly think independently, or are we simply reshuffling the inputs of the languages, algorithms, and cultures we were exposed to?',
    blindSpot: 'Independence does not mean creating reality ex-nihilo; it means consciously curating and questioning the inputs you allow into your mind.'
  },
  thingsToQuestion: [
    'Which of your strongest core beliefs did you arrive at through painful solitary inquiry versus passive social absorption?',
    'What would it cost you socially to openly state what you truly think about a controversial topic?',
    'How do you differentiate between being a contrarian for ego versus being an authentic seeker of truth?'
  ],
  yourConclusionPrompt: 'Reflect and articulate: What is one belief you currently hold that you need to subject to rigorous first-principles examination?'
};
