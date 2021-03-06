import _get from 'lodash/get';
import _set from 'lodash/set';
import _forOwn from 'lodash/forOwn';
import _cloneDeep from 'lodash/cloneDeep';
import _omit from 'lodash/omit';
import _isUndefined from 'lodash/isUndefined';
import _upperFirst from 'lodash/upperFirst';
import { RenderJson } from '@/defines/inject';

export type InjectField =
  | 'dataSource'
  | 'dataLoading'
  | 'handleClick'
  | 'handleFormItems'
  | 'handleSubmit'

export const injectionMap: { configKey: InjectField, injectKey: string }[] = [
  {
    configKey: 'dataSource',
    injectKey: 'data',
  },
  {
    configKey: 'dataLoading',
    injectKey: 'loading',
  },
  {
    configKey: 'handleClick',
    injectKey: 'onClick',
  },
  {
    configKey: 'handleFormItems',
    injectKey: 'setFormItems',
  },
  {
    configKey: 'handleSubmit',
    injectKey: 'onSubmit',
  },
]

export function injectPropsToUI(renderJson: RenderJson, config: any = {}) {
  const result = _cloneDeep(renderJson);

  // 遍历每个实例
  _forOwn(result, (value, key) => {
    const props = _get(value, 'data.props') || {};
    // 从 config 中取出需要注入该实例的属性或方法
    const injectData = injectionMap.map(item => ({ ...item, inject: config[props[item.configKey]] })).filter(item => item.inject);
    if (injectData.length) {
      let newProps = { ...props };
      // 注入该实例配置的数据或方法
      injectData.forEach(item => {
        newProps[item.injectKey] = item.inject;
      });

      // 移除新的 props 中的的数据或方法的映射配置
      newProps = _omit(newProps, injectData.map(item => item.configKey));

      // 注入新的 props
      _set(value, 'data.props', newProps);
    }
  });
  // console.log(result);
  return result;
}

export function addInjectToEditor(fields?: InjectField[]) {
  const configProperties = injectionMap.map(item => {
    return {
      type: 'string',
      field: item.configKey,
      text: _upperFirst(item.configKey),
    }
  });

  return [
    'Inject',
    ...configProperties.filter(item => fields ? fields.includes(item.field) : true)
  ]
}

/**
 * return 'dataSource', 'dataLoading', 'handleClick'
 */
export function addDataInjectToEditor() {
  return addInjectToEditor(['dataSource', 'dataLoading', 'handleClick']);
}

/**
 * return 'handleFormItems', 'handleSubmit'
 */
export function addFormInjectToEditor() {
  return addInjectToEditor(['handleFormItems', 'handleSubmit']);
}


