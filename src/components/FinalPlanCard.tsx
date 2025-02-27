import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface FinalPlanCardProps {
  data: string;
  talk: string;
  text: string;
  totalPrice: number;
}

const FinalPlanCard: React.FC<FinalPlanCardProps> = ({
  data,
  talk,
  text,
  totalPrice,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      width="100%"
      boxShadow="rgba(65,155,249,0.1) 0px 0px 0px 1px, rgba(65,155,249,0) 0px 0px 0px 0px, rgba(65,155,249,0.08) 0px 12px 50px 0px, rgba(159,159,164,0.25) 0px 2px 10px 0px"
      borderColor="gray.200"
      data-testid="final-plan-card"
    >
      <Text fontSize="lg" fontWeight="semibold" pb={1}>
        Final Plan
      </Text>
      <Text>Data: {data}</Text>
      <Text>Talk: {talk}</Text>
      <Text>Text: {text}</Text>
      <Text mt={2} fontSize="xl">
        Total Price: ${totalPrice}
      </Text>
    </Box>
  );
};

export default FinalPlanCard;
