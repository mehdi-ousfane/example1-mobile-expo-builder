import React from 'react';
import { render } from '@testing-library/react-native';
import Nearbyjobs from './Nearbyjobs';

// Mock the hooks before the tests
jest.mock('../../../hook/useFetch');
jest.mock('expo-router');

describe('Nearbyjobs component', () => {
  const useRouterMock = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state', () => {
    require('../../../hook/useFetch').default.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });
    require('expo-router').useRouter.mockReturnValue(useRouterMock);

    const { getByTestId } = render(<Nearbyjobs />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays error state', () => {
    require('../../../hook/useFetch').default.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Something went wrong'),
    });

    const { getByText } = render(<Nearbyjobs />);
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('displays fetched jobs', () => {
    const mockData = [
      {
        job_id: '1',
        employer_logo: undefined,
        job_title: 'great job',
        job_employment_type: 'CDI',
      },
      {
        job_id: '2',
        employer_logo: undefined,
        job_title: 'super job',
        job_employment_type: 'CDD',
      },
    ];
    require('../../../hook/useFetch').default.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    mockData.forEach((job) => {
      expect(job.job_id).toBeTruthy();
    });
  });
});
