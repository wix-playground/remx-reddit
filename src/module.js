export default class QaWorkshopDemoModule {
  getManagerApps(appState) {
    const apps = [];
    apps.push({
      id: 'reddit',
      label: 'Workshop',
      screenId: 'remxReddit.TopicList',
      icon: require('./img/icon.png'),
      isUtility: true,
      title: 'Live Video'
    });
    return apps;
  }

  components() {
    return require('./screens');
  }

  methods() {
    return [];
  }

  prefix() {
    return 'reddit';
  }

  init() {
  }

  onAppStateChanged(appState) {
  }
}
