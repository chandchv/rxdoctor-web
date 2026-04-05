import diseaseData from '../data/disease_symptom_speciality.json';

type DiseaseDictionary = Record<
  string,
  {
    speciality: string;
    symptoms: string[];
  }
>;

export type UrgencyLevel = 'low' | 'medium' | 'high';

export interface DiseaseMatch {
  disease: string;
  score: number;
  matchedSymptoms: string[];
  speciality: string;
}

export interface SymptomAssessment {
  speciality: string;
  urgency: UrgencyLevel;
  possibleConditions: DiseaseMatch[];
  matchedSymptoms: string[];
  recommendation: string;
  confidence: number;
}

type DiseaseProfile = {
  disease: string;
  speciality: string;
  symptoms: string[];
};

// ---------------------------------------------------------------------------
// Synonym map: natural language phrases → canonical dataset symptom tokens
// ---------------------------------------------------------------------------
export const SYNONYM_MAP: Record<string, string> = {
  // headache
  'head hurts': 'headache',
  'head pain': 'headache',
  'head ache': 'headache',
  'migraine headache': 'headache',
  'throbbing head': 'headache',
  'pounding head': 'headache',

  // stomach_pain / abdominal_pain / belly_pain
  'stomach ache': 'stomach_pain',
  'stomach hurts': 'stomach_pain',
  'tummy pain': 'stomach_pain',
  'tummy ache': 'stomach_pain',
  'abdominal cramps': 'abdominal_pain',
  'abdomen pain': 'abdominal_pain',
  'abdomen hurts': 'abdominal_pain',
  'belly ache': 'belly_pain',
  'belly hurts': 'belly_pain',

  // chest_pain
  'chest hurts': 'chest_pain',
  'chest tightness': 'chest_pain',
  'chest pressure': 'chest_pain',
  'pain in chest': 'chest_pain',

  // nausea / vomiting
  'feeling sick': 'nausea',
  'feel nauseous': 'nausea',
  'feel like vomiting': 'nausea',
  'throwing up': 'vomiting',
  'puking': 'vomiting',

  // fever
  'high temperature': 'high_fever',
  'burning up': 'high_fever',
  'very hot': 'high_fever',
  'low grade fever': 'mild_fever',
  'slight fever': 'mild_fever',
  'mild temperature': 'mild_fever',
  fever: 'high_fever',

  // cough
  coughing: 'cough',
  'dry cough': 'cough',
  'wet cough': 'cough',
  'persistent cough': 'cough',

  // breathlessness
  'shortness of breath': 'breathlessness',
  'short of breath': 'breathlessness',
  'difficulty breathing': 'breathlessness',
  'hard to breathe': 'breathlessness',
  'trouble breathing': 'breathlessness',
  'cant breathe': 'breathlessness',
  'breathing difficulty': 'breathlessness',
  'breathing problem': 'breathlessness',

  // fatigue / lethargy
  tired: 'fatigue',
  exhausted: 'fatigue',
  'feeling tired': 'fatigue',
  'no energy': 'fatigue',
  'low energy': 'fatigue',
  sluggish: 'lethargy',
  lethargic: 'lethargy',

  // dizziness
  dizzy: 'dizziness',
  'feeling dizzy': 'dizziness',
  lightheaded: 'dizziness',
  'light headed': 'dizziness',
  giddy: 'dizziness',
  vertigo: 'dizziness',

  // itching
  itchy: 'itching',
  'skin itching': 'itching',
  'itchy skin': 'itching',

  // skin_rash
  rash: 'skin_rash',
  rashes: 'skin_rash',
  'skin rash': 'skin_rash',
  'red rash': 'skin_rash',

  // joint_pain
  'joint ache': 'joint_pain',
  'joints hurt': 'joint_pain',
  'joint stiffness': 'joint_pain',
  'painful joints': 'joint_pain',
  'aching joints': 'joint_pain',

  // muscle_pain
  'muscle ache': 'muscle_pain',
  'body ache': 'muscle_pain',
  'body pain': 'muscle_pain',
  'muscles hurt': 'muscle_pain',
  'sore muscles': 'muscle_pain',
  myalgia: 'muscle_pain',

  // back_pain
  'back ache': 'back_pain',
  'back hurts': 'back_pain',
  backache: 'back_pain',
  'lower back pain': 'back_pain',

  // neck_pain
  'neck ache': 'neck_pain',
  'neck hurts': 'neck_pain',
  'stiff neck': 'stiff_neck',

  // knee_pain
  'knee ache': 'knee_pain',
  'knee hurts': 'knee_pain',

  // diarrhoea
  diarrhea: 'diarrhoea',
  'loose stools': 'diarrhoea',
  'loose motions': 'diarrhoea',
  'watery stool': 'diarrhoea',
  'running stomach': 'diarrhoea',

  // constipation
  constipated: 'constipation',
  'hard stool': 'constipation',
  'difficulty passing stool': 'constipation',

  // weight_loss / weight_gain
  'losing weight': 'weight_loss',
  'lost weight': 'weight_loss',
  'unintended weight loss': 'weight_loss',
  'gaining weight': 'weight_gain',
  'gained weight': 'weight_gain',

  // sweating
  'excessive sweating': 'sweating',
  'night sweats': 'sweating',
  perspiration: 'sweating',

  // depression / anxiety
  depressed: 'depression',
  'feeling depressed': 'depression',
  'feeling low': 'depression',
  sad: 'depression',
  anxious: 'anxiety',
  'feeling anxious': 'anxiety',
  nervous: 'anxiety',
  worried: 'anxiety',

  // burning_micturition (painful urination)
  'painful urination': 'burning_micturition',
  'burning urination': 'burning_micturition',
  'pain when urinating': 'burning_micturition',
  'burns when i pee': 'burning_micturition',
  'burning while urinating': 'burning_micturition',
  'burning pee': 'burning_micturition',

  // continuous_sneezing
  sneezing: 'continuous_sneezing',
  'keep sneezing': 'continuous_sneezing',
  'non stop sneezing': 'continuous_sneezing',

  // watering_from_eyes
  'watery eyes': 'watering_from_eyes',
  'eyes watering': 'watering_from_eyes',
  'teary eyes': 'watering_from_eyes',

  // runny_nose
  'runny nose': 'runny_nose',
  'nose running': 'runny_nose',
  'nasal discharge': 'runny_nose',

  // congestion
  'nasal congestion': 'congestion',
  'stuffy nose': 'congestion',
  'blocked nose': 'congestion',

  // throat_irritation
  'sore throat': 'throat_irritation',
  'throat pain': 'throat_irritation',
  'scratchy throat': 'throat_irritation',
  'throat hurts': 'throat_irritation',

  // loss_of_appetite
  'no appetite': 'loss_of_appetite',
  'not hungry': 'loss_of_appetite',
  'lost appetite': 'loss_of_appetite',
  'dont feel like eating': 'loss_of_appetite',

  // excessive_hunger / increased_appetite
  'always hungry': 'excessive_hunger',
  'very hungry': 'excessive_hunger',
  'eating too much': 'increased_appetite',

  // blurred_and_distorted_vision
  'blurry vision': 'blurred_and_distorted_vision',
  'blurred vision': 'blurred_and_distorted_vision',
  'cant see clearly': 'blurred_and_distorted_vision',
  'vision problems': 'blurred_and_distorted_vision',

  // yellowish_skin / yellowing_of_eyes
  'yellow skin': 'yellowish_skin',
  jaundice: 'yellowish_skin',
  'yellow eyes': 'yellowing_of_eyes',

  // dark_urine
  'dark urine': 'dark_urine',
  'brown urine': 'dark_urine',
  'dark colored urine': 'dark_urine',

  // palpitations / fast_heart_rate
  'heart racing': 'fast_heart_rate',
  'rapid heartbeat': 'fast_heart_rate',
  'fast heartbeat': 'fast_heart_rate',
  'heart pounding': 'palpitations',
  'heart fluttering': 'palpitations',

  // swelling
  'swollen joints': 'swelling_joints',
  'swollen legs': 'swollen_legs',
  'swollen feet': 'swollen_extremeties',
  'swollen hands': 'swollen_extremeties',
  'puffy face': 'puffy_face_and_eyes',
  'puffy eyes': 'puffy_face_and_eyes',

  // dehydration
  dehydrated: 'dehydration',
  'feeling dehydrated': 'dehydration',
  'very thirsty': 'dehydration',

  // acidity / indigestion
  heartburn: 'acidity',
  'acid reflux': 'acidity',
  bloating: 'indigestion',
  'upset stomach': 'indigestion',

  // blood_in_sputum
  'coughing blood': 'blood_in_sputum',
  'blood in cough': 'blood_in_sputum',
  hemoptysis: 'blood_in_sputum',

  // bloody_stool
  'blood in stool': 'bloody_stool',
  'bloody stool': 'bloody_stool',

  // obesity
  overweight: 'obesity',
  obese: 'obesity',

  // polyuria
  'frequent urination': 'polyuria',
  'urinating a lot': 'polyuria',
  'peeing a lot': 'polyuria',

  // mood_swings
  'mood changes': 'mood_swings',
  'mood swings': 'mood_swings',
  moody: 'mood_swings',

  // irritability
  irritable: 'irritability',
  'easily annoyed': 'irritability',

  // loss_of_balance
  unsteady: 'loss_of_balance',
  'losing balance': 'loss_of_balance',
  'balance problems': 'loss_of_balance',

  // loss_of_smell
  'cant smell': 'loss_of_smell',
  'lost smell': 'loss_of_smell',
  anosmia: 'loss_of_smell',

  // restlessness
  restless: 'restlessness',
  'cant sit still': 'restlessness',
  'feeling restless': 'restlessness',

  // slurred_speech
  'slurred speech': 'slurred_speech',
  'difficulty speaking': 'slurred_speech',
  'speech problems': 'slurred_speech',

  // weakness
  'feeling weak': 'muscle_weakness',
  weakness: 'muscle_weakness',
  'weak muscles': 'muscle_weakness',
  'weak limbs': 'weakness_in_limbs',
  'one side weakness': 'weakness_of_one_body_side',
  'one sided weakness': 'weakness_of_one_body_side',

  // phlegm / sputum
  phlegm: 'phlegm',
  mucus: 'mucoid_sputum',
  'mucus in cough': 'mucoid_sputum',

  // red_spots_over_body
  'red spots': 'red_spots_over_body',
  'red dots': 'red_spots_over_body',
  'spots on body': 'red_spots_over_body',

  // skin_peeling
  'peeling skin': 'skin_peeling',
  'skin flaking': 'skin_peeling',

  // abnormal_menstruation
  'irregular periods': 'abnormal_menstruation',
  'irregular menstruation': 'abnormal_menstruation',
  'missed period': 'abnormal_menstruation',

  // hip_joint_pain
  'hip pain': 'hip_joint_pain',
  'hip hurts': 'hip_joint_pain',

  // pain_behind_the_eyes
  'eye pain': 'pain_behind_the_eyes',
  'pain behind eyes': 'pain_behind_the_eyes',

  // redness_of_eyes
  'red eyes': 'redness_of_eyes',
  'bloodshot eyes': 'redness_of_eyes',

  // chills / shivering
  chilly: 'chills',
  'feeling cold': 'chills',
  shaking: 'shivering',
  trembling: 'shivering',
};


// ---------------------------------------------------------------------------
// Normalization & tokenization
// ---------------------------------------------------------------------------

const normalizeSymptom = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, '_');
};

const diseaseProfiles: DiseaseProfile[] = Object.entries(
  diseaseData as DiseaseDictionary
).map(([disease, info]) => ({
  disease,
  speciality: info.speciality,
  symptoms: Array.from(
    new Set(info.symptoms.map(normalizeSymptom).filter(Boolean))
  ),
}));

const SPECIALITY_URGENCY: Record<string, UrgencyLevel> = {
  Cardiology: 'high',
  Neurology: 'high',
  'Infectious Disease Specialist': 'medium',
  Pulmonology: 'medium',
  'General Surgeon': 'medium',
  Gastroenterology: 'medium',
  'Vascular Surgeon': 'medium',
  Urologist: 'medium',
  'ENT Specialist': 'medium',
  Dermatology: 'low',
  'General Physician': 'low',
  'Allergist / Immunologist': 'low',
  Endocrinology: 'medium',
  Orthopedics: 'medium',
  Rheumatology: 'medium',
};

// Build a sorted list of synonym phrases (longest first for greedy matching)
const sortedSynonymPhrases = Object.keys(SYNONYM_MAP).sort(
  (a, b) => b.length - a.length
);

/**
 * Resolve synonyms in the raw input string.
 * Scans for known multi-word phrases first (longest match wins),
 * then falls back to single-word synonym lookup.
 */
const resolveSynonyms = (input: string): string[] => {
  let remaining = input.toLowerCase().replace(/[^a-z0-9\s,.;/|'-]/g, ' ');
  const resolved = new Set<string>();

  // Pass 1: greedy multi-word phrase matching
  for (const phrase of sortedSynonymPhrases) {
    const idx = remaining.indexOf(phrase);
    if (idx !== -1) {
      resolved.add(SYNONYM_MAP[phrase]);
      // blank out the matched region so it isn't re-matched
      remaining =
        remaining.slice(0, idx) +
        ' '.repeat(phrase.length) +
        remaining.slice(idx + phrase.length);
    }
  }

  // Pass 2: tokenize whatever is left and do exact + partial matching
  const chunks = remaining
    .split(/[,.;/|]+/g)
    .map((c) => c.trim())
    .filter(Boolean);

  for (const chunk of chunks) {
    const token = normalizeSymptom(chunk);
    if (!token) continue;

    // Direct vocabulary hit
    if (symptomSet.has(token)) {
      resolved.add(token);
      continue;
    }

    // Single-word synonym lookup
    const plain = chunk.trim().toLowerCase();
    if (SYNONYM_MAP[plain]) {
      resolved.add(SYNONYM_MAP[plain]);
      continue;
    }

    // Partial / substring match against vocabulary
    // e.g. "burning" partially matches "burning_micturition"
    for (const vocabSymptom of symptomVocabulary) {
      const label = vocabSymptom.replace(/_/g, ' ');
      if (label.includes(plain) || plain.includes(label)) {
        resolved.add(vocabSymptom);
      }
    }
  }

  return Array.from(resolved);
};

// Pre-compute vocabulary set for O(1) lookups
export const symptomVocabulary: string[] = Array.from(
  new Set(diseaseProfiles.flatMap((profile) => profile.symptoms))
).sort();

const symptomSet = new Set(symptomVocabulary);

// Legacy tokenizer kept for backward compatibility with autocomplete
const tokenizeInput = (input: string): string[] => {
  const normalized = input
    .toLowerCase()
    .replace(/[^a-z0-9\s,.;/|]/g, ' ')
    .split(/[,.;/|]+/g)
    .map((chunk) => normalizeSymptom(chunk))
    .filter(Boolean);

  return Array.from(new Set(normalized));
};

// ---------------------------------------------------------------------------
// Classifier
// ---------------------------------------------------------------------------

export const classifySymptoms = (
  input: string
): SymptomAssessment | null => {
  if (!input.trim()) {
    return null;
  }

  // Resolve user input through synonym map + fuzzy matching
  const resolvedSymptoms = resolveSynonyms(input);

  // Also include direct token matches for backward compatibility
  const directTokens = tokenizeInput(input);
  const allUserSymptoms = Array.from(
    new Set([...resolvedSymptoms, ...directTokens])
  );

  if (!allUserSymptoms.length) {
    return null;
  }

  const matches = diseaseProfiles
    .map((profile) => {
      const matchedSymptoms = profile.symptoms.filter((symptom) =>
        allUserSymptoms.includes(symptom)
      );
      const score = matchedSymptoms.length / profile.symptoms.length;
      return { profile, matchedSymptoms, score };
    })
    .filter((entry) => entry.matchedSymptoms.length > 0)
    .sort((a, b) => {
      if (b.score === a.score) {
        return b.matchedSymptoms.length - a.matchedSymptoms.length;
      }
      return b.score - a.score;
    });

  if (!matches.length) {
    return null;
  }

  const [topMatch, ...rest] = matches;
  const speciality = topMatch.profile.speciality;
  const urgency = SPECIALITY_URGENCY[speciality] ?? 'medium';
  const confidence = Math.min(
    100,
    Math.max(10, Math.round(topMatch.score * 100))
  );

  const possibleConditions: DiseaseMatch[] = [
    topMatch,
    ...rest.slice(0, 2),
  ].map((match) => ({
    disease: match.profile.disease,
    score: Number(match.score.toFixed(2)),
    matchedSymptoms: match.matchedSymptoms,
    speciality: match.profile.speciality,
  }));

  return {
    speciality,
    urgency,
    possibleConditions,
    matchedSymptoms: topMatch.matchedSymptoms,
    recommendation: `Consult a ${speciality} for further evaluation.`,
    confidence,
  };
};

export default classifySymptoms;
