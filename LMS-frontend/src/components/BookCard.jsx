import React from 'react'
import Card from './common/Card'

const BookCard = () => {
  return <div style={{ padding: 10, width: 250, backgroundColor: "rgb(233, 299,99)", borderRadius: 10, padding: "20px 18px" }}>
      <h4 style={{ fontSize: 24, marginBottom: 10 }}>Book Title</h4>
      <p style={{ fontSize: 16 }}>Book Author</p>
      <p style={{ fontSize: 16 }}>Publication Date</p>
    </div>;
}

export default BookCard
