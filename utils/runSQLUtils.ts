/**
 * Reads data from `elrh_run_tracks` table
 */
export async function getTracks() {
  const { select } = useNeon()
  return await select(
    ['id as tId', 'name as tName', 'length as tLength'],
    'elrh_run_tracks',
    undefined,
    'name',
  )
}
