const nodeTemplates = {
  productionOrder: {
    data: {
      itemName: "",
      quantity: 0,
      startDate: "",
      endDate: "",
      customerName: "",
      status: "",
    },
  },

  inventory: {
    data: {
      currentStock: 0,
      reservedStock: 0,
      status: "",
      total:0,
    },
  },

  parts: {
    data: {
      pn: "",
      amount: 0,
      totalRequired: 0,
      sku: "",
      unitCost: 0,
      totalCost: 0,
      name: "",
    },
  },

  processing: {
    data: {
      processName: "",
      machineId: "",
      rateUnitsPerHour: 0,
      inputRate: 0,
      setupTimeMin: 0,
      operatorCount: 0,
      operatorSkill: "",
      status: "",
      hoursPerDay: 0,
      daysPerWeek: 0,
      machineCostPerHour: 0,
      laborCostPerHour: 0,
      totalProcessingCost: 0,
      time: "",
      total:0,
    },
  },

  assembly: {
    data: {
      name: "",
      unitsPerHr: 0,
      hoursPerDay: 0,
      daysPerWeek: 0,
      qualityCheck: false,
      qualityPass: "",
      machineCostPerHour: 0,
      laborCostPerHour: 0,
      assemblyCost: 0,
    },
  },

  finalProduct: {
    data: {
      itemName: "",
      quantityProduced: 0,
      batchNumber: "",
      packagingInfo: "",
      qcStatus: "",
      dispatchDate: "",
      deliveryLocation: "",
      costPerUnit: 0,
      totalCost: 0,
    },
  },
};

export default nodeTemplates;
