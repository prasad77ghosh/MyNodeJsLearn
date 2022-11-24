import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logEvent = async (message) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fs.mkdirSync(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventlog.txt"),
      logItem
    );
  } catch (err) {
    console.log(err.message);
  }
};

export default logEvent;
