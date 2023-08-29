import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, FlatList, Alert } from 'react-native';
import { useState, useEffect, useCallback, useMemo } from 'react';
import debounce from 'lodash.debounce';
import useUpdateEffect from '../hooks/useUpdateEffect'
import { Searchbar } from 'react-native-paper'
import {
    createTable,
    getMenuItems,
    saveMenuItems,
    filterByQueryAndCategories,
  } from '../Database';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home( {navigation} ) {

    const sections = ['starters', 'mains', 'desserts'];

    const [data, setData] = useState({});
    const [searchBarText, setSearchBarText] = useState('');
    const [query, setQuery] = useState('');
    const [filterSelections, setFilterSelections] = useState(
        sections.map(() => false)
      );


    const fetchData = async () => {
        try{
            const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
            const menuItems = await response.json()
            console.log(menuItems.menu)
            return (menuItems.menu)
        }
        catch(e){
            Alert.alert(e);
            return [];
        };
    }

    const Item = ({ name, price, description, image}) => {
        return (
            <View style={styles.item}>
                <View>
                    <Text style={styles.itemName}>{name}</Text>
                    <Text style={styles.itemPrice}>${price}</Text>
                    <Text numberOfLines={2} style={styles.itemDescription}>{description}</Text>
                </View>
                <Image style={styles.itemImage}
                    source={{uri:`https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`}}/>
            </View>
        )
    }

    const ItemSeparator = () => {
        return <View style={styles.itemSeparator}><Text></Text></View>
    }

    const renderItem = ({ item }) => <Item name={item.name} price={item.price} description={item.description} image={item.image}/>

    const Filters = ({ onChange, selections, sections }) => {
        return (
          <View style={styles.filtersContainer}>
            {sections.map((section, index) => (
              <TouchableOpacity
                onPress={() => {
                  onChange(index);
                }}
                style={{
                  flex: 1 / sections.length,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 16,
                  margin: 5,
                  backgroundColor: selections[index] ? '#EE9972' : '#495E57',
                  borderRadius: 10
                }}>
                <View>
                  <Text style={{ color: selections[index] ? 'black' : 'white' }}>
                    {section}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
    };

    const lookup = useCallback((q) => {
        setQuery(q);
    }, []);

    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

    const handleSearchChange = (text) => {
        setSearchBarText(text);
        debouncedLookup(text);
    };

    const handleFiltersChange = async (index) => {
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];
        setFilterSelections(arrayCopy);
    };

    useEffect(() => {
        (async () => {
            try {
                await createTable();
                let menuItems = await getMenuItems();
                if (menuItems.length === 0) {
                    menuItems = await fetchData();
                    saveMenuItems(menuItems)
                }
                setData(menuItems)
                console.log(menuItems)
            } catch (e) {
            Alert.alert(e.message)}
        })();
    }, [])

    useUpdateEffect(() => {
        (async () => {
          const activeCategories = sections.filter((s, i) => {
            // If all filters are deselected, all categories are active
            if (filterSelections.every((item) => item === false)) {
              return true;
            }
            return filterSelections[i];
          });
          try {
            const menuItems = await filterByQueryAndCategories(
              query,
              activeCategories
            );
            setData(menuItems);
          } catch (e) {
            Alert.alert(e.message);
          }
        })();
      }, [filterSelections, query]);

    return(
        <>
            <View style={styles.header}>
                <Pressable style={styles.headerButton}></Pressable>
                <Image
                    style={styles.headerImage}
                    source={require('../assets/Logo.png')}/>
                <Pressable style={styles.headerButton} onPress={() => navigation.navigate('profile')}>
                    <Text style={styles.headerText}>Profile</Text>
                </Pressable>
            </View>
            <View style={styles.body}>
                <SafeAreaView style={styles.heroSection}>
                    <Text style={styles.title}>Little Lemon</Text>
                    <Text style={styles.subtitle}>Chicago</Text>
                    <Text style={styles.text}>We are a family owned Mediterranean restaurant, focused on traditional recipes served witha a moder twist</Text>
                    <Searchbar
                        placeholder="Search"
                        placeholderTextColor="white"
                        onChangeText={handleSearchChange}
                        value={searchBarText}
                        style={styles.searchBar}
                        iconColor="white"
                        inputStyle={{ color: 'white' }}
                        elevation={0}/>
                    <Filters
                        selections={filterSelections}
                        onChange={handleFiltersChange}
                        sections={sections}/>
                </SafeAreaView>
                <FlatList
                    style={styles.flatList}
                    data={data}
                    keyExtractor={(item, index) => item.name + index}
                    renderItem={renderItem}
                    ItemSeparatorComponent={ItemSeparator}/>
            </View>
        </>
    )
}



const styles = StyleSheet.create ({
    body: {
        flex: 13,
        backgroundColor: '#ffffff',
    },
    header: {
        flex: 2,
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#dee3e9',
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerImage: {
        marginTop: 40,
        alignSelf: 'center',
    },
    text: {
        fontSize: 15,
        color: '#324652',
        paddingBottom: 10
    },
    headerText: {
        fontSize: 18,
        color: '#324652',
        fontWeight: 'bold',
        padding: 10
    },
    headerButton: {
        width: 80,
        height: 40,
        marginTop: 40
    },
    title: {
        fontSize: 40,
        fontWeight: '700'
    },
    subtitle: {
        fontSize: 30,
        paddingBottom: 10,
        fontWeight: '300'
    },
    itemImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 18,
        color: '#888888',
    },
    itemDescription: {
        fontSize: 14,
        width: 200,
        paddingTop: 15
    },
    item:{
        flexDirection: 'row',
        backgroundColor: ''
    },
    itemSeparator:{
        height: 1,
        backgroundColor: '#cbd2d9',
        marginTop: 10,
        marginBottom: 10
    },
    flatList: {
        padding: 20,
        paddingTop: 40,
        flex: 1
    },
    heroSection: {
        flex: 1,
        backgroundColor: '#cbd2d9',
        padding: 15,
        justifyContent: 'center'
    },
    filtersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    searchBar: {
        marginVertical: 24,
        backgroundColor: '#495E57',
        shadowRadius: 0,
        shadowOpacity: 0,
    },
    });