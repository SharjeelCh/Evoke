/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet, View, useWindowDimensions} from 'react-native';
import React from 'react';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomBottomTab = ({state, descriptors, navigation}) => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const MARGIN = 20;
  const TAB_BAR_WIDTH = width - 2 * MARGIN;
  const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;

  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withSpring(TAB_WIDTH * state.index)}],
    };
  });

  const iconMap = {
    Home: {outlined: 'home-outline', filled: 'home'},
    Cart: {outlined: 'bag-handle-outline', filled: 'bag-handle'},
    Wishlist: {outlined: 'heart-outline', filled: 'heart'},
    Profile: {outlined: 'person-circle-outline', filled: 'person-circle'},
    // Add more routes and their corresponding icons as needed
  };

  return (
    <View
      style={[
        styles.tabBarContainer,
        {width: TAB_BAR_WIDTH, bottom: insets.bottom},
      ]}>
      <Animated.View
        style={[
          styles.slidingTabContainer,
          {width: TAB_WIDTH},
          translateAnimation,
        ]}>
        <View style={styles.slidingTab} />
      </Animated.View>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        const icons = iconMap[route.name];
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, {merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <View style={styles.contentContainer}>
              <Ionicons
                name={isFocused ? icons.filled : icons.outlined}
                size={30}
                color={isFocused ? '#008080' : 'grey'}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  tabBarContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#000',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginBottom: 20,
  },
  slidingTabContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slidingTab: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 4,
  },
});
