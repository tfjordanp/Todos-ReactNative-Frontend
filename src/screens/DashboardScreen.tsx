import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { YStack, XStack, Text, ScrollView } from "tamagui";
import { Todo } from "../types/todo";
import * as todosService from "../services/todos";
import { TodoItem } from "../components/ui/TodoItem";
import { TextInput } from "../components/ui/TextInput";
import { PrimaryButton } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { todoCreateSchema, zodFieldErrors } from "../utils/validation";

type Filter = "ALL" | "ACTIVE" | "COMPLETED";

export function DashboardScreen() {
  const qc = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<Filter>("ALL");
  const [createError, setCreateError] = useState<string | null>(null);

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: todosService.listTodos,
  });

  const createMutation = useMutation({
    mutationFn: todosService.createTodo,
    onSuccess: (created) => {
      // Insert at top without refetch
      qc.setQueryData<Todo[]>(["todos"], (old) => (old ? [created, ...old] : [created]));
      setTitle("");
      setDescription("");
      setErrors({});
      setCreateError(null);
    },
    onError: (e: any) => {
      const errorMsg = e?.response?.data?.detail ?? "Failed to create todo";
      setCreateError(errorMsg);
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      todosService.updateTodo(id, { completed }),

    // Optimistic update
    onMutate: async ({ id, completed }) => {
      await qc.cancelQueries({ queryKey: ["todos"] });

      const previous = qc.getQueryData<Todo[]>(["todos"]);

      qc.setQueryData<Todo[]>(["todos"], (old) => {
        if (!old) return old;
        return old.map((t) => (t.id === id ? { ...t, completed } : t));
      });

      return { previous };
    },
    onError: (err: any, _vars, ctx) => {
      if (ctx?.previous) {
        qc.setQueryData(["todos"], ctx.previous);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const todos = todosQuery.data ?? [];

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "ACTIVE":
        return todos.filter((t) => !t.completed);
      case "COMPLETED":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const remaining = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);

  function onCreate() {
    if (createMutation.isPending) return;

    setErrors({});
    setCreateError(null);
    const parsed = todoCreateSchema.safeParse({
      title,
      description: description.trim() ? description : undefined,
    });

    if (!parsed.success) {
      setErrors(zodFieldErrors(parsed.error));
      return;
    }

    createMutation.mutate(parsed.data);
  }

  function onToggle(todo: Todo) {
    if (toggleMutation.isPending) return;
    toggleMutation.mutate({ id: todo.id, completed: !todo.completed });
  }

  const isLoadingList = todosQuery.isLoading;
  const isRefreshing = todosQuery.isRefetching && !todosQuery.isLoading;

  return (
    <YStack flex={1} backgroundColor="$bg">
      <YStack flex={1} gap="$3" padding="$5">
        {/* Header */}
        <YStack gap="$1">
          <Text fontSize={32} fontWeight="700" color="$color">
            My Todos
          </Text>
          <Text fontSize={14} color="$colorPlaceholder">
            {isLoadingList ? "Loading..." : `${remaining} task${remaining !== 1 ? 's' : ''} remaining`}
          </Text>
        </YStack>

        {/* Filter Pills */}
        <XStack gap="$2">
          {(["ALL", "ACTIVE", "COMPLETED"] as const).map((f) => (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 20,
                backgroundColor: filter === f ? "#0284c7" : "#e5e7eb",
              }}
            >
              <Text
                fontSize={13}
                fontWeight="600"
                color={filter === f ? "white" : "#374151"}
              >
                {f}
              </Text>
            </Pressable>
          ))}
        </XStack>

        {/* Create Todo Form */}
        <YStack
          gap="$3"
          borderWidth={1}
          borderColor="$borderColor"
          borderRadius="$4"
          padding="$4"
          backgroundColor="$bgSecondary"
        >
          <Text fontSize={14} fontWeight="600" color="$color">
            Add New Todo
          </Text>

          {createError && <Alert type="error" message={createError} />}

          <TextInput
            label="Title"
            placeholder="What needs to be done?"
            value={title}
            onChangeText={setTitle}
            editable={!createMutation.isPending}
            error={errors.title}
          />

          <TextInput
            label="Description (optional)"
            placeholder="Add more details..."
            value={description}
            onChangeText={setDescription}
            editable={!createMutation.isPending}
            error={errors.description}
          />

          <PrimaryButton
            title={createMutation.isPending ? "Adding..." : "Add Todo"}
            onPress={onCreate}
            disabled={createMutation.isPending}
          />
        </YStack>

        {/* Error Alert */}
        {todosQuery.isError && (
          <Alert
            type="error"
            title="Failed to load todos"
            message="Check your connection and try again"
          />
        )}

        {/* Todos List */}
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TodoItem todo={item} onToggle={onToggle} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => todosQuery.refetch()}
            />
          }
          ListEmptyComponent={
            <YStack alignItems="center" justifyContent="center" paddingVertical="$10">
              <Text fontSize={16} color="$colorPlaceholder" fontWeight="500">
                {filter === "ALL" ? "No todos yet" : `No ${filter.toLowerCase()} todos`}
              </Text>
            </YStack>
          }
        />
      </YStack>
    </YStack>
  );
}
