export const Schema = z.object({
  $game: z.record(z.string(), z.any()).prefault({}),
  _状态: z.record(z.string(), z.any()).prefault({}),
  _投影: z.string().prefault(''),
  _快照: z.record(z.string(), z.any()).prefault({}),
  叙事: z.record(z.string(), z.any()).prefault({}),
})

export type CastleState = z.infer<typeof Schema>
