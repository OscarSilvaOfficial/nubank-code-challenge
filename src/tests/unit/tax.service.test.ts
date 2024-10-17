import { assertEquals } from "testing";
import { TaxCalculationService } from "@/core/services/tax.service.ts";

Deno.test("TaxCalculationService - Case #1", () => {
  const service = new TaxCalculationService();

  const taxes = service.execute([
    { "type": "buy", "unitCost": 10, "quantity": 100 },
    { "type": "sell", "unitCost": 15, "quantity": 50 },
    { "type": "sell", "unitCost": 15, "quantity": 50 },
  ]);

  const expectedTaxValues = [0, 0, 0];

  assertEquals(taxes, expectedTaxValues);
});

Deno.test("TaxCalculationService - Case #2", () => {
  const service = new TaxCalculationService();

  const taxes = service.execute([
    { "type": "buy", "unitCost": 10, "quantity": 10000 },
    { "type": "sell", "unitCost": 20, "quantity": 5000 },
    { "type": "sell", "unitCost": 5, "quantity": 5000 },
  ]);

  const expectedTaxValues = [0, 10000, 0];

  assertEquals(taxes, expectedTaxValues);
});

Deno.test("TaxCalculationService - Case #3", () => {
  const service = new TaxCalculationService();

  const taxes = service.execute([
    { "type": "buy", "unitCost": 10, "quantity": 10000 },
    { "type": "sell", "unitCost": 5, "quantity": 5000 },
    { "type": "sell", "unitCost": 20, "quantity": 5000 },
  ]);

  const expectedTaxValues = [0, 0, 5000];

  assertEquals(taxes, expectedTaxValues);
});

Deno.test("TaxCalculationService - Case #4", () => {
  const service = new TaxCalculationService();

  const taxes = service.execute([
    { "type": "buy", "unitCost": 10, "quantity": 10000 },
    { "type": "buy", "unitCost": 25, "quantity": 5000 },
    { "type": "sell", "unitCost": 15, "quantity": 10000 },
  ]);

  const expectedTaxValues = [0, 0, 0];

  assertEquals(taxes, expectedTaxValues);
});

Deno.test("TaxCalculationService - Case #5", () => {
  const service = new TaxCalculationService();

  const taxes = service.execute([
    { "type": "buy", "unitCost": 10, "quantity": 10000 },
    { "type": "buy", "unitCost": 25, "quantity": 5000 },
    { "type": "sell", "unitCost": 15, "quantity": 10000 },
    { "type": "sell", "unitCost": 25, "quantity": 5000 },
  ]);

  const expectedTaxValues = [0, 0, 0, 10000];

  assertEquals(taxes, expectedTaxValues);
});

Deno.test("TaxCalculationService - Case #6", () => {
  const service = new TaxCalculationService();

  const taxes = service.execute([
    { "type": "buy", "unitCost": 10.00, "quantity": 10000 },
    { "type": "sell", "unitCost": 2.00, "quantity": 5000 },
    { "type": "sell", "unitCost": 20.00, "quantity": 2000 },
    { "type": "sell", "unitCost": 20.00, "quantity": 2000 },
    { "type": "sell", "unitCost": 25.00, "quantity": 1000 },
  ]);

  const expectedTaxValues = [0.00, 0.00, 0.00, 0.00, 3000.00];

  assertEquals(taxes, expectedTaxValues);
});

Deno.test("TaxCalculationService - Case #7", () => {
  const service = new TaxCalculationService();

  const taxes = service.execute(
    [
      { "type": "buy", "unitCost": 10.00, "quantity": 10000 },
      { "type": "sell", "unitCost": 2.00, "quantity": 5000 },
      { "type": "sell", "unitCost": 20.00, "quantity": 2000 },
      { "type": "sell", "unitCost": 20.00, "quantity": 2000 },
      { "type": "sell", "unitCost": 25.00, "quantity": 1000 },
      { "type": "buy", "unitCost": 20.00, "quantity": 10000 },
      { "type": "sell", "unitCost": 15.00, "quantity": 5000 },
      { "type": "sell", "unitCost": 30.00, "quantity": 4350 },
      { "type": "sell", "unitCost": 30.00, "quantity": 650 },
    ],
  );

  const expectedTaxValues = [
    0.00,
    0.00,
    0.00,
    0.00,
    3000.00,
    0.00,
    0.00,
    3700.00,
    0.00,
  ];

  assertEquals(taxes, expectedTaxValues);
});

Deno.test("TaxCalculationService - Case #8", () => {
  const service = new TaxCalculationService();

  const taxes = service.execute(
    [
      { "type": "buy", "unitCost": 10.00, "quantity": 10000 },
      { "type": "sell", "unitCost": 50.00, "quantity": 10000 },
      { "type": "buy", "unitCost": 20.00, "quantity": 10000 },
      { "type": "sell", "unitCost": 50.00, "quantity": 10000 },
    ],
  );

  const expectedTaxValues = [0.00, 80000.00, 0.00, 60000.00];

  assertEquals(taxes, expectedTaxValues);
});
