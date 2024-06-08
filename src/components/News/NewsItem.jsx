import React, { Component } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'

export class NewsItem extends Component {
  state = {
    showModal: false,

  }
  render() {
    return (
      <>
        {this.props.article&&<Card className='mt-2' onClick={()=>this.setState({showModal: true})} style={{width: '50vw'}}>
          <Card.Img variant="top" src={this.props.article.urlToImage}/>
          <Card.Body>
            <Card.Title>
              {this.props.article.title}
            </Card.Title>
            <Card.Subtitle>
              {this.props.article.author}
            </Card.Subtitle>
            <a href={this.props.article.url}>
            <Card.Text>
              {this.props.article.description}
            </Card.Text>
            </a>
          </Card.Body>
          <Card.Footer>
              {this.props.user.saved.some(e=>e.url==this.props.article.url)?<Button 
              onClick={()=>{this.props.deleteSaved(this.props.article.url)}} variant='success'>Remove from Saved</Button>:<Button onClick={()=>{this.props.addSaved(this.props.article)}} 
              variant='success'>Add to Saved
              </Button>}
             

          </Card.Footer>
        </Card>}
        </>
    )
  }
}

export default NewsItem