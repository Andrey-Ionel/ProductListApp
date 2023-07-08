import React, { FC, memo } from 'react';
import { View, Text } from 'react-native';

import { ScreenWrapper } from '../ScreenWrapper';
import LinearGradient from 'react-native-linear-gradient';
import Image from 'react-native-fast-image';

import { PDPProps } from './types';

import colors from '../../styles/colors';
import { styles } from './styles';

export const PDP: FC<PDPProps> = memo(props => {
  const item = props?.route?.params?.item;
  if (!item?.title || !item?.image) {
    return null;
  }

  return (
    <LinearGradient colors={colors.systemBackgroundGradient}>
      <ScreenWrapper
        screenStyle={styles.screenContainer}
        needInSafeArea={true}
        scroll={true}>
        <View style={styles.itemContent}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.price}>{`${item?.price} $`}</Text>
          <Image
            style={styles.productImageStyle}
            source={{ uri: item?.image }}
          />
          <Text style={styles.description}>{item?.description}</Text>
        </View>
      </ScreenWrapper>
    </LinearGradient>
  );
});
