import React from 'react';
import PropTypes from 'prop-types';
import TitleSection from '../../../app/components/shared/TitleSection';

export default function TitleSectionStory({titleText}) {
  return <TitleSection titleText={titleText} />;
}

TitleSectionStory.defaultProps = {};

TitleSectionStory.propTypes = {
  titleText: PropTypes.string,
};
