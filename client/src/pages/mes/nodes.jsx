



export const initialNodes = [
  {
    id: 'n1',
    type: 'inventory',
    position: { x: 0, y: 0 },
    data: { amount: 0, value: 1000, unit: 'box', label: 'Raw Material' },
  },
  {
    id: 'n2',
    type: 'processing',
    position: { x: 300, y: 0 },
    data: { 
      processName: 'Cutting', 
      lossRate: 5, 
      duration: 60,
      inputValue: 1000,
      label: 'Processing Unit'
    },
  },
  {
    id: 'n3',
    type: 'qualityCheck',
    position: { x: 600, y: 0 },
    data: { 
      checkType: 'Visual Inspection', 
      acceptanceRate: 95, 
      status: 'pending',
      inputValue: 950,
      label: 'Quality Check'
    },
  },
  {
    id: 'n4',
    type: 'inventory',
    position: { x: 900, y: 0 },
    data: { amount: 0, value: 900, unit: 'box', label: 'Final Stock' },
  },
];