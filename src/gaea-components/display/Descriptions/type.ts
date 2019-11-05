import { textAlignData } from '@/gaea-components/config/select'
export class Props {
  public editSetting = {
    key: 'descriptions',
    name: 'Descriptions',
    editors: [
      'Layout',
      {
        type: 'box-editor'
      },
      'Function',
      {
        type: 'array',
        field: 'data',
        text: 'Data',
        data: [{
          type: "string",
          field: "label",
          text: "Label"
        }, {
          type: "string",
          field: "value",
          text: "Value"
        }]
      },
      'Style',
      {
        type: 'select',
        field: 'labelAlign',
        text: 'LableAlign',
        data: textAlignData,
      },
      {
        type: 'select',
        field: 'valueAlign',
        text: 'ValueAlign',
        data: textAlignData,
      },
      {
        type: 'number',
        field: 'labelFlex',
        text: 'LableFlex',
        data: {
          useSlider: true,
          step: 1,
          inputRange: [1, 9],
          outputRange: [1, 9]
        }
      },
      {
        type: 'number',
        field: 'valueFlex',
        text: 'ValueFlex',
        data: {
          useSlider: true,
          step: 1,
          inputRange: [1, 9],
          outputRange: [1, 9]
        }
      },
    ],
  };

  public data: { label: string, value: string }[] = [{ label: 'Lable', value: 'Value' }];
  public labelAlign: React.CSSProperties['textAlign'] = 'end';
  public valueAlign: React.CSSProperties['textAlign'] = 'unset';
  public labelFlex: number = 1;
  public valueFlex: number = 4;
}

export class State { }