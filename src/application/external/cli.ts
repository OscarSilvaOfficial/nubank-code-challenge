import { parse } from "deno-flags";

function externalCLI() {
  return parse(Deno.args, {
    alias: { f: "file" },
    default: { file: null },
  });
}

export interface CLI {
  [x: string]: any;
  _: (string | number)[];
}

export async function CommandLineInterfaceFileInput(cli: CLI = externalCLI()) {
  const filePath = cli.file;
  const absolutePath = await Deno.realPath(filePath);
  const outdata = await Deno.readTextFile(absolutePath) as string;

  return outdata.trim();
}
