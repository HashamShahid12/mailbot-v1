import { FormField, SearchBar } from "@/components/ui";
import UiButton from "@/components/ui/button";
import Checkbox from "@/components/ui/check-box";
import Tables from "@/components/ui/table";
import { UiText } from "@/components/ui/text";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EmptyTable from "../../assets/emptytable.svg";
import type { ImageLibraryTableProps } from "@/types/user-type";
import { getImageLibraryTable } from "@/api/dashboard-api";
import ImagesLibraryActionMenu from "./images-library-action-menu";
import { ReusableActionBar } from "@/components/ui/action-bar";
import type { Column } from "@/types/table-props";
import { IoMdEye } from "react-icons/io";
import { PrimitiveDialog } from "@/components/ui/dailog-model";
import { UiTab } from "@/components/ui/tabs";
import UiFileUpload from "@/components/ui/file-upload";

const ImagesLibrary = () => {
  const [items, setItems] = useState<ImageLibraryTableProps[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [uploadImage, setUploadImage] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const isAllSelected = selectedIds.length > 0;
  const isIndeterminate = false;

  const tabs = [
    { value: "upload", label: "Upload Image" },
    { value: "url", label: "Import URL" },
  ];

  const handleImportImage = async () => {
    if (!imageUrlInput) return;

    const urlParts =
      imageUrlInput.split("/").pop()?.split("?")[0] || "unknown.jpg";
    const imageName =
      urlParts.substring(0, urlParts.lastIndexOf(".")) || "unknown";
    const imageType = urlParts.split(".").pop()?.toUpperCase() || "UNKNOWN";

    let imageSize = "Unknown";
    try {
      const response = await fetch(imageUrlInput);
      const blob = await response.blob();
      const sizeInKB = (blob.size / 1024).toFixed(2) + " kB";
      imageSize = sizeInKB;
    } catch (error) {
      console.error("Failed to get image size", error);
    }

    const newImage = {
      id: Date.now().toString(),
      imageUrl: imageUrlInput,
      imageName,
      imageType,
      imageSize,
      date: new Date().toLocaleString(),
    };

    setItems((prev) => [prev[0], newImage, ...prev.slice(1)]);
    setImageUrlInput("");
    setUploadImage(false);
  };
  const tabContent = {
    upload: (
      <Flex justify="center" mt="10">
        <UiFileUpload
          maxW="2xl"
          acceptedFormats=".jpg,.jpeg,.png,.gif,.webp"
          buttonLabel="Select images"
          dropLabel="Drag and drop or select images"
          helperText="Accepts .jpg, .jpeg, .png, .gif, and .webp file types."
          helperText2="Maximum file size 10 MB."
        />
      </Flex>
    ),
    url: (
      <Flex justify="center" direction="column" gap="5" mt="10">
        <FormField
          label="Image URL"
          placeHolder="http://website.com"
          value={imageUrlInput}
          onChange={(_, value) => setImageUrlInput(value)}
        />

        <UiButton
          uiVariant="solid"
          maxW="fit"
          alignSelf="end"
          onClick={handleImportImage}
        >
          Import image
        </UiButton>
      </Flex>
    ),
  };

  useEffect(() => {
    getImageLibraryTable()
      .then(async (data) => {
        const updatedItems = await Promise.all(
          data.map(async (item: any) => {
            const url = item.imageUrl;
            const urlParts =
              url.split("/").pop()?.split("?")[0] || "unknown.jpg";
            const imageName =
              urlParts.substring(0, urlParts.lastIndexOf(".")) || "unknown";
            const imageType =
              urlParts.split(".").pop()?.toUpperCase() || "UNKNOWN";

            let imageSize = "Unknown";
            try {
              const response = await fetch(url);
              const blob = await response.blob();
              const sizeInKB = (blob.size / 1024).toFixed(2) + " kB";
              imageSize = sizeInKB;
            } catch (error) {
              console.error("Error fetching image size:", error);
            }

            return {
              ...item,
              imageName,
              imageType,
              imageSize,
            };
          })
        );
        setItems(updatedItems);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleSelectAll = (checked: boolean | string) => {
    setSelectedIds(checked ? items.map((item) => item.id) : []);
  };

  const toggleSelectRow = (id: string, checked: boolean | string) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((existingId) => existingId !== id)
    );
  };

  const filteredItems = items.filter((item) => {
    const rawName = item.imageName || "";

    const label = rawName.toLowerCase();

    const searchWords = searchTerm.toLowerCase().split(" ").filter(Boolean);

    const matchesSearch = searchWords.every((word) => label.includes(word));

    return matchesSearch;
  });

  const columns = [
    {
      header: (
        <Checkbox
          checked={isAllSelected}
          indeterminate={isIndeterminate}
          onCheckedChange={({ checked }) => toggleSelectAll(checked)}
        />
      ),
      key: "checkbox",
      width: "3%",
      cell: (row: ImageLibraryTableProps) => (
        <Checkbox
          checked={selectedIds.includes(row.id)}
          onCheckedChange={({ checked }) => toggleSelectRow(row.id, checked)}
        />
      ),
    },

    {
      header: "Image",
      key: "imageName",
      cell: (row: ImageLibraryTableProps) => (
        <Flex align="center" gap="2">
          <Box
            position="relative"
            boxSize="60px"
            border="sm"
            borderColor="gray.400"
            borderRadius="md"
            overflow="hidden"
            _hover={{ bg: "gray.300", cursor: "zoom-in" }}
            onClick={() => window.open(row.imageUrl, "_blank")}
          >
            <Image
              src={row.imageUrl}
              alt={row.imageName}
              boxSize="100%"
              objectFit="cover"
              transition="0.3s ease"
            />
            <Flex
              position="absolute"
              top="0"
              w="full"
              h="full"
              align="center"
              justify="center"
              bg="gray.300"
              opacity="0"
              _hover={{ opacity: 1 }}
              transition="0.3s ease"
            >
              <IoMdEye size="24" color="white" />
            </Flex>
          </Box>
          <UiText variant="body" fontWeight="medium">
            {row.imageName}
          </UiText>
        </Flex>
      ),
    },

    { header: "Size", key: "imageSize", width: "7%" },
    { header: "Type", key: "imageType", width: "5%" },
    { header: "Update Date", key: "date", width: "15%" },
    {
      header: "",
      key: "actions",
      width: "3%",
      cell: (row: ImageLibraryTableProps) => (
        <ImagesLibraryActionMenu ImagesLibraryAction={row} />
      ),
    },
  ].filter(Boolean) as Column[];
  return (
    <>
      <Box p="6" bg="white">
        <Flex justify="space-between">
          <Flex gap="2">
            <SearchBar
              placeholder="Search images"
              w="3xs"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="plain"
              px="1"
              type="reset"
              color="blue.200"
              _hover={{ color: "blue.100", textDecoration: "underline" }}
              _focus={{
                outline: "none",
              }}
            >
              Clear
            </Button>
          </Flex>
          <UiButton uiVariant="solid" onClick={() => setUploadImage(true)}>
            Upload images
          </UiButton>
        </Flex>
        {loading ? null : filteredItems.length === 0 ? (
          <Box textAlign="center">
            <img
              src={EmptyTable}
              width="250"
              alt="No flows"
              style={{ margin: "0 auto" }}
            />
            <UiText variant="subheading">No data available</UiText>
            <UiText mb="5">Refresh the page to try again.</UiText>
          </Box>
        ) : (
          <Tables
            columns={columns}
            rows={filteredItems}
            pagination
            headerPadding="2"
            cellPadding="2"
          />
        )}
        <ReusableActionBar
          itemCount={selectedIds.length}
          checked={selectedIds.length > 0}
          onReset={() => setSelectedIds([])}
          onAdd={() => console.log("Add tags:", selectedIds)}
          onRemove={() => console.log("Remove tags:", selectedIds)}
          onDelete={() => {
            console.log("Delete:", selectedIds);
            setSelectedIds([]);
          }}
        />
        <PrimitiveDialog
          open={uploadImage}
          onOpenChange={setUploadImage}
          title="Select Image"
          size="xl"
          footer={
            <>
              <UiButton uiVariant="solid" onClick={() => setUploadImage(false)}>
                Close
              </UiButton>
            </>
          }
        >
          <UiTab
            tabs={tabs}
            variant="minimal"
            defaultValue="upload"
            tabContent={tabContent}
          />
        </PrimitiveDialog>
      </Box>
    </>
  );
};

export default ImagesLibrary;
