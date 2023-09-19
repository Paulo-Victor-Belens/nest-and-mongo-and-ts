/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "react-query";
import { useEffect } from "react";
import { tasksHelper } from "@/helpers/taskHelper";

const useTasks = () => {
  const { data, isLoading, error, refetch } = useQuery("tasks", tasksHelper);
  useEffect(() => {
    refetch();
  }, []);
  return { data, isLoading, error, refetch };
};

export default useTasks;