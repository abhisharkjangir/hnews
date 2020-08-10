import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Home from '../../../components/pages/Home/Home';
import { selectNews } from './selectors';
import { fetchNews, fetchNewsSucees } from './actions';

const mapStateToProps = createStructuredSelector({
  news: selectNews(),
});

const mapDispatchToProps = dispatch => ({
  fetchNews: payload => dispatch(fetchNews(payload)),
  updateNewsData: data => dispatch(fetchNewsSucees(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
