import React from 'react';

class Articles extends React.Component {
  constructor() {
    super();
    this.state = { author: '', articles: [], display: false};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  fetchBooks = () => {
    fetch(`https://jsonmock.hackerrank.com/api/articles?author=${this.state.author}&page=1`)
  }

  handleChange(event) {
    this.setState({author: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const URL = `https://jsonmock.hackerrank.com/api/articles?author=${this.state.author}&page=1`
    fetch(URL)
    .then((response) => response.json())
    .then(articles => {
      articles.data.length === 0 ? this.setState({display: true}) : this.setState({display: false})
      let filterArticles = [];
      articles.data.forEach(article => {
        if(article.title && filterArticles.length < 3){
          filterArticles.push(article)
        }
      })
      this.setState({articles: filterArticles})
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="controls">
          <div className="input-container">
            <span>author:</span>
            <input type="text" className="text-input" data-testid="text-input" value={this.state.author} onChange={this.handleChange} />
            <button className="fetch-button" onClick={this.handleSubmit} data-testid="fetch-button">Fetch</button>
          </div>
        </div>
        <div className="results">
        {
          <ul>
                    {this.state.articles.length > 0 && this.state.articles.map((article) => (
                        <li key={article.title} data-testid="result-row">{article.title}</li>
                    ))}
          </ul>
        }
        </div>
        {this.state.display ? <div data-testid="no-results">No results</div> : ''}
      </React.Fragment>
    );
  }
}

export default Articles;
