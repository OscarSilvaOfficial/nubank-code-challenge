type Taxes = number[]

export interface TaxCalculationContract<Input> {
  execute(input: Input): Taxes
}