import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    platform: 'INTELLECT INTERCHANGE.CO API',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    philosophy: 'THINK BEYOND THE SYLLABUS'
  });
});

// Socratic AI Breakdown Endpoint
app.post('/api/ai/socratic-synthesize', async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'A valid question string is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are the Socratic Intellect Engine for Intellect Interchange.co. 
Analyze this philosophical question deeply: "${question}".
You MUST respond strictly in valid JSON matching this schema:
{
  "question": "${question}",
  "semanticAnalysis": "Detailed analysis of what the question is truly asking and the hidden assumptions within it.",
  "perspectives": [
    { "lens": "Sociological", "framework": "Framework name", "argument": "Core argument", "critique": "Critique of this lens" },
    { "lens": "Cognitive / Psychological", "framework": "Framework name", "argument": "Core argument", "critique": "Critique of this lens" },
    { "lens": "Philosophical / Epistemic", "framework": "Framework name", "argument": "Core argument", "critique": "Critique of this lens" }
  ],
  "empiricalEvidence": [
    { "context": "Empirical study or historical precedent", "finding": "Key finding", "caveat": "Limitation or nuance" }
  ],
  "counterArgument": {
    "coreChallenge": "Strongest challenge to the premise of the question",
    "blindSpot": "What is often overlooked"
  },
  "thingsToQuestion": [
    "First critical inquiry prompt for the user",
    "Second critical inquiry prompt for the user",
    "Third critical inquiry prompt for the user"
  ],
  "yourConclusionPrompt": "Socratic prompt challenging the user to formulate their own conclusion."
}
Return ONLY raw JSON without markdown code fences.`
              }]
            }]
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedText);
        return res.json({ success: true, source: 'live_gemini', synthesis: parsed });
      }
    }

    // Default fallback synthesis if no API key is provided
    return res.json({
      success: true,
      source: 'curated_database',
      message: 'Synthesized using Intellect Interchange Socratic Knowledge Base.',
      synthesis: {
        question,
        semanticAnalysis: `Deconstructing the inquiry: "${question}". The inquiry exposes how cognitive structures and institutional norms condition our baseline beliefs.`,
        perspectives: [
          {
            lens: 'Epistemological',
            framework: 'First-Principles Inquiry',
            argument: 'Interrogating the foundational premises rather than accepting derived conclusions.',
            critique: 'Can lead to cognitive paralysis if not paired with pragmatic action.'
          },
          {
            lens: 'Sociological',
            framework: 'Systemic Incentives',
            argument: 'Human behavior is strongly shaped by the evaluation and reward metrics of institutions.',
            critique: 'Underestimates individual psychological agency and dissent.'
          }
        ],
        empiricalEvidence: [
          {
            context: 'Cognitive Science of Conformity',
            finding: 'Independent inquiry requires conscious cognitive effort to overcome inherited heuristics.',
            caveat: 'Heuristics are evolutionarily efficient for survival.'
          }
        ],
        counterArgument: {
          coreChallenge: 'Is the core premise of this inquiry overlooking alternative historical conditions?',
          blindSpot: 'We often judge past or alternate perspectives through the unexamined assumptions of our present decade.'
        },
        thingsToQuestion: [
          'What personal interest or bias do you bring to this question?',
          'What would it take to empirically falsify your initial answer?',
          'Who benefits when this question remains unasked?'
        ],
        yourConclusionPrompt: 'Reflect on these perspectives and state your reasoned conclusion.'
      }
    });
  } catch (error) {
    console.error('AI synthesis error:', error);
    return res.status(500).json({ error: 'Internal synthesis error' });
  }
});

app.listen(PORT, () => {
  console.log(`Intellect Interchange API server running on port ${PORT}`);
});
