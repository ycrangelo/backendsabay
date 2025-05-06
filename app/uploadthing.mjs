import { createUploadthing } from "uploadthing/express";


const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "5MB",
      maxFileCount: 1,
    },
  }).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),
};

// Optional typing workaround for ESM
/** @typedef {import('uploadthing/express').FileRouter} FileRouter */
/** @type {import('uploadthing/express').FileRouter} */
export const routerType = uploadRouter;
