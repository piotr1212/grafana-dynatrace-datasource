import { QueryCtrl } from 'app/plugins/sdk';
import './css/query-editor.css!';

export default class DynatraceDatasourceQueryCtrl extends QueryCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);

    this.scope = $scope;
    this.target.target = this.target.target || 'select metric';
    this.target.aggregation = this.target.aggregation || 'select aggregation';

    this.target.detail = this.target.detail || {};

    this.updateMetricDetails(this.target.target);
  }

  getMetricList() {
    return this.datasource.metricFindQuery();
  }

  getEntities(query, dimension) {
    return this.datasource.getEntities(query, dimension);
  }

  updateMetricDetails(query) {
    this.datasource.metricFindDetails(query).then((res) => {
      this.target.detail = res;
    });
  }

  onChangeInternal(query) {
    this.updateMetricDetails(query);
    this.panelCtrl.refresh();
  }
}

DynatraceDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
