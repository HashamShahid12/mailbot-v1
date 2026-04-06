import UiBox from "@/components/ui/box";
import UiFileUpload from "@/components/ui/file-upload";
import { UiText } from "@/components/ui/text";
import UiTextLink from "@/components/ui/text-link";
import { List } from "@chakra-ui/react";

const UploadCsvStep1 = () => {
  return (
    <>
      <UiBox>
        <UiText variant="subheading" fontWeight="semibold" mb="5">
          CSV File Upload
        </UiText>
        <UiText fontWeight="semibold" mb="2">
          How to format your CSV file
        </UiText>
        <List.Root fontSize="sm" color="gray.400" ml="6" mb="8">
          <List.Item>
            For information on how to format your CSV file,{" "}
            <UiTextLink value="review the CSVimport guidelines." />
          </List.Item>
          <List.Item>Each CSV file should represent a single event.</List.Item>
          <List.Item>Each can only contain one action by one person.</List.Item>
          <List.Item>
            The first row of the CSV file should contain headers to identify the
            data in each column.
          </List.Item>
          <List.Item>
            One column must contain a labeled timestamp formatted as YYYY-MM-DD
            HH:MM:SS.
          </List.Item>
          <List.Item>
            One column must be labeled Person//Email or Person//ID.
          </List.Item>
        </List.Root>
        <UiText fontSize="sm" mb="1">
          Upload a CSV file
        </UiText>
        <UiFileUpload
          acceptedFormats=".csv"
          dropLabel="Drag and drop or upload CSV"
          helperText="Accepts .csv file type up to 5MB"
        />
      </UiBox>
    </>
  );
};

export default UploadCsvStep1;
