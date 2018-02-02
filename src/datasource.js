import _ from 'lodash';

export default class DynatraceDatasource {
  constructor(instanceSettings, $q, backendSrv, templateSrv) {
    this.type = instanceSettings.type;
    this.name = instanceSettings.name;
    this.q = $q;

    this.id = instanceSettings.jsonData.id;
    this.token = instanceSettings.jsonData.token;

    this.url = `${instanceSettings.url}/e/${this.id}/api/v1/timeseries`;

    this.headers = { Authorization: `Api-Token ${this.token}` };

    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
  }

  doRequest(options) {
    options.url = this.url;
    options.headers = this.headers;
    return this.backendSrv.datasourceRequest(options);
  }

  testDatasource() {
    return this.doRequest({}).then(() => ({
      status: 'success', message: 'Data source is working', title: 'Success',
    })).catch(() => ({
      status: 'error', message: 'Datasource test failed', title: 'Error',
    }));
  }

  query(options) {
    const targets = _.filter(options.targets, (target => !target.hide));
    const fromTs = options.range.from._d.getTime();
    const toTs = options.range.to._d.getTime();
    const requests = [];

    Object.keys(targets).forEach((t) => {
      const opts = {
        method: 'POST',
        data: {
          aggregationType: targets[t].aggregation,
          endTimestamp: toTs,
          startTimestamp: fromTs,
          timeseriesId: targets[t].target,
        },
      };
      requests[t] = this.doRequest(opts);
    });

    // TODO: this throws an error when one of the requests fails
    // Would be better to finish all requests which do work
    return this.q.all(requests).then((results) => {
      let metrics = [];

      Object.keys(results).forEach((r) => {
        const regexp = new RegExp(targets[r].filter);
        const m = DynatraceDatasource.processDatapoints(results[r].data.result);

        metrics = metrics.concat(_.filter(m, serie => regexp.test(serie.target)));
      });

      return { data: metrics };
    }).catch(() => ({
      data: [], // TODO: Handle properly
    }));
  }

  static processDatapoints(result) {
    const r = [];

    Object.keys(result.dataPoints).forEach((tsid) => {
      let label = '';
      const dp = result.dataPoints[tsid].map(x => [x[1], x[0]]);
      const identifiers = tsid.split(', ');

      Object.keys(identifiers).forEach((id) => {
        label += `${result.entities[identifiers[id]]} `;
      });

      r.push({
        target: label,
        datapoints: dp,
      });
    });

    return r;
  }

  getEntities(target, dimension) {
    const options = {
      method: 'POST',
      data: {
        aggregationType: 'AVG',
        relativeTime: 'hour',
        timeseriesId: target,
      },
    };

    return this.doRequest(options).then((res) => {
      const entities = _.pickBy(res.data.result.entities, key =>
        (_.startsWith(key, dimension)));

      return _.map(entities, (d, i) => (
        { text: d, value: i }
      ));
    });
  }

  metricFindQuery() {
    // var interpolated = {
    //     target: this.templateSrv.replace(query, null, 'regex')
    // };

    return this.doRequest({
      method: 'GET',
    }).then(DynatraceDatasource.getTsNames);
  }

  metricFindDetails(query) {
    // TODO: Don't do a new request but take results from findquery
    return this.doRequest({
      method: 'GET',
    }).then((res) => {
      const entry = _.filter(res.data, item =>
        (item.timeseriesId === query))[0];

      return entry;
    }).catch(() => (false));
  }

  static getTsNames(result) {
    return _.map(result.data, d => (
      { text: d.timeseriesId, value: d.timeseriesId }));
  }
}

