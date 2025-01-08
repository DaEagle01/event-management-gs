import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { wrapper } from '../test/test/utils';
import { useEventForm } from '../../hooks/useCreateEventForm';

describe('useEventForm', () => {
    it('initializes with empty form values', () => {
        const { result } = renderHook(() => useEventForm(), { wrapper });

        expect(result.current.errors).toEqual({});
        expect(result.current.isLoading).toBe(false);
        expect(result.current.submitError).toBeNull();
    });

    it('validates form data', async () => {
        const { result } = renderHook(() => useEventForm(), { wrapper });

        await act(async () => {
            await result.current.handleSubmit();
        });

        expect(result.current.errors).toHaveProperty('title');
        expect(result.current.errors).toHaveProperty('description');
        expect(result.current.errors).toHaveProperty('startTime');
        expect(result.current.errors).toHaveProperty('endTime');
        expect(result.current.errors).toHaveProperty('location');
    });

    it('successfully submits valid form data', async () => {
        const { result } = renderHook(() => useEventForm(), { wrapper });

        const validFormData = {
            title: 'Test Event',
            description: 'Test Description',
            startTime: '2025-01-10T10:00',
            endTime: '2025-01-10T12:00',
            location: 'Test Location'
        };

        await act(async () => {
            await result.current.handleSubmit(validFormData);
        });

        expect(result.current.submitError).toBeNull();
    });
});