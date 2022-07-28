// Example of a restricted endpoint that only authenticated users can access from https://next-auth.js.org/getting-started/example

import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession as getServerSession } from "next-auth";

import { authOptions as nextAuthOptions } from "../auth/[...nextauth]";

import { promises } from "fs";
import { storage } from "@/server/common/firebaseStorage";
import { parseFormDataPromise } from "@/server/common/parseFormDataPromise";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, nextAuthOptions);
    if (!session)
      return res
        .status(401)
        .json({ error: "You must be signed in to upload files." });

    const data = await parseFormDataPromise(req);

    if (!data.file)
      return res.status(400).send({
        status: "error",
      });

    const filepath = data.file.filepath;
    const filename = data.file.newFilename;

    const file = await storage.upload(filepath, {
      destination: `audio/${filename}`,
    });

    const fileUrl = await file[0].getSignedUrl({
      action: "read",
      expires: "03-09-2036",
    });

    await promises.rm(filepath);

    return res.status(200).send({
      fileUrl: fileUrl[0],
    });

  } catch (error) {
    if (error instanceof Error)
      res.status(400).send({
        message: error.message,
      });
  }
};

export default upload;
