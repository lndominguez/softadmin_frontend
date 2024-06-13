import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

export function useGetItems() {
  const URL = endpoints.airline.list;

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
  const URL = `${endpoints.airline.details}/${id}`;
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
  const URL = `${endpoints.airline.update}/${item._id}`;
  return await axiosInstance.patch(URL, item);
}
export async function deleteItem(id) {
  const URL = `${endpoints.airline.delete}/${id}`;
  return await axiosInstance.delete(URL);
}
export async function deleteItems(listId) {
  const URL = `${endpoints.airline.delete}/${listId}`;
  return await axiosInstance.delete(URL, { data: listId });
}

export async function createItem(item) {
  const URL = endpoints.airline.new;
  return await axiosInstance.post(URL, item);
}
