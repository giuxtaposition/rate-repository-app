import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';

import useRepositories from '../../hooks/useRepositories';
import { RepositoryListContainer } from './RepositoryListContainer';

const RepositoryList = () => {
  const [order, setOrder] = useState('CREATED_AT:DESC');
  const [orderBy, orderDirection] = order.split(':');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 100);

  const { repositories, fetchMore } = useRepositories({
    first: 4,
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
