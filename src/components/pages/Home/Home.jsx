/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import Chart from '../../Chart/Chart';
import {
  getFromLocalStorage,
  setInLocalStorage,
} from '../../../utils/localstorage';
import NewsListing from '../../NewsListing/NewsListing';

class Home extends React.PureComponent {
  componentDidMount() {
    const {
      fetchNews,
      news: { isFetching, data },
    } = this.props;
    if (!isFetching && !data) fetchNews();
  }

  upvote = id => {
    const {
      updateNewsData,
      news: { data },
    } = this.props;
    const { hits } = data;

    const updatedHits = hits.map(h => {
      if (h.objectID === id) return { ...h, points: h.points + 1 };
      return h;
    });
    updateNewsData({ ...data, hits: updatedHits });
  };

  hideHit = id => {
    const hiddenHits = getFromLocalStorage('hidden');
    if (hiddenHits) {
      setInLocalStorage('hidden', [...hiddenHits, id]);
    } else {
      setInLocalStorage('hidden', [id]);
    }
  };

  render() {
    const {
      updateNewsData,
      news: { isFetching, data },
    } = this.props;

    if (isFetching) {
      return 'fetcging';
    }

    const { hits } = data;
    const hiddenHits = getFromLocalStorage('hidden') || [];
    const filteredHits = hits.filter(h => !hiddenHits.includes(h.objectID));

    const chartdata = filteredHits.map(
      ({ num_comments: numCommnets, objectID, title, points }) => {
        return {
          comments: numCommnets,
          id: objectID,
          points,
          name: title,
        };
      }
    );

    return (
      <div>
        <NewsListing
          news={this.props.news}
          data={data}
          updateNewsData={updateNewsData}
          filteredHits={filteredHits}
          history={this.props.history}
          fetchNews={this.props.fetchNews}
        />
        <Chart data={chartdata} />
      </div>
    );
  }
}

Home.propTypes = {
  fetchNews: PropTypes.func,
  news: PropTypes.object,
  updateNewsData: PropTypes.func,
  history: PropTypes.object,
};

export default Home;
