import UiBox from "../../box";
import { UiText } from "../../text";
import SearchBar from "../../search-bar";
import { Flex, Box } from "@chakra-ui/react";
import Tables from "../../table";
import { useEffect, useState } from "react";
import { getSubscribers } from "@/api/subscribers";
import UiTextLink from "../../text-link";

const columns = [
  { header: "Profile", key: "name", width: "22%", color: "blue.400" },
  { header: "Email", key: "email", width: "22%" },
  { header: "Phone", key: "phone", width: "10%" },
  {
    header: "Profile Created",
    key: "created_at",
    width: "18%",
  },
  { header: "Location", key: "location", width: "10%" },
];

const ExploreProfile = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSubscribers();
        if (res.success && res.data && res.data.subscribers) {
          const formattedItems = res.data.subscribers.map((sub) => ({
            name: `${sub.first_name} ${sub.last_name}`,
            email: sub.email,
            phone: "-", // Phone not provided in API response
            created_at:
              new Date(sub.created_at).toLocaleDateString() +
              " " +
              new Date(sub.created_at).toLocaleTimeString(),
            location: `${sub.city}, ${sub.country}`,
          }));
          setItems(formattedItems);
        }
      } catch (error) {
        console.error("Failed to fetch subscribers", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <UiBox m="7">
        <UiText variant="subheading">Explore Profiles</UiText>
        <Flex gap="5">
          <Box w="sm">
            <UiText mt="5">Search for someone</UiText>
            <UiText color="gray.400">
              by name, email, or exact phone number
            </UiText>
            <SearchBar />
          </Box>
          <Box mt="16">
            <UiText>
              To filter profiles,{" "}
              <UiTextLink value="create a segment." href="#" />
            </UiText>
          </Box>
        </Flex>
        <Tables columns={columns} rows={items} rowpadding="4" pagination />
      </UiBox>
    </>
  );
};

export default ExploreProfile;
