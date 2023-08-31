import React from 'react';
import { render } from '@testing-library/react-native';
import Specifics from './Specifics';

describe('Specifics component', () => {
  it('renders the title and points correctly', () => {
    const mockTitle = 'Specifics Title';
    const mockPoints = ['Point 1', 'Point 2', 'Point 3'];

    const { getByText, getAllByText } = render(<Specifics title={mockTitle} points={mockPoints} />);

    // Check if the title is displayed.
    expect(getByText(`${mockTitle}:`)).toBeTruthy();

    // Check if all points are displayed.
    mockPoints.forEach((point) => {
      expect(getAllByText(point).length).toBeGreaterThan(0);
    });
  });

  it('renders without points', () => {
    const mockTitle = 'Specifics Title';
    const mockPoints = [];

    const { getByText, getByTestId } = render(<Specifics title={mockTitle} points={mockPoints} />);

    // Check if the title is displayed.
    expect(getByText(`${mockTitle}:`)).toBeTruthy();

    expect(getByTestId('points-container').children.length).toEqual(0);
  });
});
