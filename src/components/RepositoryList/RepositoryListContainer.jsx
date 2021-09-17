import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { order, setOrder, setSearchKeyword, searchKeyword } = this.props;

    return (
      <RepositoryListHeader
        order={order}
        setOrder={setOrder}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    );
  };

  render() {
    const { repositories, onEndReach } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    const renderItem = ({ item }) => <RepositoryItem item={item} />;

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}
