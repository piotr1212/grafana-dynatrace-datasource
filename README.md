## Dynatrace Datasource - graph metrics from Dynatrace

Grafana Plugin to Graph timeseries from Dynatraces API

![](https://raw.githubusercontent.com/piotr1212/grafana-dynatrace-datasource/master/docs/example_panel.png)

More information on the [Dynatrace API](https://www.dynatrace.com/support/help/dynatrace-api/timeseries/how-do-i-fetch-the-metrics-of-monitored-entities/)


## Limitataions and issues

- Only proxy mode supported
- Only on premise installations
- Problems and events API are not implemented, only Timeseries


## Installation

Checkout in grafana/data/plugins, run the commands listed in "Dev setup" and restart Grafana.


### Dev setup

`npm install yarn`
`./node_modules/yarn/bin/yarn install`
`npm run build`


### Changelog

1.0.0
- Initial release
