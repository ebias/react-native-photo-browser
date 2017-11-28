import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dimensions,
  ListView,
  TouchableHighlight,
  View,
  StyleSheet,
  ViewPropTypes
} from 'react-native';

import Constants from './constants';
import { Photo } from './media';

// 1 margin and 1 border width
const ITEM_MARGIN = 2;

export default class GridContainer extends React.Component {

  static propTypes = {
    style: ViewPropTypes.style,
    square: PropTypes.bool,
    dataSource: PropTypes.instanceOf(ListView.DataSource).isRequired,
    displaySelectionButtons: PropTypes.bool,
    onPhotoTap: PropTypes.func,
    itemPerRow: PropTypes.number,

    /*
     * refresh the list to apply selection change
     */
    onMediaSelection: PropTypes.func,

    /**
     * offsets the width of the grid
     */
    offset: PropTypes.number,
  };

  static defaultProps = {
    displaySelectionButtons: false,
    onPhotoTap: () => {},
    itemPerRow: 3,
  };

  constructor(props, context) {
    super(props, context);

    this._renderRow = this._renderRow.bind(this);

    this.state = {};
  }

  _renderRow(media: Object, sectionID: number, rowID: number) {
    const {
      displaySelectionButtons,
      onPhotoTap,
      onMediaSelection,
      itemPerRow,
      square,
      offset,
      renderCustomState
    } = this.props;
    const screenWidth = Dimensions.get('window').width - offset;
    const photoWidth = (screenWidth / itemPerRow) - (ITEM_MARGIN * 2);

    return (
      <TouchableHighlight key={ media.id } onPress={() => onPhotoTap(parseInt(rowID, 10))}>
        <View style={[styles.row, media.state === 'Deleted' ? {borderColor: 'red'} : {}, media.state === 'Unapproved' ? {borderColor: 'black'} : {}]}>
          <Photo
            item={media}
            width={photoWidth}
            height={square ? photoWidth : 100}
            resizeMode={'cover'}
            thumbnail
            progressImage={require('../Assets/hourglass.png')}
            displaySelectionButtons={displaySelectionButtons}
            uri={media.thumb || media.photo}
            selected={media.selected}
            onSelection={(isSelected) => {
              onMediaSelection(rowID, isSelected);
            }}
            renderCustomState={renderCustomState}
          />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { dataSource, stickyFooter, renderStickyFooter } = this.props;

    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={dataSource}
          initialListSize={21}
          pageSize={3}
          scrollRenderAheadDistance={500}
          renderRow={this._renderRow}
		  removeClippedSubviews={false}
		/>
		{renderStickyFooter(Constants.TOOLBAR_HEIGHT)}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	flexDirection: 'column',  
	paddingBottom: Constants.TOOLBAR_HEIGHT,
  },
  list: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
	flexWrap: 'wrap',
  },
  row: {
    justifyContent: 'center',
    margin: 1,
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 1,
  },
});
