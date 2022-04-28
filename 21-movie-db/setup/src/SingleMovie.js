import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import useFetch from './useFetch'
import { API_ENDPOINT } from './context'

const SingleMovie = () => {
  const { id } = useParams()
  const { isLoading, error, data: movie } = useFetch(`&i=${id}`)

  if (isLoading) {
    return <div className='loading'>Loading...</div>
  }

  if (error.show) {
    return (
      <div className='page-error'>
        <h1>{error.msg}</h1>
        <Link to='/' className='btn'>
          back to movies
        </Link>
      </div>
    )
  }

  const { Poster: poster, Title: title, Plot: plot, Year: year } = movie

  return (
    <section className='single-movie'>
      <img src={poster} alt={title} />
      <div className='single-movie-info'>
        <h2>{title}</h2>
        <h4>{year}</h4>
        <p>{plot}</p>
        <Link to='/' className='btn'>
          back to movies
        </Link>
      </div>
    </section>
  )
}

export default SingleMovie
