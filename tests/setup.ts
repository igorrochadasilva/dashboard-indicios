import { vi } from 'vitest'

import '@testing-library/jest-dom/vitest'

const mockSvg = '/mock-icon.svg'

vi.mock('@/assets/icons/warning-icon.svg', () => ({ default: mockSvg }))
vi.mock('@/assets/icons/success-icon.svg', () => ({ default: mockSvg }))
vi.mock('@/assets/icons/close-icon.svg', () => ({ default: mockSvg }))
vi.mock('@/assets/icons/red-close-icon.svg', () => ({ default: mockSvg }))
vi.mock('@/assets/icons/plus-icon.svg', () => ({ default: mockSvg }))
vi.mock('@/assets/icons/bell.svg', () => ({ default: mockSvg }))
vi.mock('@/assets/icons/chevron-down.svg', () => ({ default: mockSvg }))
vi.mock('@/assets/icons/home.svg', () => ({ default: mockSvg }))
vi.mock('@/assets/icons/menu.svg', () => ({ default: mockSvg }))
vi.mock('@/assets/icons/monitor.svg', () => ({ default: mockSvg }))
vi.mock('@/assets/icons/monograma.svg', () => ({ default: mockSvg }))
vi.mock('@/assets/icons/search-icon.svg', () => ({ default: mockSvg }))
