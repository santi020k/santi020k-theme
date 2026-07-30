export interface PromptSegment {
  key: 'directory' | 'git' | 'os' | 'runtime' | 'time'
  preview: string
}

export interface PromptVariant {
  description: string
  name: string
  padding: string
  runtimes: boolean
  substitutions: Record<string, string>
  suffix: string
  symbols: Record<string, string>
}

export const promptSegments: PromptSegment[]
export const promptVariants: Record<string, PromptVariant>
export const runtimeModules: string[]
export const getPromptVariant: (variantKey: string) => PromptVariant
export const starshipFilename: (paletteSlug: string, variantKey?: string) => string
