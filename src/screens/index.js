
module.exports = [
  {
    id: 'remxReddit.TopicList',
    generator: () => require('./TopicList').default,
    description: 'TopicList'
  },
  {
    id: 'remxReddit.PostsList',
    generator: () => require('./PostsList').default,
    description: 'PostsList'
  }
];
