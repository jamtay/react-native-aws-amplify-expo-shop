import React from 'react';

import renderer from 'react-test-renderer';
import {fireEvent, render} from 'react-native-testing-library';
import {Text} from 'react-native';

import Section from './index';

describe('Section component tests', () => {
  const onDataSubmitMock = jest.fn();
  const childrenText = 'childrenText';
  const props = {
    title: 'SOME_TITLE',
    children: <Text>{childrenText}</Text>,
    textLabel: 'SOME_TEXT_LABEL',
    onDataSubmit: onDataSubmitMock,
    keyboardType: 'number-pad',
    multiItemEntry: false,
  };

  describe('snapshot test', () => {
    it('should match stored snapshot', () => {
      const tree = renderer.create(<Section {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('render with properties', () => {
    it('should render the supplied title', async () => {
      const {getByText} = render(<Section {...props} />);
      const title = await getByText(props.title);
      expect(title).toBeTruthy();
    });

    it('should render the supplied children inside the component', async () => {
      const {getByText} = render(<Section {...props} />);
      const childElement = await getByText(childrenText);
      expect(childElement).toBeTruthy();
    });

    it('should display modal when button is clicked', async () => {
      const {getByTestId} = render(<Section {...props} />);
      const openModalButton = await getByTestId('section-button');
      const sectionModal = await getByTestId('section-wrapper');
      const modal = await getByTestId('modal-component');

      expect(modal.props.children.props.isVisible).toEqual(false);
      expect(sectionModal.props.children[2].props.isVisible).toEqual(false);
      fireEvent.press(openModalButton);
      expect(modal.props.children.props.isVisible).toEqual(true);
      expect(sectionModal.props.children[2].props.isVisible).toEqual(true);
    });

    it('should use supplied textLabel, keyboardType, multiItemEntry within the modal', async () => {
      const {getByTestId, getByText} = render(<Section {...props} />);
      const textLabel = getByText(props.textLabel);
      const sectionModal = await getByTestId('section-wrapper');

      expect(textLabel).toBeTruthy();
      expect(sectionModal.props.children[2].props.textLabel).toEqual(
        props.textLabel,
      );
      expect(sectionModal.props.children[2].props.keyboardType).toEqual(
        props.keyboardType,
      );
      expect(sectionModal.props.children[2].props.multiItemEntry).toEqual(
        props.multiItemEntry,
      );
    });

    it('should call onDataSubmit when adding a new entry to the modal', async () => {
      const {getByTestId, getByText} = render(<Section {...props} />);
      const openModalButton = await getByTestId('section-button');
      const submitButton = await getByText('Submit');
      const input = await getByTestId('single-input');

      const dataInput = 'some text to input';
      fireEvent.press(openModalButton);
      fireEvent.changeText(input, dataInput);
      fireEvent.press(submitButton);

      expect(onDataSubmitMock).toBeCalledTimes(1);
      expect(onDataSubmitMock).toBeCalledWith([dataInput]);
    });
  });
});
