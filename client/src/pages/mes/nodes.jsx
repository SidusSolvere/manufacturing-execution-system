export const initialNodes = [
  
    {
        "id": "1",
        "type": "productionOrder",
        "position": {
            "x": -103,
            "y": 421
        },
        "data": {
            "itemName": "chair",
            "quantity": 100,
            "startDate": "",
            "endDate": "",
            "customerName": "",
            "status": ""
        },
        "measured": {
            "width": 438,
            "height": 166
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "2",
        "type": "parts",
        "position": {
            "x": 598,
            "y": -16
        },
        "data": {
            "pn": "",
            "amount": 4,
            "totalRequired": 400,
            "sku": "",
            "unitCost": 50,
            "totalCost": 20000,
            "name": "legs"
        },
        "measured": {
            "width": 289,
            "height": 302
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "3",
        "type": "parts",
        "position": {
            "x": 588,
            "y": 334
        },
        "data": {
            "pn": "",
            "amount": 1,
            "totalRequired": 100,
            "sku": "",
            "unitCost": 150,
            "totalCost": 15000,
            "name": "base"
        },
        "measured": {
            "width": 287,
            "height": 302
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "4",
        "type": "parts",
        "position": {
            "x": 592,
            "y": 706
        },
        "data": {
            "pn": "",
            "amount": 1,
            "totalRequired": 100,
            "sku": "",
            "unitCost": 100,
            "totalCost": 10000,
            "name": "backrest"
        },
        "measured": {
            "width": 287,
            "height": 302
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "6",
        "type": "inventory",
        "position": {
            "x": 1004,
            "y": 24
        },
        "data": {
            "currentStock": 1000,
            "reservedStock": 20,
            "status": "Sufficient",
            "total": 0,
            "unit": "box",
            "totalRequired": 400
        },
        "measured": {
            "width": 230,
            "height": 216
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "7",
        "type": "inventory",
        "position": {
            "x": 990,
            "y": 394
        },
        "data": {
            "currentStock": 2000,
            "reservedStock": 20,
            "status": "Sufficient",
            "total": 0,
            "unit": "box",
            "totalRequired": 100
        },
        "measured": {
            "width": 230,
            "height": 216
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "8",
        "type": "inventory",
        "position": {
            "x": 978,
            "y": 770
        },
        "data": {
            "currentStock": 2000,
            "reservedStock": 20,
            "status": "Sufficient",
            "total": 0,
            "unit": "box",
            "totalRequired": 100
        },
        "measured": {
            "width": 230,
            "height": 216
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "9",
        "type": "processing",
        "position": {
            "x": 1992,
            "y": -34
        },
        "data": {
            "processName": "Sanding",
            "machineId": "",
            "rateUnitsPerHour": 36,
            "inputRate": 0,
            "setupTimeMin": 1,
            "operatorCount": 4,
            "operatorSkill": "",
            "status": "Bottleneck in this node",
            "hoursPerDay": 8,
            "daysPerWeek": 5,
            "machineCostPerHour": 0,
            "laborCostPerHour": 120,
            "totalProcessingCost": 0,
            "totalTimeHours": 11.127777777777778,
            "time": "0 weeks 1 days 3 hours 8 minutes",
            "total": 400
        },
        "measured": {
            "width": 422,
            "height": 272
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "10",
        "type": "processing",
        "position": {
            "x": 1452,
            "y": -36
        },
        "data": {
            "processName": "threading",
            "machineId": "sk2300",
            "rateUnitsPerHour": 240,
            "inputRate": 0,
            "setupTimeMin": 20,
            "operatorCount": 1,
            "operatorSkill": "",
            "status": "Null",
            "hoursPerDay": 8,
            "daysPerWeek": 5,
            "machineCostPerHour": 120,
            "laborCostPerHour": 80,
            "totalProcessingCost": 0,
            "totalTimeHours": 2,
            "time": "0 weeks 0 days 2 hours 0 minutes",
            "total": 400
        },
        "measured": {
            "width": 422,
            "height": 272
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "11",
        "type": "processing",
        "position": {
            "x": 2544,
            "y": -34
        },
        "data": {
            "processName": "Varnishing",
            "machineId": "",
            "rateUnitsPerHour": 62,
            "inputRate": 0,
            "setupTimeMin": 1,
            "operatorCount": 4,
            "operatorSkill": "",
            "status": "Bottleneck in previous node",
            "hoursPerDay": 8,
            "daysPerWeek": 5,
            "machineCostPerHour": 0,
            "laborCostPerHour": 0,
            "totalProcessingCost": 0,
            "totalTimeHours": 11.127777777777778,
            "time": "0 weeks 1 days 3 hours 8 minutes",
            "total": 400
        },
        "measured": {
            "width": 422,
            "height": 272
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "12",
        "type": "processing",
        "position": {
            "x": 1436,
            "y": 326
        },
        "data": {
            "processName": "threading",
            "machineId": "",
            "rateUnitsPerHour": 60,
            "inputRate": 0,
            "setupTimeMin": 29,
            "operatorCount": 1,
            "operatorSkill": "",
            "status": "Null",
            "hoursPerDay": 8,
            "daysPerWeek": 5,
            "machineCostPerHour": 0,
            "laborCostPerHour": 0,
            "totalProcessingCost": 0,
            "totalTimeHours": 2.15,
            "time": "0 weeks 0 days 2 hours 9 minutes",
            "total": 100
        },
        "measured": {
            "width": 422,
            "height": 272
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "13",
        "type": "processing",
        "position": {
            "x": 1444,
            "y": 700
        },
        "data": {
            "processName": "Threading",
            "machineId": "",
            "rateUnitsPerHour": 120,
            "inputRate": 0,
            "setupTimeMin": 20,
            "operatorCount": 1,
            "operatorSkill": "",
            "status": "Null",
            "hoursPerDay": 8,
            "daysPerWeek": 5,
            "machineCostPerHour": 0,
            "laborCostPerHour": 0,
            "totalProcessingCost": 0,
            "totalTimeHours": 1.1666666666666667,
            "time": "0 weeks 0 days 1 hours 10 minutes",
            "total": 100
        },
        "measured": {
            "width": 422,
            "height": 272
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "14",
        "type": "assembly",
        "position": {
            "x": 3168,
            "y": 352
        },
        "data": {
            "name": "",
            "unitsPerHr": 6,
            "hoursPerDay": 0,
            "daysPerWeek": 0,
            "machineCostPerHour": 0,
            "laborCostPerHour": 0,
            "assemblyCost": 0,
            "rankingList": [
                {
                    "id": "13",
                    "totalTimeHours": 1.1666666666666667,
                    "amountNeeded": 1,
                    "unitsProduced": 7
                },
                {
                    "id": "12",
                    "totalTimeHours": 2.15,
                    "amountNeeded": 1,
                    "unitsProduced": 12
                },
                {
                    "id": "11",
                    "totalTimeHours": 11.127777777777778,
                    "amountNeeded": 4,
                    "unitsProduced": 16
                }
            ]
        },
        "measured": {
            "width": 458,
            "height": 408
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "15",
        "type": "finalProduct",
        "position": {
            "x": 700,
            "y": 350
        },
        "data": {
            "itemName": "",
            "quantityProduced": 0,
            "batchNumber": "",
            "packagingInfo": "",
            "qcStatus": "",
            "dispatchDate": "",
            "deliveryLocation": "",
            "costPerUnit": 0,
            "totalCost": 0
        }
    }

];

