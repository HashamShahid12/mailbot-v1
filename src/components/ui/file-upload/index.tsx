import {
  Box,
  FileUpload,
  Icon,
  useFileUploadContext,
  Flex,
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { IoCloseCircleOutline } from "react-icons/io5";
import React from "react";
import UiButton from "../button";

interface UiFileUploadProps {
  maxFiles?: number;
  acceptedFormats?: string;
  dropLabel?: string;
  helperText?: string;
  helperText2?: string;
  maxW?: string;
  buttonLabel?: string;
  isInvalid?: boolean;
  onFileAccept?: (details: { files: File[] }) => void;
}
const FileListPreview = () => {
  const { acceptedFiles, deleteFile } = useFileUploadContext();
  if (acceptedFiles.length === 0) return null;

  return (
    <Box
      mt="4"
      p="4"
      bg="white"
      border="sm"
      borderColor="gray.300"
      borderRadius="md"
    >
      {acceptedFiles.map((file) => (
        <Flex key={file.name} gap="2" align="center" justify="space-between">
          <Box>{file.name}</Box>
          <Icon
            as={IoCloseCircleOutline}
            boxSize={5}
            color="red.500"
            cursor="pointer"
            onClick={(e) => {
              deleteFile(file);
              e.stopPropagation();
            }}
          />
        </Flex>
      ))}
    </Box>
  );
};

const FileDropZoneContent: React.FC<UiFileUploadProps> = ({
  dropLabel,
  helperText,
  helperText2,
  buttonLabel = "Select File",
}) => {
  const { acceptedFiles } = useFileUploadContext();
  const hasFiles = acceptedFiles.length > 0;

  if (hasFiles) return null;

  return (
    <>
      <FileUpload.DropzoneContent>
        <Box>{dropLabel}</Box>
        <Box color="gray.400">{helperText}</Box>
        <Box color="gray.400">{helperText2}</Box>
      </FileUpload.DropzoneContent>
      <UiButton uiVariant="outline" bg="white">
        <Icon as={LuUpload} boxSize={5} color="black" /> {buttonLabel}
      </UiButton>
    </>
  );
};

const UiFileUpload: React.FC<UiFileUploadProps> = ({
  maxFiles = 1,
  acceptedFormats = ".png, .jpg",
  dropLabel = "Drag and drop files here",
  helperText = ".png, .jpg up to 5MB",
  helperText2,
  buttonLabel,
  maxW,
  isInvalid,
  onFileAccept,
}) => {
  return (
    <FileUpload.Root
      maxW={maxW}
      alignItems="stretch"
      maxFiles={maxFiles}
      onFileAccept={onFileAccept}
    >
      <FileUpload.HiddenInput accept={acceptedFormats} />
      <FileUpload.Dropzone
        borderColor={isInvalid ? "red.500" : "gray.400"}
        bg="gray.200"
        cursor="pointer"
        _hover={{ borderColor: isInvalid ? "red.500" : "blue.500" }}
      >
        <FileDropZoneContent
          dropLabel={dropLabel}
          helperText={helperText}
          helperText2={helperText2}
          buttonLabel={buttonLabel}
        />
        <FileListPreview />
      </FileUpload.Dropzone>
      {isInvalid && (
        <Box color="red.500" mt="1">
          Please upload at least one file to continue.
        </Box>
      )}
    </FileUpload.Root>
  );
};

export default UiFileUpload;
