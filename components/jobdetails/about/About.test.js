import React from 'react';
import { render } from '@testing-library/react-native';
import About from './About';

describe('About component', () => {
  it('renders correctly with provided info', () => {
    const mockInfo = 'This is a description about the job.';

    const { getByText } = render(<About info={mockInfo} />);

    // Check if the headText "About the job:" is displayed.
    expect(getByText('About the job:')).toBeTruthy();

    // Check if the provided mock info is displayed.
    expect(getByText(mockInfo)).toBeTruthy();
  });
});
