import React, { Component } from 'react'
import NewsItem from './News/NewsItem'

export class Favorites extends Component {
  render() {
    return (
      <div style={{width: '100vw', height:'92vh', overflow: 'auto', display: 'flex', justifyContent: 'center', padding: '20px'}} className='bg-dark text-white'>{
            this?.props?.user?.favorites.map(article=>(
                <NewsItem deleteFavorite={this.props.deleteFavorite} deleteSaved={this.props.deleteSaved} addSaved={this.props.addSaved} addFavorites={this.props.addFavorites} user={this.props.user} article={article} />
            ))

        }</div>
    )
  }
}

export default Favorites