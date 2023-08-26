import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Footer from './Footer';
import { Linking } from 'react-native';

// Mocking the Linking.openURL method
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

describe('Footer component', () => {
  it('renders correctly', () => {
    const mockUrl = 'https://example.com/job';

    const { getByText, getByTestId } = render(<Footer url={mockUrl} />);

    // Check if the apply button with the correct text is displayed.
    expect(getByText('Apply for job')).toBeTruthy();
    expect(getByTestId('like-icon')).toBeTruthy();
  });

  it('opens the provided URL when the apply button is clicked', () => {
    const mockUrl = 'https://example.com/job';
    const { getByText } = render(<Footer url={mockUrl} />);

    fireEvent.press(getByText('Apply for job'));
    expect(Linking.openURL).toHaveBeenCalledWith(mockUrl);
  });
});
