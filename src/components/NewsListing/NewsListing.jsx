/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './NewsListing.scss';
import timeSince from '../../utils/timeSince';
import {
  getFromLocalStorage,
  setInLocalStorage,
} from '../../utils/localstorage';
import queryStringToObject from '../../utils/queryStringToObject';
import objectToQueryString from '../../utils/objectToQueryString';

const NewsListing = ({
  updateNewsData,
  filteredHits,
  news,
  history,
  fetchNews,
}) => {
  const {
    data,
    data: { hits, page, nbPages },
  } = news;
  let hiddenHits = getFromLocalStorage('hidden') || [];
  const hideHit = id => {
    if (hiddenHits) {
      setInLocalStorage('hidden', [...hiddenHits, id]);
    } else {
      setInLocalStorage('hidden', [id]);
    }
    hiddenHits = [...hiddenHits, id];
    updateNewsData({
      ...data,
      hits: hits.filter(h => !hiddenHits.includes(h.objectID)),
    });
  };

  const formatURL = url => {
    const urlParts = (url && url.split('//')) || [];
    if (urlParts.length >= 2) return urlParts[1].split('/')[0];
    if (urlParts.length >= 1) return urlParts[0].split('/')[0];
    return url;
  };

  const upvote = id => {
    const updatedHits = hits.map(h => {
      if (h.objectID === id) return { ...h, points: h.points + 1 };
      return h;
    });
    updateNewsData({ ...data, hits: updatedHits });
  };

  const applyFilters = filters => {
    const { push, location } = history;
    if (location) {
      const { search } = location;
      const appliedFilters = queryStringToObject(search.substring(1));
      const allFilters = { ...appliedFilters, ...filters };
      const newQueryParams = objectToQueryString(allFilters);
      push({ path: '/', search: newQueryParams });
      fetchNews(allFilters);
    }
  };

  const newsItem = ({
    title,
    num_comments: numCommnets,
    points,
    url,
    author,
    created_at: createdAt,
    objectID,
  }) => {
    return (
      <li className={styles.newsItem}>
        <div className={styles.col}>
          <div className={styles.comments}>
            <span className="lg-hide md-hide">Comments: </span>
            {numCommnets}
          </div>
          <div className={styles.votesCount}>
            <span className="lg-hide md-hide">Points: </span>
            {points}
          </div>
          <button
            type="button"
            className={styles.upVotes}
            onClick={() => upvote(objectID)}
          >
            <span className="lg-hide md-hide">Upvote: </span>
            &#9650;
          </button>
        </div>
        <div className={styles.newsDetails}>
          <div className={styles.title}>
            <a href={url}>{title}</a>
            <span className={styles.details}>
              <button
                type="button"
                className={styles.url}
                onClick={() =>
                  applyFilters({ page: 0, tags: `author_${author}` })
                }
              >
                {` (${formatURL(url)}) `}
              </button>
              <button
                type="button"
                className={styles.author}
                onClick={() =>
                  applyFilters({ page: 0, tags: `author_${author}` })
                }
              >
                {` by ${author} `}
              </button>
              <span className={styles.time}>{`${timeSince(createdAt)}`}</span>
              <button type="button" onClick={() => hideHit(objectID)}>
                [ Hide ]
              </button>
            </span>
          </div>
        </div>
      </li>
    );
  };

  return (
    <React.Fragment>
      <ul className={styles.newslist}>
        <li className={classnames(styles.newsItem, 'sm-hide', 'xs-hide')}>
          <div className={styles.col}>
            <div className={styles.comments}>Comments</div>
            <div className={styles.votesCount}>Votes Count</div>
            <div className={styles.upVotes}> Up Votes </div>
          </div>
          <div className={styles.newsDetails}>News Details</div>
        </li>
        {filteredHits && filteredHits.map(hit => newsItem(hit))}
      </ul>
      <div className={styles.pagination}>
        <button
          type="button"
          onClick={() => applyFilters({ page: page !== 0 ? page - 1 : page })}
        >
          Previous
        </button>
        {` | `}
        <button
          type="button"
          onClick={() =>
            applyFilters({ page: page < nbPages ? page + 1 : nbPages })
          }
        >
          Next
        </button>
      </div>
    </React.Fragment>
  );
};

NewsListing.propTypes = {
  news: PropTypes.object.isRequired,
  filteredHits: PropTypes.object,
  updateNewsData: PropTypes.func,
  history: PropTypes.object,
  fetchNews: PropTypes.func,
};

NewsListing.defaultProps = {};

export default NewsListing;
