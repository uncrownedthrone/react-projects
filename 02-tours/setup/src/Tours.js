import React from 'react'
import Tour from './Tour'

const Tours = ({ tours, removeTour }) => {
  return (
    <section>
      <div class='title'>
        <h2>our tours</h2>
        <div class='underline'></div>
        <div>
          {tours.map((tour) => {
            return <Tour key={tour.id} {...tour} removeTour={removeTour} />
          })}
        </div>
      </div>
    </section>
  )
}

export default Tours
