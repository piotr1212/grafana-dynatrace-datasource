import DynatraceDatasource from './datasource';
import DynatraceDatasourceQueryCtrl from './query_ctrl';

class DynatraceConfigCtrl {}
DynatraceConfigCtrl.templateUrl = 'partials/config.html';

class DynatraceQueryOptionsCtrl {}
DynatraceQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

export {
  DynatraceDatasource as Datasource,
  DynatraceConfigCtrl as ConfigCtrl,

  DynatraceDatasourceQueryCtrl as QueryCtrl,
  DynatraceQueryOptionsCtrl as QueryOptionsCtrl,
};
