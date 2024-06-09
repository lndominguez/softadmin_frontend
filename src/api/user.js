import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

export function useGetUsers() {
  console.log("ESTOY EN LA API")
  const URL = endpoints.user.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      users: data || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && !data?.length,
      usersMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );
  console.log(memoizedValue);
  return memoizedValue;
}

export function useGetUserById(id) {
  const URL = `${endpoints.user.details}/${id}`;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, 
  //   {
  //   refreshInterval: 1000,
  // }
  );
  const memoizedValue = useMemo(
    () => ({
      user: data || [],
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
      userEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export async function updateUser(user) {
  const URL = `${endpoints.user.update}/${user._id}`;
  return await axiosInstance.patch(URL, user);
}
export async function deleteUser(id) {
  const URL = `${endpoints.user.delete}/${id}`;
  return await axiosInstance.delete(URL);
}
export async function deleteUsers(listId) {
  const URL = `${endpoints.user.delete}/${listId}`;
  return await axiosInstance.delete(URL, { data: listId });
}

export async function createUser(user) {
  const URL = endpoints.user.new;
  return await axiosInstance.post(URL, user);
}
