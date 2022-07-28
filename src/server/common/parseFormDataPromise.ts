import formidable, { File, Fields, Files } from "formidable";
import fs from "fs";
import { nanoid } from "nanoid";
import { NextApiRequest } from "next";
import path from "path";

async function parseFormDataPromise(req: NextApiRequest): Promise<{
  file?: File;
  fields: Fields;
  files: Files;
}> {
  return await new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, "..", "..", "..", "static");

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    const form = formidable({
      uploadDir: filePath,
      keepExtensions: true,
      filename: (_name, ext, _part, _form) => `${nanoid()}${ext}`,
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({
        fields,
        files,
        file: Array.isArray(files.file) ? files.file[0] : files.file,
      });
    });
  });
}

export { parseFormDataPromise };
