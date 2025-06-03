import React from "react";

import { Stack } from "expo-router";

const MapsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="maps"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="fields"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="cadastral-fields"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-fields"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-fields-cadastral"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="grazing-form"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="grazing"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default MapsLayout;
