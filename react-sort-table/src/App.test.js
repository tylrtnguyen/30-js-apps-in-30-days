import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render, within, fireEvent, cleanup } from '@testing-library/react';

import 'jest-dom/extend-expect';

const testIds = {
  topLink: "top-link",
  newestLink: "newest-link",
  article: "article",
};

const articles = [
  {
    title: "Alphabet earnings",
    upvotes: 22,
    date: "2011-11-23",
  },
  {
    title: "Artificial Mountains",
    upvotes: 200,
    date: "2019-11-23",
  },
  {
    title: "Scaling to 100k Users",
    upvotes: 72,
    date: "2019-10-21",
  },
  {
    title: "A message to our customers",
    upvotes: 12,
    date: "2019-10-22",
  },
  {
    title: "the Emu War",
    upvotes: 24,
    date: "2018-04-01",
  },
  {
    title: "What's SAP",
    upvotes: 1,
    date: "2017-01-21",
  },
  {
    title: "Simple text editor has 15k monthly users",
    upvotes: 83,
    date: "2020-02-22",
  },
];

const topArticles = articles.concat().sort((a, b) => {
  if (a.upvotes > b.upvotes) {
    return -1;
  }
  if (a.upvotes < b.upvotes) {
    return 1;
  }
  return 0;
});

const newestArticles = articles.concat().sort((a, b) => {
  const aDate = new Date(a.date);
  const bDate = new Date(b.date);
  if (aDate > bDate) {
    return -1;
  }
  if (aDate < bDate) {
    return 1;
  }
  return 0;
});

const renderApp = () => render(<App articles={articles} />);

beforeEach(() => {
});

afterEach(() => {
  cleanup();
});

test('Navigation renders correctly', () => {
  const { getByTestId, queryAllByTestId } = renderApp();

  const topLink = getByTestId(testIds.topLink);
  expect(topLink).toBeVisible();
  expect(topLink).toHaveTextContent("Top");

  const newestLink = getByTestId(testIds.newestLink);
  expect(newestLink).toBeVisible();
  expect(newestLink).toHaveTextContent("Newest");
});

const expectArticles = (articles, expectedArticles) => {
  expect(articles).toHaveLength(expectedArticles.length);
  articles.forEach((article, i) => {
    const title = within(article).getByTestId("article-title").textContent;
    const upvotes = within(article).getByTestId("article-upvotes").textContent;
    const date = within(article).getByTestId("article-date").textContent;
    const expectedArticle = expectedArticles[i];
    expect([title, upvotes, date]).toEqual([expectedArticle.title, expectedArticle.upvotes.toString(), expectedArticle.date]);
  });
};

test('Initial articles render correctly', () => {
  const { getByTestId, queryAllByTestId } = renderApp();

  const articles = queryAllByTestId(testIds.article);
  expectArticles(articles, topArticles);
});

test('Clicking on top renders expected articles', () => {
  const { getByTestId, queryAllByTestId } = renderApp();

  const topLink = getByTestId(testIds.topLink);
  fireEvent.click(topLink);

  const articles = queryAllByTestId(testIds.article);
  expectArticles(articles, topArticles);
});

test('Clicking on newest renders expected articles', () => {
  const { getByTestId, queryAllByTestId } = renderApp();

  const newestLink = getByTestId(testIds.newestLink);
  fireEvent.click(newestLink);

  const articles = queryAllByTestId(testIds.article);
  expectArticles(articles, newestArticles);
});


test('Sequence of navigation clicks renders expected artices', () => {
  const { getByTestId, queryAllByTestId } = renderApp();

  const topLink = getByTestId(testIds.topLink);
  const newestLink = getByTestId(testIds.newestLink);

  const elements = [newestLink, topLink, topLink, newestLink, newestLink, topLink];
  for (const elem of elements) {
    fireEvent.click(elem);
    const articles = queryAllByTestId(testIds.article);
    const expectedArticles = elem === topLink ? topArticles : newestArticles;
    expectArticles(articles, expectedArticles);
  }
});
