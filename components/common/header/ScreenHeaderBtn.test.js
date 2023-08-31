import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ScreenHeaderBtn from './ScreenHeaderBtn';
import { images } from '../../../constants';

describe('ScreenHeaderBtn Component', () => {
  const profileImage = images.profile;
  const mockDimension = 50; // This is just a guess, adjust based on your actual use case.

  it('renders button image with provided icon URL', () => {
    const { getByTestId } = render(<ScreenHeaderBtn iconUrl={profileImage} dimension={mockDimension} handlePress={() => {}} />);

    const image = getByTestId('header-btn-image');
    expect(image.props.source).toBe(profileImage);
  });

  it('calls handlePress callback when button is pressed', () => {
    const handlePressMock = jest.fn();
    const { getByTestId } = render(<ScreenHeaderBtn iconUrl={profileImage} dimension={mockDimension} handlePress={handlePressMock} />);

    fireEvent.press(getByTestId('header-btn-image'));

    expect(handlePressMock).toHaveBeenCalled();
  });
});
