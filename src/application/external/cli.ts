import { parse } from "deno-flags";
import { join } from "deno-path";

export class CommandLineInterface {
  constructor() {}

  async getFileContent(): Promise<string> {
    const args = parse(Deno.args, {
      alias: { f: "file" },
      default: { file: null },
    });
  
    const filePath = args.file;

    const absolutePath = await Deno.realPath(filePath);
    const outdata = await Deno.readTextFile(absolutePath) as string;
    return outdata.trim()
  }
}