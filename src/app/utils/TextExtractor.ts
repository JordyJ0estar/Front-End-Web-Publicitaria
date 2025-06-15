export function extractPlainTextFromBlocks(blocks: any[] = []): string {
  return blocks
    .map((block) =>
      block.children?.map((child: { text: string }) => child.text || "").join("") || ""
    )
    .join(" ")
}
