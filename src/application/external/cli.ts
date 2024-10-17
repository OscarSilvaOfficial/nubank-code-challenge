import { parse } from "deno-flags";

export async function CommandLineInterfaceFileInput() {
  const args = parse(Deno.args, {
    alias: { f: "file" },
    default: { file: null },
  });

  const filePath = args.file;
  const absolutePath = await Deno.realPath(filePath);
  const outdata = await Deno.readTextFile(absolutePath) as string;

  return outdata.trim()
}
