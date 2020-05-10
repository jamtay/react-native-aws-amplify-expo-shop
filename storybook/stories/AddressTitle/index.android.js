import React from 'react';
import PropTypes from 'prop-types';
import AddressTitle from '../../../app/components/StorePage/AddressTitle';

export default function AddressTitleStory({titleText, bodyText}) {
  return <AddressTitle titleText={titleText} bodyText={bodyText} />;
}

AddressTitleStory.defaultProps = {};

AddressTitleStory.propTypes = {
  titleText: PropTypes.string,
  bodyText: PropTypes.string,
};
