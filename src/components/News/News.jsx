import React, { Component } from 'react'
import axios from 'axios'
import NewsList from './NewsList'
import {Audio} from 'react-loader-spinner'
import { Button, Form, InputGroup } from 'react-bootstrap'

export class News extends Component {
    state= {
       
        newsList: [],
        searchInput: '',
        isLoaded: false
    }

    handleOnChange=(e)=>{
      this.setState({searchInput: e.target.value})
    }

    handleOnSubmit =async(e)=>{
      e.preventDefault()
      try {
        let foundArticles = await axios.get(`https://newsapi.org/v2/everything?q=${this.state.searchInput}&apiKey=${import.meta.env.VITE_NEWS_KEY}&language=en`)
        this.setState({newsList: foundArticles.data.articles, searchInput: "" })

        console.log(foundArticles)
      } catch (error) {
        console.log(error)
      }
    }

    // async componentDidMount(){
    //   this.setState({isLoaded: true})
    //     try {
    //        const starterNewsList=  await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_KEY}`)
    //       console.log(starterNewsList.data)
    //       this.setState({newsList: starterNewsList.data.articles})
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    render() {
      return (
        <div style={{width: '100vw', height:'92vh', overflow: 'auto'}} className='bg-black text-white'>
          {
          !this.state.isLoaded ? 
          (<Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />) : 
          (
            <>
            <div style={{width: '100vw', display: 'flex', justifyContent: 'center'}}>
            <Form id='newsForm' style={{width: '40vw'}} className='pt-5 mb-5' onSubmit={this.handleOnSubmit}>
              <InputGroup>
              
                <Form.Control placeholder='Search for an article...' name='article' onChange={this.handleOnChange} value={this.state.searchInput} ></Form.Control>
              
              <Button type='submit'>Search</Button>
              </InputGroup>
            </Form>
            </div>
          <div id="newsListContainer" style={{textAlign: 'center'}}>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                  <NewsList deleteSaved={this.props.deleteSaved}  addSaved={this.props.addSaved} user={this.props.user} newsList ={this.state.newsList}/>
              </div>
          </div>
          </>
      )
    }
    </div>
    )
   }
}
export default News 