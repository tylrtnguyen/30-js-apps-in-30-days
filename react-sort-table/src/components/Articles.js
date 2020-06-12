import React from 'react';

class Articles extends React.Component {
  
  render() {
    const { articles } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Upvotes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(function(article, index) {
            return (
              <tr data-testid="article" key={index}>
                <td data-testid="article-title">{article.title}</td>
                <td data-testid="article-upvotes">{article.upvotes}</td>
                <td data-testid="article-date">{article.date}</td>
            </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Articles;
