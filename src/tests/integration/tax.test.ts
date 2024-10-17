import { assertEquals } from "testing";
import { TaxCalculationController } from "@/application/internal/controllers/tax.controller.ts";
import { TaxCalculationService } from "@/core/services/tax.service.ts";
import { OperationTypes } from "@/core/domains/operation/types.ts";

Deno.test("TaxCalculationController - Case #1", () => {
  const input = [
    { "type": "buy" as OperationTypes, "unitCost": 10.00, "quantity": 100 },
    { "type": "sell" as OperationTypes, "unitCost": 15.00, "quantity": 50 },
    { "type": "sell" as OperationTypes, "unitCost": 15.00, "quantity": 50 },
  ];

  const service = new TaxCalculationService();
  const taxes = TaxCalculationController(service, input);

  const expectedTaxValues = [{ tax: 0 }, { tax: 0 }, { tax: 0 }];

  assertEquals(taxes, expectedTaxValues);
});

Deno.test("TaxCalculationController - Case #2", () => {
  const input = [
    { "type": "buy" as OperationTypes, "unitCost": 10.00, "quantity": 10000 },
    { "type": "sell" as OperationTypes, "unitCost": 20.00, "quantity": 5000 },
    { "type": "sell" as OperationTypes, "unitCost": 5.00, "quantity": 5000 },
  ];

  const service = new TaxCalculationService();
  const taxes = TaxCalculationController(service, input);

  const expectedTaxValues = [{ tax: 0 }, { tax: 10000 }, { tax: 0 }];

  assertEquals(taxes, expectedTaxValues);
});

Deno.test("TaxCalculationController - Case #3", () => {
  const input = [
    { "type": "buy" as OperationTypes, "unitCost": 10.00, "quantity": 10000 },
    { "type": "sell" as OperationTypes, "unitCost": 5.00, "quantity": 5000 },
    { "type": "sell" as OperationTypes, "unitCost": 20.00, "quantity": 3000 },
  ];

  const service = new TaxCalculationService();
  const taxes = TaxCalculationController(service, input);

  const expectedTaxValues = [{ tax: 0 }, { tax: 0 }, { tax: 1000 }];

  assertEquals(taxes, expectedTaxValues);
});

Deno.test("TaxCalculationController - Case #4", () => {
  const input = [
    { "type": "buy" as OperationTypes, "unitCost": 10.00, "quantity": 10000 },
    { "type": "buy" as OperationTypes, "unitCost": 25.00, "quantity": 5000 },
    { "type": "sell" as OperationTypes, "unitCost": 15.00, "quantity": 10000 },
  ];

  const service = new TaxCalculationService();
  const taxes = TaxCalculationController(service, input);

  const expectedTaxValues = [{ tax: 0 }, { tax: 0 }, { tax: 0 }];

  assertEquals(taxes, expectedTaxValues);
});

Deno.test("TaxCalculationController - Case #5", () => {
  const input = [
    { "type": "buy" as OperationTypes, "unitCost": 10.00, "quantity": 10000 },
    { "type": "buy" as OperationTypes, "unitCost": 25.00, "quantity": 5000 },
    { "type": "sell" as OperationTypes, "unitCost": 15.00, "quantity": 10000 },
    { "type": "sell" as OperationTypes, "unitCost": 25.00, "quantity": 5000 },
  ];

  const service = new TaxCalculationService();
  const taxes = TaxCalculationController(service, input);

  const expectedTaxValues = [{ tax: 0 }, { tax: 0 }, { tax: 0 }, {
    tax: 10000,
  }];

  assertEquals(taxes, expectedTaxValues);
});

Deno.test("TaxCalculationController - Case #6", () => {
  const input = [
    { "type": "buy" as OperationTypes, "unitCost": 10.00, "quantity": 10000 },
    { "type": "sell" as OperationTypes, "unitCost": 2.00, "quantity": 5000 },
    { "type": "sell" as OperationTypes, "unitCost": 20.00, "quantity": 2000 },
    { "type": "sell" as OperationTypes, "unitCost": 20.00, "quantity": 2000 },
    { "type": "sell" as OperationTypes, "unitCost": 25.00, "quantity": 1000 },
  ];

  const service = new TaxCalculationService();
  const taxes = TaxCalculationController(service, input);

  const expectedTaxValues = [
    { tax: 0.00 },
    { tax: 0.00 },
    { tax: 0.00 },
    { tax: 0.00 },
    { tax: 3000.00 },
  ];

  assertEquals(taxes, expectedTaxValues);
});

Deno.test("TaxCalculationController - Case #7", () => {
  const input = [
    { "type": "buy" as OperationTypes, "unitCost": 10.00, "quantity": 10000 },
    { "type": "sell" as OperationTypes, "unitCost": 2.00, "quantity": 5000 },
    { "type": "sell" as OperationTypes, "unitCost": 20.00, "quantity": 2000 },
    { "type": "sell" as OperationTypes, "unitCost": 20.00, "quantity": 2000 },
    { "type": "sell" as OperationTypes, "unitCost": 25.00, "quantity": 1000 },
    { "type": "buy" as OperationTypes, "unitCost": 20.00, "quantity": 10000 },
    { "type": "sell" as OperationTypes, "unitCost": 15.00, "quantity": 5000 },
    { "type": "sell" as OperationTypes, "unitCost": 30.00, "quantity": 4350 },
    { "type": "sell" as OperationTypes, "unitCost": 30.00, "quantity": 650 },
  ];

  const service = new TaxCalculationService();
  const taxes = TaxCalculationController(service, input);

  const expectedTaxValues = [
    { tax: 0.00 },
    { tax: 0.00 },
    { tax: 0.00 },
    { tax: 0.00 },
    { tax: 3000.00 },
    { tax: 0.00 },
    { tax: 0.00 },
    { tax: 3700.00 },
    { tax: 0.00 },
  ];

  assertEquals(taxes, expectedTaxValues);
});

Deno.test("TaxCalculationController - Case #8", () => {
  const input = [
    { "type": "buy" as OperationTypes, "unitCost": 10.00, "quantity": 10000 },
    { "type": "sell" as OperationTypes, "unitCost": 50.00, "quantity": 10000 },
    { "type": "buy" as OperationTypes, "unitCost": 20.00, "quantity": 10000 },
    { "type": "sell" as OperationTypes, "unitCost": 50.00, "quantity": 10000 },
  ];

  const service = new TaxCalculationService();
  const taxes = TaxCalculationController(service, input);

  const expectedTaxValues = [{ tax: 0 }, { tax: 80000 }, { tax: 0 }, { tax: 60000 }];

  assertEquals(taxes, expectedTaxValues);
});
