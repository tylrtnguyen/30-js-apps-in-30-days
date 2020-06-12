import React, { Component } from 'react';
import './App.css';

import Articles from './components/Articles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      articles: [],
      isOldestFirst: true,
      isHighestFirst: true
    }
    this.toggleSortUpvotes = this.toggleSortUpvotes.bind(this);
    this.toggleSortDate = this.toggleSortDate.bind(this);
  }

  sortByDate() {
    const { articles } = this.state
    let newArticles = articles;
    if(this.state.isOldestFirst) {
      newArticles = articles.sort((a, b) => a.date > b.date ? 1 : -1);
    } else {
      newArticles = articles.sort((a, b) => a.date < b.date ? 1 : -1);
    }
    this.setState({
      isOldestFirst: !this.state.isOldestFirst,
      articles: newArticles
    })
  }

  toggleSortDate(event) {
    this.sortByDate();
  }

  toggleSortUpvotes(event) {
    this.sortByUpvotes();
  }
 
  sortByUpvotes() {
    const { articles } = this.state
    let newArticles = articles;
    if(this.state.isHighestFirst) {
      newArticles = articles.sort((a, b) => a.upvotes > b.upvotes ? 1 : -1);
    } else {
      newArticles = articles.sort((a, b) => a.upvotes < b.upvotes ? 1 : -1);
    }
    this.setState({
      isHighestFirst: !this.state.isHighestFirst,
      articles: newArticles
    })
  }

  componentDidMount() {
    const articles = this.props.articles;
    this.setState({
      isOldestFirst: true,
      articles: articles
    })
  }
  render() {
    return (
      <div className="App">
        <div className="navigation">
          <button onClick={this.toggleSortUpvotes} data-testid="top-link">Top</button>
          <button onClick={this.toggleSortDate} data-testid="newest-link">Newest</button>
        </div>
        <Articles articles={this.state.articles} />
      </div>
    );
  }
}

export default App;
