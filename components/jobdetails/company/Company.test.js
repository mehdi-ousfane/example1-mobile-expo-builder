import React from 'react';
import { render } from '@testing-library/react-native';
import Company from './Company';

describe('Company component', () => {
  it('renders correctly with provided company details', () => {
    const mockProps = {
      companyLogo: 'https://example.com/logo.jpg',
      jobTitle: 'Software Engineer',
      companyName: 'TechCorp',
      location: 'San Francisco, CA',
    };

    const { getByText, getByTestId } = render(<Company {...mockProps} />);

    // Check if the provided mock jobTitle is displayed.
    expect(getByText(mockProps.jobTitle)).toBeTruthy();

    // Check if the provided mock companyName is displayed.
    expect(getByText(mockProps.companyName)).toBeTruthy();

    // Check if the provided mock location is displayed.
    expect(getByText(mockProps.location)).toBeTruthy();

    expect(getByTestId('TechCorp')).toBeTruthy();
  });
});
