import { createClient } from '@supabase/supabase-js'

// Përdor environment variables për Netlify (zhvillim lokal)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getScholarships(filters = {}, showOnlyActive = false) {
  let query = supabase
    .from('bursat')
    .select('*')
    .order('created_at', { ascending: false })

  // Filter by active status - VETËM nëse showOnlyActive është true
  if (showOnlyActive) {
    query = query.eq('is_active', true)
  }
  // Përndryshe, merr TË GJITHA bursat (aktive dhe joaktive)

  // Filter by level
  if (filters.level && filters.level !== 'all') {
    query = query.contains('level', [filters.level])
  }

  // Filter by field of study
  if (filters.field_of_study && filters.field_of_study !== 'all') {
    query = query.ilike('field_of_study', `%${filters.field_of_study}%`)
  }

  // Filter by country
  if (filters.country && filters.country !== 'all') {
    query = query.eq('country', filters.country)
  }

  // Search in title and description
  if (filters.search && filters.search.trim()) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching scholarships:', error)
    return []
  }

  return Array.isArray(data) ? data : []
}

export async function getFilterOptions() {
  const { data: scholarships, error } = await supabase
    .from('bursat')
    .select('country, field_of_study')
  // HEQ .eq('is_active', true) për të marrë TË GJITHA për filtra

  if (error) {
    console.error('Error fetching filter options:', error)
    return { countries: [], fields: [] }
  }

  const countries = [...new Set(scholarships?.map(s => s.country).filter(Boolean) || [])]
  
  const allFields = []
  scholarships?.forEach(s => {
    if (s.field_of_study) {
      // Nëse field_of_study është array
      if (Array.isArray(s.field_of_study)) {
        s.field_of_study.forEach(f => {
          const trimmed = f.trim()
          if (trimmed && !allFields.includes(trimmed)) allFields.push(trimmed)
        })
      } 
      // Nëse është string (për pajtueshmëri me të dhënat e vjetra)
      else if (typeof s.field_of_study === 'string') {
        s.field_of_study.split(',').forEach(f => {
          const trimmed = f.trim()
          if (trimmed && !allFields.includes(trimmed)) allFields.push(trimmed)
        })
      }
    }
  })

  return { countries: countries.sort(), fields: allFields.sort() }
}

export async function getScholarshipById(id) {
  const { data, error } = await supabase
    .from('bursat')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching scholarship:', error)
    return null
  }

  return data
}

// Funksion i ri për të marrë numrin e bursave (të gjitha)
export async function getScholarshipCount() {
  const { count, error } = await supabase
    .from('bursat')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('Error counting scholarships:', error)
    return 0
  }

  console.log(`📊 Totali i bursave në database: ${count}`)
  return count
}

// Funksion i ri për statistikat e bursave
export async function getScholarshipStats() {
  const { data, error } = await supabase
    .from('bursat')
    .select('is_active, source_name')

  if (error) {
    console.error('Error fetching stats:', error)
    return { total: 0, active: 0, inactive: 0, bySource: {} }
  }

  const total = data.length
  const active = data.filter(s => s.is_active === true).length
  const inactive = total - active
  
  const bySource = {}
  data.forEach(s => {
    const source = s.source_name || 'Unknown'
    bySource[source] = (bySource[source] || 0) + 1
  })

  return { total, active, inactive, bySource }
}