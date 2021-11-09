import React from "react";
import { Chip, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDropzone } from "react-dropzone";
import { FileCopyOutlined, FilePresent } from "@mui/icons-material";

interface FileDropZoneProps {
  accept: string;
}

const FileDropZone = ({ accept }: FileDropZoneProps) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ accept: ".csv" });

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
