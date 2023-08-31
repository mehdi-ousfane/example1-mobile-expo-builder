import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Popularjobs from './Popularjobs';

// Mock the hooks before the tests
jest.mock('../../../hook/useFetch');
jest.mock('expo-router');

describe('Popularjobs component', () => {
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

    const { getByTestId } = render(<Popularjobs />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays error state', () => {
    require('../../../hook/useFetch').default.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Something went wrong'),
    });

    const { getByText } = render(<Popularjobs />);
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('displays fetched jobs and handles card press', () => {
    const mockData = [
      {
        job_id: '1',
        employer_logo: undefined,
        employer_name: 'bob',
        job_title: 'great job',
        job_employment_type: 'CDI',
        job_publisher: 'LinkedIn',
        job_country: 'France',
      },
      {
        job_id: '2',
        employer_logo: undefined,
        employer_name: 'kil',
        job_title: 'super job',
        job_employment_type: 'CDD',
        job_publisher: 'LinkedIn',
        job_country: 'France',
      },
    ];

    require('../../../hook/useFetch').default.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    const { getByText } = render(<Popularjobs />);
    const card = getByText(`${mockData[0].employer_name}`);
    fireEvent.press(card);

    // Check if router.push has been called correctly
    expect(useRouterMock.push).toHaveBeenCalledWith(`/job-details/${mockData[0].job_id}`);
  });
});
