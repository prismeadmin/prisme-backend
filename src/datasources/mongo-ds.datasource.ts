import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './mongo-ds.datasource.json';

export class MongoDsDataSource extends juggler.DataSource {
  static dataSourceName = 'mongoDS';

  constructor(
    @inject('datasources.config.mongoDS', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
