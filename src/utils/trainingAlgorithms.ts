import { User, TrainingZone, WorkoutTemplate } from '../types';

export const classifyRunnerLevel = (user: Partial<User>): 'beginner' | 'intermediate' | 'advanced' => {
  const { continuousRunTime = 0, weeklyFrequency = 0, experienceMonths = 0 } = user;
  
  if (continuousRunTime < 20 || weeklyFrequency < 2 || experienceMonths < 6) {
    return 'beginner';
  }
  
  if (continuousRunTime >= 30 && continuousRunTime < 60 && 
      weeklyFrequency >= 3 && experienceMonths >= 6 && experienceMonths < 18) {
    return 'intermediate';
  }
  
  if (continuousRunTime >= 60 && weeklyFrequency >= 4 && experienceMonths >= 18) {
    return 'advanced';
  }
  
  return 'intermediate';
};

export const calculateTrainingZones = (maxHR: number) => ({
  zone1: {
    min: Math.round(maxHR * 0.50),
    max: Math.round(maxHR * 0.60),
    name: "Recuperação Ativa",
    description: "Caminhada rápida ou corrida muito leve"
  },
  zone2: {
    min: Math.round(maxHR * 0.60),
    max: Math.round(maxHR * 0.70),
    name: "Base Aeróbica",
    description: "Corrida leve, conversacional"
  },
  zone3: {
    min: Math.round(maxHR * 0.70),
    max: Math.round(maxHR * 0.80),
    name: "Aeróbico Moderado",
    description: "Corrida em ritmo confortável"
  },
  zone4: {
    min: Math.round(maxHR * 0.80),
    max: Math.round(maxHR * 0.90),
    name: "Limiar Anaeróbico",
    description: "Ritmo de tempo run"
  },
  zone5: {
    min: Math.round(maxHR * 0.90),
    max: Math.round(maxHR * 1.00),
    name: "VO2 Máx",
    description: "Intervalados intensos"
  }
});

export const generateBeginnerPlan = (week: number): WorkoutTemplate[] => [
  {
    type: 'caco',
    duration: 20,
    intensity: 2,
    structure: `6x (${Math.min(1 + week * 0.5, 3)} min corrida + 2 min caminhada)`,
    warmup: "5 min caminhada",
    cooldown: "5 min caminhada + alongamento leve",
    notes: "Método CaCo - foque na consistência, não na velocidade"
  },
  {
    type: 'recovery',
    duration: 0,
    intensity: 1,
    structure: "Descanso ativo ou total",
    warmup: "",
    cooldown: "",
    notes: "Caminhada leve opcional (15-20 min)"
  },
  {
    type: 'easy',
    duration: Math.min(15 + week * 2, 30),
    intensity: 2,
    structure: "Corrida contínua leve",
    warmup: "5 min caminhada",
    cooldown: "5 min caminhada + alongamento",
    notes: "Se não conseguir correr contínuo, use CaCo"
  }
];

export const generateIntermediatePlan = (week: number): WorkoutTemplate[] => [
  {
    type: 'recovery',
    duration: 20,
    intensity: 2,
    structure: "Corrida de recuperação",
    warmup: "5 min caminhada",
    cooldown: "5 min caminhada",
    notes: "Ritmo muito confortável"
  },
  {
    type: 'tempo',
    duration: 30,
    intensity: 4,
    structure: `Aquecimento 10 min + ${Math.min(6 + week, 15)} min ritmo + Desaquecimento 10 min`,
    warmup: "10 min corrida leve",
    cooldown: "10 min corrida leve + alongamento",
    notes: "Ritmo 'comfortavelmente difícil' - zona 4"
  },
  {
    type: 'cross',
    duration: 40,
    intensity: 3,
    structure: "Treino cruzado",
    warmup: "5 min leve",
    cooldown: "5 min leve",
    notes: "Ciclismo, natação ou elíptico"
  },
  {
    type: 'intervals',
    duration: 35,
    intensity: 5,
    structure: `Aquec. 10 min + ${Math.min(2 + Math.floor(week/2), 6)}x (3 min forte + 2 min rec.) + Desaq. 10 min`,
    warmup: "10 min corrida progressiva",
    cooldown: "10 min corrida leve + alongamento",
    notes: "Intervalos na zona 5 - recuperação ativa"
  },
  {
    type: 'long',
    duration: Math.min(40 + week * 5, 90),
    intensity: 2,
    structure: "Longão em ritmo fácil",
    warmup: "Primeiros 10 min muito leves",
    cooldown: "Últimos 10 min progressivamente mais lentos",
    notes: "Base aeróbica - zona 2. Hidratação constante"
  }
];

export const generateAdvancedPlan = (week: number, targetRace: '10k' | 'half' | 'marathon' = '10k'): WorkoutTemplate[] => {
  const raceSpecificLong = {
    '10k': Math.min(60 + week * 3, 90),
    'half': Math.min(90 + week * 5, 150),
    'marathon': Math.min(120 + week * 8, 210)
  };
  
  return [
    {
      type: 'recovery',
      duration: 40,
      intensity: 2,
      structure: "Corrida regenerativa",
      warmup: "Primeiros 5 min muito leves",
      cooldown: "Alongamento completo + automassagem",
      notes: "Foco na recuperação ativa - zona 1-2"
    },
    {
      type: 'intervals',
      duration: 60,
      intensity: 5,
      structure: `Aquec. 15 min + ${Math.min(4 + Math.floor(week/2), 8)}x (5 min limiar + 90s rec.) + Desaq. 15 min`,
      warmup: "15 min progressivo até zona 3",
      cooldown: "15 min regressivo + alongamento dinâmico",
      notes: "Sessão bi-diária opcional: manhã recuperação 30 min"
    },
    {
      type: 'easy',
      duration: 45,
      intensity: 2,
      structure: "Corrida de manutenção",
      warmup: "Progressivo nos primeiros 10 min",
      cooldown: "Regressivo nos últimos 10 min",
      notes: "Zona 2 estrita - base aeróbica"
    },
    {
      type: 'tempo',
      duration: 50,
      intensity: 4,
      structure: `Aquec. 15 min + ${Math.min(20 + week * 2, 40)} min ritmo constante + Desaq. 15 min`,
      warmup: "15 min progressivo",
      cooldown: "15 min + exercícios de core",
      notes: "Sessão bi-diária opcional: manhã 30 min zona 1"
    },
    {
      type: 'intervals',
      duration: 70,
      intensity: 5,
      structure: "Kenyan Hills ou Intervalado Longo",
      warmup: "15 min + exercícios dinâmicos",
      cooldown: "15 min + crioterapia recomendada",
      notes: "Treino específico da semana - alta intensidade"
    },
    {
      type: 'long',
      duration: raceSpecificLong[targetRace],
      intensity: 3,
      structure: "Longão com trechos em ritmo de prova",
      warmup: "Primeiros 20 min zona 2",
      cooldown: "Últimos 15 min muito leves + recuperação completa",
      notes: "Inclui trechos em pace de prova nos últimos 30-40 min"
    }
  ];
};
