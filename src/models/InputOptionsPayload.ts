import InputOptions from '@/models/InputOptions.ts'

export type InputOptionsKey = keyof InputOptions
export type InputOptionsValue = InputOptions[InputOptionsKey]

export interface InputOptionsPayload<Key extends keyof InputOptions,
  Value extends InputOptions[Key]> {
  key: Key,
  value: Value
}