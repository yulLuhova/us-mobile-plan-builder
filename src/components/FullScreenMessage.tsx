import React from "react";
import { VStack, Text, Spinner } from "@chakra-ui/react";

interface FullScreenMessageProps {
  message: string;
  showSpinner?: boolean;
  dataTestId?: string;
}

const FullScreenMessage: React.FC<FullScreenMessageProps> = ({
  message,
  showSpinner = false,
  dataTestId,
}) => {
  return (
    <VStack justifyContent="center" minH="100vh">
      {showSpinner && <Spinner size="xl" />}
      <Text data-testid={dataTestId}>{message}</Text>
    </VStack>
  );
};

export default FullScreenMessage;
