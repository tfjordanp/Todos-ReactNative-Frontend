import React, { useMemo, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/todo";
import * as todosService from "../services/todos";
import { TodoItem } from "../components/TodoItem";
import { FieldError } from "../components/FieldError";
import { todoCreateSchema, zodFieldErrors } from "../utils/validation";

type Filter = "ALL" | "ACTIVE" | "COMPLETED";

export function DashboardScreen() {
  const qc = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<Filter>("ALL");

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
    },
    onError: (e: any) => {
      Alert.alert("Create failed", e?.response?.data?.detail ?? "Try again.");
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
      Alert.alert("Update failed", err?.response?.data?.detail ?? "Try again.");
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

  function FilterPill({ label, value }: { label: string; value: Filter }) {
    const active = filter === value;
    return (
      <Pressable
        onPress={() => setFilter(value)}
        style={[styles.pill, active && styles.pillActive]}
      >
        <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
      </Pressable>
    );
  }

  const isLoadingList = todosQuery.isLoading;
  const isRefreshing = todosQuery.isRefetching && !todosQuery.isLoading;

  return (
    <View style={styles.root}>
      <Text style={styles.h1}>Dashboard</Text>
      <Text style={styles.sub}>
        {isLoadingList ? "Loading..." : `${remaining} remaining`}
      </Text>

      <View style={styles.filterRow}>
        <FilterPill label="All" value="ALL" />
        <FilterPill label="Active" value="ACTIVE" />
        <FilterPill label="Completed" value="COMPLETED" />
      </View>

      <View style={styles.createBox}>
        <TextInput
          style={styles.input}
          placeholder="New todo title"
          value={title}
          onChangeText={setTitle}
          editable={!createMutation.isPending}
        />
        <FieldError message={errors.title} />

        <TextInput
          style={styles.input}
          placeholder="Description (optional)"
          value={description}
          onChangeText={setDescription}
          editable={!createMutation.isPending}
        />
        <FieldError message={errors.description} />

        <Button
          title={createMutation.isPending ? "Adding..." : "Add todo"}
          onPress={onCreate}
          disabled={createMutation.isPending}
        />
      </View>

      {todosQuery.isError && (
        <Text style={styles.errorText}>
          Failed to load todos. Check your API URL/token.
        </Text>
      )}

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
          <Text style={styles.empty}>
            {filter === "ALL" ? "No todos yet." : "No matching todos."}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16 },
  h1: { fontSize: 26, fontWeight: "700" },
  sub: { marginBottom: 10, opacity: 0.7 },

  filterRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 999,
  },
  pillActive: {
    backgroundColor: "#222",
  },
  pillText: { fontSize: 12 },
  pillTextActive: { color: "#fff" },

  createBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    gap: 6,
  },
  input: { borderWidth: 1, borderRadius: 8, padding: 10 },

  empty: { textAlign: "center", marginTop: 30, opacity: 0.6 },
  errorText: { marginBottom: 8, color: "#b00020" },
});
