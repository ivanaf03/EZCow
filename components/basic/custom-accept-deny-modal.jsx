import React from "react";

import { Modal, Pressable, Text, View } from "react-native";

const CustomAcceptDenyModal = ({
  visible,
  setVisible,
  title,
  text,
  acceptText,
  denyText,
  onAccept,
  onDeny,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-c_dark_gray opacity-95"
        onPress={() => setVisible(false)}
      >
        <Pressable
          className="w-[85%] bg-c_dark_gray rounded-2xl px-6 py-8 space-y-4 border-x-2 border-c_white"
          onPress={(e) => e.stopPropagation()}
        >
          <Text className="text-c_white text-2xl font-Nunito_Bold">
            {title}
          </Text>
          <Text className="text-c_white text-base font-Nunito_Italic">
            {text}
          </Text>
          <View className="mt-4 space-y-3">
            <Pressable
              className="bg-[#20c33b] rine_blue rounded-xl py-3 border-x-2 border-c_white"
              onPress={onAccept}
            >
              <Text className="text-c_white text-lg font-Nunito_SemiBold text-center">
                {acceptText}
              </Text>
            </Pressable>
            <Pressable
              className="bg-[#c32020] rounded-xl py-3 border-x-2 border-c_white"
              onPress={onDeny}
            >
              <Text className="text-c_white text-lg font-Nunito_SemiBold text-center">
                {denyText}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CustomAcceptDenyModal;
