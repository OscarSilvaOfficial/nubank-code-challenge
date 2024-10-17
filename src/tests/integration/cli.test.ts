import { assertEquals } from "testing";
import {
  CLI,
  CommandLineInterfaceFileInput,
} from "@/application/external/cli.ts";

function fixString(data: string) {
  return data.replaceAll("\n", "").replaceAll(" ", "");
}

Deno.test("CommandLineInterfaceFileInput - Case #1 + Case #2", async () => {
  const cliMock = { file: "./inputs/case #1 e #2.txt" } as unknown as CLI;
  const result = await CommandLineInterfaceFileInput(cliMock);

  const expected = `
  [{"operation":"buy", "unit-cost":10.00, "quantity": 100},
  {"operation":"sell", "unit-cost":15.00, "quantity": 50},
  {"operation":"sell", "unit-cost":15.00, "quantity": 50}]
  [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
  {"operation":"sell", "unit-cost":20.00, "quantity": 5000},
  {"operation":"sell", "unit-cost":5.00, "quantity": 5000}]
  `;

  assertEquals(fixString(result), fixString(expected));
});

Deno.test("CommandLineInterfaceFileInput - Case #1", async () => {
  const cliMock = { file: "./inputs/case #1.txt" } as unknown as CLI;
  const result = await CommandLineInterfaceFileInput(cliMock);

  const expected = `
  [{"operation":"buy", "unit-cost":10.00, "quantity": 100},
  {"operation":"sell", "unit-cost":15.00, "quantity": 50},
  {"operation":"sell", "unit-cost":15.00, "quantity": 50}]  
  `;

  assertEquals(fixString(result), fixString(expected));
});

Deno.test("CommandLineInterfaceFileInput - Case #2", async () => {
  const cliMock = { file: "./inputs/case #2.txt" } as unknown as CLI;
  const result = await CommandLineInterfaceFileInput(cliMock);

  const expected = `
  [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
  {"operation":"sell", "unit-cost":20.00, "quantity": 5000},
  {"operation":"sell", "unit-cost":5.00, "quantity": 5000}]
  `;

  assertEquals(fixString(result), fixString(expected));
});

Deno.test("CommandLineInterfaceFileInput - Case #3", async () => {
  const cliMock = { file: "./inputs/case #3.txt" } as unknown as CLI;
  const result = await CommandLineInterfaceFileInput(cliMock);

  const expected = `
  [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
  {"operation":"sell", "unit-cost":5.00, "quantity": 5000},
  {"operation":"sell", "unit-cost":20.00, "quantity": 3000}]
  `;

  assertEquals(fixString(result), fixString(expected));
});

Deno.test("CommandLineInterfaceFileInput - Case #4", async () => {
  const cliMock = { file: "./inputs/case #4.txt" } as unknown as CLI;
  const result = await CommandLineInterfaceFileInput(cliMock);

  const expected = `
  [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
  {"operation":"buy", "unit-cost":25.00, "quantity": 5000},
  {"operation":"sell", "unit-cost":15.00, "quantity": 10000}]
  `;

  assertEquals(fixString(result), fixString(expected));
});

Deno.test("CommandLineInterfaceFileInput - Case #5", async () => {
  const cliMock = { file: "./inputs/case #5.txt" } as unknown as CLI;
  const result = await CommandLineInterfaceFileInput(cliMock);

  const expected = `
  [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
  {"operation":"buy", "unit-cost":25.00, "quantity": 5000},
  {"operation":"sell", "unit-cost":15.00, "quantity": 10000},
  {"operation":"sell", "unit-cost":25.00, "quantity": 5000}]
  `;

  assertEquals(fixString(result), fixString(expected));
});

Deno.test("CommandLineInterfaceFileInput - Case #6", async () => {
  const cliMock = { file: "./inputs/case #6.txt" } as unknown as CLI;
  const result = await CommandLineInterfaceFileInput(cliMock);

  const expected = `
  [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
  {"operation":"sell", "unit-cost":2.00, "quantity": 5000},
  {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
  {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
  {"operation":"sell", "unit-cost":25.00, "quantity": 1000}]
  `;

  assertEquals(fixString(result), fixString(expected));
});

Deno.test("CommandLineInterfaceFileInput - Case #7", async () => {
  const cliMock = { file: "./inputs/case #7.txt" } as unknown as CLI;
  const result = await CommandLineInterfaceFileInput(cliMock);

  const expected = `
  [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
  {"operation":"sell", "unit-cost":2.00, "quantity": 5000},
  {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
  {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
  {"operation":"sell", "unit-cost":25.00, "quantity": 1000},
  {"operation":"buy", "unit-cost":20.00, "quantity": 10000},
  {"operation":"sell", "unit-cost":15.00, "quantity": 5000},
  {"operation":"sell", "unit-cost":30.00, "quantity": 4350},
  {"operation":"sell", "unit-cost":30.00, "quantity": 650}]
  `;

  assertEquals(fixString(result), fixString(expected));
});

Deno.test("CommandLineInterfaceFileInput - Case #8", async () => {
  const cliMock = { file: "./inputs/case #8.txt" } as unknown as CLI;
  const result = await CommandLineInterfaceFileInput(cliMock);

  const expected = `
  [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
  {"operation":"sell", "unit-cost":50.00, "quantity": 10000},
  {"operation":"buy", "unit-cost":20.00, "quantity": 10000},
  {"operation":"sell", "unit-cost":50.00, "quantity": 10000}]
  `;

  assertEquals(fixString(result), fixString(expected));
});
