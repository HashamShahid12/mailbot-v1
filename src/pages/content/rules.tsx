import { Flex, Text } from "@chakra-ui/react"

export const Rules = () => {
    return (
        <Flex direction="column" p="4rem">
            <Text fontSize="xl" fontWeight="bold" mb="1rem">Headings</Text>
            <Text fontSize="lg">
                Use headings to define the hierarchy of content. Always start with Heading from Chakra. <br />
                Sizes (based on Chakra UI defaults or your custom theme): <br />
                H1 → 2xl to 4xl (Main page title) <br />
                H2 → xl to 2xl (Section titles) <br />
                H3 → lg to xl (Sub-sections) <br />
                H4/H5 → md to lg (Small sections or card titles) <br />
                Keep only one H1 per page.
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb="1rem">Subheadings</Text>
            <Text fontSize="lg">
                Use Text with fontWeight="medium" or semibold and fontSize="md" or lg. <br />
                Subheadings guide the user under a main title. E.g., explaining a form or section.
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb="1rem">Body Text</Text>
            <Text fontSize="lg">
                Use Text component with fontSize="sm" or md. <br />
                Keep line height 1.5 or higher for readability. <br />
                Avoid overusing bold. Use fontWeight="medium" for emphasis instead.
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb="1rem">Spacing & Layout</Text>
            <Text fontSize="lg">
                Use Chakra spacing scale: 2 → 0.5rem, 4 → 1rem, 8 → 2rem, etc. <br />
                Use Box, Flex, Stack, Grid to layout components. <br />
                Maintain consistent spacing: <br />
                Between section title and content → mb={4} or 6 <br />
                Inside cards/panels → p={4} or 6 <br />
                Between input fields → spacing={4} in a VStack
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb="1rem">Button Guidelines</Text>
            <Text fontSize="lg">
                Use Button with variant and colorScheme: <br />
                variant="solid" for primary action <br />
                variant="outline" for secondary <br />
                variant="ghost" for subtle action <br />
                Keep button text short and action-focused: “Save”, “Continue”, “Delete” <br />
                Use icons (left/right) only if it improves clarity.
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb="1rem">Component Structure</Text>
            <Text fontSize="lg">
                Every component should: <br />
                Be self-contained and reusable <br />
                Accept typed props (with TypeScript interfaces) <br />
                Follow Chakra best practices (use Chakra components instead of raw HTML)
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb="1rem">Feedback & Interaction</Text>
            <Text fontSize="lg">
                Use useToast to show alerts/messages to users <br />
                Use Skeleton for loading placeholders <br />
                Add Spinner inside buttons during loading:
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb="1rem"></Text>
            <Text fontSize="lg"></Text>
        </Flex>
    )
}
