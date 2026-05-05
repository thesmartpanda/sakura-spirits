import { type TeamMemberApiItem } from '../lib/directus'
import { useFetch } from './useFetch'

const TEAM_QUERY =
  '/items/team_members?filter[status][_eq]=published&sort[]=sort'

export function useTeamMembers(): {
  members: TeamMemberApiItem[]
  loading: boolean
  error: Error | null
} {
  const { data, loading, error } = useFetch<TeamMemberApiItem[]>(TEAM_QUERY)
  return { members: data ?? [], loading, error }
}
