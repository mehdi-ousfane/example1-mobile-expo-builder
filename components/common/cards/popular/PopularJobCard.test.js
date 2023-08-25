import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PopularJobCard from './PopularJobCard';

// Mock the checkImageURL function
jest.mock('../../../../utils', () => ({
  checkImageURL: jest.fn(),
}));

describe('PopularJobCard Component', () => {
  const mockItem = {
    employer_name: 'TechCorp',
    job_title: 'Software Engineer',
    job_publisher: 'John Doe',
    job_country: 'USA',
    employer_logo: 'https://example.com/logo.png',
  };
  const mockSelectedJob = {}; // Assuming this is how it would look, adjust as needed.

  it('renders job details correctly', () => {
    const { getByText } = render(<PopularJobCard item={mockItem} selectedJob={mockSelectedJob} handleCardPress={() => {}} />);

    expect(getByText('TechCorp')).toBeTruthy();
    expect(getByText('Software Engineer')).toBeTruthy();
    expect(getByText('John Doe -')).toBeTruthy();
    expect(getByText('USA')).toBeTruthy();
  });

  it('calls handleCardPress callback with correct job item', () => {
    const handleCardPressMock = jest.fn();
    const { getByText } = render(<PopularJobCard item={mockItem} selectedJob={mockSelectedJob} handleCardPress={handleCardPressMock} />);

    fireEvent.press(getByText('Software Engineer'));

    expect(handleCardPressMock).toHaveBeenCalledWith(mockItem);
  });

  it('uses the correct logo URL based on checkImageURL result', () => {
    const { checkImageURL } = require('../../../../utils');

    // Set up the mock to return true
    checkImageURL.mockReturnValueOnce(true);

    const { getByTestId } = render(<PopularJobCard item={mockItem} selectedJob={mockSelectedJob} handleCardPress={() => {}} />);

    const image = getByTestId('employer-logo');
    expect(image.props.source.uri).toBe(mockItem.employer_logo);

    // Set up the mock to return false
    checkImageURL.mockReturnValueOnce(false);

    const { getByTestId: getByTestId2 } = render(<PopularJobCard item={mockItem} selectedJob={mockSelectedJob} handleCardPress={() => {}} />);

    const image2 = getByTestId2('employer-logo');
    expect(image2.props.source.uri).toBe('https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg');
  });
});
