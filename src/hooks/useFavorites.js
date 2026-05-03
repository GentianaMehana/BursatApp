import { useState, useEffect } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteScholarships')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('favoriteScholarships', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (id) => {
    if (!favorites.includes(id)) {
      setFavorites([...favorites, id])
    }
  }

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(favId => favId !== id))
  }

  const isFavorite = (id) => favorites.includes(id)

  const toggleFavorite = (id) => {
    if (isFavorite(id)) {
      removeFavorite(id)
    } else {
      addFavorite(id)
    }
  }

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }
}