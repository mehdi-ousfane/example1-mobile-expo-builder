import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Welcome from './Welcome';

// Mock expo-router's useRouter hook before the tests
jest.mock('expo-router');

describe('Welcome component', () => {
  const setSearchTermMock = jest.fn();
  const handleClickMock = jest.fn();

  const useRouterMock = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    require('expo-router').useRouter.mockReturnValue(useRouterMock);
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Welcome searchTerm='' setSearchTerm={setSearchTermMock} handleClick={handleClickMock} />);
    expect(getByText('Hello Adrian')).toBeTruthy();
    expect(getByText('Find your perfect job')).toBeTruthy();
    expect(getByPlaceholderText('What are you looking for?')).toBeTruthy();
  });

  it('updates search term', () => {
    const { getByPlaceholderText } = render(<Welcome searchTerm='' setSearchTerm={setSearchTermMock} handleClick={handleClickMock} />);
    const input = getByPlaceholderText('What are you looking for?');
    fireEvent.changeText(input, 'React Developer');
    expect(setSearchTermMock).toHaveBeenCalledWith('React Developer');
  });

  it('triggers handleClick when search button is pressed', () => {
    const { getByTestId } = render(<Welcome searchTerm='' setSearchTerm={setSearchTermMock} handleClick={handleClickMock} />);
    const searchBtn = getByTestId('search-button');
    fireEvent.press(searchBtn);
    expect(handleClickMock).toHaveBeenCalled();
  });

  it('navigates and sets active job type', () => {
    const { getByText } = render(<Welcome searchTerm='' setSearchTerm={setSearchTermMock} handleClick={handleClickMock} />);
    const partTimeTab = getByText('Part-time');
    fireEvent.press(partTimeTab);
    expect(useRouterMock.push).toHaveBeenCalledWith('/search/Part-time');
  });
});
