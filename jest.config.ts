import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    verbose: true,
    transform: {},
    preset: 'ts-jest',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  }
}
