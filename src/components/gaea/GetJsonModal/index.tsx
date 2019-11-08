import React, { useState, useEffect } from 'react';
import { PickerView } from 'antd-mobile';
import {
  getRenderJsons,
  getRenderJson
} from '@/services/gaea';
import { PopupModal } from '@/components/antd-mobile/Modal';
import MessageModal from '../MessageModal';
import { RenderJson } from '@/defines/inject';

export interface GetJsonModalProps {
  preSelectJsonName?: string;
  getJson: (fileName: string, json: RenderJson) => void;
}

export default (props: GetJsonModalProps) => {
  const { preSelectJsonName, getJson } = props;
  const [allJson, setAllJson] = useState<string[]>([]);
  const [pickerVisible, setPickerVisible] = useState(true);
  const [selectJsonName, setSelectJsonName] = useState<string[]>([]);

  const [messageVisible, setMessageVisible] = useState(false);
  const [title, setTitle] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    if (preSelectJsonName) {
      setSelectJsonName([preSelectJsonName]);
    }
  }, [preSelectJsonName]);

  useEffect(() => {
    const getJsons = async () => {
      const response = await getRenderJsons();
      if (response['data'] && response['data'].length) {
        setAllJson(response['data']);
        setSelectJsonName([response['data'][0]]);
      } else {
        setTitle('失败');
        setMessage(response['message']);
        setMessageVisible(true);
      }
    }
    getJsons();
  }, []);

  const handleGetJson = async () => {
    const response = await getRenderJson(selectJsonName[0]);
    if (response['data']) {
      getJson(selectJsonName[0], response['data']);
      setPickerVisible(false);
    } else {
      setTitle('失败');
      setMessage(response['message']);
      setMessageVisible(true);
    }
  }

  return (
    <PopupModal
      visible={pickerVisible}
      title='选择页面'
      onClose={() => setPickerVisible(false)}
      footer={[
        {
          text: '确定',
          onPress: handleGetJson,
        }
      ]}
    >
      <PickerView
        data={allJson.map(item => ({ label: item, value: item }))}
        cascade={false}
        value={selectJsonName}
        onChange={setSelectJsonName}
      />
      <MessageModal
        visible={messageVisible}
        onClose={() => { setMessageVisible(false) }}
        title={title}
        message={message}
      />
    </PopupModal>
  )
}
