import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Todo } from "../types/todo";

type Props = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
};

export function TodoItem({ todo, onToggle }: Props) {
  return (
    <TouchableOpacity onPress={() => onToggle(todo)} style={styles.row}>
      <View style={[styles.checkbox, todo.completed && styles.checkboxDone]} />
      <View style={styles.textBlock}>
        <Text style={[styles.title, todo.completed && styles.doneText]}>
          {todo.title}
        </Text>
        {!!todo.description && (
          <Text style={[styles.desc, todo.completed && styles.doneText]}>
            {todo.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
  },
  checkboxDone: {
    backgroundColor: "#222",
  },
  textBlock: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600" },
  desc: { fontSize: 13, opacity: 0.7, marginTop: 2 },
  doneText: { textDecorationLine: "line-through", opacity: 0.5 },
});
