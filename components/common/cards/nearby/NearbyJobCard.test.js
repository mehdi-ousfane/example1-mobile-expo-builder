import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NearbyJobCard from './NearbyJobCard';

// Mock the checkImageURL function
jest.mock('../../../../utils', () => ({
  checkImageURL: jest.fn(),
}));

describe('NearbyJobCard Component', () => {
  const mockJob = {
    job_title: 'Software Developer',
    job_employment_type: 'Full Time',
    employer_logo: 'https://example.com/logo.png',
  };

  it('renders correctly with job details', () => {
    const { getByText } = render(<NearbyJobCard job={mockJob} handleNavigate={() => {}} />);
    expect(getByText('Software Developer')).toBeTruthy();
    expect(getByText('Full Time')).toBeTruthy();
  });

  it('calls handleNavigate callback when pressed', () => {
    const handleNavigateMock = jest.fn();
    const { getByText } = render(<NearbyJobCard job={mockJob} handleNavigate={handleNavigateMock} />);

    fireEvent.press(getByText('Software Developer'));

    expect(handleNavigateMock).toHaveBeenCalledTimes(1);
  });

  it('uses the correct logo URL based on checkImageURL result', () => {
    const { checkImageURL } = require('../../../../utils');

    // Set up the mock to return true
    checkImageURL.mockReturnValueOnce(true);

    const { getByTestId } = render(<NearbyJobCard job={mockJob} handleNavigate={() => {}} />);
    const image = getByTestId('employer-logo');
    expect(image.props.source.uri).toBe(mockJob.employer_logo);

    // Set up the mock to return false
    checkImageURL.mockReturnValueOnce(false);

    const { getByTestId: getByTestId2 } = render(<NearbyJobCard job={mockJob} handleNavigate={() => {}} />);
    const image2 = getByTestId2('employer-logo');
    expect(image2.props.source.uri).toBe('https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg');
  });
});
