import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../../app/components/shared/Loading';

export default function LoadingStory({isLoading}) {
  return <Loading isLoading={isLoading} />;
}

LoadingStory.defaultProps = {};

LoadingStory.propTypes = {
  isLoading: PropTypes.bool,
};
