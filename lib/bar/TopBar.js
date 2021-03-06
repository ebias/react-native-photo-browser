import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import { BarContainer } from './BarContainer';

export default class TopBar extends React.Component {

  static propTypes = {
    displayed: PropTypes.bool,
    title: PropTypes.string,
    height: PropTypes.number,
    backTitle: PropTypes.string,
    backImage: PropTypes.any,
    onBack: PropTypes.func,
  };

  static defaultProps = {
    displayed: false,
    title: '',
    backTitle: 'Back',
    backImage: require('../../Assets/angle-left.png'),
  };

  renderBackButton() {
    const { onBack, backImage, customTopBarBackIcon } = this.props;

    // do not display back button if there isn't a press handler
    if (onBack) {
      return (
        <TouchableOpacity style={styles.backContainer} onPress={onBack}>
          <Image source={customTopBarBackIcon} />
        </TouchableOpacity>
      );
    }

    return null;
  }

  render() {
    const {
	  customTopBarStyle,	
      displayed,
      title,
      height,
    } = this.props;

    return (
      <BarContainer
        style={styles.container}
		customTopBarStyle={customTopBarStyle}
        displayed={displayed}
        height={height}
      >
        {this.renderBackButton()}
        <Text style={styles.text}>{title}</Text>
      </BarContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
	alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
	fontSize: 18,
	paddingTop: Platform.OS === 'ios' ? 15 : 0, 
    color: 'white'
  },
  backContainer: {
    position: 'absolute',
	flexDirection: 'row',
	padding: 15,
    left: 5,
	top: Platform.OS === 'ios' ? 20 : 10,
  },
  backText: {
    paddingTop: 14,
    marginLeft: -10,
  },
});
