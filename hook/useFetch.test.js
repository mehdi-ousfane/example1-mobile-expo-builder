/**
 * @jest-environment jsdom
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import useFetch from './useFetch';

const mockAxios = new MockAdapter(axios);

describe('useFetch custom hook', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('fetches data successfully', async () => {
    const endpoint = 'testEndpoint';
    const query = { key: 'value' };
    const mockResponse = { data: [1, 2, 3] };

    mockAxios.onGet(`https://jsearch.p.rapidapi.com/${endpoint}`).reply(200, mockResponse);

    const { result } = renderHook(() => useFetch(endpoint, query));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockResponse.data);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  it('handles errors', async () => {
    const endpoint = 'testEndpoint';
    const query = { key: 'value' };

    mockAxios.onGet(`https://jsearch.p.rapidapi.com/${endpoint}`).networkError();

    const { result } = renderHook(() => useFetch(endpoint, query));

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeDefined();
    });
  });

  it('refetches data', async () => {
    const endpoint = 'testEndpoint';
    const query = { key: 'value' };
    const mockResponse = { data: [1, 2, 3] };

    mockAxios.onGet(`https://jsearch.p.rapidapi.com/${endpoint}`).reply(200, mockResponse);

    const { result } = renderHook(() => useFetch(endpoint, query));

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockResponse.data);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });
});
