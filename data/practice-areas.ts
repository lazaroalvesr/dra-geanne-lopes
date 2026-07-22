export const practiceAreas = [
  {
    number: '01',
    symbol: '✦',
    title: 'Direito Previdenciário',
    description: 'Atuação em requerimentos administrativos no INSS e revisões de benefícios.',
    featured: true,
  },
  {
    number: '02',
    symbol: '⌁',
    title: 'Processos judiciais em face do INSS',
    description: 'Defesa dos seus direitos quando a via administrativa não resolve a demanda.',
    featured: false,
  },
  {
    number: '03',
    symbol: '◌',
    title: 'Planejamento Previdenciário',
    description: 'Análise estratégica para compreender possibilidades, organizar documentos e planejar o melhor momento para requerer o benefício.',
    featured: false,
  },
  {
    number: '04',
    symbol: '∑',
    title: 'Cálculos Previdenciários',
    description: 'Elaboração e conferência de cálculos para analisar valores de benefícios e possíveis diferenças devidas.',
    featured: false,
  },
] as const;

export const contactServiceOptions = [
  ...practiceAreas.map((area) => area.title),
  'Não sei qual atendimento preciso',
] as const;
