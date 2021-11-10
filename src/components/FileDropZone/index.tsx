import React, { useCallback } from "react";
import { Chip, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DropEvent, useDropzone } from "react-dropzone";
import { FileCopyOutlined, FilePresent } from "@mui/icons-material";

interface FileDropZoneProps {
  accept: string;
  addFilesCallback: (files: File[]) => void;
}

const FileDropZone = ({ accept, addFilesCallback }: FileDropZoneProps) => {
  const onDropAccepted = useCallback(
    (files: File[], event: DropEvent) => {
      addFilesCallback(files);
    },
    [addFilesCallback]
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: accept,
    onDropAccepted,
  });

  const files = acceptedFiles.map(file => (
    <Chip key={file.name} icon={<FilePresent />} label={`${file.name} - ${file.size} bytes`} />
  ));

  return (
    <>
      <Box
        sx={{
          p: 2,
          mb: 2,
          border: "2px dashed #eeeeee",
          backgroundColor: "#fafafa",
          color: "#bdbdbd",
          textAlign: "center",
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>
          <FileCopyOutlined fontSize="large" />
          <br />
          Drag files here, or click to select files
        </p>
      </Box>
      <Typography variant="body1">Selected Files</Typography>
      <Stack>{files}</Stack>
    </>
  );
};

export default FileDropZone;
