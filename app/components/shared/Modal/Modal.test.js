import React from 'react';

import renderer from 'react-test-renderer';
import {fireEvent, render} from 'react-native-testing-library';

import Modal from './index';

describe('Modal component tests', () => {
  const onDataSubmitMock = jest.fn();
  const onDismissMock = jest.fn();
  const props = {
    isVisible: true,
    textLabel: 'SOME_TEXT_LABEL',
    onDismiss: onDismissMock,
    onDataSubmit: onDataSubmitMock,
    keyboardType: 'number-pad',
    multiItemEntry: false,
  };

  describe('snapshot test', () => {
    it('should match stored snapshot', () => {
      const tree = renderer.create(<Modal {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('render with properties', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should render textLabel and keyboard type from supplied properties', () => {
      const {getByText, getByTestId} = render(<Modal {...props} />);
      expect(getByText(props.textLabel)).toBeTruthy();
      expect(getByTestId('single-input').props.keyboardType).toEqual(
        props.keyboardType,
      );
    });

    it('should render modal not visible is isVisible is false', () => {
      const notVisibleProps = {...props};
      notVisibleProps.isVisible = false;
      const {getByTestId} = render(<Modal {...notVisibleProps} />);
      expect(
        getByTestId('modal-component').props.children.props.isVisible,
      ).toEqual(false);
    });

    it('should render modal visible is isVisible is true', async () => {
      const {getByTestId} = render(<Modal {...props} />);
      expect(
        await getByTestId('modal-component').props.children.props.isVisible,
      ).toEqual(true);
    });

    it('should submit single data item via onDataSubmit if multiItemEntry is false', async () => {
      const {getByTestId, getByText} = render(<Modal {...props} />);
      const submitButton = await getByText('Submit');
      const input = await getByTestId('single-input');

      const dataInput = 'some text to input';
      fireEvent.changeText(input, dataInput);
      fireEvent.press(submitButton);

      expect(onDataSubmitMock).toBeCalledTimes(1);
      expect(onDataSubmitMock).toBeCalledWith([dataInput]);
      expect(onDismissMock).toBeCalledTimes(1);
    });

    it('should add a second entry field when the + button is pressed', async () => {
      const multiLineProps = {...props, multiItemEntry: true};
      const {getByTestId, queryByTestId} = render(
        <Modal {...multiLineProps} />,
      );
      const multiEntryInput = await getByTestId('multi-entry-input-0');

      // Cannot click add until data is added
      expect(await queryByTestId('multi-entry-add-0')).toBeFalsy();
      const dataInput = 'some text to input';
      fireEvent.changeText(multiEntryInput, dataInput);

      const firstAddNewInput = await getByTestId('multi-entry-add-0');

      expect(await queryByTestId('multi-entry-input-1')).toBeFalsy();
      expect(await queryByTestId('multi-entry-add-1')).toBeFalsy();
      fireEvent.press(firstAddNewInput);
      expect(await queryByTestId('multi-entry-input-1')).toBeTruthy();

      // Cannot click add until a second entry is added
      const secondMultiEntryInput = await getByTestId('multi-entry-input-1');
      expect(await queryByTestId('multi-entry-add-1')).toBeFalsy();
      fireEvent.changeText(secondMultiEntryInput, dataInput);
      expect(await queryByTestId('multi-entry-add-1')).toBeTruthy();
    });

    it('should submit multiple data items via onDataSubmit if multiItemEntry is true', async () => {
      const multiLineProps = {...props, multiItemEntry: true};
      const {getByTestId, getByText} = render(<Modal {...multiLineProps} />);
      const multiEntryInput = await getByTestId('multi-entry-input-0');
      const submitButton = await getByText('Submit');

      // Cannot click add until data is added
      const dataInput = 'some text to input';
      const secondDataInput = 'some other text to input';
      fireEvent.changeText(multiEntryInput, dataInput);

      const firstAddNewInput = await getByTestId('multi-entry-add-0');
      fireEvent.press(firstAddNewInput);

      const secondMultiEntryInput = await getByTestId('multi-entry-input-1');
      fireEvent.changeText(secondMultiEntryInput, secondDataInput);

      fireEvent.press(submitButton);

      expect(onDataSubmitMock).toBeCalledTimes(1);
      expect(onDataSubmitMock).toBeCalledWith([dataInput, secondDataInput]);
      expect(onDismissMock).toBeCalledTimes(1);
    });

    it('should call onDismiss if modal is dismissed', async () => {
      const {getByTestId} = render(<Modal {...props} />);
      const dismissButton = await getByTestId('dismiss-button');

      fireEvent.press(dismissButton);

      expect(onDismissMock).toBeCalledTimes(1);
    });
  });
});
