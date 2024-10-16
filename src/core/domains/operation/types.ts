export type OperationTypes = "buy" | "sell"

export type OperationData = {
  type: OperationTypes;
  unitCost: number;
  quantity: number;
};