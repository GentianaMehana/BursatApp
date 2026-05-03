import { useState, useEffect } from 'react'

const STORAGE_KEY = 'savedScholarshipFilters'

export function useSavedFilters() {
  const [savedFilters, setSavedFilters] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedFilters))
  }, [savedFilters])

  const saveFilter = (name, filters) => {
    const newFilter = {
      id: Date.now(),
      name,
      filters,
      createdAt: new Date().toISOString()
    }
    setSavedFilters([...savedFilters, newFilter])
    return newFilter
  }

  const deleteFilter = (id) => {
    setSavedFilters(savedFilters.filter(f => f.id !== id))
  }

  const loadFilter = (filter) => {
    return filter.filters
  }

  return { savedFilters, saveFilter, deleteFilter, loadFilter }
}