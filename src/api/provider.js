import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

export function useGetItems() {
  const URL = endpoints.provider.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      items: data || [],
      itemsLoading: isLoading,
      itemsError: error,
      itemsValidating: isValidating,
      itemsEmpty: !isLoading && !data?.length,
      itemsMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );
  return memoizedValue;
}

export function useGetItemById(id) {
  const URL = `${endpoints.provider.details}/${id}`;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, 
  //   {
  //   refreshInterval: 1000,
  // }
  );
  const memoizedValue = useMemo(
    () => ({
      item: data || [],
      itemLoading: isLoading,
      itemError: error,
      itemValidating: isValidating,
      itemEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export async function updateItem(item) {
  const URL = `${endpoints.provider.update}/${item._id}`;
  return await axiosInstance.patch(URL, item);
}
export async function deleteItem(id) {
  const URL = `${endpoints.provider.delete}/${id}`;
  return await axiosInstance.delete(URL);
}
export async function deleteItems(listId) {
  const URL = `${endpoints.provider.delete}/${listId}`;
  return await axiosInstance.delete(URL, { data: listId });
}

export async function createItem(item) {
  const URL = endpoints.provider.new;
  return await axiosInstance.post(URL, item);
}
