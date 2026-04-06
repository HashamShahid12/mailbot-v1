import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import CreateFlowForm from "./create-flow-form";
import CreateFlowCard from "./create-flow-card";
import CreateFlowPopup from "./create-flow-popup";
import { UiText } from "../text";
import UiButton from "../button";
import { useFlowFilters, type FlowCard } from "./use-flow-filter";

type FlowListProps = {
  heading: string;
  image?: string;
  caption?: string;
  cards: FlowCard[];
  backButton?: boolean;
};

const FlowList: React.FC<FlowListProps> = ({
  heading,
  image,
  caption,
  cards,
  backButton,
}) => {
  const {
    statusFilter,
    setStatusFilter,
    searchFilter,
    setSearchFilter,
    selectedTags,
    setSelectedTags,
    filteredCards,
    resetFilters,
  } = useFlowFilters(cards);

  const [openPopups, setOpenPopups] = useState<boolean[]>(() =>
    Array(cards.length).fill(false),
  );

  const cardsWithHandlers = filteredCards.map((card, index) => ({
    ...card,
    onClick: () => {
      const updated = [...openPopups];
      updated[index] = true;
      setOpenPopups(updated);
    },
  }));

  return (
    <>
      <CreateFlowCard
        items={cardsWithHandlers}
        heading={heading}
        image={image}
        caption={caption}
        backButton={backButton}
      >
        <CreateFlowForm
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
        {cardsWithHandlers.length > 0 ? null : (
          <Box textAlign="center" mt="10" mb="5">
            <UiText variant="heading2">No flows found</UiText>
            <UiText mt="3" mb="5" variant="caption">
              Change or remove applied filters to find what you're looking for
            </UiText>
            <Flex gap="3" justify="center">
              <UiButton uiVariant="solid" onClick={resetFilters}>
                Remove Filters
              </UiButton>
              <UiButton uiVariant="outline">Search All Flows</UiButton>
            </Flex>
          </Box>
        )}
      </CreateFlowCard>

      {cardsWithHandlers.map((card, index) => (
        <CreateFlowPopup
          key={index}
          editDetailsOpen={openPopups[index]}
          setEditDetailsOpen={(val: boolean) => {
            const updated = [...openPopups];
            updated[index] = val;
            setOpenPopups(updated);
          }}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
        />
      ))}
    </>
  );
};

export default FlowList;
