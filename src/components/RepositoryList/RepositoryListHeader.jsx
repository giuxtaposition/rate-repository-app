import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Menu, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Octicons';

const styles = StyleSheet.create({
  menuContainer: {
    padding: 10,
  },
  menuContent: {
    padding: 10,
    width: 250,
  },
  searchBar: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});

const menuOptions = {
  'CREATED_AT:DESC': 'Latest repositories',
  'RATING_AVERAGE:DESC': 'Highest rated repositories',
  'RATING_AVERAGE:ASC': 'Lowest rated repositories',
};

const RepositoryListMenu = ({ order, setOrder }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const changeOrder = selected => {
    setOrder(selected);
    closeMenu();
  };

  return (
    <View style={styles.menuContainer}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu}>
            {menuOptions[order]}{' '}
            {visible ? (
              <Icon name='triangle-down' size={15} />
            ) : (
              <Icon name='triangle-up' size={15} />
            )}
          </Button>
        }
        contentStyle={styles.menuContent}
      >
        <Menu.Item
          onPress={() => {
            changeOrder('CREATED_AT:DESC');
          }}
          title={menuOptions['CREATED_AT:DESC']}
          style={styles.menuItems}
        />
        <Menu.Item
          onPress={() => {
            changeOrder('RATING_AVERAGE:DESC');
          }}
          title={menuOptions['RATING_AVERAGE:DESC']}
        />

        <Menu.Item
          onPress={() => {
            changeOrder('RATING_AVERAGE:ASC');
          }}
          title={menuOptions['RATING_AVERAGE:ASC']}
        />
      </Menu>
    </View>
  );
};

const RepositoryListSearchBar = ({ searchKeyword, setSearchKeyword }) => {
  return (
    <Searchbar
      placeholder='Search'
      onChangeText={query => setSearchKeyword(query)}
      value={searchKeyword}
      style={styles.searchBar}
    />
  );
};

const RepositoryListHeader = ({
  order,
  setOrder,
  searchKeyword,
  setSearchKeyword,
}) => {
  return (
    <View>
      <RepositoryListSearchBar
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <RepositoryListMenu order={order} setOrder={setOrder} />
    </View>
  );
};

export default RepositoryListHeader;
