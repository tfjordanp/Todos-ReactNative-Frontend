import React from 'react';
import { Pressable, Switch } from 'react-native';
import { XStack, YStack, Text } from 'tamagui';
import { Todo } from '../../types/todo';

export interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete?: (todo: Todo) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <Pressable onPress={() => onToggle(todo)}>
      <XStack
        paddingVertical="$3"
        paddingHorizontal="$4"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
        alignItems="center"
        gap="$3"
      >
        <Switch
          value={todo.completed}
          onValueChange={() => onToggle(todo)}
          trackColor={{ false: '#e5e7eb', true: '#10b981' }}
          thumbColor={todo.completed ? '#059669' : '#f3f4f6'}
        />

        <YStack flex={1} gap="$1">
          <Text
            fontSize={16}
            fontWeight="600"
            color="$color"
            textDecorationLine={todo.completed ? 'line-through' : 'none'}
            opacity={todo.completed ? 0.5 : 1}
          >
            {todo.title}
          </Text>
          {todo.description && (
            <Text
              fontSize={13}
              color="$colorPlaceholder"
              textDecorationLine={todo.completed ? 'line-through' : 'none'}
              opacity={todo.completed ? 0.4 : 0.7}
            >
              {todo.description}
            </Text>
          )}
        </YStack>
      </XStack>
    </Pressable>
  );
}
