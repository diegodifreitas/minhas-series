import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/'
})

export const loadGenres = () => api.get('genres')
export const loadSeriesById = (id) => api.get('series/' + id)
export const saveSeries = ( newSeries ) => api.post('series', newSeries)
export const loadSeriesByGenre = (genre) => api.get('series?genre=' + genre )
export const deleteSerie = (id) => api.delete('series/' + id )
export const updateSeries = ( series ) => api.put('series/' + series.id, series)


const apis = {
  loadGenres,
  saveSeries,
  loadSeriesByGenre,
  deleteSerie,
  loadSeriesById,
  updateSeries
}

export default apis