import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TabBar = ({ state, descriptors, navigation }) => {
  
    const icons = {
        index: (props) => <AntDesign name="home" size={26} color={props.color} {...props} />,
        check: (props) => <Feather name="user-check" size={26} color={props.color} {...props} />,
        profile: (props) => <AntDesign name="user" size={26} color={props.color} {...props} />,
    };

    const primaryColor = '#1e44a6';
    const greyColor = 'black';

    return (
        <View style={styles.tabbar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                // Extract the route name from the formatted string
                const actualRouteName = route.name.replace(/^\(tabs\)\//, '');

                if (['_sitemap', '+not-found'].includes(actualRouteName))
                    return null;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

            

                // Provide a default icon if the route name is not found in the icons object
                const IconComponent = icons[actualRouteName] || (() => <AntDesign name="question" size={26} color={greyColor} />);
                
                return (
                    <TouchableOpacity
                        key={route.name}
                        style={styles.tabbarItem}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    >
                        <IconComponent color={isFocused ? primaryColor : greyColor} />
                        {/* <Text style={{ color: isFocused ? primaryColor : greyColor, fontSize: 10}}>
                            {label}
                        </Text> */}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        marginHorizontal: 5,
        paddingVertical: 15,
        borderRadius: 5,
        borderCurve: 'continuous',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        marginTop: 25
    },
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    }
});

export default TabBar;
