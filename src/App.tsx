import React, { useMemo, useState } from "react";
import {
  VStack,
  Stack,
  Heading,
  Button,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
} from "@chakra-ui/react";
import { usePricing } from "./hooks/usePricing";
import { usePlanStore, LOCAL_STORAGE_KEY } from "./store/usePlanStore";
import OptionSelect from "./components/OptionSelect";
import FinalPlanCard from "./components/FinalPlanCard";
import FullScreenMessage from "./components/FullScreenMessage";
import { TALK_LABELS, TEXT_LABELS } from "./constants";

function App() {
  const { data: pricing, isLoading, error } = usePricing();
  const {
    data: selectedData,
    talk: selectedTalk,
    text: selectedText,
    setData,
    setTalk,
    setText,
    saveSettings,
    resetSettings,
  } = usePlanStore();

  const talkDisplay = TALK_LABELS[selectedTalk] || selectedTalk;
  const textDisplay = TEXT_LABELS[selectedText] || selectedText;

  const [hasSavedSettings, setHasSavedSettings] = useState<boolean>(
    Boolean(localStorage.getItem(LOCAL_STORAGE_KEY)),
  );

  const totalPrice = useMemo(() => {
    const dataPrice = pricing?.data[selectedData] || 0;
    const talkPrice = pricing?.talk[selectedTalk] || 0;
    const textPrice = pricing?.text[selectedText] || 0;
    return dataPrice + talkPrice + textPrice;
  }, [pricing, selectedData, selectedTalk, selectedText]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  if (isLoading) {
    return (
      <FullScreenMessage
        message="Loading..."
        showSpinner
        dataTestId="loading-message"
      />
    );
  }

  if (error) {
    return <FullScreenMessage message="Error loading pricing data" />;
  }

  if (!pricing) {
    return <FullScreenMessage message="No pricing data available" />;
  }

  const handleConfirm = () => {
    toast({
      title: "Plan confirmed",
      description: "Your mobile plan has been successfully set up.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    onClose();
  };

  const handleSave = () => {
    saveSettings();
    setHasSavedSettings(true);
    toast({
      title: "Settings saved",
      description: "Your plan selections have been saved.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const handleReset = () => {
    resetSettings();
    setHasSavedSettings(false);
    toast({
      title: "Settings reset",
      description: "Your saved plan selections have been cleared.",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <>
      <Box as="header" bg="white" w="full" p={4} borderBottomWidth="1px">
        <Heading
          as="h1"
          fontSize="3xl"
          fontWeight="bold"
          color="gray.800"
          textAlign={["left", "center"]}
          data-testid="app-heading"
        >
          Build Your Mobile Plan
        </Heading>
      </Box>

      <Box as="main" id="main" role="main" p={4}>
        <VStack spacing={8} align="stretch" maxWidth="900px" mx="auto">
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={8}
            align="flex-start"
          >
            <VStack spacing={8} width="100%">
              <OptionSelect
                label="Data"
                value={selectedData}
                options={pricing.data}
                onChange={setData}
                dataTestId="data-select"
              />
              <OptionSelect
                label="Talk"
                value={selectedTalk}
                options={pricing.talk}
                onChange={setTalk}
                labelMap={TALK_LABELS}
                dataTestId="talk-select"
              />
              <OptionSelect
                label="Text"
                value={selectedText}
                options={pricing.text}
                onChange={setText}
                labelMap={TEXT_LABELS}
                dataTestId="text-select"
              />
            </VStack>

            <VStack spacing={4} width="100%">
              <FinalPlanCard
                data={selectedData}
                talk={talkDisplay}
                text={textDisplay}
                totalPrice={totalPrice}
              />
              <VStack spacing={4} width="100%">
                <Button
                  bg="teal.900"
                  color="white"
                  _hover={{ bg: "teal.800" }}
                  size="lg"
                  width="100%"
                  onClick={onOpen}
                  data-testid="checkout-button"
                >
                  Checkout
                </Button>

                {hasSavedSettings ? (
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    colorScheme="red"
                    size="lg"
                    width="100%"
                    data-testid="reset-settings-button"
                  >
                    Reset previous settings
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    borderColor="green.900"
                    color="green.900"
                    _hover={{ bg: "green.50" }}
                    size="lg"
                    width="100%"
                    onClick={handleSave}
                    data-testid="save-settings-button"
                  >
                    Save my settings
                  </Button>
                )}
              </VStack>
            </VStack>
          </Stack>
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent data-testid="checkout-modal">
          <ModalHeader data-testid="checkout-modal-header">
            Confirm Your Plan Selection
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FinalPlanCard
              data={selectedData}
              talk={talkDisplay}
              text={textDisplay}
              totalPrice={totalPrice}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              bg="teal.900"
              color="white"
              _hover={{ bg: "teal.800" }}
              size="lg"
              mr={3}
              onClick={handleConfirm}
              data-testid="confirm-button"
            >
              Confirm
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              size="lg"
              data-testid="cancel-button"
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default App;
