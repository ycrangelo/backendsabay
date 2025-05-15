import { createUploadthing } from "uploadthing/express";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "5MB",
      maxFileCount: 1,
      allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    },
  })
    .middleware(async ({ req }) => {
      return { userId: req.user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload completed", { metadata, file });

      return {
        success: true,
        url: file.url,
        name: file.name,
        size: file.size,
        type: file.type,
      };
    }),
};

// Optional typing workaround for ESM
/** @typedef {import('uploadthing/express').FileRouter} FileRouter */
/** @type {import('uploadthing/express').FileRouter} */
export const routerType = uploadRouter;
