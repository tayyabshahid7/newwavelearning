import React, { useCallback } from "react";
import { Chip, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DropEvent, useDropzone } from "react-dropzone";
import { FileCopyOutlined, FilePresent } from "@mui/icons-material";

interface FileDropZoneProps {
  accept: string;
  addFilesCallback: (files: File[]) => void;
  maxFiles?: number;
  showPreview?: boolean;
  helpText?: string;
}

const FileDropZone = ({
  accept,
  addFilesCallback,
  maxFiles = 0,
  showPreview = false,
  helpText = "",
}: FileDropZoneProps) => {
  const onDropAccepted = useCallback(
    (files: File[], event: DropEvent) => {
      addFilesCallback(files);
    },
    [addFilesCallback]
  );
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: accept,
    onDropAccepted,
    maxFiles: maxFiles,
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <Chip
      key={file.name}
      color={"error"}
      icon={<FilePresent />}
      label={`${file.name} - ${Math.round(file.size / 1024)} Kb`}
    />
  ));
  let files = null;
  if (showPreview) {
    files = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
  } else {
    files = acceptedFiles.map(file => (
      <Chip
        key={file.name}
        icon={<FilePresent />}
        label={`${file.name} - ${Math.round(file.size / 1024)} Kb`}
      />
    ));
  }

  const thumbs = files?.map((file: any) => (
    <Stack key={file.name}>
      <img width={300} src={file.preview} alt="preview" />
      <Typography variant="caption">{file.name}</Typography>
    </Stack>
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
          <br />
          {helpText}
        </p>
      </Box>
      {files?.length > 0 && <Typography variant="body1">Selected Files</Typography>}
      {showPreview ? (
        <Stack direction="row" spacing={3}>
          {thumbs}
        </Stack>
      ) : (
        <Stack spacing={1}>{files}</Stack>
      )}
      {fileRejectionItems.length > maxFiles && (
        <Stack spacing={1}>
          <Typography variant="caption" color="red">
            You can only upload {maxFiles} file{maxFiles > 1 && "s"}
          </Typography>
          {fileRejectionItems}
        </Stack>
      )}
    </>
  );
};

export default FileDropZone;
