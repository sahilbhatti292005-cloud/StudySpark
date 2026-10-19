/**
 * High-quality authentic academic sample texts for 1-click test runs
 */

import type { SummaryResponse, FlashcardResponse, QuizResponse, TopicExplainResponse } from '../types/index.ts';

export const SAMPLE_TEXTS = {
  biology: `Photosynthesis and Cellular Respiration:
Photosynthesis is the biochemical process by which photoautotrophic organisms convert light energy into chemical energy stored in glucose molecules. In eukaryotes, this occurs within the chloroplasts. The light-dependent reactions take place across the thylakoid membrane, where chlorophyll pigments absorb photons, splitting water molecules (photolysis) to release molecular oxygen (O2), protons, and excited electrons. These electrons traverse an electron transport chain, generating ATP through photophosphorylation and reducing NADP+ to NADPH.

The light-independent reactions (Calvin cycle) occur in the stroma. Here, the enzyme ribulose-1,5-bisphosphate carboxylase-oxygenase (RuBisCO) fixes atmospheric carbon dioxide (CO2) into 3-phosphoglycerate (3-PGA). Through phosphorylation by ATP and reduction by NADPH, 3-PGA is converted to glyceraldehyde-3-phosphate (G3P), which eventually yields hexose sugars like glucose.

Conversely, cellular respiration is the catabolic pathway that breaks down glucose in the presence of oxygen to produce ATP, carbon dioxide, and water. Respiration involves four sequential stages: glycolysis in the cytosol, pyruvate oxidation in the mitochondrial matrix, the citric acid (Krebs) cycle, and oxidative phosphorylation along the mitochondrial inner membrane via ATP synthase. The overall balanced equation for aerobic respiration is C6H12O6 + 6O2 -> 6CO2 + 6H2O + ~30-32 ATP.`,

  history: `The Industrial Revolution (circa 1760–1840):
The Industrial Revolution was the transition to new manufacturing processes in Great Britain, continental Europe, and the United States. Key technological shifts included the mechanization of textiles via the spinning jenny and power loom, the development of steam power refined by James Watt, and the iron smelting technique utilizing coke rather than charcoal pioneered by Abraham Darby.

Prior to industrialization, production was characterized by the domestic or cottage system, where artisanal goods were produced manually in small workshops. The invention of centralized factories concentrated labor and mechanical machinery under single roofs, leading to rapid urbanization as rural populations migrated toward industrial centers like Manchester, Birmingham, and Leeds.

Economic consequences included exponential rises in productivity and the establishment of industrial capitalism, but also harsh labor conditions, child exploitation, and environmental degradation, which eventually spurred the British Factory Acts of 1833 and the emergence of organized trade unions.`,

  physics: `Newton's Laws of Motion and Gravitation:
Sir Isaac Newton published his three fundamental laws of motion in the Philosophiae Naturalis Principia Mathematica in 1687. 
1. First Law (Inertia): An object remains at rest or in uniform rectilinear motion unless acted upon by a net external force (Sigma F = 0 implies acceleration a = 0).
2. Second Law (Force and Acceleration): The net force acting on a body is equal to the time rate of change of its linear momentum (F = dp/dt). For constant mass, this simplifies to the famous relation F = ma.
3. Third Law (Action and Reaction): When one body exerts a force on a second body, the second body simultaneously exerts a force equal in magnitude and opposite in direction on the first body (F_A_on_B = - F_B_on_A).

Newton also formulated the Law of Universal Gravitation, stating that every particle attracts every other particle with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between their centers (F = G * (m1 * m2) / r^2, where G is the gravitational constant 6.674 x 10^-11 N m^2 / kg^2).`,
};

export const SAMPLE_TOPICS = [
  'Schrödinger’s Cat and Quantum Superposition',
  'Supply and Demand Elasticity',
  'How Neural Networks Learn (Backpropagation)',
  'Plate Tectonics and Continental Drift',
  'DNA Replication and Polymerase Enzymes',
];

export const PREBUILT_QUIZZES: Record<string, QuizResponse> = {
  biology: {
    topic: 'Photosynthesis & Cellular Respiration',
    questions: [
      {
        id: 'bio-q1',
        question: 'Where do the light-dependent reactions of photosynthesis take place in eukaryotic plant cells?',
        options: ['Stroma', 'Thylakoid membrane', 'Mitochondrial matrix', 'Outer chloroplast envelope'],
        correctIndex: 1,
        explanation: 'Light-dependent reactions occur across the thylakoid membrane, where chlorophyll pigments absorb photons to split water and initiate the electron transport chain.',
      },
      {
        id: 'bio-q2',
        question: 'What is the primary role of the enzyme RuBisCO in the Calvin cycle?',
        options: [
          'Splitting water to release molecular oxygen',
          'Fixing atmospheric CO2 into 3-phosphoglycerate (3-PGA)',
          'Direct synthesis of ATP via photophosphorylation',
          'Exporting glucose from the chloroplast to the cytosol',
        ],
        correctIndex: 1,
        explanation: 'RuBisCO catalyzes the initial carbon-fixing step of the light-independent reactions by combining atmospheric CO2 with ribulose-1,5-bisphosphate.',
      },
      {
        id: 'bio-q3',
        question: 'Which stage of cellular respiration occurs in the cytosol rather than within the mitochondria?',
        options: ['Glycolysis', 'Pyruvate oxidation', 'Citric acid (Krebs) cycle', 'Oxidative phosphorylation'],
        correctIndex: 0,
        explanation: 'Glycolysis is the initial catabolic pathway that breaks glucose down into pyruvate within the cytoplasm/cytosol before pyruvate enters the mitochondria.',
      },
      {
        id: 'bio-q4',
        question: 'What is the theoretical ATP yield per glucose molecule during aerobic cellular respiration in eukaryotes?',
        options: ['2 to 4 ATP', '12 to 14 ATP', '~30 to 32 ATP', '60 to 64 ATP'],
        correctIndex: 2,
        explanation: 'Aerobic cellular respiration typically yields approximately 30 to 32 ATP molecules per glucose molecule across glycolysis, the Krebs cycle, and oxidative phosphorylation.',
      },
    ],
  },
  history: {
    topic: 'The Industrial Revolution (1760–1840)',
    questions: [
      {
        id: 'hist-q1',
        question: 'What was a primary metallurgical innovation that reduced reliance on timber charcoal for smelting iron?',
        options: [
          'Smelting with coke pioneered by Abraham Darby',
          'The Bessemer converter process',
          'Electric arc furnaces',
          'Hydraulic water wheel blast furnaces',
        ],
        correctIndex: 0,
        explanation: 'Abraham Darby pioneered iron smelting using purified coal (coke) in 1709, releasing metallurgy from reliance on dwindling wood charcoal supplies.',
      },
      {
        id: 'hist-q2',
        question: 'How did the domestic cottage system differ fundamentally from the new factory system?',
        options: [
          'Cottage production was heavily automated with steam engines',
          'Cottage production was manual, decentralized, and home-based',
          'Cottage workers were organized into national labor unions',
          'Cottage workshops were operated by state government monopolies',
        ],
        correctIndex: 1,
        explanation: 'Prior to centralization into mechanised factories, artisans produced textiles and goods manually in decentralized rural homes or workshops.',
      },
      {
        id: 'hist-q3',
        question: 'Which legislative measure in Great Britain sought to address extreme child exploitation in textile mills?',
        options: ['The Factory Act of 1833', 'The Corn Laws of 1815', 'The Reform Act of 1867', 'The Enclosure Acts'],
        correctIndex: 0,
        explanation: 'The Factory Act of 1833 set legal limits on working hours for children and mandated minimal schooling in textile factories.',
      },
    ],
  },
  physics: {
    topic: "Newton's Laws of Motion & Gravitation",
    questions: [
      {
        id: 'phys-q1',
        question: "According to Newton's First Law, what happens to an object in motion if the net external force is zero?",
        options: [
          'It immediately decelerates to rest',
          'It continues in uniform rectilinear motion with constant velocity',
          'Its momentum increases linearly',
          'Its gravitational potential increases',
        ],
        correctIndex: 1,
        explanation: "Newton's First Law (Law of Inertia) dictates that when ΣF = 0, acceleration is zero, maintaining uniform rectilinear velocity.",
      },
      {
        id: 'phys-q2',
        question: 'How is gravitational force related to the distance between two spherical masses according to Newton?',
        options: [
          'Directly proportional to the distance',
          'Inversely proportional to the distance',
          'Inversely proportional to the square of the distance',
          'Independent of the distance',
        ],
        correctIndex: 2,
        explanation: 'Newton’s Law of Universal Gravitation follows an inverse-square law: F = G*(m1*m2)/r^2.',
      },
    ],
  },
};
