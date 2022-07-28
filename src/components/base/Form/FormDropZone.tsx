import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileUpload } from "tabler-icons-react";

interface FormDropZoneProps {
  setFile: (file: File) => void;
}
// TODO: add error styles, message, disabled status.

export const FormDropZone = ({ setFile }: FormDropZoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[] | null) => {
    if (!acceptedFiles?.[0]) return;
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,

      multiple: false,
      accept: {
        "audio/*": [],
      },
    });

  return (
    <label
      className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      {...getRootProps()}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <FileUpload
          width={34}
          height={24}
          className="mb-3 h-10 w-10 text-gray-400"
        />

        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and
          dropw
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          MP3, SVG, PNG
        </p>
        {!!acceptedFiles?.length &&
          acceptedFiles.map((file, index) => (
            <div className="mt-3" key={index}>
              {file.name}
            </div>
          ))}
      </div>

      <input type="file" className="hidden" {...getInputProps()} />
    </label>
  );
};
