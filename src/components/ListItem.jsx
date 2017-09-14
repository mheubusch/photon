'use strict';

const React = require('react');
const { connect } = require('react-redux');
const { getPage } = require('./utilities.js');
const Page = require('./Page.jsx');

const ListItem = connect(state => {
  var {path} = state.routing;
  var {pages} = state.data;

  var page = getPage(path, pages);
  return {page};
})(React.createClass({
  displayName: 'ListItem',

  propTypes: {
    expanded: React.PropTypes.bool,
    handleClick: React.PropTypes.func,
    item: React.PropTypes.shape(),
    page: React.PropTypes.shape()
  },

  getPage: (item, i) => {
    return (
      <Page
          classes="db no-underline hover-no-underline hover-blue-60 grey-90 fw4 pv2 pl3 lh-solid"
          i={i}
          item={item}
          key={i}
      />
    );
  },

  render() {
    const { item, page } = this.props;
    let handleClick = () => {
      this.props.handleClick(item);
    }
    const pages = item.pages || [item];
    const selected = (page && item.title === page.category);
    const expanded = selected || this.props.expanded;

    return (<div className={'overflow-hidden height-animate pointer' + (selected ? ' selected' : '') +
              (this.props.expanded ? ' expanded' : '')}
        style={{height: (2 + expanded * 2 * pages.length) + 'em'}}
            >
      <p className={'fw5 ma0 pv2 lh-solid hover-blue-60' + (item.pages.length ? '' : ' grey-50')}
          onClick={handleClick}
      >{item.title}</p>
      {pages.map(this.getPage)}
    </div>
      );
  }
}));

module.exports = ListItem;
